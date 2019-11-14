import { Injectable } from '@angular/core';
import { User } from './user/user.model';

 @Injectable(
    { providedIn: 'root' }
 )
export class GlobalService {
    myUser:User;
    appliance_identifier:string;
    constructor(){}
    
}