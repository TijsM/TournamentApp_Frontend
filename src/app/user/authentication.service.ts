import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

function parseJwt(token) {
  if (!token) {
    //als er geen token gevonden werd
    return null;
  }

  const base64Token = token.split('.')[1]; //username en expire date uit de token halen
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 100) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
    // elk ander component kan nu op de user subscriben
  }

  //anroepen van de api methode
  //geeft true als er succesvol een user is aangemeld
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/Account`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email); //zeggen dat er een nieuwe user is aangemeld
            return true;
          } else {
            return false;
          }
        })
      );
  }

  register(firstname: string, familyname: string, dateOfBirth: Date, tennsiVlaanderenScore: number, password: string,  passwordConfirmation: string, phone: string, email: string, gender: number): Observable<boolean> {
    return this.http
      .post(`${environment.apiUrl}/account/register`, 
      { email, password, firstname, familyname, dateOfBirth, passwordConfirmation, phone, gender, tennsiVlaanderenScore })
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

  //uitloggen = user uit localstorage verwijderen
  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
  }

  //via backend de beschikbaarheid van een email adres checken
  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/account/checkusername`,
      {
        params: { email }
      }
    );
  };
}
