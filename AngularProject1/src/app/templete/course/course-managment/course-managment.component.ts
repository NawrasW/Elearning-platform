import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { PageModeEnum } from '../../../constans/enums';
import { CourseService } from '../../../course/course.service';
import { Course } from '../../../course/course';
import { Department, DepartmentLookupDto } from '../../services/department';
import { AlertService } from '../../../alert.service';

@Component({
  selector: 'app-course-managment',
  templateUrl: './course-managment.component.html',
  styleUrls: ['./course-managment.component.css']
})
export class CourseManagmentComponent implements OnInit {
  course: Course = new Course();
  courseId: number;
  pageMode: PageModeEnum;
  
  departments: DepartmentLookupDto[] = new Array<DepartmentLookupDto>();
  constructor(private router: Router, private service: CourseService, private alert: AlertService, private route: ActivatedRoute
    , private departmentservice: ServiceService) { }



    ngOnInit(): void {
      this.handleRouteData();
      this.getDepartment();
      console.log('Viewing Course ID:', this.courseId); // Add this line
      console.log('course:', this.course);
      console.log('pageMode:', this.pageMode);
  }

  get PageModeEnum(): any {
    return PageModeEnum;
  }



  handleRouteData() {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      if (this.courseId) {  //edit or view
        this.service.getCourseById(this.courseId).subscribe(result => { this.course = result; console.log(this.course) });

      }
    });

      this.route.data.subscribe(data => {
        this.pageMode = data['pageMode'];
      });
    
  }

  save() {
    if (this.courseId) {

    this.service.updateCourse(this.course).subscribe(result => {
      if (result) {
        this.alert.success(result.statusmessage);

        this.router.navigateByUrl('/services');
      }
    });
  }
  else{
  this.service.addCourse(this.course).subscribe(result => { 

     if (result) {
    this.alert.success(result.statusmessage);

    this.router.navigateByUrl('/services');
  }
  });

}
}
  getDepartment() {
    this.departmentservice.getAllDepartmentLookup().subscribe(departments => this.departments = departments);
  }
}
