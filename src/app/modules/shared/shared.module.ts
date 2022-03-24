import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShellComponent} from "../../components/shell/shell.component";
import {MainPageComponent} from "../../components/main-page/main-page.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {VideoComponent} from "../../components/video/video.component";
import {UserPageComponent} from "../../components/user-page/user-page.component";
import {LoginComponent} from "../../components/login/login.component";


const components=[
  ShellComponent,
  MainPageComponent,
  VideoComponent,
  UserPageComponent,
]
const modules=[
  CommonModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatTableModule
]
@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules
  ],
  exports:[
    ...components,
    ...modules
  ]
})
export class SharedModule { }
