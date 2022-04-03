import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Video} from "../../models/Video.model";
import {VideoService} from "../../services/video.service";
import {finalize, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {

  commentAdding: boolean = false;
  videoID: string = "";
  video!: Video;
  videoUrlString: string = "";
  errorText: string = "";
  videoBlob?: Blob;
  videoSub: Subscription = new Subscription();
  videoUrls: string[] = [];

  likes: number = 0;
  dislikes: number = 0;
  isLikeSet: boolean = false;
  isDislikeSet: boolean = false;

  constructor(private activeRoute: ActivatedRoute,
              private videoService: VideoService,
              private router: Router) {
  }

  changeStateComment() {
    if (!this.commentAdding) {
      this.commentAdding = !this.commentAdding;
    }
  }

  async ngOnInit() {
    let id = this.router.url.split('/')
    this.videoID = id[id.length - 1];
    await this.videoService
      .getVideoDataById(id[id.length - 1])
      .subscribe((vid) => {
        this.video = vid;
      }, error => {
        this.errorText = "Can't load video, try again later."
      })

    let videoLoad$ = this.videoService.getVideoBlob(id[id.length - 1]).pipe(
      finalize(() => {
        this.sendViewUpdate();
      })
    );
    videoLoad$.subscribe(vid => {
      this.videoBlob = vid;
      this.videoUrlString = URL.createObjectURL(vid);
      this.videoUrls.push(URL.createObjectURL(this.videoBlob))
    }, err => {
      if (err.status == 401 || 403) {
        this.errorText = 'You cannot watch this video...'
      } else if (err.status == 500 || 503) {
        this.errorText = 'Server error occurred'
      } else {
        this.errorText = 'Error occurred'
      }
    })
    await this.getLikesForVideo();
    await this.hasUserSetLike();
  }
  async hasUserSetLike(){
    // @ts-ignore
    console.log(JSON.parse(localStorage.getItem('currentUser')).username)
    //@ts-ignore
    this.videoService.likeIsSetForVideoByUser(this.videoID,JSON.parse(localStorage.getItem('currentUser')).username)

      .subscribe(like=>{
        if(like!=null){
          !like.dislikeSet?this.isLikeSet=true:this.isDislikeSet=true;
        }
    })
  }
  async getLikesForVideo() {
    this.videoService.getLikesNumberForAVideo(this.videoID).subscribe(like => {
      this.likes = like.like;
      this.dislikes=like.dislike;
    })
  }

  async sendViewUpdate() {
    this.videoService.setViewForVideo(this.videoID).subscribe(p => {
      console.log(p)
    }, error => {
      if (error.status == 500 || 503) {
        console.log('Server error');
      }
    })

  }

  async setLikeForVideo() {
    if(!this.isLikeSet) {
      let likeSub$ = this.videoService.setLikeForVideo(this.videoID).pipe(
        tap(_ => {
            console.log(_)
          },
          finalize(() => {
            this.isLikeSet = true;
          }))
      )
      likeSub$.subscribe(like => {

      }, error => {

      })
    }
  }
  async setDislikeForVideo() {
    if(!this.isDislikeSet ) {
      let likeSub$ = this.videoService.setDislikeForVideo(this.videoID).pipe(
        tap(_ => {
            console.log(_)
          },
          finalize(() => {
            this.isLikeSet = true;
          }))
      )
      likeSub$.subscribe(like => {

      }, error => {

      })
    }
  }
}
