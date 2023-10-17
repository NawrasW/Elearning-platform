import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import * as alertifyjs from 'alertifyjs';
import { Router } from '@angular/router';
import { PageModeEnum } from '../../constans/enums';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor(private userservice: UserService, private router: Router) { }
  users: User[] = new Array<User>();

  isPopupParent: boolean = true;
  isValid: boolean = false;
  user: User = new User();
  pageMode: PageModeEnum = PageModeEnum.Add;
  @ViewChild('closeButton') closeButton: any;
  @ViewChild('openModalButton') openModalButton: any;
  ngOnInit(): void {

    this.getAllUsers();
  }


  delete(user: User) {
    if (user.id) {
      this.userservice.deleteUser(user.id).subscribe(result => {
        this.getAllUsers();
        alertifyjs.success('Deleted Successfully');
      });
    }
  }

  getAllUsers() {
    this.userservice.getAllUser().subscribe(result => {

      this.users = result;
      console.log(this.users)

    });

  }
  goToUpdateUser(user: User) {
    if (user.id)
    this.router.navigateByUrl(`user/user-update/${user.id}`);
  }

  reset() {
    this.user = new User();
    this.pageMode = PageModeEnum.Add;
  }

  save() {
    if (this.isValid) {
      if (!(this.user.password === this.user.confirmpassword))
        alertifyjs.error("In valid password != confirmpassword")

      else
        this.userservice.addUpdateUser(this.user).subscribe(result => {

          alertifyjs.success(result.statusmessage);
          this.closeButton.nativeElement.click();
          this.getAllUsers();

        });
    }
    else {
      alertifyjs.error("In valid form")
    }
  }
  edit(user: User) {
    
    
    this.openModalButton.nativeElement.click();
    this.user = user;
    this.user.confirmpassword = this.user.password;
    this.pageMode = PageModeEnum.Update;
    console.log("Page mode set to:", this.pageMode);
  }

  add() {
    this.user = new User();
    this.pageMode = PageModeEnum.Add;
  }
  view(user: User) {
   
    this.openModalButton.nativeElement.click();
    console.log("Viewing user:", user);
    console.log("Page mode set to:", this.pageMode);
    this.user = user;
    this.user.confirmpassword = this.user.password;
    this.pageMode = PageModeEnum.View;
  }

  get PageModeEnum(): any {

    return PageModeEnum;
  }
}
