import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChallengeComponent } from './hulp/challenge/challenge.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './user/auth.guard';
import { AccesPointComponent } from './acces-point/acces-point.component';
import { ConfirmationCommittedScoreComponent } from './hulp/confirmation-committed-score/confirmation-committed-score.component';
import { Error404Component } from './hulp/error404/error404.component';

const routes: Routes = [
  { path: '', component: AccesPointComponent },
  {
    path: 'scoreConfirmed',
    canActivate: [AuthGuard],
    component: ConfirmationCommittedScoreComponent
  },
  { path: 'ranking', component: RankingComponent },

  {
    path: 'userDetails/:id',
    canActivate: [AuthGuard],
    component: UserDetailsComponent
  },
  {
    path: 'challenge/:id',
    canActivate: [AuthGuard],
    component: ChallengeComponent
  },
  { path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
