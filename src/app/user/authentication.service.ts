import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = JSON.parse(localStorage.getItem(this._tokenKey));
    let token = null;

    if (parsedToken) {
      token = parseJwt(parsedToken['token']);
      const expires = new Date(parseInt(token.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        token = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(token && token.unique_name);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);

    return !!localToken ? localToken : '';
  }

  get onlyToken(): string {
    let parsedToken = JSON.parse(localStorage.getItem(this._tokenKey));
    // console.log(parsedToken.token);
    return !!parsedToken.token ? parsedToken.token : '';
  }

  login(email: string, password: string): Observable<boolean> {
    // console.log('entered auth service');
    return this.http
      .post(
        `${environment.apiUrl}/account`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
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
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
  }

  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };
}
