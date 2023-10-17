import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import * as alertifyjs from 'alertifyjs';
import { AuthService } from '../../auth.service';
import { AlertService } from '../../alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _authservice: AuthService, private alert: AlertService, private router: Router) { }
  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);

    this._authservice.authUser(loginForm.value).subscribe(result => {
      if (result) {
     /*   localStorage.setItem('id', result.id.toString());*/
        //localStorage.setItem('fullName', `${result.firstName} ${result.lastName}`);
        //localStorage.setItem('userName', result.userName);
        this._authservice.storeId(result.id);
        this._authservice.storeToken(result.token);
     
        this._authservice.storeFullName(`${result.firstName} ${result.lastName}`);

        this.alert.success("Login Successfully");
        this.router.navigateByUrl('/')
      }
      else
        this.alert.error("username or password is incorrect");
    });

    //if (!(this.user.password === this.user.confirmpassword)) {
    //  alertifyjs.error('invaild')
    //  console.log("invaild passowrd");



    //}

    //else {
    //  alertifyjs.success('valid');
    //  console.log("valid")
    //}
  }
}
