import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('videoTemplate') videoTemplate!: ElementRef;
  public title: string = 'VideoPlayer - BHF';
  public showError: Boolean = false;
  public videoInfo: String = '';
  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
    ) { }

  /**
  * fetch video from Vimeo API using video URL
  * @param {String} videoURL
  */
  public getVideo(videoURL: string) {
    let oEmbedURL = "https://vimeo.com/api/oembed.json?url=" + videoURL + "&width=600&height=300";
    this.showError = false;
    if (videoURL !== '') {
      this.spinner.show(); 
      this.http.get(oEmbedURL).subscribe(
        (videoData: any) => {
          console.log(videoData);
          this.spinner.hide(); 
          this.videoTemplate.nativeElement.innerHTML = videoData.html;
          this.videoInfo = videoData.title + ' by ' + videoData.author_name;
        }
      )
    } else {
      this.showError = true;
    }
  }
}


