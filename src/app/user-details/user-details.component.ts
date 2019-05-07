import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Match } from '../match.model';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from 'q';
import { map } from 'rxjs/operators';
import { NgCircleProgressModule } from 'ng-circle-progress';

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
  currentUser: User;

  //data voor circle
  private amountWon;
  private amountLost;
  private amountPlayed;

  constructor(
    private _route: ActivatedRoute,
    private _tournamenDataService: TournamentDataService,
    private _router: Router
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  }

  ngOnInit() {
    this.idFromRoute = +this._route.snapshot.params['id']; // id uit de route halen

    this._fetchMatchesFromUser$ = this._tournamenDataService.getMatchesFromUser$(
      this.idFromRoute
    );

    this._tournamenDataService
      .getUserById$(this.idFromRoute)
      .subscribe(res => (this.selectedUser = res));

    this._tournamenDataService
      .getMatchesFromUser$(this.idFromRoute)
      .subscribe(
        res => ((this.matches = res), (this.amountPlayed = res.length))
      );

    this._tournamenDataService
      .getWonMatchesFromUser$(this.idFromRoute)
      .subscribe(
        res => ((this.wonMatches = res), (this.amountWon = res.length))
      );

    this._tournamenDataService
      .getLostMatchesFromUser$(this.idFromRoute)
      .subscribe(
        res => ((this.lostMatches = res), (this.amountLost = res.length))
      );
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

    // localStorage.setItem('sellectedUser', JSON.stringify(this.currentUser));
    this._router.navigate(['/challenge', this.selectedUser.userId]);
  }
}
 