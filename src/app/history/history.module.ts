import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { GeneralHistoryComponent } from './general-history/general-history.component';
import { PersonalHistoryComponent } from './personal-history/personal-history.component';
import { HistoryAccesComponent } from './history-acces/history-acces.component';


@NgModule({
  declarations: [
    HistoryAccesComponent,
    PersonalHistoryComponent,
    GeneralHistoryComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    HistoryAccesComponent,
    GeneralHistoryComponent,
    PersonalHistoryComponent
  ]
})
export class HistoryModule {}
