import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class SnackErrorAuthService {
  constructor(private snack:MatSnackBar,private router:Router) { }

  errorLogin(){
    this.snack.open('Try again!','X',{
      duration:5000,
      horizontalPosition:'start'
    })
  }
  errorTokens(){
    this.snack.open('You need to login to watch your subs','OK',{
      duration:5000,
      horizontalPosition:'start'
    })
    return this.snack._openedSnackBarRef?.onAction().pipe(
      tap(_=>{
        this.router.navigateByUrl('/login')
      })
    ).subscribe();
  }
  successLogin(message:string){
    this.snack.open(message,'X',{
      duration:3000,
      horizontalPosition:'start',
    })
  }
  errorVideo(message:string){
    this.snack.open(message,'OK',{
      duration:5000,
      horizontalPosition:'start'
    })
  }
  youMustLogIn(message:string){
    this.snack.open('You must login to '+message+' page!','OK',{
      duration:5000,
      horizontalPosition:'center',
      politeness:'assertive'
    })
    return this.snack._openedSnackBarRef?.onAction().pipe(
      tap(_=>{
        this.router.navigateByUrl('/login')
      })
    ).subscribe();
  }
}
