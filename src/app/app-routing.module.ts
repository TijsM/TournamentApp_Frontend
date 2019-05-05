import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path: '', component: RegisterComponent},
  { path: 'ranking', component: RankingComponent },
  { path: 'userDetails/:id', component: UserDetailsComponent },
  { path: 'challenge/:id', component: ChallengeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
