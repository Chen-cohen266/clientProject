import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserWithPath } from '../user/user.model';

 @Injectable(
    { providedIn: 'root' }
 )
export class imgsHistoryService {
    usersList;
    constructor(private _http:HttpClient){}
    public getAllUsers(): Observable<any> {
        return this._http.get("/api/user");
    }  
}