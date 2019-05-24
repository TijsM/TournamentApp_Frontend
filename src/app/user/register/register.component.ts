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
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatBottomSheet
} from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { BottomSheetPasswordRulesComponent } from 'src/app/hulp/bottom-sheet-password-rules/bottom-sheet-password-rules.component';

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
  public maxDate = new Date(); //new date heeft standaard de dag van vandaag
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private popUp: MatSnackBar,
    private rules: MatBottomSheet,

  ) { }

  ngOnInit() {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{3,}$/
    this.user = this.fb.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      tennisVlaanderenScore: ['', [Validators.max(500), Validators.required]],
      phone: ['', Validators.required],

      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(regex)]],
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
              localStorage.setItem('hasJustRegistred', 'true');
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

  showPasswordRules(e) {
    e.preventDefault();
    this.rules.open(BottomSheetPasswordRulesComponent);
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    else if (errors.required) {
      return 'Mag niet leeg zijn';
    }
    else if (errors.minlength) {
      return `Moet minstens  ${
        errors.minlength.requiredLength
        } karakakters hebben (heeft er ${errors.minlength.actualLength})`;
    }
    else if (errors.userAlreadyExists) {
      return `Email adres bestaat al`;
    }
    else if (errors.email) {
      return `Geen correct email adres`;
    }
    else if (errors.passwordsDiffer) {
      return `Wachtwoorden zijn niet gelijk`;
    }
    else if (errors.pattern) {
      return `Wachtwoord voldoet niet aan de vereisten`
    }
    else if (errors.max) {
      return `Geef een kleinere waarde in`
    }

  }
}
