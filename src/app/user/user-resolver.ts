import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  //implementeerd inteface

  constructor(private _dataService: TournamentDataService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    //route.params = ophalen van id uit link
    //vanaf hij de volledige user heeft van backend, zal hij deze retourneren
    return this._dataService.getUserById$(route.params['id']);
  }
}
