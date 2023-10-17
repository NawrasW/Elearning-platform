import { Component, EventEmitter, Input, Output } from '@angular/core';
import { myObject } from '../parent/parent.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() childName!: string;
  @Input() childMark!: string;
  @Input() childObject: myObject = new myObject();
  @Input() childObjForm: myObject = new myObject();
  @Input() childListArray: Array<myObject> = new Array<myObject>();
  @Output() updateEvent = new EventEmitter<string>();
  childList: Array<myObject> = new Array<myObject>();

  updateData(obj: myObject) {

    this.childList.push(obj);
    return `name is ${obj.name} and mark is ${obj.mark}`;
  }
}
