import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationCommittedScoreComponent } from './confirmation-committed-score/confirmation-committed-score.component';
import { MaterialModule } from '../material.module';
import { Error404Component } from './error404/error404.component';

@NgModule({
  declarations: [ConfirmationCommittedScoreComponent, Error404Component],
  imports: [CommonModule, MaterialModule],
  exports: [ConfirmationCommittedScoreComponent, Error404Component]
})
export class HulpModule {}