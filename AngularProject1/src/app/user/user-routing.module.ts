import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';

const routes: Routes =
  [
  { path: 'user-add', component: RegistrationComponent },
  { path: 'user-update/:id', component: RegistrationComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'login', component: LoginComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserRoutingModule { }
