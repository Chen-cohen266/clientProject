export class User_imgs
{
    user_imgs_id?:Number;
    user_id?:Number;
    img?:File;
    img_encoding?:Text;
    img_name_extention?:Text;

    constructor(user_id:number,img:File){
        this.user_id=user_id;
        this.img=img;
    }
}