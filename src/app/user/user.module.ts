import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ChartsModule } from 'ng2-charts';
  
@NgModule({
  declarations: [LoginComponent, RegisterComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({
      radius: 100
    })
  ],
  exports: [LoginComponent, RegisterComponent, UserDetailsComponent],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'nl-NL' }]
})
export class UserModule {}
