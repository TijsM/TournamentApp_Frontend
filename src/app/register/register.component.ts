import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  constructor() {
    this.name = 'testje';
  }

  ngOnInit() {}


  login(userName: HTMLInputElement, password: HTMLInputElement){
    console.log(userName.value);
    console.log(password.value);
  }

   register(
    firstName: HTMLInputElement
    //,
  //   familyname: HTMLInputElement,
  //   tennisVlaanderenRanking:HTMLInputElement,
  //   dateOfBirth:HTMLInputElement,
  //    password:HTMLInputElement,
  //   passwordConfirmation:HTMLInputElement, 
  //   phoneNumber:HTMLInputElement, 
  //   email:HTMLInputElement, 
  //   geslacht:HTMLInputElement
   )
  {
      // const user = new User(firstName.value,familyname.value,tennisVlaanderenRanking.valueAsNumber,dateOfBirth.valueAsDate,password.value,phoneNumber.value,email.value,geslacht.value);

      // console.log("nieuwe user aangemaakt");
      // console.log(user.firstName);
      // console.log(user.familyName);
      // console.log(user.tennisVlaanderenRanking);
      // console.log(user.dateOfBirth)
      // console.log(geslacht);

      console.log("not yet implemented");
    }
  
}
