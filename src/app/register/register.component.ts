import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { TournamentDataService } from '../tournament.data.services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public userLogin: FormGroup;
  public userRegister: FormGroup;
  currentUser: User;

  public submitted = false;
  public notLoading = true;
  public loading = false;

  constructor(
    private ulfb: FormBuilder,
    private _tournamentDataService: TournamentDataService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.userLogin = this.ulfb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      wachtwoord: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });

    this.userRegister = this.ulfb.group(
      {
        firstname: ['', Validators.required],
        familyName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        tennisVlaanderenScore: ['', Validators.required],
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required, Validators.required],
        gender: ['', Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    let password = group.controls.password.value;
    let passwordConfirmation = group.controls.passwordConfirmation.value;

    return password === passwordConfirmation ? null : { notSame: true };
  }

  login() {
    console.log('entered login method in register.component.ts');

    this._tournamentDataService
      .login(
        this.userLogin.controls.email.value,
        this.userLogin.controls.wachtwoord.value
      )
      .pipe(first())
      .subscribe(data => {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (this.currentUser !== null) {
          console.log(this.currentUser);
          this._router.navigate(['/ranking']);
        } else {
          console.log('currentuser is null');
        }
      });
  }

  register() {
    console.log('entered register method in register.component.ts');
    console.log(this.userRegister.controls.email.value);

    this._tournamentDataService
      .register(
        this.userRegister.controls.firstname.value,
        this.userRegister.controls.familyName.value,
        this.userRegister.controls.data.value,
        this.userRegister.controls.tennisVlaanderenScore.value,
        this.userRegister.controls.password.value,
        this.userRegister.controls.passwordConfirmation.value,
        this.userRegister.controls.phone.value,
        this.userRegister.controls.email.value,
        this.userRegister.controls.gender.value
      )
      .pipe(first())
      .subscribe(data => {
        this._router.navigate(['/ranking']);
      });
  }

  getErrorMessage(errors: any) {
    if (errors.required) {
      return 'Dit veld is verplicht';
    } else if (errors.minlength) {
      return `Dit veld moet minstens ${errors.minlength.requiredLength} 
        karakters bevatten (nu ${errors.minlength.actualLength})`;
    } else if (errors.pattern) {
      return `Dit veld bevat geen geldig e-mailadres`;
    }
  }

  // onSubmit(){
  //   this.submitted = true;

  //   if (this.userRegister.invalid){
  //     return;
  //   }

  //   this.notLoading = false;
  //   this.loading = true;

  //   this._tournamentDataService
  //     .register(this.userRegister.value)
  //    .pipe(first())
  //    .subscribe(

  //    )
  // };
}
