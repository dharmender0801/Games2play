import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionService } from '../../Services/section.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../Services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../global/global';
import { UserAccountService } from '../../Services/user-account.service';
import { UserAccountDetailREQUEStBODyPOST, VideoPlayLinkREQUEStBODyPOST } from '../../model/account/api/user-account-detail-request-body-post';
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from '../../model/account/api/user-account-detail-response-post';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { debug } from 'util';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { StreamLinkRESPONSePOST } from 'src/app/model/account/api/stream-link-response-post';
import { ErrorService } from 'src/app/Services/error.service';
import { StreamingService } from 'src/app/Services/streaming.service';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { _ as __ } from 'lodash'
import qs from 'qs'
import { DeviceDetectorService } from 'ngx-device-detector';
declare var $: any;

@Component({
  selector: 'app-section-video-child',
  templateUrl: './section-video-child.component.html',
  styleUrls: ['./section-video-child.component.css']
})
export class SectionVideoChildComponent implements OnInit {
  @Output() videoPlayMovieClicked = new EventEmitter<boolean>();
  thumbnails: any = {};
  contentDetails: any = {};
  appInfo = {};
  contentId: string;
  // yearOfRelease: string;
  showpromovideoURL = false;
  WishlistbtnName: string;
  userId: string;
  deviceInfo = null
  IsIOSPhone = false
  wishlist: boolean;
  showVideowishlistADD: boolean = false;
  showVideowishlistRemove: boolean = false;
  @Output() AddwishlistClicked = new EventEmitter<boolean>();
  Videohreflink: string;
  VideoPlayButtonHide: boolean = true;
  defaultImageBig = "assets/images/DefaultImages/child_page_banner_default.png";
  defaultImage = "assets/images/DefaultImages/Loader_282x422.gif";
  IsLoggedIn: boolean = false;
  PlayVideoUrl: string;
  targetforlink: string;
  IsSubscriptionFinished: boolean = false;
  constructor(
    private sectionService: SectionService,
    private wishlistService: WishlistService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private localstorage: LocalStorageService,
    private _global: Global,
    private _userAccountService: UserAccountService,
    private _router: Router,
    public toastr: ToastrManager,
    private _sesstionStorageService: SessionStorageService,
    private _errorService: ErrorService,
    private _streamingService: StreamingService,
    private _activatedRoute: ActivatedRoute,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
  ) {
    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
    }
    else {
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
    this.contentDetails.thumbnails = "assets/images/DefaultImages/Loader_282x422.gif";
    // this.WishlistbtnName = "ADD TO WISHLIST";
    window.scrollTo(0, 0);
    $('.main_nav li')
      .children()
      .removeClass('menuHeighlight');
    $('.main_nav')
      .find('.Videos')
      .addClass('menuHeighlight');
    this.contentId = this.router.snapshot.queryParamMap.get('id');
    this.getContentDetailVideoChild();
    const userVal = localStorage.getItem('userMobile');
    if (userVal === '' || userVal == null) {
      this.wishlist = null;
    } else {
    }

    this.getDeviceFunction();

    if (this.localstorage.GetUserId()) {
      this.GetUserAccountSubList();
     // this.IsLoggedIn = true;
    }

  }

  getContentDetailVideoChild() {
    let data = {};
    // if user logged in
    var language = localStorage.getItem('lang');
    if (this.localstorage.GetUserId()) {
      data = {
        jwtToken: this.localstorage.GetUserJwtToken(),
        contentId: +this.contentId,
        portalId: this._global.PORTAL_ID,
        userId: +this.localstorage.GetUserId(),
        language: language
      };
    } else {
      data = {
        contentId: +this.contentId,
        portalId: this._global.PORTAL_ID,
        language: language
      };
    }
    this.spinner.show();
    this.sectionService
      .GetContentDetailsChild(data)
      .subscribe((response: any) => {
        this.spinner.hide();
        if (response) {
          if (response.contentDetail != null) {
            this.contentDetails = response.contentDetail;
            this.appInfo = response.contentDetail.appInfo;
            // this.yearOfRelease = response.contentDetail.yearOfRelease.split(
            //   '-'
            // )[0];
            localStorage.setItem('appId', response.contentDetail.appId);
            localStorage.setItem('contentId', response.contentDetail.contentId);

            // below code is used to check the content is added or not in wishlist
            // call the below api when user is logged in
            // other wise show the 'Add To Wishlist' by default
            if (this.localstorage.GetUserId()) {
              this.wishlistCheckcontent(response.contentDetail.contentId);
            } else {
              this.WishlistbtnName = "ADD TO WISHLIST";
              this.showVideowishlistADD = true;
              this.showVideowishlistRemove = false;
            }
          } else {
            this.contentDetails = {};
          }
        }
      });
  }

