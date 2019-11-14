import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User_imgs } from './user_imgs.model';
import { User, UserWithPath } from '../user/user.model';

 @Injectable(
    { providedIn: 'root' }
 )
export class UserImgsService {
    usersList;
    constructor(private _http:HttpClient){}
    public uploadPrivateImage (image: User_imgs,email:string): Observable<any> {
        debugger;
        const formData=new FormData();
        formData.append(image.img.name, image.img);
        return this._http.post("/api/Image/"+image.user_id+"/"+email+"/"+"0",formData);
    }  
    public uploadPublicImage (userId:number,file:File,numRotate:number): Observable<any> {
        const formData=new FormData();
        formData.append(file.name, file);
        return this._http.post("/api/ImgsHistory/"+userId+"/"+numRotate,formData);
    } 
    public sendEmail (listUser:User[],publicImagePath:string,imgsHistoryId:number) {
        debugger;
        this.usersList=new UserWithPath();
        this.usersList.path=publicImagePath;
        this.usersList.users=listUser;
        this.usersList.imgsHistoryId=imgsHistoryId;
        return this._http.put("/api/ImgsHistory/",this.usersList);
    }   
    public addUserInImg (listUser:User[],publicImagePath:string,imgsHistoryId:number) {
        debugger;
        this.usersList=new UserWithPath();
        this.usersList.path=publicImagePath;
        this.usersList.users=listUser;
        this.usersList.imgsHistoryId=imgsHistoryId;
        return this._http.post("/api/UserInImg/",this.usersList);
    }
}