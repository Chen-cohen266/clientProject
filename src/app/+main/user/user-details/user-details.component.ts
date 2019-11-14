import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, EmailOrWhatApp } from '../user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/components/common/api';
import { User_imgs } from '../../user_imgs/user_imgs.model';
import { UserService } from '../user.service';
import { GlobalService } from '../../global.service';
import { Configure } from '../configure/user-configure.model';
import { UserImgsService } from '../../user_imgs/user_imgs.service';


@Component({
  selector: 'app-user',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  user: User;
  user_img: User_imgs;
  configure: Configure;
  userForm: FormGroup;
  isDisable: string;
  whatAppFlag: boolean;
  typePass: string;
  blockedDocument: boolean = false;
  status: string;
  file: File;

  //ngModels
  firstNameValue: string;
  lastNameValue: string;
  emailValue: string;
  whatsAppValue: string;
  passwordValue: string;

  constructor(private router: Router, private messageService: MessageService, private _Activatedroute: ActivatedRoute, private _userService: UserService, private _globalService: GlobalService, private _userImgs: UserImgsService) {
    this.isDisable = "disabled";
    this.whatAppFlag = false;
    this.typePass = "password";
    this.status = this._Activatedroute.snapshot.params['status'];
  }
  ngOnInit() {
    document.body.classList.add('bg_global');
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalService.myUser == null)
      this.router.navigateByUrl("");
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]),
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      whatsApp: new FormControl('', [Validators.pattern(/(?:[0-9] ?){6,14}[0-9]$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
    if (this.status != 'newUser') {
      this.loadDetails();
    }
    
  }
  ngOnDestroy(){
    document.body.className="";
  }
  loadDetails() {
    this.firstNameValue = this._globalService.myUser.first_name;
    this.lastNameValue = this._globalService.myUser.last_name;
    this.emailValue = this._globalService.myUser.email_address;
    this.whatsAppValue = this._globalService.myUser.whatsApp;
    this.passwordValue = this._globalService.myUser.password;
    var options = document.getElementsByName("options");
    options[this._globalService.myUser.email_or_whatsApp].setAttribute("checked", "checked");
    if (this._globalService.myUser.email_or_whatsApp != 0)
      this.whatAppFlag = true;
    this.userForm.controls.password.setValidators([]);
    this.userForm.controls.confirmPassword.setValidators([]);
  }
  changeType() {
    if (this.typePass == "text") {
      this.typePass = "password";
      return;
    }
    if (this.typePass == "password")
      this.typePass = "text";
  }
  checkPassword() {
    if (this.userForm.controls.password.value != "")
      this.isDisable = "";
  }
  matchingConfirmPasswords() {
    if (this.userForm.controls.password.value != this.userForm.controls.confirmPassword.value)
      return true;
    return false;
  }
  checkedWhatsApp() {
    this.whatAppFlag = true;
    this.userForm.controls.whatsApp.setValidators([Validators.required, Validators.pattern(/(?:[0-9] ?){6,14}[0-9]$/)])
  }
  checkedAnother() {
    this.whatAppFlag = false;
    this.userForm.controls.whatsApp.setValidators([Validators.pattern(/(?:[0-9] ?){6,14}[0-9]$/)])
  }


  addUser() {
    const reader = new FileReader();
    this._userService.addUser(this.user).subscribe(
      (data: User) => {
        if (data != null) {
          this._globalService.myUser = data;
          console.log("user", this._globalService.myUser);
          //הוספת תמונה ל-user
          let image = new User_imgs(this._globalService.myUser.user_id, this.file);
          const reader = new FileReader();
          reader.addEventListener('load', (event: any) => {
            event.preventDefault();
            this._userImgs.uploadPrivateImage(image, this._globalService.myUser.email_address).subscribe(
              (res) => {
                debugger;
                if (res != null) {
                  console.log(res);
                  this._globalService.myUser.user_imgs = [];
                  this._globalService.myUser.user_imgs[0] = res;
                  this.messageService.add({ severity: 'success', summary: 'Add user successfully', detail: 'Congratulations on joining the system.\nNow you can send and receive photos automatically' });
                  setTimeout(() => { this.router.navigateByUrl("/home"); }, 4000);
                  // this._userService.getUserByEmailAndPassword(this._globalService.myUser.email_address, this._globalService.myUser.password, this._globalService.appliance_identifier).subscribe(
                  //   (data: User) => {
                  //     this._globalService.myUser = data;
                  //   });
                }
                else {
                  this._userService.deleteConfigure(this._globalService.myUser.configuration[0].configuration_id).subscribe(
                    (res) => {
                      this._userService.deleteUser(this._globalService.myUser.user_id).subscribe(
                        (res) => {
                          this.messageService.add({ severity: 'error', summary: 'Add user failed', detail: 'Image not valid, try again' });
                          this.blockedDocument = false;
                        });
                    });
                }
              },
              (err) => {
                //מחיקת משתמש
                this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Action failed, try again' });
                this.blockedDocument = false;
              });
          });
          reader.readAsDataURL(this.file);
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Add user failed', detail: 'User already exist, try again' });
          this.blockedDocument = false;
        }
      });
  }
  updateUser() {
    this.user.user_id = this._globalService.myUser.user_id;
    this._userService.updateUser(this.user.user_id, this.user).subscribe(
      (data: User) => {
        this._globalService.myUser = data;
        this.messageService.add({ severity: 'success', summary: 'Update user successfully', detail: 'Your details were saved successfuly' });
        this.blockedDocument = false;
      },
      (err) => {
        this.messageService.add({ severity: 'error', summary: 'Update user failed', detail: 'Your details were not saved!, try again' });
        this.blockedDocument = false;
      });

  }
  submit() {
    if (this.userForm.valid) {
      if (this.file == null && this.status == 'newUser') {
        this.messageService.add({ severity: 'error', summary: 'Add user failed', detail: 'You must attach a picture!' });
        return;
      }
      this.blockedDocument = true;
      this.configure = new Configure(0, this._globalService.appliance_identifier);
      this.user = new User(this.lastNameValue, this.firstNameValue, document.getElementsByName("options"), this.emailValue, this.whatsAppValue, this.passwordValue, this.configure);
      if (this.status == 'newUser') {
        this.addUser();
      }
      else if (this.status == 'update')
        this.updateUser();
    }
    else {
      Object.keys(this.userForm.controls).forEach(key => {
        if (!this.userForm.get(key).dirty)
          this.userForm.get(key).markAsDirty();
      });
    }
  }
  showImageList() {
    this.router.navigateByUrl("home/imagesList");
  }
  showConfirm() {
    this.messageService.clear();
    this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
  }

  onConfirm() {
    this.messageService.clear('c');
    this.submit();
  }

  onReject() {
    this.messageService.clear('c');
  }

  clear() {
    this.messageService.clear();
  }
  addImg(image: File) {
    this.file = image;
  }
}