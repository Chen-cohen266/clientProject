import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http"
import { UserComponent } from './user-details/user-details.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UserImgsModule } from '../user_imgs/user_imgs.module';
import {BlockUIModule} from 'primeng/blockui';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
import { ConfigureComponent } from './configure/user-configure/user-configure.component';
import {CheckboxModule} from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
    declarations: [UserComponent,ConfigureComponent],
    imports: [CommonModule, FormsModule, HttpClientModule,TooltipModule,CheckboxModule,ReactiveFormsModule,BlockUIModule,ToastModule,UserImgsModule, MessagesModule, MessageModule],
    exports: [UserComponent,ConfigureComponent],
    providers: []
})
export class UserModule {

}