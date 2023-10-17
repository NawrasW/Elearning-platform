import { Component, Input, OnInit } from '@angular/core';
import { SectionData, SectionForAddUpdate } from '../../models/section';
import { TeacherDto } from '../../models/teacherDto';
import { SectionService } from '../section.service';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-section-managment',
  templateUrl: './section-managment.component.html',
  styleUrls: ['./section-managment.component.css']
})
export class SectionManagmentComponent implements OnInit {
  @Input() sectionId: number;
  canEdit: boolean = false;
  constructor(private service: SectionService, private alert: AlertService) { }
  ngOnInit(): void {
    if (this.sectionId) {

      this.service.getSectionById(this.sectionId).subscribe(result => {
        this.section = result;
      }
      )
    }
  }
  section: SectionData

  getFullName(teacher: TeacherDto) {
    return `${teacher.firstName} ${teacher.lastName}`
  }

  allwEdit() {

    this.canEdit = true;
  }
  save() {
    let sectionEdit = new SectionForAddUpdate();
    Object.assign(sectionEdit, this.section);
    sectionEdit.courseId = this.section.course.id;
    sectionEdit.teacherId = this.section.teacher.id;

    this.service.updateSection(sectionEdit).subscribe(result => {
      this.canEdit = false;
      this.alert.success("Saved Succesfully")
    })
  }
}
