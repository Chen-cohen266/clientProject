import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterLink, Router } from '@angular/router';
import { GlobalService } from '../global.service';
import { style } from '@angular/animations';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,private _globalservice:GlobalService) { }
  items: MenuItem[];
  ngOnInit() {
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalservice.myUser == null)
      this.router.navigateByUrl("");
    this.items = [
      {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          routerLink:'home'
      },
      {
          label: 'Configuration',
          icon: 'pi pi-fw pi-cog',
          routerLink:'configuration'
      },
      {
          label: 'Upload-image',
          icon: 'pi pi-fw pi-upload',
          routerLink:'uploadImage'
      },
      {
          label: 'User',
          icon: 'pi pi-fw pi-user',
          items:[{
              label: 'details',
              icon: 'pi pi-fw pi-list',
              routerLink:"userDetails/details/details"
          },{
              label: 'update',
              icon: 'pi pi-fw pi-replay',
              routerLink:"userDetails/update/update"
          }]
      },
      {
        label: 'Add-image',
        icon: 'pi pi-fw pi-images',
        routerLink:'addImage'
      },
      {
        label: 'History',
        icon: 'pi pi-fw pi-clone',
        routerLink:'history'
      },
      {separator:true},
      {
          label: 'Quit', 
          icon: 'pi pi-fw pi-times'
      }
  ];
  }

  ngOnDestroy(){
    document.body.className="";
  }
}
