import { UserInImg } from './user_in_Imgs.model';

export class Imgs_history
{
    imgs_history_id:number;
    user_id:number;
    upload_date:Date;
    created_date:Date;
    img_file_name:string;
    img_name_extention?:string;
    user_in_img:UserInImg[];
    
    constructor(){
    }
}