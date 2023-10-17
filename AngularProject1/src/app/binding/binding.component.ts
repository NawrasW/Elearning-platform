import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';
import * as alertifyjs from 'alertifyjs';


@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent {
  user: User = new User();

  onSubmit(form: NgForm) {
    console.log(form, this.user);
    if (!(this.user.password === this.user.confirmpassword))
    {
      alertifyjs.error('invaild')
      console.log("invaild passowrd");
      


    }

    else {
      alertifyjs.success('valid');
      console.log("valid")
         }
  }
}

