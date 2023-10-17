import { Component, OnInit } from '@angular/core';
import { SectionForAddUpdate } from '../../models/section';
import { SectionService } from '../section.service';
import { DepartmentLookupDto } from '../../templete/services/department';
import { ServiceService } from '../../templete/services/service.service';
import { GetCourseDto } from '../../models/course';
import { CourseService } from '../../course/course.service';
import { Course } from '../../course/course';
import { UserService } from '../../user/user.service';
import { TeacherDto } from '../../models/teacherDto';
import { AlertService } from '../../alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})


export class SectionAddComponent implements OnInit {
  constructor(private service: SectionService, private departmentservice: ServiceService, private courseservice: CourseService
    , private teamservice: UserService, private alert: AlertService, private router: Router) { }
  ngOnInit(): void {
    this.getDepartment();
    this.getTeam();
  }
  section: SectionForAddUpdate = new SectionForAddUpdate();
  departmentId: number;
  courseId: number;
  teacherId: number;
  departments: DepartmentLookupDto[] = new Array<DepartmentLookupDto>();
  courses: Course[] = new Array<Course>();
  teams: TeacherDto[];


  getDepartment() {
    this.departmentservice.getAllDepartmentLookup().subscribe(departments => this.departments = departments);
  }

  departmentChange(departmentId: number) {
    this.courseservice.getCoursesByDepartmentId(departmentId).subscribe(result => {
      if (result.length) {

        this.courses = result;
      }
      else {
        this.courses = Array<Course>();
        this.section.courseId = null;
        this.alert.error('you should add a course before adding a section!')
      }
    })
  }
  getTeam() {
    this.teamservice.getTeam().subscribe(result => {
      this.teams = result;
    })
  }


  save(form:any) {
    if (form.valid) {
      this.service.addSection(this.section).subscribe(result => {
        this.alert.success(result.statusmessage);
        this.router.navigateByUrl('/sections');
      })
    }
    else {
      this.alert.error('please fill the required fields...');
    }
  }
}
