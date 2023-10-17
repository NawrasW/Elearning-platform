import { Component } from '@angular/core';
import { ServiceService } from './service.service';
import { Department } from './department';
import { Router } from '@angular/router';
import { AlertService } from '../../alert.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  departments: Array<Department> = new Array<Department>();
  role: string;
  constructor(private service: ServiceService, private router: Router, private alert: AlertService, private auth: AuthService) { }


  ngOnInit(): void {
    this.getData();
    let userlogin = this.auth.decodedToken();
    this.role = userlogin.role;
  }

  edit(department: Department) {
    if (department)
      this.router.navigateByUrl(`department-edit/${department.id}`);

  }

  view(department: Department) {
    if (department)
      this.router.navigateByUrl(`department-view/${department.id}`);
  }

  delete(department: Department) {
    if (department)
      this.service.delete(department.id).subscribe(
        result => {
          if (result) {
            this.alert.success(result.statusmessage);
            this.getData();
          }
          else
            this.alert.error('Error deleting');
        }
      );
  }


getData(){

  this.service.getAll().subscribe(result => {

    console.log(result);
    this.departments = result;
  });

}
}
