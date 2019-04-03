import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Match } from '../match.model';
import { ActivatedRoute } from '@angular/router';
import { async } from 'q';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private _fetchUser$: Observable<User>;
  private _fetchMatchesFromUser$: Observable<
    Match[]
  > = this._tournamenDataService.getMatchesFromUser$(2);
  private _fetchTennisVlaanderenAverage: Observable<
    number
  > = this._tournamenDataService.getAvarageTennisVlaanderenScore$();

  //data voor grafiek "tennisvlaanderenscore"
  public pieChartLabels: Label[] = ['score van speler', 'gemiddelde'];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  constructor(
    private _route: ActivatedRoute,
    private _tournamenDataService: TournamentDataService
  ) {}

  ngOnInit() {
    const id = +this._route.snapshot.params['id'];
    this._fetchUser$ = this._tournamenDataService.getUserById$(id);
  }

  get user$(): Observable<User> {
    return this._fetchUser$;
  }

  get matchesFromUser$(): Observable<Match[]> {
    return this._fetchMatchesFromUser$;
  }

  get tennisVlaanderenAverage$(): Observable<number> {
    return this._fetchTennisVlaanderenAverage;
  }

  set user$(value: Observable<User>) {
    this._fetchUser$ = value;
  }
}
