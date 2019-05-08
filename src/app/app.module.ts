import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
// import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './ranking/ranking.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChallengeComponent } from './hulp/challenge/challenge.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MenubarComponent } from './menubar/menubar.component';
// import { UserModule } from './user/user.module';
import { MaterialModule } from './material.module';
import { UserModule } from './user/user.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { httpInterceptorProviders } from './interceptors';
import { AccesPointComponent } from './acces-point/acces-point.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { HulpModule } from './hulp/hulp.module';

@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent,
    RankingComponent,
    UserDetailsComponent,
    // ChallengeComponent,
    MenubarComponent,
    AccesPointComponent
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
    UserModule,
    HulpModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
