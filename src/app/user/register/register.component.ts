import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

//2 ingegeven wachtwoorden vergelijken met elkaar
function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

//kijken als naam wel uniek is binnen de db
function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    //assync validator
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
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;

  public errorMsg: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      firstName: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      familyName: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      dateOfBirth: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      tennisVlaanderenScore: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      phone: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      gender: [
        '',
        [Validators.required],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          passwordConfirmation: ['', Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }
    if (errors.required) {
      return 'is required';
    } else if (errors.minlength) {
      return `needs at least ${
        errors.minlength.requiredLength
      } characters (got ${errors.minlength.actualLength})`;
    } else if (errors.userAlreadyExists) {
      return `user already exists`;
    } else if (errors.email) {
      return `not a valid email address`;
    } else if (errors.passwordsDiffer) {
      return `passwords are not the same`;
    }
  }

  onSubmit() {
    this.authService
      .register(
        this.user.value.firstName,
        this.user.value.familyName,
        this.user.value.dateOfBirth,
        this.user.value.tennisVlaanderenScore,
        this.user.value.password,
        this.user.value.passwordConfirmation,
        this.user.value.phone,
        this.user.value.email,
        this.user.value.gender
      )
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/recipe/list']);
            }
          } else {
            this.errorMsg = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMsg = `Error while trying to login user ${
              this.user.value.email
            }: ${err.error.message}`;
          } else {
            this.errorMsg = `Error ${err.status} while trying to login user ${
              this.user.value.email
            }: ${err.error}`;
          }
        }
      );
  }
}
