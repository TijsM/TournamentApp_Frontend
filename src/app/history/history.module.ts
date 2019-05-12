import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { GeneralHistoryComponent } from './general-history/general-history.component';
import { PersonalHistoryComponent } from './personal-history/personal-history.component';
import { HistoryAccesComponent } from './history-acces/history-acces.component';
import { HulpModule } from '../hulp/hulp.module';


@NgModule({
  declarations: [
    HistoryAccesComponent,
    PersonalHistoryComponent,
    GeneralHistoryComponent,
    
  ],
  imports: [CommonModule, MaterialModule, HulpModule],
  exports: [
    HistoryAccesComponent,
    GeneralHistoryComponent,
    PersonalHistoryComponent
  ]
})
export class HistoryModule {}
