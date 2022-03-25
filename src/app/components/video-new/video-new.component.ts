import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css']
})
export class VideoNewComponent implements OnInit {
  form!:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      videoName:['',[Validators.minLength(6),Validators.required]],
      videoDescription:['',[Validators.maxLength(500)]]
    })
  }
  onFileSelected(event:any){

  }
}
