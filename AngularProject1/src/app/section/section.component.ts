import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionService } from './section.service';
import { SectionData } from '../models/section';
import { GetCourseDto } from '../models/course';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  ngOnInit(): void {

    this.service.getAllSection().subscribe(result => {

    })

  }
  courseId: number;
  sections: SectionData[] = Array<SectionData>();
  course: GetCourseDto;
  constructor(private service: SectionService, private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.courseId = params['courseId'];
      if (this.courseId)
      {
        this.service.getSectionByCourseId(this.courseId).subscribe(result => {
          this.sections = result;
          this.course = this.sections[0].course;
        })
      }
      else {
        this.service.getAllSection().subscribe(result => {
          this.sections = result;
        })
      }

    })
  }
}
