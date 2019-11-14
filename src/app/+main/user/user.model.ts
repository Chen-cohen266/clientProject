import { User_imgs } from '../user_imgs/user_imgs.model';
import { Configure } from './configure/user-configure.model';
import { Imgs_history } from '../history/Imgs_history.model';

export enum EmailOrWhatApp
{
    EMAIL, WHATSAPP, BOTH
}
export class User
{
    user_id?:number;
    last_name:string;
    first_name:string;
    email_or_whatsApp:EmailOrWhatApp;
    email_address:string;
    whatsApp?:string;
    password:string;
    user_imgs?:User_imgs[];
    configuration:Configure[];
    imgs_history?:Imgs_history[];

    constructor (last_name:string,first_name:string,option:NodeList,email_address:string,whatsApp:string,password:string,configure:Configure){
        this.first_name=first_name;
        this.last_name=last_name;
        if((option[0] as HTMLInputElement).checked)
          this.email_or_whatsApp=EmailOrWhatApp.EMAIL;
        else if((option[1] as HTMLInputElement).checked){
          this.email_or_whatsApp=EmailOrWhatApp.WHATSAPP;
          this.whatsApp=whatsApp;
        }
        else if((option[2] as HTMLInputElement).checked){
          this.email_or_whatsApp=EmailOrWhatApp.BOTH;
          this.whatsApp=whatsApp;
        }
        this.email_address=email_address;
        this.password=password;
        this.configuration=[];
        this.configuration.push(configure);
    }
}
export class UserWithPath
{
  users:User[];
  path:string;
  imgsHistoryId:number;
}