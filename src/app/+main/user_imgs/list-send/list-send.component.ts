import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-list-send',
  templateUrl: './list-send.component.html',
  styleUrls: ['./list-send.component.css']
})
export class ListSendComponent implements OnInit {


  ngOnInit() {
    document.body.classList.add('bg_global');
  }
  @Input()
  emails:User[];
  selectedEmails: User[];
  @Output()
  selectEvent = new EventEmitter();
  constructor() {
    //this.emails = [];
    console.log("list to msend");
    console.log(this.emails);
  }
  invokeEvent(){
    debugger;
    this.selectEvent.emit(this.selectedEmails);
  }
}
