import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private _fetchUser$: Observable<User> = this._tournamenDataService.getUserById$(1);
  constructor(private _tournamenDataService: TournamentDataService) {}

  ngOnInit() {}

  get user$(): Observable<User> {
    return this._fetchUser$;
  }
}
