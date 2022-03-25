import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SnackErrorAuthService} from "../services/errors/snack-error-auth.service";
import {ShellComponent} from "../components/shell/shell.component";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private jwtHelper:JwtHelperService,private snack:SnackErrorAuthService) {
  }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    const user=this.authService.getCurrentUser();
    if(localStorage.getItem('a_token')&&localStorage.getItem('r_token')==null||undefined){
      return false;
      //@ts-ignore
    }else if(this.jwtHelper.isTokenExpired(localStorage.getItem('a_token'))){
      this.authService.refreshTokens().subscribe(tokens=>{
        localStorage.setItem('r_token',tokens.refresh_token);
        localStorage.setItem('a_token',tokens.access_token);
      },error => {
        if(error.status==403||401){
          localStorage.clear();
        }
      })
      return true;
    }
    return true;
  }

}
