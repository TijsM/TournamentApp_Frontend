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
    private router: Router
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
    console.log('entered onsubmit');
    console.log(this.user.value.gender);
    console.log(this.user.value.email);

    if (this.user.value.gender == 'man') {
      this.gendernumber = 0;
    }
    if (this.user.value.gender == 'vrouw') {
      this.gendernumber = 1;
    }

    console.log(this.gendernumber);

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
        // val => {
        //   if (val) {
        //     if (this.authService.redirectUrl) {
        //       this.router.navigateByUrl(this.authService.redirectUrl);
        //       this.authService.redirectUrl = undefined;
        //     } else {
        //       this.router.navigate(['/ranking']);
        //     }
        //   } else {
        //     this.errorMsg = `Could not login`;
        //   }
        // }
        );
  }
}
