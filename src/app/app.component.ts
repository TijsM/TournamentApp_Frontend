import { Component } from '@angular/core';
import { TournamentDataService } from './tournament.data.services';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _fetchRecipes$: Observable<User[]> = this._tournamenDataService
    .users$;
  private _participants: User[];

  constructor(private _tournamenDataService: TournamentDataService) {
   
  }

  get participants$(): Observable<User[]> {
    return this._fetchRecipes$;
  }
}
