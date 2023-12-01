import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BannerService } from '../Services/banner.service';
import { LocalStorageService } from '../Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationEnd } from '@angular/router';
import { UserAccountService } from '../Services/user-account.service';
import { Global } from '../global/global';
import { ErrorService } from '../Services/error.service';
import { BannerMainTextWithLoginREQUEStBodyPOST } from '../model/banner/api/banner-main-text-with-login-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BannerMainTextWithoutLoginREQUEStBodyPOST } from '../model/banner/api/banner-main-text-without-login-request-body-post';

@Component({
  selector: 'app-promotionalbanner',
  templateUrl: './promotionalbanner.component.html',
  styleUrls: ['./promotionalbanner.component.css']
})
export class PromotionalbannerComponent implements OnInit {
  bannerText: any;
  @Output() bannerClicked = new EventEmitter<boolean>();
  loggedIn = false;
  defaultImage="assets/images/DefaultImages/home_page_banner_default.png";

  constructor(
    private bannerService: BannerService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private _userAccountService: UserAccountService,
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService
  ) { }

  ngOnInit() {
    // this.GetBannerText();
    // this.getCurrentRouteUrlChange();
  }

  getCurrentRouteUrlChange() {
    this.route.events.subscribe(event => {
      
      if (event instanceof NavigationEnd) {
        if (event.url === '/?lang=ar' || event.url === '/?lang=en') {

          // this.GetBannerText();
       
          // this.GetBannerDataWithLogin();
          // this.GetBannerDataWithoutLogin();
        }
      }
    });
  }

  GetBannerText() {
  
    const userId = this.localStorageService.GetUserId();
    if (userId) {
      this.GetBannerDataWithLogin();
    } else {
      this.GetBannerDataWithoutLogin();
    }
  }

  BannerClicked() {
    
    const userId = this.localStorageService.GetUserId();
    if (!userId) {
      this.bannerClicked.emit(true);
    } else {
      this.loggedIn = true;
    }
  }
  GetBannerDataWithLogin() {
    // this.spinner.show();
    // var language = localStorage.getItem('lang');
    // let bodyData: BannerMainTextWithLoginREQUEStBodyPOST = {
    //   portalId: this._global.PORTAL_ID,
    //   pageName: 'Index Page',
    //   subPageId: 0,
    //   userId: +this._localStorage.GetUserId(),
    //   'language': language,
    //   jwtToken: this._localStorage.GetUserJwtToken(),
    // };
    // this.bannerService.GetMainBannerDynamicTextWithLogin(bodyData)
    //   .pipe(catchError(x => {
    //     this._errorService.LogError(x);
    //     return throwError(x);
    //   }))
    //   .subscribe((data) => {
      
    //     if (data.data[0]) {
    //       this.spinner.hide();
    //       this.bannerText = data.data[0];
    //     }
    //     // this.banner.text = data
    //   });
  }
  GetBannerDataWithoutLogin() {

    // var language = localStorage.getItem('lang');
    // const bodyData: BannerMainTextWithoutLoginREQUEStBodyPOST = {
    //   portalId: this._global.PORTAL_ID,
    //   pageName: 'Index Page',
    //   subPageId: 0,
    //   'language': language
    // };
    // this.bannerService.GetMainBannerDynamicTextWithoutLogin(bodyData)
    //   .pipe(catchError(x => {
    //     this._errorService.LogError(x);
    //     return throwError(x);
    //   }))
    //   .subscribe((data) => {
      
    //     if (data != null) {
    //       if (data.data[0]) {
    //         this.spinner.hide();
    //         this.bannerText = data.data[0];
    //       }
    //     }
    //   });
  }

}
