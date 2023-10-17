import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
//import { LoginComponent } from './user/login/login.component';
//import { RegistrationComponent } from './user/registration/registration.component';

//import { ListUserComponent } from './user/list-user/list-user.component';
//import { CourseComponent } from './course/course.component';
import { ParentComponent } from './sharing-data/parent/parent.component';
import { ChildComponent } from './sharing-data/child/child.component';
import { HeaderComponent } from './templete/header/header.component';
import { HeroComponent } from './templete/hero/hero.component';
import { ClientsComponent } from './templete/clients/clients.component';
import { AboutComponent } from './templete/about/about.component';
import { WhyusComponent } from './templete/whyus/whyus.component';
import { SkillsComponent } from './templete/skills/skills.component';
import { CtaComponent } from './templete/cta/cta.component';
import { ServicesComponent } from './templete/services/services.component';
import { PortofolioComponent } from './templete/portofolio/portofolio.component';
import { TeamComponent } from './templete/team/team.component';
import { PricingComponent } from './templete/pricing/pricing.component';
import { FaqComponent } from './templete/faq/faq.component';
import { ContactComponent } from './templete/contact/contact.component';
import { FooterComponent } from './templete/footer/footer.component';
import { DepartmentAddComponent } from './templete/services/department-add/department-add.component';
import { PageModeEnum } from './constans/enums';
import { CourseComponent } from './templete/course/course.component';
import { CourseManagmentComponent } from './templete/course/course-managment/course-managment.component';
import { SectionComponent } from './section/section.component';
import { SectionManagmentComponent } from './section/section-managment/section-managment.component';
import { SectionAddComponent } from './section/section-add/section-add.component';
import { AuthGuard } from './guards/auth.guard';

const routers: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' }, // Redirect to /binding by default
  { path: 'home', component: AboutComponent, canActivate: [AuthGuard] },
  { path: 'binding', component: BindingComponent },
  //{ path: 'user-add', component: RegistrationComponent },
  //{ path: 'user-update/:id', component: RegistrationComponent },
  //{ path: 'list-user', component: ListUserComponent },
  /* { path: 'list-course', component: CourseComponent },*/
  /*  { path: 'login', component: LoginComponent },*/

  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },



  { path: 'sharing-data', component: ParentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortofolioComponent },
  { path: 'team', component: TeamComponent },
  { path: 'contact', component: ContactComponent },

  { path: 'services', component: ServicesComponent, canActivate: [AuthGuard] },


  { path: 'department-add', component: DepartmentAddComponent, data: { pageMode: PageModeEnum.Add } },
  { path: 'department-edit/:id', component: DepartmentAddComponent, data: { pageMode: PageModeEnum.Update } },
  { path: 'department-view/:id', component: DepartmentAddComponent, data: { pageMode: PageModeEnum.View } },

  { path: 'courses', component: CourseComponent },
  { path: 'courses/:departmentId', component: CourseComponent },
  { path: 'course/add', component: CourseManagmentComponent, data: { pageMode: PageModeEnum.Add } },
  { path: 'courses/edit/:id', component: CourseManagmentComponent, data: { pageMode: PageModeEnum.Update } },
  { path: 'courses/view/:id', component: CourseManagmentComponent, data: { pageMode: PageModeEnum.View } },

  //causes errors
/*  { path: 'course', loadChildren: () => import('./templete/course/course.module').then(m => m.CourseModule) },*/


//important to put the add route before id or for another method,change the route name for section add maybe to section-dd
  { path: 'section/add', component: SectionAddComponent, data: { pageMode: PageModeEnum.Add } },
  { path: 'section/:courseId', component: SectionComponent },
  { path: 'sections', component: SectionComponent },
  { path: 'section-managment', component: SectionManagmentComponent },

];


@NgModule({
 
  imports: [
    RouterModule.forRoot(routers)
  ],
  exports: [RouterModule],
 
})








export class AppRoutingModule { }
