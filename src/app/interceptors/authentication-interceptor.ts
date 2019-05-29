import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { AuthenticationService } from '../user/authentication.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  //implementeerd HttpInterceptor

  constructor(private authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.token.length) {
      // als er wel een token aanwezig is
      // de http request "intercepten"
      // bearer header toevoegen
      // http requist uitvoeren met deze authenticatie header
      const clonedRequest = req.clone({
        headers: req.headers.set(
          'Authorization',
          `Bearer ${this.authService.onlyToken}`
        )
      });
      return next.handle(clonedRequest);
    }

    //als er geen token is, gwn request uitvoeren zonder token
    return next.handle(req);
  }
}
