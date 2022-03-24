import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/User.model";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{
  user!:User;
  constructor(private http:HttpClient) {
    this.getUserDataByUsername().subscribe(user=>this.user=user);
  }
  getUserDataByUsername():Observable<User>{
    let options={
      // @ts-ignore
      headers:new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('a_token'))
    }
    return this.http.get<User>("http://localhost:8080/api/v1/users/current-user",options)
  }
  getUserProfileImage():Observable<Blob>{
    let storedUser=localStorage.getItem("currentUser");
    // @ts-ignore
    this.user=JSON.parse(storedUser);
    let headers=new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('a_token'))
    return this.http.get<Blob>("http://localhost:8080/api/v1/users/profile-picture",
      {headers,responseType:'blob' as 'json'})
  }

}
