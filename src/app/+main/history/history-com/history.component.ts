import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GlobalService } from '../../global.service';
import { imgsHistoryService } from '../imgs_history.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  images: SelectItem[];
  allImages: SelectItem[];
  maxHeight: number;
  createdDate: Date;
  uploadDate: Date;
  users: SelectItem[];
  selectedUser: number;
  sortTo: number;
  constructor(private _globalservice: GlobalService, private _imgsHistory: imgsHistoryService, private _userService: UserService, private router: Router) {

  }
  ngOnDestroy(){
    document.body.className="";
  }
  ngOnInit() {
    document.body.classList.add('bg_global');
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalservice.myUser == null)
      this.router.navigateByUrl("");
    this._userService.getUserByEmailAndPassword(this._globalservice.myUser.email_address, this._globalservice.myUser.password, this._globalservice.appliance_identifier).subscribe(
      (data: User) => {
        this._globalservice.myUser = data;
      });
    this.sortTo = -1;
    this.showAll();
    this.users = [];
    this._imgsHistory.getAllUsers().subscribe(
      (res: User[]) => {
        if (res != null) {
          console.log(res);
          res.forEach(element => {
            debugger;
            var i = 0;
            var f = false;
            for (; i < this.users.length; i++) {
              if (this.users[i].label == element.email_address) {
                this.users[i].value += "," + element.user_id;
                f = true
                break;
              }
            }
            if (!f) {
              this.users.push({ label: element.email_address, value: element.user_id });
            }
          });
          console.log("users", this.users);
        }
      },
      (err) => { }
    );
  }

  showAll() {
    this.selectedUser = -1;
    this.sortTo = -1;
    this.uploadDate = null;
    this.loadListImages();
  }

  loadListImages() {
    this.images = [];
    if (this._globalservice.myUser.imgs_history != null) {
      this._globalservice.myUser.imgs_history.forEach(element => {
        this.images.push({ label: "/UserImages/" + this._globalservice.myUser.user_id + "/public/" + element.imgs_history_id + "." + element.img_name_extention, value: element.upload_date });
      });
    }
    console.log(this.images);
  }
  max() {
    ///פונקציה לחישוב גובה התמונה המקסימאלי
    return '500px';
  }

  // sortByCreatedDate(event) {
  //   debugger;
  // }

  sortByUploadDate() {
    this.images = []
    this._globalservice.myUser.imgs_history.forEach(element => {
      var d = new Date(element.upload_date.toString().split('T')[0])
      if (d > this.uploadDate) {
        this.images.push({ label: "/UserImages/" + this._globalservice.myUser.user_id + "/public/" + element.imgs_history_id + "." + element.img_name_extention, value: element.upload_date });
        console.log(element)
      }
      else {
        console.log("big")
      }
    });
  }
  sortByUser() {
    console.log("before")
    console.log("selectedUser", this.selectedUser);
    console.log("sortTo", this.sortTo);
    if (this.selectedUser == this.sortTo || this.selectedUser == -1 && this.sortTo == -1) {
      return;
    }
    this.sortTo = this.selectedUser;
    console.log(this.sortTo)
    this.images = []
    var flag = true;
    this._globalservice.myUser.imgs_history.forEach(element => {
      element.user_in_img.forEach(element1 => {
        if (flag) {
          if (this.sortTo.toString().includes(element1.user_id.toString())) {
            this.images.push({ label: "/UserImages/" + this._globalservice.myUser.user_id + "/public/" + element.imgs_history_id + "." + element.img_name_extention, value: element.upload_date });
            console.log(element);
            flag = false;
          }
        }
      });
      flag = true;
    });
  }
}
