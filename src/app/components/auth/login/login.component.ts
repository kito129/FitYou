import { Component, OnInit } from '@angular/core';
import {AuthProvider} from 'ngx-auth-firebaseui';
import UserMetadata = firebase.auth.UserMetadata;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  providers = AuthProvider;


  printUser(event) {
    console.log(event);

  }

  printError(event) {
    console.error(event);
  }

}
