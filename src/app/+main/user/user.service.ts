import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { Configure } from './configure/user-configure.model';

 @Injectable(
    { providedIn: 'root' }
 )
export class UserService {
    constructor(private _http:HttpClient){}
    public getUserByEmailAndPassword(emailAddress:string,password:string,applianceIdentifier:string): Observable<User> {
        return this._http.get<User>("/api/User/"+emailAddress+"/"+password+"/"+applianceIdentifier);
    }
    public get(): Observable<User> {
        return this._http.get<User>("/api/user");
    }
    public addUser(user:User): Observable<User> {
        debugger;
        return this._http.post<User>("/api/user",user);
    }
    public updateUser(id:number,user:User):Observable<User>{
        return this._http.put<User>("/api/user/"+id,user);
    }
    public addConfige(conf:Configure):Observable<Configure>{
        return this._http.post<Configure>("/api/configure",conf);
    }
    public updateConfige(id:number,conf:Configure):Observable<Configure>{
        return this._http.put<Configure>("/api/configure/"+id,conf);
    }
    public deleteConfigure(id:number):Observable<void>{
        return this._http.delete<void>("/api/configure/"+id);
    }
    public deleteUser(id:number):Observable<void>{
        return this._http.delete<void>("/api/user/"+id);
    }
}