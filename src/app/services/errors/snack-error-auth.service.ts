import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnackErrorAuthService {
  constructor(private snack:MatSnackBar) { }

  errorLogin(){
    this.snack.open('Try again!','X',{
      duration:5000,
      horizontalPosition:'start'
    })
  }
  successLogin(message:string){
    this.snack.open(message,'X',{
      duration:3000,
      horizontalPosition:'start',
    })
  }
}
