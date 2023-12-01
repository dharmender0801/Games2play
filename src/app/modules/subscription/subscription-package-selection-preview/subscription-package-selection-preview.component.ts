import { ErrorService } from 'src/app/Services/error.service';
import { SubscriptionPopupComponent } from './../subscription-popup/subscription-popup.component';
import { Global } from "./../../../global/global";
import { Component, OnInit, Output, EventEmitter, ViewChild } from "@angular/core";
import { SubscriptionProduct } from "src/app/model/subscription/subscription-product";
import { catchError } from "rxjs/operators";
import { SubscriptionService } from "src/app/Services/subscription.service";
import { throwError, Observable } from "rxjs";
import { SubscriptionProductGetProductsModelApi } from "src/app/model/subscription/api/subscription-product-get-products-model-api";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { NewSubscriptionBodyPOST } from 'src/app/model/subscription/new-subscription';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { UserAccountDetailRESPONSePOST } from '../../../model/account/api/user-account-detail-response-post';
import { UserAccountDetailREQUEStBODyPOST } from '../../../model/account/api/user-account-detail-request-body-post';
import { UserAccountService } from '../../../Services/user-account.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { SubscriptionPopupUpgradeComponent } from '../subscription-popup-upgrade/subscription-popup-upgrade.component';
import { ToasterService } from 'src/app/Services/toaster.service';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

declare var $: any;

@Component({
  selector: "app-subscription-package-selection-preview",
  templateUrl: "./subscription-package-selection-preview.component.html",
  styleUrls: ["./subscription-package-selection-preview.component.css"]
})
export class SubscriptionPackageSelectionPreviewComponent implements OnInit {
  packageSelected: SubscriptionProduct;
  allProducts: SubscriptionProduct[];
  daily = "Daily";
  weekly = "Weekly";
  monthly = "Monthly";
  currentTime: string;
  singleWasSelected: boolean = false;
  singleWhichWasSelected: SubscriptionProduct;
  singlePackageRate: number;
  allInOnePackageRate: number;

  hasPackageSubscribed: string;
  loginfrom: boolean = false;

  @Output() subscriptionConfirmClicked = new EventEmitter<boolean>();
  @Output() setUserHasFreeTrial = new EventEmitter();
  @ViewChild(SubscriptionPopupComponent) subscriptionPopupComponent: SubscriptionPopupComponent;
  @ViewChild(SubscriptionPopupUpgradeComponent) subscriptionPopupUpgradeComponent: SubscriptionPopupUpgradeComponent;

  constructor(
    private _global: Global,
    private _subscriptionService: SubscriptionService,
    private _userAccountService: UserAccountService,
    private _localStorage: LocalStorageService,
    private _loaderService: NgxSpinnerService,
    private _router: Router,
    private _sessionStorageService: SessionStorageService,
    private _errorService: ErrorService,
    private _toasterService: ToasterService,
    private translate: TranslateService
  ) { if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    } }

  ngOnInit() {
    this.allProducts = [];
    this.SetupSelectedPackage();
    this.GetProductList();
    this.GetUserAccountSubList();
  }
  SetupSelectedPackage(): any {
    this.packageSelected = JSON.parse(
      localStorage.getItem(this._global.SUBSCRIPTION_PURCHASE_DETIALS)
    );
    if (this.packageSelected.mappedItemtypeId !== 0) {
      this.singleWasSelected = true;
      this.singleWhichWasSelected = this.packageSelected;
    }
    this.currentTime = this.packageSelected.packType;
    // console.log(this.packageSelected);
  }

  SetSingleAndAllInOnPackageRatesForView() {
    if (this.singleWasSelected) {
      if (this.allProducts) {
        if (this.allProducts.length > 0) {
          for (let i = 0; i < this.allProducts.length; i++) {
            const element = this.allProducts[i];
            if (this.currentTime === element.packType) {
              if (
                element.mappedItemtypeId !==
                this.singleWhichWasSelected.mappedItemtypeId
              ) {
                this.singlePackageRate = element.pricePoint;
              }
            }
          }
        }
      }
    }

    if (this.allProducts) {
      if (this.allProducts.length > 0) {
        for (let i = 0; i < this.allProducts.length; i++) {
          const element = this.allProducts[i];
          if (element.packType === this.currentTime) {
            if (element.mappedItemtypeId === 0) {
              this.allInOnePackageRate = element.pricePoint;
            }
          }
        }
      }
    }
  }

  NewSubscription(hasPackageSubscribed: string) {
    this.GetUserSubscriptionDetails()
      .pipe(
        catchError(x => {
          console.log(x);
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
      
        if (data.userSubscriptionList) {
          if (data.userSubscriptionList.length > 0 && +data.userSubscriptionList[0].activeStatus === 1 ) {
              let isUserNavigatedFromContent =  this.GetIfUserHasNavigatedFromContent();
              if (isUserNavigatedFromContent === 'true') {
                this.UpgradeSubscription();
                return;
              }
          }
        }
        if (+data.statusDescription.statusCode == 400) {
        } else if (+data.statusDescription.statusCode == 200) {
          if (data.userSubscriptionList.length > 0) {
            localStorage.setItem('checkSuccesStatus', data.userSubscriptionList[0].activeStatus)
          }
          // active status 2 means pack is unsubscribed
        }
        // 30 minutes check for subscription
        // 1 meanes pack is subscribed
        if (hasPackageSubscribed === '1') {

          this._router.navigate(['Pricing/success']);
          return;
        }

        var startYourSubscription = localStorage.getItem('startYourSubscription');
        if (startYourSubscription == undefined || startYourSubscription == "" || startYourSubscription == null) {
          this.loginfrom = false;
        } else {
          this.loginfrom = JSON.parse(startYourSubscription);
        }

        if (this._localStorage.GetUserId()) {

          this.setUserHasFreeTrial.emit();
          let userHasFreeTrial = this._localStorage.GetUserHasFreeTrialKey();
          if (userHasFreeTrial === 'True' || userHasFreeTrial === 'true') {// Only open if user has free trial
            $('#btnOpenFreeTrialModal').click();
          } else {
            if (!this.loginfrom) {
              $('#OpenSubscriptionModal').click();
              this.subscriptionPopupComponent.NewSubscriptionGenerateOTP();
            }
            else {
              this._loaderService.show();
              this._localStorage.SetStartYourSubscription('false');
              this.SubscribeUserLoginFromOtherButtonPresses();


            }
          }
          // this.subscriptionPopupComponent.NewSubscriptionGenerateOTP();
        } else {
          this.subscriptionConfirmClicked.emit(true);
        }
      });
  }

  SubscribeUserLoginFromOtherButtonPresses(): any {
   
    const jewToken = this._localStorage.GetUserJwtToken();
    
  var language =localStorage.getItem('lang');

    const newSubBodyPost: NewSubscriptionBodyPOST = {
      userId: +this._localStorage.GetUserId(),
      productId: this._localStorage.GetSubscriptionPackageDetails().productId,
      jwtToken: jewToken,
      portalId: 72
    };
    const accountBody: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: jewToken,
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };

    this._userAccountService.GetAccountDetail(accountBody)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe((responseData:UserAccountDetailRESPONSePOST) => {
     
     if(responseData.statusDescription.statusCode=="712")
     {
      return this._toasterService.ShowErrorTopLeft(responseData.statusDescription.statusMessage, 'error');
     }
      if (responseData.userSubscriptionList.length === 0) { // Direct sub if the user has never subscribed before
        const productSubscriber = this._subscriptionService
        .DirectSubCall(newSubBodyPost)
        .subscribe(data => {
          this._router.navigate(['Pricing/success']);
          this._loaderService.hide();
        });

      } else {
        if (responseData.userSubscriptionList.length > 0) {

          const subActiveStatus = +responseData.userSubscriptionList[0].activeStatus;
          if (subActiveStatus === 1) { // User is already subscribed in some pack
            this._router.navigate(['Pricing/success']);
            this._loaderService.hide();
          } else if (subActiveStatus === 2 || subActiveStatus === 706){// User is unsubscribed, need to upgrade pack

            this.UpgradeSubscription();
          }
        }
      }

    });
  }
  UpgradeSubscription() {
    $('#OpenUpgradeSubscriptionModal').click();
    this.subscriptionPopupUpgradeComponent.UpgradeSubscriptionGenerateOTP();
    this.subscriptionPopupUpgradeComponent.GetUserNumber();
  }
  GetIfUserHasNavigatedFromContent(): string {
    return this._sessionStorageService.GetUserIsNavigatedFromContentForSubUpgradeRequest();
  }

  NewSubscriptionGenerateOTP() {
    $('#OpenSubscriptionModal').click();
    this.subscriptionPopupComponent.NewSubscriptionGenerateOTP();
  }
  GetProductList() {
    const currentProdMappedType = this._localStorage.GetMappedItemtypeId();
    const productSubscriber = this._subscriptionService
      .GetAllProducts()
      .pipe(
        catchError(x => {
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SubscriptionProductGetProductsModelApi) => {
        this.allProducts = data.productList;
        this.SetSingleAndAllInOnPackageRatesForView();
        productSubscriber.unsubscribe();
      });
  }

  SetupProductBasedOnTime(packType: string) {
    this.currentTime = packType;
    for (let i = 0; i < this.allProducts.length; i++) {
      const element = this.allProducts[i];
      if (
        element.packType === packType &&
        element.mappedItemtypeId === this.packageSelected.mappedItemtypeId
      ) {
        this.packageSelected = element;
        break;
      }
    }
    localStorage.setItem(
      this._global.SUBSCRIPTION_PURCHASE_DETIALS,
      JSON.stringify(this.packageSelected)
    );
    this.SetSingleAndAllInOnPackageRatesForView();
  }
  GetMatchingProduct(packType: string): any { }
  AllInOneClicked() {
    const currentProdMappedType = this._localStorage.GetMappedItemtypeId();
    const productSubscriber = this._subscriptionService
      .GetAllProducts()
      .pipe(
        catchError(x => {
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SubscriptionProductGetProductsModelApi) => {
        if (data) {
          if (data.productList) {
            if (data.productList.length > 0) {
              for (let i = 0; i < data.productList.length; i++) {
                const element = data.productList[i];
                if (element.packType === this.currentTime) {
                  if (element.mappedItemtypeId === 0) {
                    this.packageSelected = element;
                    this.SetSingleAndAllInOnPackageRatesForView();
                    this._localStorage.SaveProductDetials(this.packageSelected);
                  }
                }
              }
            }
          }
        }
        productSubscriber.unsubscribe();
      });
  }
  SingleIsClickable() {
  
    if (!this.singleWasSelected) {
      return;
    }
    for (let i = 0; i < this.allProducts.length; i++) {
      const element = this.allProducts[i];
      if (element.packType === this.currentTime) {
        if (
          this.singleWhichWasSelected.mappedItemtypeId ===
          element.mappedItemtypeId
        ) {
          this.packageSelected = element;
          this._localStorage.SaveProductDetials(this.packageSelected);
        }
      }
    }
  }

  GetUserAccountSubList() {
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
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        if (+data.statusDescription.statusCode == 400) {
        } else if (+data.statusDescription.statusCode == 200) {
          if (data.userSubscriptionList.length > 0) {
            this.hasPackageSubscribed = data.userSubscriptionList[0].activeStatus;
          }else{
            this.hasPackageSubscribed = '2';
          }
          // active status 2 means pack is unsubscribed
        }
      });
  }

  GetUserSubscriptionDetails(): Observable<any> {
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };
    return this._userAccountService
      .GetAccountDetail(bodyData)

  }


}
