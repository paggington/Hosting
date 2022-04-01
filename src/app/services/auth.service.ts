import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SnackErrorAuthService} from "./errors/snack-error-auth.service";
import {Observable} from "rxjs";
import {TokenResponse} from "../models/TokenResponse.model";
import {Token} from "@angular/compiler";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../models/User.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  user!: User;

  constructor(private http: HttpClient,
              private loginErrorSnack: SnackErrorAuthService,
              private jwtHelper: JwtHelperService,
              private router:Router) {

  }

  ngOnInit(): void {
    this.getCurrentUser().subscribe(user => {
      this.user = user;
    }, error => {
      if(error.status==403){
        if(localStorage.getItem('a_token')!=null){
          // @ts-ignore
          console.log(this.tokenIsNotExpired(this.getAccessToken()))
          // @ts-ignore
          if(this.jwtHelper.isTokenExpired(localStorage.getItem('a_token'))){
            this.refreshTokens().subscribe(tokens=>{
              localStorage.setItem('a_token',tokens.access_token)
              localStorage.setItem('r_token',tokens.refresh_token)
            })
          }else{
            localStorage.clear();
            this.router.navigateByUrl('/login').then(r => {
              this.loginErrorSnack.snackError("You're credentials has expired,You need to login");
            });
          }
        }
      }
    })
  }

  logout() {
    localStorage.clear();
    // @ts-ignore
    this.user = null;
  }

  login(username: string, password: string): Observable<TokenResponse> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    let options = {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
    }
    return this.http.post<TokenResponse>("http://localhost:8080/api/login", body, options);
  }

  isLoggedIn() {
    return !!localStorage.getItem('a_token');
  }

  tokenIsNotExpired(token: string) {
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAccessToken() {
    return localStorage.getItem('a_token');
  }

  getCredentialsFromToken(token: string) {
    if (this.tokenIsNotExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token)[0])
      return this.jwtHelper.decodeToken(token).getItem;
    }
    return 'default';
  }

  getCurrentUser(): Observable<User> {
    let options = {
      // @ts-ignore
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('a_token'))
    }
    return this.http.get<User>("http://localhost:8080/api/v1/users/current-user", options)
  }


  refreshTokens(): Observable<TokenResponse> {
    let options = {
      // @ts-ignore
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('r_token'))
    }
    return this.http.get<TokenResponse>("http://localhost:8080/api/refresh", options);
  }
}
