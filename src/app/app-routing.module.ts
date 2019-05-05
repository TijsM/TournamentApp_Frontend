import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './user/auth.guard';
import { AccesPointComponent } from './acces-point/acces-point.component';

const routes: Routes = [
  { path: '', component: AccesPointComponent },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
