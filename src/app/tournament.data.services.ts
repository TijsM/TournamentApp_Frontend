import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentDataService {
  constructor(private http: HttpClient) {}

  get users$(): Observable<User[]> {
    return this.http
      .get(`${environment.apiUrl}/users/`)
      .pipe(map((list: any[]): User[] => list.map(User.fromJSON)));
  }
}
