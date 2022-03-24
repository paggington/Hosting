import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../models/User.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserDataByUsername(username:string):Observable<User>{
    let options={
      params:new HttpParams().set('username',username),
      // @ts-ignore
      headers:new HttpHeaders().set('Authorization','Bearer '+localStorage.getItem('a_token'))
    }
    return this.http.get<User>("http://localhost:8080/api/v1/users/user",options)
  }
}
