import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from './course';
import { Router } from '@angular/router';
import { CourseService } from './course.service';
import { PageModeEnum } from '../constans/enums';
import * as alertifyjs from 'alertifyjs';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  constructor(private courseservice: CourseService, private router: Router) { } 
    ngOnInit(): void {



    }

  course: Course = new Course();
  courses: Course[] = new Array<Course>();
  pageMode: PageModeEnum = PageModeEnum.Add
  @ViewChild('closeButton') closeButton: any;
  @ViewChild('openModalButton') openModalButton: any;


  getData() {

    this.courseservice.getAllCourse().subscribe(result => {

      this.courses = result;
    });

  }


  reset() {

    this.course = new Course();
    this.pageMode = PageModeEnum.Add;
  }

  edit(course: Course) {

    this.course = course;
    this.pageMode = PageModeEnum.Update;
    this.openModalButton.nativeElement.click();
  }


  view(course: Course) {

    this.course = course;
    this.pageMode = PageModeEnum.View;
    this.openModalButton.nativeElement.click();
  }

  delete(course: Course) {

    if (course.id) {
      this.courseservice.deleteCourse(course.id).subscribe(result => {
        this.getData();
        alertifyjs.success('Deleted Successfully');
      });
    }
  }



  get PageModeEnum(): any {

    return PageModeEnum;
  }

  save() {
    if (this.course.id) {
      this.courseservice.updateCourse(this.course).subscribe(result => {

        if (result) {
          alertifyjs.success(result.statusmessage);
          this.getData();
          this.closeButton.nativeElement.click();

        }
      });
    }

    else {

      this.courseservice.addCourse(this.course).subscribe(result => {
        if (result) {
          alertifyjs.success(result.statusmessage);
          this.getData();
          this.closeButton.nativeElement.click();

        }
      });


    }
  }
}
