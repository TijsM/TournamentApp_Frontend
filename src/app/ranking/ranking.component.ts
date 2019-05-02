import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TournamentDataService } from '../tournament.data.services';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Match } from '../match.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  private _fetchUsers$: Observable<User[]> = this._tournamenDataService.users$;
  private currentUser: User;
  private pendingMatch: Match;
  private insertScore: FormGroup;
  currentUserFromLogin: User;
  displayedColumns = ['ranking', 'name', 'daaguit'];
  userWantsToCommitScore = false;
  userWantsForfait = false;

  constructor(
    private _tournamenDataService: TournamentDataService,
    private _router: Router,
    private _ulfb: FormBuilder
  ) {
    this.currentUserFromLogin = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this._tournamenDataService /*  */
      .getUserById$(this.currentUserFromLogin.userId)
      .subscribe(res => {
        this.currentUser = User.fromJSON(res);

        if (this.currentUser.hasChallenge) {
          this._tournamenDataService
            .getMatchById$(this.currentUser.pendingMatch.matchId)
            .subscribe(res => (this.pendingMatch = res));
        }
      });

    this.insertScore = this._ulfb.group({
      set1User1: ['', Validators.required],
      set2User1: ['', Validators.required],
      set3User1: [''],
      set1User2: ['', Validators.required],
      set2User2: ['', Validators.required],
      set3User2: ['']
    });
  }

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }

  onClick(userId: number) {
    this._router.navigate(['/userDetails', userId]);
  }

  showCommitScore() {
    this.userWantsToCommitScore = true;
    this.userWantsForfait = false;
  }

  showForfaitWarning() {
    this.userWantsForfait = true;
    this.userWantsToCommitScore = false;
  }
  commitScore() {
    console.log(this.insertScore.controls.set1User1.value);
    console.log(this.insertScore.controls.set2User1.value);
    console.log(this.insertScore.controls.set3User1.value);

    console.log(this.insertScore.controls.set1User2.value);
    console.log(this.insertScore.controls.set2User2.value);
    console.log(this.insertScore.controls.set3User2.value);
  }

  commitForfait() {
    console.log('user bevestigd forfait');
  }
}
