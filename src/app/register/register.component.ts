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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userLogin: FormGroup;

  constructor(
    private ulfb: FormBuilder,
    private _tournamentDataService: TournamentDataService
  ) {}

  ngOnInit() {
    this.userLogin = this.ulfb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]),
      wachtwoord: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  }

  login() {
    this._tournamentDataService
      .login(this.userLogin.value.email, this.userLogin.value.wachtwoord)
      .pipe(first())
      .subscribe(data => {
        location.reload();
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
}
