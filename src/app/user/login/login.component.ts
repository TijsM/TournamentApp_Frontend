import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private popUp: MatSnackBar
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });


    let hasJustRegistred: string = localStorage.getItem("hasJustRegistred");
    localStorage.removeItem("hasJustRegistred");

    if(hasJustRegistred === "true"){
      this.popUp.open("U ben geregistreerd, u kan zich aanmelden", "x", {
        duration: 6000
      })
    }
  }

  onSubmit() {
    this.authService
      .login(this.user.value.email, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.router.navigate(['/ranking']);
            }
          }
        },
        (err: HttpErrorResponse) => {
          this.popUp.open(
            'De combinatie van het opgegeven mail adres en het paswoord werd niet gevonden',
            'x',
            {
              duration: 6000
            }
          );
        }
      );
  }

  getErrorMessage(errors: any) {
    if (!errors) {
      return null;
    }

    else if (errors.required) {
      return 'Dit moet moet ingevuld worden';
    }

    else if (errors.email){
      return 'Geen geldige email'
    }
  }
}
