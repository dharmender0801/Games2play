import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from './../../../Services/error.service';
import { StreamingService } from './../../../Services/streaming.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation
} from '@angular/core';
 import { MediaElementPlayer } from 'mediaelement';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { StreamLinkRESPONSePOST } from 'src/app/model/account/api/stream-link-response-post';
import { VideoPlayLinkREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

declare var $: any;

@Component({
  selector: 'app-video-play-view',
  templateUrl: './video-play-view.component.html',
  styleUrls: ['./video-play-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayViewComponent implements OnInit, AfterViewInit {
  constructor(
    private _loaderService: NgxSpinnerService,
    private _streamingService: StreamingService,
    private _errorService: ErrorService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private localstorage: LocalStorageService,
  ) {}

  ngAfterViewInit(): void {
    const contentId = this._activatedRoute.paramMap.subscribe(params => {
      const cId = parseInt(params.get('id'), 10);
      if (!isNaN(cId)) {
        //pass dynamic content Id
        this.GetVideoLinks(cId);
      } else {
        this._router.navigate(['/']);
      }
    });
  }
  GetVideoLinks(contentId: number) {
  //  debugger;

    const bodyData: VideoPlayLinkREQUEStBODyPOST = {
      jwtToken: this.localstorage.GetUserJwtToken(),
      ContentId: contentId,
      userId: this.localstorage.GetUserId()
    };

    this._streamingService
      .GetContentStreamLink(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: StreamLinkRESPONSePOST) => {
        if (data.statusDescription) {
          
          if (data.statusDescription.statusCode && data.link) {
            if (+data.statusDescription.statusCode === 200) {
              this.PlayVideo(data.link);
            }
          }
        }
      });
  }

  ngOnInit() {
    setTimeout(() => {
      $('.black-overlay').css('background', 'black');
    }, 10);
    this._loaderService.show();
    // this.loadScript('./assets/MediaElementAndPlayer/mediaelement-and-player.js');
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  PlayVideo(params: string) {
   // debugger;
    $('#elementPlayer').attr(
      'src',
      params
    );
    $('#elementPlayer').mediaelementplayer();
    const self = this;
    $(document).ready(function() {
      setTimeout(() => {
        // $('.mejs__fullscreen-button > button').click();
        $('.mejs__overlay-button').css(
          'background-image',
          'url("/assets/images/MediaElementPlayer/mejs-controls.svg")'
        );
        $('.mejs__button > button').css(
          'background-image',
          'url("/assets/images/MediaElementPlayer/mejs-controls.svg")'
        );

        self._loaderService.hide();
        $('.black-overlay').css('background', 'rgba(51, 51, 51, 0.8)');
        $('.mejs__overlay-button').click();
      }, 1000);
    });
  }
}
