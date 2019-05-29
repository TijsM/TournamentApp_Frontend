import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

function parseJwt(token) {
  // checken als er een token werd doorgegeven
  if (!token) {
    return null;
  }

  // relevante info halen uit het token
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');

  // token decrypteren en teruggeven
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // keyname in van de aangemelde user in ons localstorage
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    //token ophalen uit localstorage (is hier nog een user die een tokeproperty bevat)
    let parsedToken = JSON.parse(localStorage.getItem(this._tokenKey));
    let token = null;

    if (parsedToken) {
      //het token property ophalen uit de user van de localstorage
      token = parseJwt(parsedToken['token']);

      //controleren op de "leeftijd" van het token
      const expires = new Date(parseInt(token.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        token = null;
      }
    }

    //user is een behaviorSubject, dit is een subject die altijd een waarde heeft
    // elke component kan op deze user subscriben, hij zal steeds de aangemeld user krijgen
    this._user$ = new BehaviorSubject<string>(token && token.unique_name);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    //token ophalen uit localstorage
    //PAS OP: dit geeft een user die het token bevat
    const localToken = localStorage.getItem(this._tokenKey);

    return !!localToken ? localToken : '';
  }

  get onlyToken(): string {
    let parsedToken = JSON.parse(localStorage.getItem(this._tokenKey));
    return !!parsedToken.token ? parsedToken.token : '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { email, password },
        { responseType: 'text' }
        //verwacht een antwoord (jwt token) in plain text en niet in het standaard json formaat
      )
      .pipe(
        map((token: any) => {
          //token wordt verkregen door backend
          if (token) {
            //localstorage updaten
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    familyName: string,
    dateOfBirth: Date,
    phone: string,
    gender: number,
    tennisVlaanderenScore: number
  ): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/Account/register`,
        {
          email,
          password,
          firstName,
          familyName,
          dateOfBirth,
          phone,
          gender,
          tennisVlaanderenScore,
          passWordConfirmation: password
        },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            // localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            return false;
          }
        })
      );
  }

  logout() {
    //1. item verwijderen uit localstorage
    //2. BehaviorSubject verwijderen ==> null maken
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    //huidig ingegeven email doorsturne naar backend
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );

    //geeft een boolean terug met antwoord van backend
  };
}
