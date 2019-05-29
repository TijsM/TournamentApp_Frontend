import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  //canactivate guard wordt gebruikt in router module, deze moeten we dus implementeren
  //guards geven een boolean terug

  //true bij aangemelde user
  //false bij niet aangemelde user
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.user$.getValue()) {
      return true;
      //wel aangemeld
    }
    
    //de gevraagde url opslaan, zodat de user na aanmelden daar de gevraaagde pagina gaat
    this.authService.redirectUrl = state.url;

    //als niet aangmeld, route te gebruiker naar de login/register pagina
    this.router.navigate(['/']);
    return false;
  }
}
