import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../course/course.service';
import { Course } from '../../course/course';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


  departmentId: number;
  courses: Course[] = new Array<Course>();

  constructor(private route: ActivatedRoute, private service: CourseService, private alert: AlertService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.departmentId = params['departmentId'];
      this.getData();
    });
        
    }


  edit(course: Course) {

  }
  view(course: Course) {

  }

  delete(course: Course) {
    this.service.deleteCourse(course.id).subscribe(result => {

      if (result) {
        this.alert.success(result.statusmessage);
        this.getData();
      }
    })
  }

    getData(){
      if (this.departmentId) {

        this.service.getCoursesByDepartmentId(this.departmentId).subscribe(result => {
          this.courses = result;
          console.log(this.courses)
        });
      }
      else {
        this.service.getAllCourse().subscribe(result => {
          this.courses = result;
          console.log(result);
        })
      }

    
  }
}
