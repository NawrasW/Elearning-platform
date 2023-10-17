import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core'
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private alert: AlertService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isLogged())
      return true;
    else {
      this.alert.error('Please login first....!')
      this.router.navigate(['user/login'])
      return false;
    }
     
  }

};
