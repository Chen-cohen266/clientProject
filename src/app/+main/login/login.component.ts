import { Component, OnInit } from '@angular/core';
import { HostListener } from "@angular/core";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { GlobalService } from '../global.service';
import { MessageService } from 'primeng/api';
import { config } from 'rxjs';
import { Configure } from '../user/configure/user-configure.model';
import { HttpClient } from '@angular/common/http';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  scrHeight: any;
  scrWidth: any;
  flagEmail: boolean;
  flagPassword: boolean;
  emailValue: string;
  passwordValue: string;
  // ipAddress:any;
  // msgs: Message[] = [];
  deviceInfo; isMobile; isTablet; isDesktopDevice;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;;
  }
  constructor(private router: Router, private _userService: UserService, private deviceService: DeviceDetectorService, private _globalService: GlobalService, private messageService: MessageService, private _http: HttpClient) {
    this.emailValue = "";
    this.passwordValue = "";
    this.epicFunction();
  }
  ngOnInit() {
    if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalService.myUser == null)
      this.router.navigateByUrl("");
    this.getScreenSize();
    this.flagEmail = true;
    this.flagPassword = true;
    this.emailValue = "";
    this.passwordValue = "";
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });

    document.body.classList.add('bg');
  }
  ngOnDestroy(){
    document.body.className="";
  }
  epicFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
    if (this.isMobile)
      this._globalService.appliance_identifier = "isMobile";
    else if (this.isTablet)
      this._globalService.appliance_identifier = "isTablet";
    else if (this.isDesktopDevice)
      this._globalService.appliance_identifier = "isDesktopDevice";
  }

  changeText(val) {
    if (val.value != "") {
      switch (val.id) {
        case "emailId":
          this.flagEmail = false;
          break;
        case "passwordId":
          this.flagPassword = false;
          break;
      }
    }
    else {
      switch (val.id) {
        case "emailId":
          this.flagEmail = true;
          break;
        case "passwordId":
          this.flagPassword = true;
          break;
      }
    }
  }
  submit() {
    if (this.loginForm.invalid) {
      if (this.loginForm.controls.email.invalid) {
        document.getElementById("emailId").focus();
      }
      else if (this.loginForm.controls.password.invalid) {
        document.getElementById("passwordId").focus();
      }
    }
    else {
      this._userService.getUserByEmailAndPassword(this.emailValue, this.passwordValue, this._globalService.appliance_identifier).subscribe(
        (data: User) => {
          this._globalService.myUser = data;
          //if want to enter from another device
          if (this._globalService.myUser != null) {
            if (this._globalService.myUser.configuration[0] == null) {
              debugger;
              this._userService.addConfige(new Configure(this._globalService.myUser.user_id, this._globalService.appliance_identifier)).subscribe(
                (data: Configure) => {
                  if (data != null) {
                    debugger;
                    this._globalService.myUser.configuration = [];
                    this._globalService.myUser.configuration.push(data);
                    this.router.navigateByUrl("/home");
                  }
                  else {
                    this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'Try again' });
                  }
                });
            }
            else {
              this.router.navigateByUrl("/home");
            }
          }
          else {
            this.messageService.add({ severity: 'error', summary: 'Error message', detail: 'User not found' });
          }
        });
    }
  }
  navToUser() {
    this.router.navigateByUrl("/userDetails/newUser");
  }
}