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

  private _fetchMatchesFromUser$: Observable<Match[]>;
  private _fetchTennisVlaanderenAverage$: Observable<
    number
  > = this._tournamenDataService.getAvarageTennisVlaanderenScore$();
  private matches: Match[];
  private wonMatches: Match[];
  private lostMatches: Match[];

  //data voor circle
  private amountWon;
  private amountLost;
  private amountPlayed;

  constructor(
    private _route: ActivatedRoute,
    private _tournamenDataService: TournamentDataService
  ) {}

  ngOnInit() {
    const id = +this._route.snapshot.params['id']; // id uit de route halen

    this._fetchMatchesFromUser$ = this._tournamenDataService.getMatchesFromUser$(
      id
    );
    
    this._tournamenDataService
      .getUserById$(id)
      .subscribe(res => (this.selectedUser = res));

    this._tournamenDataService
      .getMatchesFromUser$(id)
      .subscribe(
        res => ((this.matches = res), (this.amountPlayed = res.length))
      );

    this._tournamenDataService
      .getWonMatchesFromUser$(id)
      .subscribe(
        res => ((this.wonMatches = res), (this.amountWon = res.length))
      );

    this._tournamenDataService
      .getLostMatchesFromUser$(id)
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
}
