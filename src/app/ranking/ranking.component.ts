import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TournamentDataService } from '../tournament.data.services';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { Match } from '../match.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { BottomSheetTournamentRulesComponent } from '../hulp/bottom-sheet-tournament-rules/bottom-sheet-tournament-rules.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  private _fetchUsers$: User[];
  public currentUser: User;
  public pendingMatch: Match;
  public insertScore: FormGroup;
  currentUserFromLogin: User;
  displayedColumns = ['ranking', 'name', 'daaguit'];
  userWantsToCommitScore = false;
  userWantsForfait = false;
  pendingmatchId: number;


  constructor(
    private _tournamenDataService: TournamentDataService,
    private _router: Router,
    private _ulfb: FormBuilder,
    private popup: MatSnackBar,
    private bottom: MatBottomSheet
  ) {
    this.currentUserFromLogin = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this._tournamenDataService
      .getUserById$(this.currentUserFromLogin.userId)
      .subscribe(res => {
        this.currentUser = User.fromJSON(res);

        if (this.currentUser.hasChallenge) {
          this._tournamenDataService
            .getMatchById$(this.currentUser.pendingMatch.matchId)
            .subscribe(res => (this.pendingMatch = res));
        }

        this._tournamenDataService
          .giveRanking$(this.currentUser.tournamentId)
          .subscribe(res => (this._fetchUsers$ = res));
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

  get users$(): User[] {
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
    let s1u2 = this.insertScore.controls.set1User2.value;
    let s1u1 = this.insertScore.controls.set1User1.value;
    let s2u2 = this.insertScore.controls.set2User2.value;
    let s2u1 = this.insertScore.controls.set2User1.value;
    let s3u2 = this.insertScore.controls.set3User2.value;
    let s3u1 = this.insertScore.controls.set3User1.value;

    if (s3u2 === '') {
      s3u2 = 0;
    }
    if (s3u1 === '') {
      s3u1 = 0;
    }

    console.log(s1u2);
    console.log(s1u1);
    console.log(s2u2);
    console.log(s2u1);
    console.log(s3u2);
    console.log(s3u1);

    if (
      this.controlleerSet(s1u2, s1u1, 1) &&
      this.controlleerSet(s2u2, s2u1, 2) &&
      this.controlleerSet3(s3u2, s3u1) &&
      this.checkEmpty(s1u1) &&
      this.checkEmpty(s1u2) &&
      this.checkEmpty(s2u1) &&
      this.checkEmpty(s2u2) &&
      this.controlleerMatch(s1u2, s1u1, s2u2, s2u1, s3u2, s3u1)
    ) {

      this._tournamenDataService
        .commitScore(
          this.pendingMatch.matchId,
         s1u1, s1u2, s2u1, s2u2, s3u1, s3u2
        )
        .subscribe(value => this._router.navigate(['scoreConfirmed']));

      this._router.navigate(['/scoreConfirmed']);

      // this.popup.open(`GESLAAGD`, 'x', {
      //   duration: 6000
      // });
    }
  }

  // showEmptyPromt(set: number) {
  //   this.popup.open(`Niet beide scores zijn ingevuld voor set ${set}`, 'x', {
  //     duration: 6000
  //   });
  // }

  checkEmpty(scoreGame: any): boolean {
    if (scoreGame === '') {
      this.popup.open(`Set 1 en 2 moeten volledig ingegeven worden`, 'x', {
        duration: 6000
      });

      return false;
    } else {
      return true;
    }
  }

  controlleerSet3(player1: number, player2: number): boolean {
    if (player1 !== 0 || player2 !== 0) {
      if (player1 > 7 || player2 > 7) {
        this.popup.open(`maximum aantal games in set3 is 7`, 'x', {
          duration: 6000
        });

        return false;
      } else if (player1 === player2) {
        this.popup.open(
          `Er moet een verschil zijn tussen de twee spelers in set 3`,
          'x',
          {
            duration: 6000
          }
        );

        return false;
      } else if (player1 < 6 && player2 < 6) {
        this.popup.open(
          `Er moet 1 speler minstens 6 games behaald hebben in set 3`,
          'x',
          {
            duration: 6000
          }
        );

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  controlleerSet(player1: number, player2: number, setnumber: number): boolean {
    if (player1 > 7 || player2 > 7) {
      this.popup.open(`maximum aantal games in set ${setnumber} is 7`, 'x', {
        duration: 6000
      });

      return false;
    } else if (player1 === player2) {
      this.popup.open(
        `Er moet een verschil zijn tussen de twee spelers in set ${setnumber}`,
        'x',
        {
          duration: 6000
        }
      );

      return false;
    } else if (player1 < 6 && player2 < 6) {
      this.popup.open(
        `Er moet 1 speler minstens 6 games behaald hebben in set ${setnumber}`,
        'x',
        {
          duration: 6000
        }
      );

      return false;
    } else {
      return true;
    }
  }

  controlleerMatch(
    s1u2: number,
    s1u1: number,
    s2u2: number,
    s2u1: number,
    s3u2: number,
    s3u1: number
  ): boolean {
    let amountWonUser2 = 0;
    let amountWonUser1 = 0;

    //set1
    if (s1u2 > s1u1) {
      amountWonUser2++;
    }
    if (s1u2 < s1u1) {
      amountWonUser1++;
    }

    //set2
    if (s2u2 > s2u1) {
      amountWonUser2++;
    }
    if (s2u2 < s2u1) {
      amountWonUser1++;
    }

    //set3
    if (s3u2 > s3u1) {
      amountWonUser2++;
    }
    if (s3u2 < s3u1) {
      amountWonUser1++;
    }

    console.log(amountWonUser2);
    console.log(amountWonUser1);

    if (Math.max(amountWonUser1, amountWonUser2) < 2) {
      this.popup.open(`Zorg dat er een speler 2 sets heeft gewonnen`, 'x', {
        duration: 3000
      });

      return false;
    } else {
      return true;
    }
  }

  viewRules() {
    this.bottom.open(BottomSheetTournamentRulesComponent);
  }

  commitForfait() {
    this._tournamenDataService
      .commitScore(this.pendingMatch.matchId, 6, 0, 6, 0, 0, 0)
      .subscribe(value => this._router.navigate(['scoreConfirmed']));

    this._router.navigate(['/scoreConfirmed']);
  }
}
