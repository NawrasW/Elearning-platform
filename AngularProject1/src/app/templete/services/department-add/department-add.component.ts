import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../department';
import { ServiceService } from '../service.service';
import * as alertifyjs from 'alertifyjs';
import { PageModeEnum } from '../../../constans/enums';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  department: Department = new Department();
  icons: string[] = ['fa fa-address-book', 'fa fa-edit', 'fa fa-eye', 'fa fa-user-plus', 'fa fa-server', 'fa fa-user-circle'];
  departmentId: number;
  pageMode: PageModeEnum;



  constructor(private router: Router, private service: ServiceService, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.handleRouteData();

  }

  get PageModeEnum(): any {
    return PageModeEnum ;
  }
  save() {

      this.service.addUpdate(this.department).subscribe(result => {
      
        alertifyjs.success(result.statusmessage);
      
      this.router.navigateByUrl('/services');

     
     
      
    });
  }

  handleRouteData() {
    this.route.params.subscribe(params => {
      this.departmentId = params['id'];
      if (this.departmentId) //edit or view
        this.service.getById(this.departmentId).subscribe(result => { this.department = result; })
     
    });

    this.route.data.subscribe(data => {
      this.pageMode = data['pageMode'];
    });
  }

 
}
