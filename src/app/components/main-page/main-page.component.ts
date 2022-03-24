import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/Video.model";
import {VideoService} from "../../services/video.service";
import {SnackErrorAuthService} from "../../services/errors/snack-error-auth.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  videos:Video[]=[];
  private page=0;
  private totalPages=0;
  private size=6;
  constructor(private videoService:VideoService,
              private snack:SnackErrorAuthService) { }

  ngOnInit(): void {
    this.getVideos();
  }
  getVideos(){
    this.videoService.getVideosForNotAuthenticated(this.page,this.size).subscribe(vid=>{
      // @ts-ignore
      for (const video of vid.content) {
        this.videos.push(video)
      }
    },error => {
      if(error.status==500||503){
        this.snack.errorVideo("Server error, try again later")
      }
    });
  }
}
