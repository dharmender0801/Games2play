import { StatusCodeService } from './../Services/status-code.service';
import { BannerMainTextWithLoginREQUEStBodyPOST } from './../model/banner/api/banner-main-text-with-login-request-body-post';
import { BannerMainTextWithLoginRESPONSePOST } from './../model/banner/api/banner-main-text-with-login-response-post';
import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { BannerService } from '../Services/banner.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Route, Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';
import { UserAccountService } from '../Services/user-account.service';
import { UserAccountDetailREQUEStBODyPOST } from '../model/account/api/user-account-detail-request-body-post';
import { Global } from '../global/global';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { ErrorService } from '../Services/error.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
declare var $ : any;
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banner : any = {};
  subscribed = false;
  userId: string;
  IsAndroidPhone=false
  IsIOSPhone=false
  @Output() subscribeTodayClicked = new EventEmitter<boolean>();
  @Output() refreshhowitworks = new EventEmitter<boolean>();
  deviceInfo=null
  showbanner=false;
 
  defaultImageBanner="assets/images/Loader786.gif";
 
  constructor(
    private bannerService: BannerService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private _userAccountService: UserAccountService,
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private _statusCodeService: StatusCodeService,
    private deviceService: DeviceDetectorService,
    private translate: TranslateService
  ) {
    
if (localStorage.getItem('lang')=="ar" ){
  translate.setDefaultLang('ar');
}
else{
  translate.setDefaultLang('en');
}
  }


  ImageLoaded() {
    $('.image-profile').css({ opacity: 0 });
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
    $('#mainBanner').fadeIn();
  }

  UpdateNotFoundImage() {
    $('.image-profile').css({ opacity: 0 });
    $('.image-profile').attr('src', 'assets/images/not-found.png');
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  getDeviceFunction() {
   
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
   
    if (this.deviceInfo.os === 'Android') {
      this.IsAndroidPhone = true;
      this.IsIOSPhone=false
    }
    else if(this.deviceInfo.os === 'iOS')      
    { 
      this.IsIOSPhone=true;
      this.IsAndroidPhone = false;
    }
    else
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone=false
    }
  }
  ngOnInit() {
    this.banner.banner = "assets/images/DefaultImages/home_page_banner_default.png";
    this.getDeviceFunction();
    //this.spinner.show();
    const subscribeVal = localStorage.getItem('subscribed');
    if (subscribeVal === 'undefined') {
      this.subscribed = null;
    } else {
      this.subscribed = JSON.parse(localStorage.getItem('subscribed'));
    }
    // this.GetAccountDetials();
    this.refreshhowitworks.emit(true);
    //lang change
  }

  
  GetAccountDetials(): any {
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };

  }

  GetBannerData() {
    var language =localStorage.getItem('lang');
    const userId = this.localStorageService.GetUserId();
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    // if (userId) {
    //   const data = {
    //     portalId: 72,
    //     pageName: 'Index Page',
    //     subPageId: 0,
    //     userId: userId,
    //     'language':language,
    //     'jwtToken': token,
    //   };
     
    //   this.bannerService
    //     .GetBannerData(data)
    //     .pipe(
    //       catchError(x => {
    //         this._errorService.LogError(x);
    //         return throwError(x);
    //       })
    //     )
    //     .subscribe((data: any) => {
    //       if (data) {
           
    //       }
         
    //     });
    // } else {
    //   const data = {
    //     portalId: 72,
    //     pageName: 'Index Page',
    //     subPageId: 0,
    //     'language':language
    //   };
    //  // this.spinner.show();
    //   this.bannerService
    //     .GetBannerData(data)
    //     .pipe(
    //       catchError(x => {
    //         this._errorService.LogError(x);
    //         return throwError(x);
    //       })
    //     )
    //     .subscribe((data: any) => {
    //       if (data) {
           
    //       }
         
    //     });
    // }
  }
  SplitTheBannerText(bannerData: any) {
    const arrayOfStringsToShow: string[] = [];
    bannerData.data[0].bannerText.forEach(ele => {
      const res = ele.split('#');
      if (res.length > 1) {
        res.forEach(splitContent => {
          arrayOfStringsToShow.push(splitContent);
        });
      } else {
        arrayOfStringsToShow.push(ele);
      }
    });
    
    bannerData.data[0].bannerText = arrayOfStringsToShow;
    //setTimeout(() => {
      this.banner = bannerData.data[0];
      
    //}, 1000);
    
    this.showbanner=true;
  
  }

  GetBannerDataLogin() {
   
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    var language =localStorage.getItem('lang');
    const data = {
      portalId: 72,
      pageName: 'Index Page',
      subPageId: 0,
      userId: this._localStorage.GetUserId(),
      'language':language,
      'jwtToken': token,
    };
    
    //this.spinner.show();
    // this.bannerService.GetBannerData(data).subscribe((data: any) => {
    
    //   if (data) {
       
    //   //  this.spinner.hide();
      
    //     if(data.data)
    //     {
        
    //     }
    //   }
    // });
  }

  subscribeToday() {
    localStorage.setItem('startYourSubscription', 'true');
    this.route.navigate(['./Pricing']);
    // this.userId = this.localStorageService.GetUserId();
    // if(this.userId!=null){
    //   this.route.navigate(['./Pricing']);
    // }
    // else if(this.userId==null){
    //   this.subscribeTodayClicked.emit(true);
    // }
  }

  bannerlanguageChanged(){
 
    this.GetBannerData();
    //this.GetBannerData();
  
  }
}
