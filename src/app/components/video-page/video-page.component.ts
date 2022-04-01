import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Video} from "../../models/Video.model";
import {VideoService} from "../../services/video.service";

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {
  video?:Video;
  videoUrlString:string="";
  errorText:string="";
  videoBlob?:File;
  constructor(private activeRoute:ActivatedRoute,
              private videoService:VideoService,
              private router:Router) { }

  ngOnInit(): void {
    let id=this.router.url.split('/')
    this.videoService
      .getVideoDataById(id[id.length-1])
      .subscribe(video=>this.video=video)
   this.getVideoFromServer()
  }
  getVideoFromServer(){
    // @ts-ignore
    this.videoService.getVideoBlob(this.video.id).subscribe(vid=>{
      this.videoBlob=<File>vid;
    },err=>{
      if(err.status==401||403){
        this.errorText='You cannot watch this video...'
      }else if(err.status==500||503){
        this.errorText='Server error occurred'
      }else {
        this.errorText='Error occurred'
      }
    })
  }
  getStringifyVideoURL(){
    this.getVideoFromServer();
    //@ts-ignore
    this.videoUrlString=URL.createObjectURL(this.videoBlob);
  }
}
