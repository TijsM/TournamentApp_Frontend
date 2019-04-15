import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatTabsModule,
  MatTableModule,
  MatExpansionModule,
  MatIconModule,
  MatDividerModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RankingComponent,
    UserDetailsComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatTableModule,
    MatExpansionModule,
    ChartsModule,
    AngularFontAwesomeModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    NgCircleProgressModule.forRoot({
      radius: 100
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
