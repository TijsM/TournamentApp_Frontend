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
  private _fetchUsers$: Observable<User[]> = this._tournamenDataService.users$;
  private _users: User[];

  constructor(private _tournamenDataService: TournamentDataService) {}

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }
}
