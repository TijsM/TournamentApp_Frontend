import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

import { map } from 'rxjs/operators';
import { DateAdapter } from '@angular/material';

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('passwordConfirmation');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private adapter: DateAdapter<any>
  ) {
   
  }

  ngOnInit() {
    // this.adapter.setLocale('en');


    this.user = this.fb.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      tennisVlaanderenScore: ['', Validators.required],
      phone: ['', Validators.required],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          passwordConfirmation: ['', Validators.required]
        },
        { validator: comparePasswords }
      ),
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],

      gender: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('entered onsubmit');
  }
}
