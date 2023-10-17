import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { TeacherDto } from '../../models/teacherDto';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teams: TeacherDto[];
  constructor(private service: UserService) { }


  ngOnInit(): void {
    this.service.getTeam().subscribe(result => {

      console.log(result)
      this.teams = result;
    })
  }
  getFullName(team: TeacherDto) {
    return `${team.firstName} ${team.lastName}`
  }
}
