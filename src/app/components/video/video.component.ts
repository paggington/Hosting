import {Component, Input, OnInit} from '@angular/core';
import {Video} from "../../models/Video.model";
import {VideoService} from "../../services/video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @Input()
  video!:Video;

  videoPreview:Blob=new Blob();
  videoPreviewUrl:any;
  constructor(private videoService:VideoService,private router:Router) { }

  ngOnInit(): void {
    this.getVideoPreview()
  }
  getVideoPreview(){
    this.videoService.getVideoPreview(this.video.id).subscribe(data=>{
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        this.videoPreviewUrl = reader.result;
      }, false);
      if (data) {
        reader.readAsDataURL(data);
      }
    });
  }
  openVideoViewer(){
    this.router.navigate([`video/${this.video.id}`])
  }
}
