import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FileUploadModule} from 'primeng/fileupload';
import { UploadImageComponent } from './user_imgs-upload-image/user_imgs-upload-image.component';
import { UserImgsListComponent } from './user_imgs-list/user_imgs-list.component';
import {GalleriaModule} from 'primeng/galleria';
import {ToastModule} from 'primeng/toast';
import {ListboxModule} from 'primeng/listbox';
import { ListSendComponent } from './list-send/list-send.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {BlockUIModule} from 'primeng/blockui';

@NgModule({
    declarations: [UploadImageComponent,UserImgsListComponent,ListSendComponent],
    imports: [CommonModule,BlockUIModule, FormsModule, HttpClientModule,ReactiveFormsModule,ToastModule,GalleriaModule,FileUploadModule,MessagesModule,MessageModule,ListboxModule,ProgressSpinnerModule],
    exports: [UploadImageComponent,UserImgsListComponent,ListSendComponent],
    providers: []
})
export class UserImgsModule {

}