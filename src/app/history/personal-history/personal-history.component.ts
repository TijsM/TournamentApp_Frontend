import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentDataService } from 'src/app/tournament.data.services';
import { User } from 'src/app/user.model';
import { Observable } from 'rxjs';
import { Match } from 'src/app/match.model';

@Component({
  selector: 'app-personal-history',
  templateUrl: './personal-history.component.html',
  styleUrls: ['./personal-history.component.scss']
})
export class PersonalHistoryComponent implements OnInit {
  public currentUser: User;
  private matches: Match[];

  constructor(
    private _route: ActivatedRoute,
    private _tournamenDataService: TournamentDataService,
    private _router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._tournamenDataService
      .getMatchesFromUser$(this.currentUser.userId)
      .subscribe(res => (this.matches = res));
  }
}
