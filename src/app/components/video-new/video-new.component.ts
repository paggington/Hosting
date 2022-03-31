import {Component, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../../services/video.service";
import {SnackErrorAuthService} from "../../services/errors/snack-error-auth.service";
import {MatVideoComponent} from "mat-video/lib/video.component";
import {DomSanitizer} from "@angular/platform-browser";
import {VgApiService} from "@videogular/ngx-videogular/core";
import {finalize, Subscription} from "rxjs";
import {HttpEventType} from "@angular/common/http";
import {Video} from "../../models/Video.model";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit, OnChanges {
  form!: FormGroup;
  fileName?: string = '';
  file?: File;
  videoURL: string = "";
  //TODO:make buffer for videos max-10
  sources:string[]=[];
  api: VgApiService | undefined;
  uploadProgress:number=0;
  uploadSub?:Subscription;
  uploadingProgressBar: boolean=false;

  constructor(private fb: FormBuilder,
              private videoService: VideoService,
              private snack: SnackErrorAuthService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    this.videoURL = URL.createObjectURL(this.file)
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      videoName: ['', [Validators.minLength(6), Validators.required]],
      videoDescription: ['', [Validators.maxLength(500),Validators.required]]
    })
  }
  onPlayerReady(api: VgApiService) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.playVideo.bind(this)
    );
  }

  playVideo() {
    // @ts-ignore
    this.api.play();
  }
  onFileSelected(event: any) {
    this.api?.getDefaultMedia();
    this.videoURL="";
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
    // @ts-ignore
    this.videoURL = URL.createObjectURL(this.file);
    this.sources.pop();
    this.sources.push(this.videoURL);
  }

  uploadFilesFinally() {
    this.uploadingProgressBar=true;
    if (this.file) {
      this.fileName = this.file.name;
      let formData = new FormData();
      // @ts-ignore
      formData.append('username',JSON.parse(localStorage.getItem('currentUser')).username);
      formData.append('file', this.file,this.fileName);
      formData.append('videoName',this.form.get('videoName')?.value);
      formData.append('videoDesc',this.form.get('videoDescription')?.value);
      console.log(formData.getAll('username'))
      let upload$=this.videoService.saveNewVideo(formData).pipe(
        finalize(()=>{
          this.snack.onVideoUploaded();
          this.reset();
        })
      )
      this.uploadSub=upload$.subscribe(event => {
          if (event.type == HttpEventType.UploadProgress) {
            // @ts-ignore
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
        },
        error => {
          if (error.status == 500 || 503) {
            this.snack.snackError("Internal server error, try again later.")
            this.reset()
          } else if (error.status == 401 || 403) {
            this.snack.youMustLogIn("upload videos")
            this.reset()
          } else {
            this.snack.snackError("ERROR");
            this.reset()
          }
        });
    }
  }
  reset(){
    this.form.reset();
    this.sources=[];
    this.videoURL="";
    this.fileName=""
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
    this.uploadingProgressBar=false;
  }cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }
}
