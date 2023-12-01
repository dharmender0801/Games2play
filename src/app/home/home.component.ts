import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HomeService} from "../Services/home.service";
import { BannerService } from '../Services/banner.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserAccountService } from '../Services/user-account.service';
import { Global } from '../global/global';
import { ErrorService } from '../Services/error.service';
import { BannerMainTextWithLoginREQUEStBodyPOST } from '../model/banner/api/banner-main-text-with-login-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BannerMainTextWithoutLoginREQUEStBodyPOST } from '../model/banner/api/banner-main-text-without-login-request-body-post';
import { BannerMainTextWithoutLoginRESPONSePOST } from '../model/banner/api/banner-main-text-without-login-response-post';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sections=[];
  bannerText: any;
  deviceInfo=null;
  IsIOSPhone=false;
  IsAndroidPhone: boolean = true;
  
  constructor(
    private homeService:HomeService,
    private bannerService:BannerService,
    private localStorageService:LocalStorageService,
    private spinner: NgxSpinnerService,
    private route:Router,
    private _userAccountService: UserAccountService,
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private deviceService: DeviceDetectorService,
    
  ) { }

  ngOnInit() {
   this.getHomeData();
  //  this.GetBannerText();
   this.getDeviceFunction();
  }

  getDeviceFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === 'Android') {
      
      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
    }
    else if(this.deviceInfo.os === 'iOS')
    {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
    }
    else
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
  }
  getHomeData(){
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    const userId = this.localStorageService.GetUserId();
    let data = {
      'userId':userId,
      'jwtToken': token,
      'portalId': this._global.PORTAL_ID,
      'pageId': 1,
      'subPageId': 0
    }
    this.homeService.GetHomePageData(data).subscribe((data: any) => {
      
      if (data) {
        
        this.sections=data.content
      }
    });
  }

  GetBannerText(){
   
    const userId = this.localStorageService.GetUserId();
    if (userId) {
      this.GetBannerDataWithLogin();
    } else {
   
      this.GetBannerDataWithoutLogin();
    }
  }
  GetBannerDataWithLogin() {
    var language =localStorage.getItem('lang');
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    this.spinner.show();
    let bodyData: BannerMainTextWithLoginREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      pageName: 'Index Page',
      subPageId: 0,
      userId: +this._localStorage.GetUserId(),
      language:language,
      jwtToken: token,
    };
    // this.bannerService.GetMainBannerDynamicTextWithLogin(bodyData)
    // .pipe(catchError(x => {
    //   this._errorService.LogError(x);
    //   return throwError(x);
    // }))
    // .subscribe((data) => {
     
    //   if (data.data) {
    //     this.spinner.hide();
    //     this.bannerText = data.data[0];
    //   }
    //   // this.banner.text = data
    // });
  }
  GetBannerDataWithoutLogin() {
    const bodyData: BannerMainTextWithoutLoginREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      pageName: 'Index Page',
      subPageId: 0
    };
    this.bannerService.GetMainBannerDynamicTextWithoutLogin(bodyData)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe((data) => {
     
      // if (data.data[0]) {
      //   this.spinner.hide();
      //   this.bannerText = data.data[0];
      // }
    });
  }
}
