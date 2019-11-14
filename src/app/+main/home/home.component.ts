import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Configure } from '../user/configure/user-configure.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _globalService:GlobalService,private router:Router) { 
    console.log(_globalService.myUser)
  }

  ngOnInit() {
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalService.myUser == null)
      this.router.navigateByUrl("");
    document.body.classList.add('bg_home');
  }
  // ngOnDestroy(){
  //   document.body.className="";
  // }
}
