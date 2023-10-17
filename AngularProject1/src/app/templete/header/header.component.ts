import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../alert.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private alert: AlertService, private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.loggedinUserIdfn();
  
    }
  loggedinUser: string;
  loggedinUserId: number;
  loggedin() {
    this.loggedinUser = this.auth.getFullName();
    this.loggedinUserId = + this.auth.getUserId();
    return this.loggedinUser && this.loggedinUserId ;
  }

  loggedinUserIdfn() {
    this.loggedinUserId = + this.auth.getUserId();
    return this.loggedinUserId;
  }

  logout() {
    //localStorage.removeItem('fullName');
    //localStorage.removeItem('userName');
    this.auth.logOut();
    this.alert.success("Logged out Successfully");
    this.router.navigateByUrl('/user/login');
  }

  //redirectToInfo() {
  //  this.loggedinUserId = +localStorage.getItem('id');
  //  if (this.loggedinUserId)
  //   this.router.navigateByUrl(`/user-update/${this.loggedinUserId}`);
  //}
}
