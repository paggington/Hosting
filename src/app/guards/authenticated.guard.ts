import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {SnackErrorAuthService} from "../services/errors/snack-error-auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService:AuthService,private snack:SnackErrorAuthService,private router:Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['']).then((navigated:boolean)=>{
        if(navigated){
          this.snack.youMustLogIn("video adding");
        }
      });
      return false;
    }
    return true;
  }

}
