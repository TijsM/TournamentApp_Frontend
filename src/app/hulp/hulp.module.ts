import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationCommittedScoreComponent } from './confirmation-committed-score/confirmation-committed-score.component';
import { MaterialModule } from '../material.module';
import { Error404Component } from './error404/error404.component';
import { ChallengeComponent } from './challenge/challenge.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { LoadingComponent } from './loading/loading.component';
import { FormalLoadingComponent } from './formal-loading/formal-loading.component';
import { BottomSheetPasswordRulesComponent } from './bottom-sheet-password-rules/bottom-sheet-password-rules.component';
import { BottomSheetTournamentRulesComponent } from './bottom-sheet-tournament-rules/bottom-sheet-tournament-rules.component';

@NgModule({
  declarations: [
    ConfirmationCommittedScoreComponent,
    Error404Component,
    ChallengeComponent,
    BottomSheetComponent,
    LoadingComponent,
    FormalLoadingComponent,
    BottomSheetPasswordRulesComponent,
    BottomSheetTournamentRulesComponent,
    BottomSheetTournamentRulesComponent
  ],
  imports: [CommonModule, MaterialModule],
  entryComponents: [BottomSheetComponent, BottomSheetPasswordRulesComponent, BottomSheetTournamentRulesComponent],
  exports: [
    ConfirmationCommittedScoreComponent,
    Error404Component,
    ChallengeComponent,
    LoadingComponent,
    FormalLoadingComponent,
    BottomSheetPasswordRulesComponent,
    BottomSheetTournamentRulesComponent
  ]
})
export class HulpModule { }
