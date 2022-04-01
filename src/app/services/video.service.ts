import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Video} from "../models/Video.model";
import {Form} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  getVideosForNotAuthenticated(page: number, size: number): Observable<Video[]> {
    let params = {
      params: new HttpParams()
        .set('page', page)
        .set('size', size)
    }
    return this.http.get<Video[]>("http://localhost:8080/api/v1/video/get-all-new", params);
  }

  getVideosForAuthenticated(): Observable<Video[]> | null {
    let options = {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('a_token'))
    }
    return null;
  }

  getVideoPreview(id: string): Observable<Blob> {
    let params = {
      params: new HttpParams()
        .set("id", id),
      headers: new HttpHeaders()
        .set('Content-Type', 'application/octet-stream'),
      responseType: 'blob' as 'json'
    }
    return this.http.get<Blob>("http://localhost:8080/api/v1/video/preview", params)
  }

  saveNewVideo(data: FormData): Observable<HttpEvent<Video>> {
    console.log(data)
    return this.http.post<Video>("http://localhost:8080/api/v1/video/video-new", data, {
      observe: 'events',
      reportProgress: true,
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('a_token'),)
    });
  }

  getVideoDataById(id: string): Observable<Video> {
    return this.http.get<Video>("http://localhost:8080/api/v1/video/video", {

      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('a_token')),
      params:
        new HttpParams().set('id', id)
    });
  }
  getVideoBlob(id:string):Observable<Blob>{
    return this.http.get<Blob>("http://localhost:8080/api/v1/video", {
      headers: new HttpHeaders()
        .set('Authorization', 'Bearer ' + localStorage.getItem('a_token')),
      params:
        new HttpParams().set('id', id)
    });
  }
}
