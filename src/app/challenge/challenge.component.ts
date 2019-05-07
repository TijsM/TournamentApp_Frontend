import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  private challengedUser: User;
  currentUser: User;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _tournamentDataService: TournamentDataService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    const id = +this._route.snapshot.params['id']; // id uit de route halen

    this._tournamentDataService
      .getUserById$(id)
      .subscribe(res => (this.challengedUser = res));

    console.log(this.challengedUser.firstName);
  }

  goToRanking() {
    this._tournamentDataService
      .getUserById$(this.currentUser.userId)
      .subscribe(res => (this.currentUser = res));

    // console.log('voor reset:');
    localStorage.clear();
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    // console.log('na reset:');
    // console.log(this.currentUser);
    this._router.navigate(['/ranking']);
  }
}
