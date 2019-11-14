import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './+main/user/user-details/user-details.component';
import { LoginComponent } from './+main/login/login.component';
import { MainComponent } from './+main/main/main.component';
import { HomeComponent } from './+main/home/home.component';
import { UserImgsListComponent } from './+main/user_imgs/user_imgs-list/user_imgs-list.component';
import { ConfigureComponent } from './+main/user/configure/user-configure/user-configure.component';
import { UploadImageComponent } from './+main/user_imgs/user_imgs-upload-image/user_imgs-upload-image.component';
import { HistoryComponent } from './+main/history/history-com/history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "userDetails/:status",
    component: UserComponent,
  },
  // {
  //   path: "imagesList",
  //   component: UserImgsListComponent,
  // },
  {
    path: "home",
    component: MainComponent,
    children: [
      {path: 'userDetails/update/:status',component: UserComponent},
      {path: 'userDetails/details/:status',component: UserComponent},
      {path: 'imagesList', component: UserImgsListComponent},
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent},
      {path: 'uploadImage',component: UploadImageComponent},
      {path: 'configuration',component: ConfigureComponent},
      {path: 'addImage',component: UploadImageComponent},
      {path: 'history', component: HistoryComponent},
      {path: '', component: HomeComponent}, 
    ]
  },  
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "**",
    component:PageNotFoundComponent,
  },
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
