import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { Match } from './match.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  constructor(private http: HttpClient) {}

  get users$(): Observable<User[]> {
    return this.http
      .get(`${environment.apiUrl}/Users/`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  giveRanking$(tournamentId: number): Observable<User[]> {
    return this.http
      .get(`${environment.apiUrl}/Tournament/GiveRanking/${tournamentId}`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }

  getUserById$(id: number): Observable<User> {
    return this.http
      .get(`${environment.apiUrl}/Users/${id}`)
      .pipe(map((usr: any): User => User.fromJSON(usr)));
  }

  getUserByIdNoIncludes$(id: number): Observable<User> {
    return this.http
      .get(`${environment.apiUrl}/Users/getUserNoIncludes/${id}`)
      .pipe(map((usr: any): User => User.fromJSON(usr)));
  }

  getMatchById$(id: number): Observable<Match> {
    return this.http
      .get(`${environment.apiUrl}/Match/${id}`)
      .pipe(map((mat: any): Match => Match.fromJSON(mat)));
  }

  getMatchesFromUser$(id: number): Observable<Match[]> {
    return this.http
      .get(`${environment.apiUrl}/Match/GetMatchesVanSpeler/${id}`)
      .pipe(map((list: any[]): Match[] => list.map(Match.fromJSON)));
  }

  getWonMatchesFromUser$(id: number): Observable<Match[]> {
    return this.http
      .get(`${environment.apiUrl}/Match/GetWonMatchesFromPlayer/${id}`)
      .pipe(map((list: any[]): Match[] => list.map(Match.fromJSON)));
  }

  getLostMatchesFromUser$(id: number): Observable<Match[]> {
    return this.http
      .get(`${environment.apiUrl}/Match/GetLostMatchesFromPlayer/${id}`)
      .pipe(map((list: any[]): Match[] => list.map(Match.fromJSON)));
  }

  getAllMatches$(): Observable<Match[]> {
    return this.http
      .get(`${environment.apiUrl}/Match`)
      .pipe(map((list: any[]): Match[] => list.map(Match.fromJSON)));
  }
  getAvarageTennisVlaanderenScore$(): Observable<number> {
    return this.http
      .get(`${environment.apiUrl}/Users/GetAverageTennisVlaanderenScore`)
      .pipe(map(Number));
  }

  createMatch(tournamentId: number, player1Id: number, player2Id: number) {

    return this.http.post(
      `${environment.apiUrl}/Tournament/AddMatchToTournament`,
      {
        tournamentId,
        player1Id,
        player2Id
      }
    );
  }

  commitScore(
    matchId: number,
    WinnerSet1: number,
    LoserSet1: number,
    WinnerSet2: number,
    LoserSet2: number,
    WinnerSet3: number,
    LoserSet3: number
  ) {
    return this.http.put(`${environment.apiUrl}/Match/commitScore`, {
      matchId,
      WinnerSet1,
      LoserSet1,
      WinnerSet2,
      LoserSet2,
      WinnerSet3,
      LoserSet3
    });
  }
}
  // login(email: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}/Account`, { email, password })
  //     .pipe(
  //       map(user => {
  //         if (user && user.token) {
  //           // user en jwt-token in localstorage steken
  //           localStorage.setItem('currentUser', JSON.stringify(user));
  //         }

  //         console.log('vanuit dataservice');
  //         console.log(user);
  //         return user;
  //       })
  //     );
  // }

  // register(
  //   firstName: string,
  //   familyName: string,
  //   dateOfBirth: Date,
  //   tennisVlaanderenScore: number,
  //   password: string,
  //   passwordConfirmation: string,
  //   phone: string,
  //   email: string,
  //   gender: number
  // ) {
  //   console.log('entered tournament.data.services.ts');
  //   console.log(email);
  //   return this.http
  //     .post(
  //       `${environment.apiUrl}/Account/Register`,
  //       {
  //         email,
  //         password,
  //         firstName,
  //         familyName,
  //         dateOfBirth,
  //         passwordConfirmation,
  //         phone,
  //         gender,
  //         tennisVlaanderenScore
  //       },
  //       { responseType: 'text' }
  //     )
  //     .pipe(
  //       map((token: any) => {
  //         if (token) {
  //           localStorage.setItem(this._tokenKey, token);
  //           this._user$.next(email);
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       })
  //     );
  // }
//}
