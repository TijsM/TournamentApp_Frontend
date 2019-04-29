import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './challenge/challenge.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MenubarComponent } from './menubar/menubar.component';
// import { UserModule } from './user/user.module';
import { MaterialModule } from './material.module'

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RankingComponent,
    UserDetailsComponent,
    ChallengeComponent,
    MenubarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ChartsModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    MaterialModule,
    NgCircleProgressModule.forRoot({
      radius: 100
    }),
    // UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
