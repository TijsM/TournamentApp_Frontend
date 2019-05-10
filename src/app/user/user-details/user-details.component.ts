import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user.model';
import { TournamentDataService } from '../../tournament.data.services';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Match } from '../../match.model';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'q';
import { map } from 'rxjs/operators';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { BottomSheetComponent } from 'src/app/hulp/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  private selectedUser: User;
  private idFromRoute: number;
  private _fetchMatchesFromUser$: Observable<Match[]>;
  private _fetchTennisVlaanderenAverage$: Observable<
    number
  > = this._tournamenDataService.getAvarageTennisVlaanderenScore$();
  private matches: Match[];
  private wonMatches: Match[];
  private lostMatches: Match[];
  private cantChallengeErrors: string[];
  private _canChal: boolean;
  public okToChallenge: boolean;
  currentUser: User;

  //data voor circle
  private amountWon;
  private amountLost;
  private amountPlayed;

  constructor(
    private _route: ActivatedRoute,
    private _tournamenDataService: TournamentDataService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.amountLost = 0;
    this.amountPlayed = 0;
    this.amountWon = 0;
    this.idFromRoute = +this._route.snapshot.params['id']; // id uit de route halen

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);

    this._fetchMatchesFromUser$ = this._tournamenDataService.getMatchesFromUser$(
      this.idFromRoute
    );

    this._route.data.subscribe(
      item => (this.selectedUser = item['sellectedUser'])
    );

    this._tournamenDataService
      .getMatchesFromUser$(this.idFromRoute)
      .subscribe(res => {
        this.matches = res;
        this.amountPlayed = res.length;

        console.log(this.matches);
        this.matches.forEach(mat => {
          if (mat.loserId == this.selectedUser.userId) {
            this.amountLost++;
          }
          if (mat.winnerId == this.selectedUser.userId) {
            this.amountWon++;
          }
        });
      });
    this.okToChallenge = this.canChallenge();
  }

  get matchesFromUser$(): Observable<Match[]> {
    return this._fetchMatchesFromUser$;
  }

  get tennisVlaanderenAverage$(): Observable<number> {
    return this._fetchTennisVlaanderenAverage$;
  }

  //data voor grafiek "tennisvlaanderenscore"
  private pieChartLabels: Label[] = ['score van speler', 'gemiddelde'];
  private pieChartType: ChartType = 'pie';
  private pieChartLegend = true;

  back() {
    console.log('back to ranking button clicked');
    this._router.navigate(['/ranking']);
  }

  challenge() {
    this._tournamenDataService
      .createMatch(
        this.selectedUser.tournamentId,
        this.currentUser.userId,
        this.selectedUser.userId
      )
      .subscribe();

    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    this._router.navigate(['/challenge', this.selectedUser.userId]);
  }

  canChallenge(): boolean {
    console.log('test');
    console.log('-----');
    this.cantChallengeErrors = [];
    this._canChal = true;

    if (this.currentUser.hasChallenge === true) {
      console.log('in conditie 1');
      this.cantChallengeErrors.push('U heeft al een uitdaging');
      this._canChal = false;
    }
    if (this.selectedUser.hasChallenge === true) {
      console.log('in conditie 2');
      this.cantChallengeErrors.push(
        'De geselecteerde speler heeft al een uitdaging'
      );
      this._canChal = false;
    }
    if (
      this.selectedUser.rankInTournament > this.currentUser.rankInTournament
    ) {
      console.log('in conditie 3');
      this.cantChallengeErrors.push(
        'U kan geen speler uitdagen die achter jou in de ranking staat'
      );
      this._canChal = false;
    }
    if (
      this.currentUser.rankInTournament - this.selectedUser.rankInTournament >
      2
    ) {
      console.log('in conditie 4');
      this.cantChallengeErrors.push(
        'De speler die u probeert uit te dagen staat te hoog, kies iemand anders'
      );
      this._canChal = false;
    }
    if (this.selectedUser.userId === this.currentUser.userId) {
      console.log('in conditie 5');
      this.cantChallengeErrors.push(
        'Jezelf uitdagen is geen echte uitdaging he ;-)'
      );
      this._canChal = false;
    }

    console.log(this.cantChallengeErrors);
    return this._canChal;
  }

  open() {
    // this.cantChallengeErrors.forEach(msg => {
    //   this._snackBar.open(msg, 'x', {
    //     duration: 2000
    //   });
    // });

    localStorage.setItem(
      'challengeErros',
      JSON.stringify(this.cantChallengeErrors)
    );

    this._bottomSheet.open(BottomSheetComponent);
  }
}
