import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { TournamentDataService } from '../tournament.data.services';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { Match } from '../match.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  private _fetchUser$: Observable<User>; // = this._tournamenDataService.getUserById$(1);
  private _fetchMatchesFromUser$: Observable<
    Match[]
  > = this._tournamenDataService.getMatchesFromUser$(2);

 

  public pieChartLabels: Label[] = ['Gewonnne', 'Verloren'];
  public pieChartData: SingleDataSet = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
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

  set user$(value: Observable<User>) {
    this._fetchUser$ = value;
  }
}
