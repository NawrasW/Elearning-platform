import { TeacherDto } from "./teacherDto";
import { GetCourseDto } from "./course";

export class SectionForAddUpdate {
  id: number;
  name: string;
  courseId: number;
  teacherId: number;
  totalHours: number;
  lecturesPerWeek: number;
  timeFrom: number;
  timeto:number;


}


export class SectionData {
  id: number;
  name: string;
  totalHours: number;
  lecturesPerWeek: number;
  timeFrom: number;
  timeto: number;
  teacher: TeacherDto;
  course: GetCourseDto;

}


