import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from "@angular/forms";

import {TieredMenuModule} from 'primeng/tieredmenu';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TabMenuModule} from 'primeng/tabmenu';
import {FileUploadModule} from 'primeng/fileupload';
import {CarouselModule} from 'primeng/carousel';
import {FieldsetModule} from 'primeng/fieldset';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';

//app components
import { UserModule } from './+main/user/user.module';
import { LoginComponent } from './+main/login/login.component';
import { MenuComponent } from './+main/menu/menu.component';
import { MainComponent } from './+main/main/main.component';
import { HomeComponent } from './+main/home/home.component';
import { HistoryComponent } from './+main/history/history-com/history.component'
import { UserService } from './+main/user/user.service';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    MainComponent,
    HomeComponent,
    HistoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TieredMenuModule,
    BrowserAnimationsModule,
    TabMenuModule,
    FileUploadModule,
    UserModule,
    CarouselModule,
    FieldsetModule,
    CalendarModule,
    DropdownModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
