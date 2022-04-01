import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/login/login.component";
import {MainPageComponent} from "../../components/main-page/main-page.component";
import {UserPageComponent} from "../../components/user-page/user-page.component";
import {AuthGuard} from "../../guards/auth.guard";
import {VideoNewComponent} from "../../components/video-new/video-new.component";
import {AuthenticatedGuard} from "../../guards/authenticated.guard";
import {VideoPageComponent} from "../../components/video-page/video-page.component";

const routes:Routes=[
  {path:'',component:MainPageComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserPageComponent,canActivate:[AuthGuard]},
  {path:'video-new',component:VideoNewComponent,canActivate:[AuthenticatedGuard]},
  {path:'video/:id',component:VideoPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class RoutingModule { }
