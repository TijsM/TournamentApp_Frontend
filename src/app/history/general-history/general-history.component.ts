import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import { Match } from 'src/app/match.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentDataService } from 'src/app/tournament.data.services';

@Component({
  selector: 'app-general-history',
  templateUrl: './general-history.component.html',
  styleUrls: ['./general-history.component.scss']
})
export class GeneralHistoryComponent implements OnInit {
  public currentUser: User;
  public matches: Match[];

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
      .getAllMatches$()
      .subscribe(res => (this.matches = res.reverse()));
  }
}
