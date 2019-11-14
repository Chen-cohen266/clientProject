import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserImgsService } from '../user_imgs.service';
import { User_imgs } from '../user_imgs.model';
import { GlobalService } from '../../global.service';
import { disableBindings } from '@angular/core/src/render3';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-upload-image',
  templateUrl: './user_imgs-upload-image.component.html',
  styleUrls: ['./user_imgs-upload-image.component.css'],
  providers: [MessageService]
})
export class UploadImageComponent implements OnInit {
  status: string;
  image: User_imgs;
  isWorking:boolean=false;
  emails;
  @Output()
  upload = new EventEmitter();
  userSelected: User[];
  file: File;
  publicImagePath: string;
  imgsHistoryId: number;
  uploadedFiles: any[] = [];
  imagePath = null;
  imgURL: any;
  message: string;
  dirty: boolean;
  blockedDocument: boolean = false;
  constructor(private router: Router, private _Activatedroute: ActivatedRoute, private _userImgs: UserImgsService, private _globalService: GlobalService, private messageService: MessageService) {
    this.dirty = false;
  }

  ngOnInit() {
    document.body.classList.add('bg_global');
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalService.myUser == null)
      this.router.navigateByUrl("");
    this.emails = [];
    if ((this._Activatedroute.snapshot.routeConfig.path).includes("addImage")) {
      this.status = "addImage";
      this.imgURL = "assets/images/defaultPrivatePic.JPG";
    }
    else if ((this._Activatedroute.snapshot.routeConfig.path).includes("uploadImage")) {
      this.status = "uploadImage";
      this.imgURL = "assets/images/defaultPic.JPG";
    }
  }

  preview(files) {
    console.log(files)
    this.file = files[0];
    this.dirty = true;
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      this.imgURL = "";
      return;
    }
    else {
      this.message = "";
    }
    var reader = new FileReader();
    this.imagePath = files;
    console.log(this.imagePath)
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
    this.upload.emit(this.file)
  }

  req() {
    if (this.imgURL == null && this.dirty)
      return true;
    return false;
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      console.log(file);
    }
  }
  addUserPrivateImage() {
    // const file: File = files[0];
    const reader = new FileReader();
    this.image = new User_imgs(this._globalService.myUser.user_id, this.file);
    reader.addEventListener('load', (event: any) => {
      this._userImgs.uploadPrivateImage(this.image, null).subscribe(
        (res) => {
          debugger;
          if (res != null) {
            this.isWorking=false;
            this.blockedDocument=false;
            this.messageService.add({ severity: 'success', summary: 'Success message', detail: 'Your image added successfully!!!' });
          }
          else
            this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
        });
      event.preventDefault();
    });
    reader.readAsDataURL(this.file);
    // if (this.file) {

    // }
  }

  addUserPublicImage() {
    debugger;
    // const file: File = files[0];
    const reader = new FileReader();
    // this.image=new User_imgs(this._globalService.myUser.user_id,this.file);
    //יצירת אוביקט להסטוריה
    var numRotate = 1;
    if (!this._globalService.myUser.configuration[0].performance)
      numRotate = 4;
    reader.addEventListener('load', (event: any) => {
      this._userImgs.uploadPublicImage(this._globalService.myUser.user_id, this.file, numRotate).subscribe(
        (res) => {
          debugger;
          if (res != null) {
            this.isWorking=false;
            this.blockedDocument=false;
            this.publicImagePath = res.path;
            this.imgsHistoryId = res.imgsHistoryId;
            if (this._globalService.myUser.configuration[0].reliability == true) {
              debugger;
              this.emails = [];
              for (var i = 0; i < res.users.length; i++) {
                this.emails.push(res.users[i]);
              }
              this.showInfo();
            } else {
              debugger;
              this.userSelected = res.users;
              this.onSendEmail();
            }
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
          }
        },
        (err) => {
          debugger;
          this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
        });

    });
    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

  submit() {
    this.isWorking=true;
    this.blockedDocument=true;
    if (this.status == 'addImage')
      this.addUserPrivateImage();
    else if (this.status == 'uploadImage')
      this.addUserPublicImage();
  }
  showInfo() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'info', summary: 'Email-list that recognized in your picture', detail: 'Choose to send!' });
  }
  onSendEmail() {
    this.messageService.clear('c');
    ///send email  //קריאה לשליחה
    debugger;
    console.log(this.userSelected);
    this._userImgs.sendEmail(this.userSelected, this.publicImagePath, this.imgsHistoryId).subscribe(
      (res) => {
        this._userImgs.addUserInImg(this.userSelected, this.publicImagePath, this.imgsHistoryId).subscribe(
          (res) => {
            this.messageService.add({ severity: 'success', summary: 'Success message', detail: 'Your image send successfully!!!' });
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
            return;
          });
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
      });
  }
  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
  choseUserList(userList: User[]) {
    debugger;
    this.userSelected = userList;
  }
}
