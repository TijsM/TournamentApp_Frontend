import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentDataService } from '../tournament.data.services';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {
  private _fetchUsers$: Observable<User[]> = this._tournamenDataService.users$;
  displayedColumns = ['ranking', 'name', 'daaguit'];

  constructor(private _tournamenDataService: TournamentDataService,
    private _router: Router) {}

  ngOnInit() {}

  get users$(): Observable<User[]> {
    return this._fetchUsers$;
  }

  onClick(userId: number) {
   this._router.navigate(['/userDetails', userId])
  }
}
