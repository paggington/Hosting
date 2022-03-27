import {Component, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VideoService} from "../../services/video.service";
import {SnackErrorAuthService} from "../../services/errors/snack-error-auth.service";
import {MatVideoComponent} from "mat-video/lib/video.component";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit {
  form!: FormGroup;
  fileName?: string = '';
  file?: File;
  videoURL: string = "";

  constructor(private fb: FormBuilder,
              private videoService: VideoService,
              private snack: SnackErrorAuthService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      videoName: ['', [Validators.minLength(6), Validators.required]],
      videoDescription: ['', [Validators.maxLength(500)]]
    })
  }

  onFileSelected(event: any) {
    this.videoURL="";
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
    // @ts-ignore
    this.videoURL = URL.createObjectURL(this.file)
  }

  uploadFilesFinally(file: File) {
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);
      formData.append('username', 'nikitko');
      this.videoService.saveNewVideo(formData).subscribe(p => {
        },
        error => {
          if (error.status == 500 || 503) {
            this.snack.snackError("Internal server error, try again later.")
            this.form.reset();
            this.fileName = '';
          } else if (error.status == 401 || 403) {
            this.snack.youMustLogIn("upload videos")
            this.form.reset();
            this.fileName = '';
          } else {
            this.snack.snackError("ERROR");
            this.form.reset();
            this.fileName = '';
          }
        });
    }
  }
}
