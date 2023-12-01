import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UserAccountDetailREQUEStBODyPOST } from '../model/account/api/user-account-detail-request-body-post';
import { LocalStorageService } from '../Services/local-storage.service';
import { Global } from '../global/global';
import { UserAccountService } from '../Services/user-account.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from '../model/account/api/user-account-detail-response-post';
import { StatusCodeService } from '../Services/status-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  deviceInfo=null;
  IsAndroidPhone=false;
  IsIOSPhone=false;
  subscribed = false;
  constructor(private translate: TranslateService,
    private _localStorage: LocalStorageService,
    private _userAccountService: UserAccountService,
    private _statusCodeService: StatusCodeService,
    private spinner: NgxSpinnerService,
    private _global: Global,
    private deviceService: DeviceDetectorService
    
    ) {
   // translate.setDefaultLang('en');
   if (localStorage.getItem('lang')=="ar" ){
    translate.setDefaultLang('ar');
  }
  else{
    translate.setDefaultLang('en');
  }
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
    else if(this.deviceInfo.os === 'Windows')
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
  }

  ngOnInit() {
    // this.GetAccountDetials();
  }

  RefreshHowItWorks()
  {
    this.GetAccountDetials();
  }

  GetAccountDetials(): any {
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID, 
      userId: this._localStorage.GetUserId(),
      language:language
    };

    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
         

          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
      
        if (+data.statusDescription.statusCode === +this._global.HTTP_CODE_304) {
          this._statusCodeService.StatusCodeIs304();
          return;
        }
        if (
          +data.statusDescription.statusCode !== 400 &&
          +data.statusDescription.statusCode !== 304
        ) {
          if (data.userSubscriptionList.length > 0) {
            if (data.userSubscriptionList[0].activeStatus === '1') {
              this.subscribed = true;
            
            } else {
              this.subscribed = false;
            
            }
          } else {
            this.subscribed = false;
          
          }
        } else {
          this.subscribed = false;
          
        }
        this.spinner.hide();
      });
 
  }

//   useLanguage(language: string) {
//     this.translate.use(language);
// }



}
