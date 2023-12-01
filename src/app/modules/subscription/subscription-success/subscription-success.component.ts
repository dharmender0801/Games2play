import { Component, OnInit } from '@angular/core';
import { UserAccountDetailREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { Global } from 'src/app/global/global';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { ErrorService } from 'src/app/Services/error.service';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
declare var $:any;
@Component({
  selector: 'app-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.css']
})
export class SubscriptionSuccessComponent implements OnInit {
  constructor(
    private _global: Global,
    private _localStorage: LocalStorageService,
    private _errorService: ErrorService,
    private _userAccountService: UserAccountService,
    private _loaderService:NgxSpinnerService,
    private translate: TranslateService
  ) {if (localStorage.getItem('lang')=="ar" ){
    translate.setDefaultLang('ar');
  }
  else{
    translate.setDefaultLang('en');
  }}

  billedDate: number;
  productType: string;
  productName: string;
  startYourSubscription:boolean=false;

  ngOnInit() {
    this.modalblackPresent();
    // var startYourSubscription = localStorage.getItem('startYourSubscription');
            // if (startYourSubscription == undefined || startYourSubscription == "" || startYourSubscription == null) {
            //   this.startYourSubscription = false;
            // } else {
            //   this.startYourSubscription = JSON.parse(startYourSubscription);
            // }
            window.scrollTo(0,0);
    this.GetAccountUserAccountDetial();

  }

  redirectToHomePage() {
    setTimeout (() => {
      $('#BrowseArena').click();
      }, 10000);
  }

  modalblackPresent(): any {
    let element= $('.modal-backdrop');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  GetAccountUserAccountDetial() {
   
    this._loaderService.show();
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };
    const userAccountDetial = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {

        if (data.userSubscriptionList.length>0) {
          var checkSuccesStatus= localStorage.getItem('checkSuccesStatus');
          // if(data.userSubscriptionList[0].activeStatus=="1"){
          //   // pack is subscribed
          //   this.startYourSubscription=true;
          // }
          // else if(data.userSubscriptionList[0].activeStatus=="2"){
          //   // pack is unsubscribed
          //   this.startYourSubscription=false;
          // }

          if(checkSuccesStatus=="1"){
            this.startYourSubscription=true;
          }else if(checkSuccesStatus=="2"){
            this.startYourSubscription=false;
          }

          this.SetPackageType(data);
          if (data.userSubscriptionList[0].productName) {
            this.productName = data.userSubscriptionList[0].productName;
          }
          if (data.userSubscriptionList[0].meta2.toLowerCase() === 'freetrail') {
            this.billedDate = data.userSubscriptionList[0].expiryDate;
          } else if (data.userSubscriptionList[0].meta2.toLowerCase() === 'paid') {
            this.billedDate = data.userSubscriptionList[0].chargeDate;
          } else {
            this.billedDate = null;
          }
        }
        this._loaderService.hide();
        this.redirectToHomePage();
      });

  }
  SetPackageType(data: UserAccountDetailRESPONSePOST): any {
    if (+data.userSubscriptionList[0].mappedItemtypeId === 0) {
      this.productType = 'All in one Package';
    } else {
      this.productType = 'Single Package';
    }
  }
}
