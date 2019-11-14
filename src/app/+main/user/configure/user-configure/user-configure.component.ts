import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Configure } from '../user-configure.model';
import { GlobalService } from '../../../global.service';
import { UserService } from '../../user.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';

@Component({
    selector: 'app-configure',
    templateUrl: './user-configure.component.html',
    styleUrls: ['./user-configure.component.css'],
    providers: [MessageService]
})
export class ConfigureComponent implements OnInit {
    confige: Configure;
    CkbVal: string[] = [];
    // deviceInfo = null;
    // isMobile;
    // isTablet;
    // isDesktopDevice;
    constructor(private router: Router, private messageService: MessageService, private _globalService: GlobalService, private _userService: UserService) {
        // this.epicFunction();
    }

    ngOnInit() {
        document.body.classList.add('bg_global');
        
        if (this.router.url != '/'&& this.router.url !="/userDetails/newUser" && this._globalService.myUser == null)
            this.router.navigateByUrl("");
        this.CkbVal = [];
        if (this._globalService.myUser.configuration[0].performance)
            this.CkbVal.push("performance");
        if (this._globalService.myUser.configuration[0].reliability)
            this.CkbVal.push("reliability");

    }
    ngOnDestroy(){
        document.body.className="";
      }
    //   epicFunction() {
    //     console.log('hello `Home` component');
    //     this.deviceInfo = this.deviceService.getDeviceInfo();
    //     this.isMobile = this.deviceService.isMobile();
    //     this.isTablet = this.deviceService.isTablet();
    //     this.isDesktopDevice = this.deviceService.isDesktop();
    //     console.log(this.deviceInfo);
    //     console.log(this.isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    //     console.log(this.isTablet);  // returns if the device us a tablet (iPad etc)
    //     console.log(this.isDesktopDevice); // returns if the app is running on a Desktop browser.
    //   }
    submit() {
        // if(this.isMobile)
        //     this._globalService.appliance_identifier="isMobile";
        // else if(this.isTablet)
        //     this._globalService.appliance_identifier="isTablet";
        // else if(this.isDesktopDevice)
        //     this._globalService.appliance_identifier="isDesktopDevice";   
        this.confige = new Configure(this._globalService.myUser.user_id, this._globalService.appliance_identifier);
        console.log(this.CkbVal);
        if (this.CkbVal.includes("performance"))
            this.confige.performance = true;
        else
            this.confige.performance = false;
        if (this.CkbVal.includes("reliability"))
            this.confige.reliability = true;
        else
            this.confige.reliability = false;
        this._userService.updateConfige(this._globalService.myUser.configuration[0].configuration_id, this.confige).subscribe(
            (data: Configure) => {
                if (data != null) {
                    this._globalService.myUser.configuration = [];
                    this._globalService.myUser.configuration.push(data);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Update configuration successfully' });
                }
                else
                    this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Update configuration were not saved!, try again' });
            });
    }
    showConfirm() {
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure you want to set the configuration?', detail: 'Confirm to proceed' });
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
}
