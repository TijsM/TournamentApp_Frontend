import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { ChallengeComponent } from './hulp/challenge/challenge.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './user/auth.guard';
import { AccesPointComponent } from './acces-point/acces-point.component';
import { ConfirmationCommittedScoreComponent } from './hulp/confirmation-committed-score/confirmation-committed-score.component';
import { Error404Component } from './hulp/error404/error404.component';
import { HistoryAccesComponent } from './history/history-acces/history-acces.component';
import { UserResolver } from './user/user-resolver';

const routes: Routes = [
  { path: '', component: AccesPointComponent },
  {
    path: 'scoreConfirmed',
    canActivate: [AuthGuard],
    component: ConfirmationCommittedScoreComponent
  },
  {
    path: 'ranking',
    canActivate: [AuthGuard],
    component: RankingComponent
  },

  {
    path: 'userDetails/:id',
    canActivate: [AuthGuard],
    component: UserDetailsComponent,
    resolve: { sellectedUser: UserResolver }
  },
  {
    path: 'challenge/:id',
    canActivate: [AuthGuard],
    component: ChallengeComponent,
    resolve: { sellectedUser: UserResolver }
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    component: HistoryAccesComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
