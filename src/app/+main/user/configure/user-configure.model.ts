import { Observable } from 'rxjs';
import { GlobalService } from '../../global.service';

export class Configure
{
    configuration_id?:number;
    user_id?:number;
    appliance_identifier?:string;
    performance:boolean;
    reliability:boolean;
    
    constructor(userId:number,applianceIdentifier:string){
        this.performance=false;
        this.reliability=false;
        this.user_id=userId;
        this.appliance_identifier=applianceIdentifier;
    }
}