import { Component, ViewEncapsulation } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { GlobalService } from './+main/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'photoMatic';
  constructor(private router: Router,private _globalService: GlobalService) {

  }
  ngOnInit() {
    if (this.router.url!='/' && this._globalService.myUser==null)
      this.router.navigateByUrl("");
    }
}
