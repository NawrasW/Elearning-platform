import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent {
  title: string = "Parent Component";
  parentName: string='***';
  parentMark: string='***';

  parentObj: myObject = new myObject();
  parentObjForm: myObject = new myObject();
  parentListArray: Array<myObject> = new Array<myObject>();
  response!: string ;

  @ViewChild(ChildComponent) viewData!: ChildComponent;

  getData(name: string,mark:string) {
    this.parentName = name;
    this.parentMark = mark;
    this.parentObj = { "name": name, "mark": mark };

    //this.parentListArray.push(this.parentObj);

    this.response = this.viewData.updateData(this.parentObj);

  }
  updateTitle(newTitle: string) {
    this.title = newTitle;
  }
}


export class myObject {

  name: string = '***';
  mark: string = '***';
}
