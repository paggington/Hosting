import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SnackErrorAuthService} from "./errors/snack-error-auth.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../models/TokenResponse.model";
import {Token} from "@angular/compiler";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,
              private loginErrorSnack:SnackErrorAuthService,
              private jwtHelper:JwtHelperService) { }
  async logout(){
    localStorage.clear();

  }
  login(username:string,password:string):Observable<TokenResponse>{
    let body=new URLSearchParams();
    body.set('username',username);
    body.set('password',password);
    let options={
      headers:new HttpHeaders()
        .set("Content-Type","application/x-www-form-urlencoded")
    }
    return this.http.post<TokenResponse>("http://localhost:8080/api/login",body,options);
  }
  isLoggedIn(){
    return !!localStorage.getItem('a_token');
  }
  tokenIsNotExpired(token:string){
    return !this.jwtHelper.isTokenExpired(token);
  }
  getAccessToken(){
    return localStorage.getItem('a_token');
  }
  getCredentialsFromToken(token:string){
    if(this.tokenIsNotExpired(token)){
      console.log(this.jwtHelper.decodeToken(token)[0])
      return this.jwtHelper.decodeToken(token).getItem;
    }
    return 'default';
  }
}
