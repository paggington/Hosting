import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RoutingModule} from "./modules/routing/routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from "./modules/shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    JwtModule
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService
  ],
    exports: [
        VideoComponent,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
