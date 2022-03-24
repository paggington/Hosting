import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../components/login/login.component";
import {MainPageComponent} from "../../components/main-page/main-page.component";
import {UserPageComponent} from "../../components/user-page/user-page.component";
import {AuthGuard} from "../../guards/auth.guard";

const routes:Routes=[
  {path:'login',component:LoginComponent},
  {path:'',component:MainPageComponent},
  {path:'user',component:UserPageComponent,canActivate:[AuthGuard]}
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
