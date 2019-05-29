import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from 'ng2-charts';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { RankingComponent } from './ranking/ranking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './menubar/menubar.component';
import { MaterialModule } from './material.module';
import { UserModule } from './user/user.module';
import { MAT_DATE_LOCALE } from '@angular/material';
import { httpInterceptorProviders } from './interceptors';
import { AccesPointComponent } from './acces-point/acces-point.component';
import { HulpModule } from './hulp/hulp.module';
import { HistoryModule } from './history/history.module';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
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
    UserModule,
    HulpModule,
    HistoryModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'nl-NL' },
    httpInterceptorProviders //verzameling van alle interceptors (hier is er slehts 1)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
