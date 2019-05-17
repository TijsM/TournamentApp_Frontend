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
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

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
  private gendernumber: number;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private popUp: MatSnackBar
  ) {}

  ngOnInit() {
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
    console.log(this.user.value.gender);

    if (this.user.value.gender == 'man') {
      this.gendernumber = 0;
    }
    if (this.user.value.gender == 'vrouw') {
      this.gendernumber = 1;
    }

    this.authService
      .register(
        this.user.value.email,
        this.user.value.passwordGroup.password,
        this.user.value.firstName,
        this.user.value.familyName,
        this.user.value.dateOfBirth,
        this.user.value.phone,
        this.gendernumber,
        this.user.value.tennisVlaanderenScore
      )
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {    
              localStorage.setItem("hasJustRegistred", "true");

              // this.router.navigate(['']).then(() => {
              //   this.popUp.open('U bent geregistreerd, log in', 'x', {
              //     duration: 4000
              //   });
              // });

              location.reload();
            }
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          this.popUp.open('Er ging iets mis, controlleer alle velden', 'x', {
            duration: 6000
          });
        }
      );
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    if (errors.required) {
      return 'dit moet moet ingevuld worden';
    }

    if (errors.email) {
      return 'geen correct email';
    }

    // if (errors.comparePasswords) {
    //   return 'wachtwoorden niet gelijk';
    // }

    if (errors.minLength) {
      return `needs at least ${
        errors.minlength.requiredLength
      } characters (got ${errors.minlength.actualLength})`;
    }
  }
}
