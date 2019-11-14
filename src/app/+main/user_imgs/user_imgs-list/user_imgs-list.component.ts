import { Component, OnInit, HostListener } from '@angular/core';
import { GlobalService } from '../../global.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user_imgs-list',
  templateUrl: './user_imgs-list.component.html',
  styleUrls: ['./user_imgs-list.component.css']
})
export class UserImgsListComponent implements OnInit {
  images: SelectItem[];
  width: Number;
  innerWidth: any;

  constructor(private _globalservice: GlobalService, private _userService: UserService,private router:Router) {
  }

  ngOnInit() {
    document.body.classList.add('bg_global');
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalservice.myUser == null)
      this.router.navigateByUrl("");
    this._userService.getUserByEmailAndPassword(this._globalservice.myUser.email_address, this._globalservice.myUser.password, this._globalservice.appliance_identifier).subscribe(
      (data: User) => {
        this._globalservice.myUser = data;
      });
    this.images = [];
    this.loadListImages();
    console.log("images", this.images);
  }

  loadListImages() {
    this._globalservice.myUser.user_imgs.forEach(element => {
      this.images.push({ label: "/UserImages/" + this._globalservice.myUser.user_id + "/private/" + element.user_imgs_id + "." + element.img_name_extention, value: element.user_imgs_id });
    });
  }
}