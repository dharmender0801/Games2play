import { CommonJqueryService } from './../../Services/common-jquery.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SectionService } from '../../Services/section.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../../Services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Global } from '../../global/global';
import { UserAccountService } from '../../Services/user-account.service';
import { UserAccountDetailREQUEStBODyPOST } from '../../model/account/api/user-account-detail-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from '../../model/account/api/user-account-detail-response-post';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import qs from 'qs'
import { _ as __} from 'lodash'
import { DeviceDetectorService } from 'ngx-device-detector';
 import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { StreamingService } from 'src/app/Services/streaming.service';
declare var $: any;
@Component({
  selector: 'app-section-game-child',
  templateUrl: './section-game-child.component.html',
  styleUrls: ['./section-game-child.component.css']
})
export class SectionGameChildComponent implements OnInit {
  @Output() GamePlayMovieClicked = new EventEmitter<boolean>();
  @Output() GameWishlistClicked = new EventEmitter<boolean>();
  contentDetails :any = {};
  appInfo = {};
  contentId: string;
  yearOfRelease: string;
  showpromovideoURL = false;
  userId: string;
  IsIOSPhone = false
  deviceInfo = null
  WishlistgamebtnName: string;
  showgamewishlistADD: boolean = false;
  showgamewishlistRemove: boolean = false;
  gamehreflink:string;
  VideoPlayButtonHide: boolean = true;
  defaultImageBig="assets/images/DefaultImages/child_page_banner_default.png";
  defaultImage="assets/images/DefaultImages/Loader_282x282.gif";
  IsLoggedIn: boolean = false;
  PlayGameUrl: string;
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
    private _commonJqueryService: CommonJqueryService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService,
    private _streamingService: StreamingService
  ) { 
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
  
    this.contentDetails.thumbnails = "assets/images/DefaultImages/Loader_282x282.gif";
    this.contentId = this.router.snapshot.queryParamMap.get('id');
    this.getContentDetailGameChild();
    this.getDeviceFunction();
    
    if (this.localstorage.GetUserId()) {
      this.GetgameUserAccountSubList();
    }
  }

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


  getContentDetailGameChild() {
    let data = {};
    // if user logged in
    var language =localStorage.getItem('lang');
    if (this.localstorage.GetUserId()) {
      data = {
        jwtToken: this.localstorage.GetUserJwtToken(),
        contentId: +this.contentId,
        portalId: this._global.PORTAL_ID,
        userId: +this.localstorage.GetUserId(),
        language:language
      };
    } else {
      data = {
        contentId: +this.contentId,
        portalId: this._global.PORTAL_ID,
        language:language
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

            localStorage.setItem('appId', response.contentDetail.appId);
            localStorage.setItem('contentId', response.contentDetail.contentId);

            if (this.localstorage.GetUserId()) {
              //  this.wishlistCheckcontent(response.contentDetail.contentId);
              this.wishlistCheckGamecontent();
            } else {
              this.WishlistgamebtnName = "ADD TO WISHLIST";
              this.showgamewishlistADD = true;
              this.showgamewishlistRemove = false;
            }
          } else {
            this.contentDetails = {};
          }
        }
      });
  }

  playGame() {
    if (!this.localstorage.GetUserId()) {
      this.GamePlayMovieClicked.emit(true);
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
    }



    // if (this.localstorage.GetUserId()) {
    //   // user is logged in
    //   // check user is subscribed to play videos or not
    //   // if mappeditemtype ==2 or mappeditemtype == 0
    //   this.GetgameUserAccountSubList();
    // } else {
    //   // open the login modal popup and checke the user has subscribed to play movie
    //   // if mappeditemtype ==2 or mappeditemtype == 0
    //   this.GamePlayMovieClicked.emit(true);
    // }
  }

  GetgameUserAccountSubList() {
    this.spinner.show();
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this.localstorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this.localstorage.GetUserId(),
      language:language
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
            if (+data.userSubscriptionList[0].activeStatus !== +'706') {
              // redirect to account details is pack is already subscribed
              if (+data.userSubscriptionList[0].activeStatus === +'1'
                || +data.userSubscriptionList[0].activeStatus === 2) {
                if (
                  data.userSubscriptionList[0].mappedItemtypeId === '0' ||
                  data.userSubscriptionList[0].mappedItemtypeId === '3'
                ) {
                  // alert('user is subscribed to play ideo');
                  // this._router.navigate(['Game/'+this.contentId]);

                  //window.open(this.getUrl('#/Game/'+this.contentId), '_blank') previous code 
                this.GameplayWebLink();
                 // $('#Playgame')[0].click()
                  // this._router.navigate(["/"]).then(result=>{window.location.href = 'http://115.248.233.133:8081/notr-jewelaquarium/gamefiles/index.html';});
                  // user is subscribed to play video
                  // Todo: //
                } else {
                  //  alert('user is not subscribed for this service');
                
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
              $('#modelOpenGames').click();

            }


          } else {
            // this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
            // this._router.navigate(['Pricing']);
            this.spinner.hide();
            this.IsSubscriptionFinished =true;
          }
          // active status 2 means pack is unsubscribed
        }
        this.spinner.hide();
      });
  }

  private getUrl(link): string {
    let url = ''

    if (__.isArray(link)) {
      url = link[0]

      if (link[1]) {
        url += '?' + qs.stringify(link[1])
      }
    } else {
      url = link
    }

    return url
  }

  AddwishlistGame() {
   this.spinner.show();
    let appId = localStorage.getItem('appId');
    let contentId = localStorage.getItem('contentId');
    let userId = this.localstorage.GetUserId();
    const portletid = this.router.snapshot.queryParamMap.get('id');
    if (userId != null) {

      if (this.WishlistgamebtnName == "ADD TO WISHLIST") {
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
              // var language =localStorage.getItem('lang');
              // if(language=="ar"){
              //   this.toastr.successToastr('أضف لقائمة الامنيات', 'نجاح', {
              //     position: 'top-left'
              //   });
              // }
              // else{
              //   this.toastr.successToastr('Wishlist Add Successful', 'Success', {
              //     position: 'top-left'
              //   });
              // }   
              this.WishlistgamebtnName = "REMOVE FROM WISHLIST";
              this.showgamewishlistADD = false;
              this.showgamewishlistRemove = true;
              setTimeout(() => {
                this.spinner.hide();
            }, 1000);
            }
            else if (+data.statusDescription.statusCode == 151) {
              this.WishlistgamebtnName = "REMOVE FROM WISHLIST";
              this.showgamewishlistADD = false;
              this.showgamewishlistRemove = true;
              setTimeout(() => {
                this.spinner.hide();
            }, 1000);
              this.toastr.successToastr(data.statusDescription.statusMessage, 'Info', {
                position: 'top-left'
              });
            }
          }
        });
      }
      else if (this.WishlistgamebtnName == "REMOVE FROM WISHLIST") {
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
              var language =localStorage.getItem('lang');
              if(language=="ar"){
                this.toastr.successToastr(
                  'قائمة الامنيات إزالة ناجح',
                  'نجاح',
                  {
                    position: 'top-left'
                  }
                );
              }
              else{
                this.toastr.successToastr(
                  'Wishlist Remove Successful',
                  'Success',
                  {
                    position: 'top-left'
                  }
                );
              }
              this.WishlistgamebtnName = "ADD TO WISHLIST";
              this.showgamewishlistADD = true;
              this.showgamewishlistRemove = false;
              setTimeout(() => {
                this.spinner.hide();
            }, 1000);
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
    else if (this.userId == null) {
      this.GameWishlistClicked.emit(true);
    }
  }

  //#region  check the content is added in whishlist or not
  wishlistCheckGamecontent() {
    //this.spinner.show();
    const data = {
      jwtToken: this.localstorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: +this.localstorage.GetUserId(),
      contentId: this.router.snapshot.queryParamMap.get('id'),
    };
    this.wishlistService.GetAddRemoveWishlistData(data).subscribe((data: any) => {
      if (+data.statusDescription.statusCode == 200) {
        if (data.isInWishlist == true) {
          this.WishlistgamebtnName = "REMOVE FROM WISHLIST";
          this.showgamewishlistADD = false;
          this.showgamewishlistRemove = true;
        //   setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        }
        else if (data.isInWishlist == false) {
          this.WishlistgamebtnName = "ADD TO WISHLIST";
          this.showgamewishlistADD = true;
          this.showgamewishlistRemove = false;
        //   setTimeout(() => {
        //     this.spinner.hide();
        // }, 1000);
        }
      }
    });
  }

  //#endregion

  CheckGameWishlistbtnname() {
  //  this.spinner.show();
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
            this.WishlistgamebtnName = "REMOVE FROM WISHLIST";
            this.showgamewishlistADD = false;
            this.showgamewishlistRemove = true;
            this.AddwishlistGame();
          //   setTimeout(() => {
          //     this.spinner.hide();
          // }, 1000);
          }
          else {
            this.WishlistgamebtnName = "ADD TO WISHLIST";
            this.showgamewishlistADD = true;
            this.showgamewishlistRemove = false;
            this.AddwishlistGame();
          //   setTimeout(() => {
          //     this.spinner.hide();
          // }, 1000);
          }
        }
      });
    }
    else if (this.userId == null) {
      this.GameWishlistClicked.emit(true);
    }
  }
  ImageLoaded() {
    this._commonJqueryService.ImageLoaded();
    $('#mainGame').fadeIn();
    this.VideoPlayButtonHide= true;
  }
  UpdateNotFoundImage() {
    this._commonJqueryService.UpdateNotFoundImage();
  }

  GameplayWebLink(){
    this.contentId = this.router.snapshot.queryParamMap.get('id');
    const data = {
      HeaderRequest:this.deviceService,
      jwtToken: this.localstorage.GetUserJwtToken(),
      ContentId: this.contentId,
      userId: this.localstorage.GetUserId(),
    };
    this._streamingService.GetgameplayLink(data).subscribe((data: any) => {
      if (data) {
        if (data.statusDescription.statusCode == 200) {
          this.gamehreflink=data.link;
          window.open(this.gamehreflink,"_blank");
          console.log("Game Play Link");
          console.log(this.gamehreflink);
          this.IsLoggedIn=true;
          // setTimeout(() => {
          //   $('#Playgame')[0].click();
          // }, 200);
        }
        else if (data.statusDescription.statusCode == 501) {
           this.toastr.infoToastr('Game Not Found', 'Info', {
              position: 'top-left'
            });
        }
     
      }
   
    });
  }
}
