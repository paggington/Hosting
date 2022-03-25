import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from "../../services/user.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit,OnChanges{
  user!:User;
  imageProfile:Blob=new Blob();
  imageBlobUrl: string | ArrayBuffer | null ="";
  constructor(private userService:UserService,private jwtHelper:JwtHelperService) { }

  ngOnInit(): void { // @ts-ignore
    if(localStorage.getItem('a_token')&&!this.jwtHelper.isTokenExpired(localStorage.getItem('a_token'))) {
      // @ts-ignore
      this.userService.getUserDataByUsername(this.jwtHelper.decodeToken(localStorage.getItem('a_token')).getSubject)
      this.getProfileImage();
      this.user = this.userService.user;
    }
  }
  getProfileImage(){
    this.userService.getUserProfileImage().subscribe(data=>{
      this.imageProfile=data;
      this.createImageFromBlob()
    })
  }

  createImageFromBlob(){
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (this.imageProfile) {
      return reader.readAsDataURL(this.imageProfile);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.user=this.userService.user
  }
}
