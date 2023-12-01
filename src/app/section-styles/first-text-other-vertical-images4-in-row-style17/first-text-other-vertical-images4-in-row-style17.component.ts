import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';
import { LoginComponent } from '../../modules/shared/login/login.component';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { StreamLinkRESPONSePOST } from '../../model/account/api/stream-link-response-post';
import { VideoPlayLinkREQUEStBODyPOST } from '../../model/account/api/user-account-detail-request-body-post';
import { StreamingService } from '../../Services/streaming.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-first-text-other-vertical-images4-in-row-style17',
  templateUrl: './first-text-other-vertical-images4-in-row-style17.component.html',
  styleUrls: ['./first-text-other-vertical-images4-in-row-style17.component.css']
})
export class FirstTextOtherVerticalImages4InRowStyle17Component implements OnInit {

  public isFullListDisplayed: boolean = false;
  public itemsToShow =[];
  array = [];
  AllPageData = [];
  dataforbinding=[];
  sum = 0;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  @Input() pageData: any;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;

  defaultImage="assets/images/DefaultImages/Loader_180X270.gif";

  constructor(

    private route: Router,
    private _localStorageService: LocalStorageService,
    private streamingService : StreamingService,
    private loadingService : NgxSpinnerService
     
  ) {
   
  }

  ngOnInit() { 
    this._localStorageService.SetUpgradePreviousServiceCameFrom('video');
    
  }

  ImageLoaded(iterator) {
  
    $('.image-num-' + iterator).css({ opacity: 0 });
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  UpdateNotFoundImage(iterator) {
  
    $('.image-num-' + iterator).css({ opacity: 0 });
    $('.image-num-' + iterator).attr('src', 'assets/images/not-found.png');
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  redirectVideoChildPage(contentId: any) {
    this._localStorageService.SetUpgradePreviousServiceCameFrom('video');
    this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});
  }

  getAndPlayContent(){
    this.loadingService.show();
    const contentId = localStorage.getItem("contentToPlay");
    const bodyData: VideoPlayLinkREQUEStBODyPOST = {
      jwtToken: this._localStorageService.GetUserJwtToken(),
      ContentId: parseInt(contentId),
      userId: this._localStorageService.GetUserId()
    };
    this.streamingService
      .GetContentStreamLink(bodyData)
      .subscribe((data: StreamLinkRESPONSePOST) => {

        if (data.statusDescription !== null || data.statusDescription !== undefined) {
          if (data.statusDescription.statusCode !== undefined) {
            if (data.statusDescription.statusCode && data.link) {
              if (+data.statusDescription.statusCode === 200) {
                if (data.isDirectPlay == false) {                    
                  window.open(data.link, '_blank');
                  this.loadingService.hide();
                }
                // else {
                //   //Code for new tab video link
             
                //   this.loadingService.hide();
                //   this.Videohreflink = data.link;
                //   this.IsLoggedIn = true;

                //   if (this.IsIOSPhone == false) {
                
                //     // window.open(data.link, '_blank')  
                //     this.targetforlink = "_blank"
                //     this.IsLoggedIn = true;
                //   }
                //   else {
                
                //     // setTimeout(() => {
                //     //   debugger;
                //     //   $('#PlayVideo')[0].click();
                //     // }, 400);

                //     //this.openTab(data.link);
                //     this.Videohreflink = data.link;
                //     this.targetforlink = "_self"
                //     this.IsLoggedIn = true;
                //   }
                // }
              }
              // else {
              //   return this.toastr.errorToastr(data.statusDescription.statusMessage, 'error', {
              //     position: 'top-left'
              //   });
              // }
            }
            else {
              this.loadingService.hide();
            }
          }
          // else {
          //   this.loadingService.hide();
          //   return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
          //     position: 'top-left'
          //   });
          // }
        }
        // else {
        //   this.loadingService.hide();
        //   return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
        //     position: 'top-left'
        //   });
        // }

      });
  }
}



