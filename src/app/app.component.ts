import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('videoTemplate') videoTemplate!: ElementRef;
  public title: string = 'VideoPlayer - BHF';
  constructor(private http: HttpClient) { }

  /**
  * fetch video from Vimeo API using video URL
  * @param {String} videoURL
  */
  public getVideo(videoURL: string) {
    let oEmbedURL = "https://vimeo.com/api/oembed.json?url=" + videoURL;
    this.http.get(oEmbedURL).subscribe(
      (videoData: any) => {
        console.log(videoData);
        this.videoTemplate.nativeElement.innerHTML = videoData.html;
      }
    )
  }
}


