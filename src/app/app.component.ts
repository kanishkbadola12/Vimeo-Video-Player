import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  /* View child decorator to inject template reference for iFrame of video */
  @ViewChild('videoTemplate') videoTemplate!: ElementRef;

  /* Variable declaration with defined types */
  public title: string = 'VideoPlayer - BHF';
  public emptyFieldError: Boolean = false;
  public httpError: Boolean = false;
  public videoInfo: String = '';
  public httpErroInfo: String = '';

  constructor(
    private http: HttpClient,   //dependency injection for HttpClientModule
    private spinner: NgxSpinnerService    //dependency injection for NgxSpinner
    ) { }

  /**
  * fetch video from Vimeo API using video URL
  * @param {String} videoURL
  */
  public getVideo(videoURL: string) {
    let oEmbedURL = "https://vimeo.com/api/oembed.json?url=" + videoURL + "&width=600&height=300";
    if (videoURL !== '') {
      //disable errors
      this.emptyFieldError = false;
      this.httpError = false;
      this.spinner.show();      //show spinner untill data is not fetched
      this.http.get(oEmbedURL).subscribe(
        (videoData: any) => {
          this.spinner.hide();    //hide spinner when data is fetched
          this.videoTemplate.nativeElement.innerHTML = videoData.html;
          this.videoInfo = videoData.title + ' by ' + videoData.author_name;
        },
        //error handling
        (errorResponse: any) => {
          this.spinner.hide();
          this.httpError = true;
          this.httpErroInfo = errorResponse.error;
        }
      )
    } else {
      this.emptyFieldError = true;
    }
  }
}