  //#region play movie section

  playMovie() {
    //if (this.localstorage.GetUserId()) {
    // user is logged in
    // check user is subscribed to play videos or not
    // if mappeditemtype ==2 or mappeditemtype == 0
    //this.GetUserAccountSubList();
    // } else {
    // open the login modal popup and checke the user has subscribed to play movie
    // if mappeditemtype ==2 or mappeditemtype == 0
    if (!this.localstorage.GetUserId()) {
      this.videoPlayMovieClicked.emit(true);     
        this.IsLoggedIn = false;
    }
    else {
      if(this.IsSubscriptionFinished ==true)
      {
        this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
        this._router.navigate(['Pricing']);
        this.IsSubscriptionFinished=false;
        this.IsLoggedIn = false;
      }
     // this.IsLoggedIn = true;
    }
    //}
  }

  //#endregion
  //#region on  User account subscription list
  GetUserAccountSubList() {
  
    this.spinner.show();
    var language = localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this.localstorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this.localstorage.GetUserId(),
      language: language
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {

        
        if (+data.statusDescription.statusCode === 400) {
        } else if (+data.statusDescription.statusCode === 200) {
          if (
            data.userSubscriptionList != null &&
            data.userSubscriptionList.length > 0
          ) {
            //Check active status is 706
            if (+data.userSubscriptionList[0].activeStatus !== +'706') {
              // redirect to account details is pack is already subscribed
              if (+data.userSubscriptionList[0].activeStatus === +'1'
                || +data.userSubscriptionList[0].activeStatus === 2) {
                if (
                  data.userSubscriptionList[0].mappedItemtypeId === '0' ||
                  data.userSubscriptionList[0].mappedItemtypeId === '2'
                ) {
                  // alert('user is subscribed to play video');
                  //Call link service to know the api status
                  //  const contentId = this._activatedRoute.paramMap.subscribe(params => {
                  // debugger;
                  const contentId = this.router.snapshot.queryParamMap.get('id');
                  const bodyData: VideoPlayLinkREQUEStBODyPOST = {
                    jwtToken: this.localstorage.GetUserJwtToken(),
                    ContentId: parseInt(contentId),
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

                      if (data.statusDescription !== null || data.statusDescription !== undefined) {
                        if (data.statusDescription.statusCode !== undefined) {
                          if (data.statusDescription.statusCode && data.link) {
                            if (+data.statusDescription.statusCode === 200) {
                              debugger;

                              if (data.isDirectPlay == false) {

                                //for live
                                //this._router.navigate(['/Video/' + this.contentId]);

                                // window.open(this.getUrl('#/Video/'+this.contentId), '_blank') 

                                //for staging
                            
                                // window.open('#/Video/' + this.contentId,'_blank');
                                this.Videohreflink = data.link;
                                this.spinner.hide();
                                this.targetforlink = "_blank"
                                this.IsLoggedIn = true;
                              }
                              else {
                                //Code for new tab video link
                           
                                this.spinner.hide();
                                this.Videohreflink = data.link;
                                this.IsLoggedIn = true;

                                if (this.IsIOSPhone == false) {
                              
                                  // window.open(data.link, '_blank')  
                                  this.targetforlink = "_blank"
                                  this.IsLoggedIn = true;
                                }
                                else {
                              
                                  // setTimeout(() => {
                                  //   debugger;
                                  //   $('#PlayVideo')[0].click();
                                  // }, 400);

                                  //this.openTab(data.link);
                                  this.Videohreflink = data.link;
                                  this.targetforlink = "_self"
                                  this.IsLoggedIn = true;
                                }
                              }
                            }
                            else {
                              return this.toastr.errorToastr(data.statusDescription.statusMessage, 'error', {
                                position: 'top-left'
                              });
                            }
                          }
                          else {
                            this.spinner.hide();
                          }
                        }
                        else {
                          this.spinner.hide();
                          return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
                            position: 'top-left'
                          });


                        }
                      }
                      else {
                        this.spinner.hide();
                        return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
                          position: 'top-left'
                        });

                      }

                    });
                  // user is subscribed to play video
                  // Todo: //
                  //});
                } else {
                  //alert('user is not subscribed for this service');
                  // this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
                  // this._router.navigate(['Pricing']);
                  this.spinner.hide();
                  this.IsSubscriptionFinished =true;
                }
              } else {
                // this._sesstionStorageService.SetUserIsNavigatedFromContentToFalse();
                // this._router.navigate(['Pricing']);
                 this.spinner.hide();
                this.IsSubscriptionFinished =true;
              }
            }
            else {
              //Open dialog box
              $('#modelOpenVideo').click();
              this.spinner.hide();

            }
          } else {
            // this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
            // this._router.navigate(['Pricing']);
             this.spinner.hide();

            this.IsSubscriptionFinished =true;
          }
          // active status 2 means pack is unsubscribed
        }
      });

  }


  openTab(url) {
    // Create link in memory
    var a = window.document.createElement("a");
    a.target = '_blank';
    a.href = url;

    // Dispatch fake click
    var e = window.document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };



  getDeviceFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();

    if (this.deviceInfo.os === 'iOS') {

      this.IsIOSPhone = true;
    }
    else {
      this.IsIOSPhone = false;
    }
  }
  //#endregion

  // private getUrl(link): string {

  //   debugger;
  //   let url = ''

  //   if (__.isArray(link)) {
  //     url = link[0]

  //     if (link[1]) {
  //       url += '?' + qs.stringify(link[1])
  //     }
  //   } else {
  //     url = link
  //   }

  //   return url
  // }


  //#region  Add whitlist
  Addwishlist() {
    const appId = localStorage.getItem('appId');
    const contentId = localStorage.getItem('contentId');
    const portletid = this.router.snapshot.queryParamMap.get('id');
    const userId = this.localstorage.GetUserId();
    if (userId != null) {
      if (this.WishlistbtnName == "ADD TO WISHLIST") {
        const data = {
          jwtToken: this.localstorage.GetUserJwtToken(),
          portalId: this._global.PORTAL_ID,
          userId: userId,
          portletid: portletid,
          userWishList: [
            {
              appId: appId,
              addFlag: 1,
              contentId: contentId,
            }
          ]
        };
        this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
          if (data) {
            if (+data.statusDescription.statusCode == 200) {
              // this.toastr.successToastr('Wishlist Add Successful', 'Success', {
              //   position: 'top-left'
              // });
              var language = localStorage.getItem('lang');
              if (language == "ar") {
                this.toastr.successToastr('أضف لقائمة الامنيات', 'نجاح', {
                  position: 'top-left'
                });
              }
              else {
                // this.toastr.successToastr('Wishlist Add Successful', 'Success', {
                //   position: 'top-left'
                // });
              }
              this.WishlistbtnName = "REMOVE FROM WISHLIST";
              this.showVideowishlistADD = false;
              this.showVideowishlistRemove = true;
            }
            else if (+data.statusDescription.statusCode == 151) {
              this.WishlistbtnName = "REMOVE FROM WISHLIST";
              this.showVideowishlistADD = false;
              this.showVideowishlistRemove = true;
              this.toastr.successToastr(data.statusDescription.statusMessage, 'Info', {
                position: 'top-left'
              });
            }
          }
        });
      }
      else if (this.WishlistbtnName == "REMOVE FROM WISHLIST") {
        const data = {
          jwtToken: this.localstorage.GetUserJwtToken(),
          portalId: this._global.PORTAL_ID,
          userId: userId,
          userWishList: [
            {
              appId: appId,
              addFlag: 0,
              contentId: contentId
            }
          ]
        };
        this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
          if (data) {
            if (+data.statusDescription.statusCode == 200 || +data.statusDescription.statusCode == 151) {
              // this.toastr.successToastr('Wishlist Remove Successful', 'Success', {
              //   position: 'top-left'
              // });
              var language = localStorage.getItem('lang');
              if (language == "ar") {
                this.toastr.successToastr(
                  'قائمة الامنيات إزالة ناجح',
                  'نجاح',
                  {
                    position: 'top-left'
                  }
                );
              }
              else {
                // this.toastr.successToastr(
                //   'Wishlist Remove Successful',
                //   'Success',
                //   {
                //     position: 'top-left'
                //   }
                // );
              }
              this.WishlistbtnName = "ADD TO WISHLIST";
              this.showVideowishlistADD = true;
              this.showVideowishlistRemove = false;
            }
            // else if (+data.statusDescription.statusCode == 151) {
            //   this.toastr.successToastr(data.statusDescription.statusMessage, 'Info', {
            //     position: 'top-left'
            //   });
            // }
          }
        });
      }

    }
  }

  //#endregion

  //#region  Check buttonname ADD  or Remove from Wishlist
  CheckWishlistbtnname() {
    this.spinner.show();
    const cId = localStorage.getItem('contentId');
    const usrId = this.localstorage.GetUserId();
    const userId = this.localstorage.GetUserId();
    if (userId != null) {
      const data = {
        jwtToken: this.localstorage.GetUserJwtToken(),
        portalId: this._global.PORTAL_ID,
        userId: usrId,
        // contentId: cId,
        contentId: this.router.snapshot.queryParamMap.get('id'),
      };
      this.wishlistService.GetAddRemoveWishlistData(data).subscribe((data: any) => {
        if (data) {
          if (data.isInWishlist == true) {
            this.WishlistbtnName = "REMOVE FROM WISHLIST";
            this.showVideowishlistADD = false;
            this.showVideowishlistRemove = true;
            this.Addwishlist();

            setTimeout(() => {
              this.spinner.hide();
            }, 200);
          }
          else {
            this.WishlistbtnName = "ADD TO WISHLIST";
            this.showVideowishlistADD = true;
            this.showVideowishlistRemove = false;
            this.Addwishlist();
            this.spinner.hide();
            setTimeout(() => {
              this.spinner.hide();
            }, 200);
          }
        }
      });
    }
    else if (this.userId == null) {
      this.AddwishlistClicked.emit(true);
    }

  }
  //#endregion

  //#region  check the content is added in whishlist or not
  wishlistCheckcontent(contentId: number) {
    const data = {
      jwtToken: this.localstorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: +this.localstorage.GetUserId(),
      contentId: this.router.snapshot.queryParamMap.get('id'),
    };
    this.wishlistService.GetAddRemoveWishlistData(data).subscribe((data: any) => {
      if (+data.statusDescription.statusCode == 200) {
        if (data.isInWishlist == true) {
          this.WishlistbtnName = "REMOVE FROM WISHLIST";
          this.showVideowishlistADD = false;
          this.showVideowishlistRemove = true;
        }
        else if (data.isInWishlist == false) {
          this.WishlistbtnName = "ADD TO WISHLIST";
          this.showVideowishlistADD = true;
          this.showVideowishlistRemove = false;
        }
      }
    });
  }
  ImageLoaded() {
    $('.image-profile').css({ opacity: 0 });
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
    $('#mainVideo').fadeIn();
    this.VideoPlayButtonHide = true;
  }

  UpdateNotFoundImage() {
    $('.image-profile').css({ opacity: 0 });
    $('.image-profile').attr('src', 'assets/images/not-found.png');
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
  }


  //#endregion
}
