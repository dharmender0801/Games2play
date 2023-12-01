import { ToasterService } from './../../../Services/toaster.service';
import { UnsubscribeUserProductApiResponsePost } from './../../../model/subscription/api/unsubscribe-user-product-api-response-post';
import { ErrorService } from './../../../Services/error.service';
import { UserAccountDetailREQUEStBODyPOST } from './../../../model/account/api/user-account-detail-request-body-post';
import { UserAccountService } from './../../../Services/user-account.service';
import { Global } from 'src/app/global/global';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserSubscriptionHistory } from 'src/app/model/subscription/api/user-subscription-history';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { UserSubscriptionHistoryREQUEStBODyPOST } from 'src/app/model/subscription/api/user-subscription-history-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserSubscriptionHistoryRESPONSePOST } from 'src/app/model/subscription/api/user-subscription-history-response-post';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { UserSubscription } from 'src/app/model/account/user-subscription-list';
import { UnsubscribeUserProductApiRequestBodyPost } from 'src/app/model/subscription/api/unsubscribe-user-product-api-request-body-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductChangeFrequencyRequestPost, ProductChangeFrequencyResponsePost, ProductList } from '../../../model/account/api/product-change-frequency';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionProduct } from "src/app/model/subscription/subscription-product";
import { SubscriptionProductGetProductsModelApi } from "src/app/model/subscription/api/subscription-product-get-products-model-api";
import { SubscriptionRequestPinUpdateChangePackRequestBodyPOST } from '../../../model/subscription/subscription-update-change-pack-request-body-post';
import { SubscriptionConfirmPinUpdateChangePackResponseBodyPOST } from '../../../model/subscription/subscription-confirm-pin-update-change-pack-response-body-post';
import { UserPinSubscription } from '../../../model/subscription/user-pin-subscription';
import { ToastrManager } from 'ng6-toastr-notifications';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
declare var $: any;

@Component({
  selector: 'app-user-account-detail-subscriptions',
  templateUrl: './user-account-detail-subscriptions.component.html',
  styleUrls: ['./user-account-detail-subscriptions.component.css']
})
export class UserAccountDetailSubscriptionsComponent implements OnInit {
  previousSubscription: UserSubscriptionHistory[];
  daily = 'Daily';
  weekly = 'Weekly';
  monthly = 'Monthly';
  subscritionList: UserSubscription[];
  accountDetial: UserAccountDetailRESPONSePOST;
  currentProductToUnsubscribe: UserSubscription;
  packageSelected: SubscriptionProduct;
  allProducts: SubscriptionProduct[];
  // change billing frequency
  productList: ProductList[];
  hasPackageTypeSelected: boolean = false;
  selectedPackageType: string;
  selectedPricePoint: string;
  ProductPackageType: string;
  billingFrequencyCurrentDate: string;
  public showsubspack: boolean = false;
  productId: string;
  userPinSubscription: UserPinSubscription;
  SelectedProduct: string;
  UpgradeErrorMessage: string;
  @Output() resetResendOTP = new EventEmitter();
  @Output() resetmenuheader = new EventEmitter();

  constructor(
    private _localStorage: LocalStorageService,
    private _subscriptionServuice: SubscriptionService,
    private _global: Global,
    private _userAccountService: UserAccountService,
    private _subscriptionService: SubscriptionService,
    private _loggingService: ErrorService,
    private _toasterService: ToasterService,
    private _loaderService: NgxSpinnerService,
    public toastr: ToastrManager,
    private router: Router,
    private translate: TranslateService
  ) {   if (localStorage.getItem('lang')=="ar" ){
    translate.setDefaultLang('ar');
  }
  else{
    translate.setDefaultLang('en');
  } }

  ngOnInit() {
    $('.main_nav li').children().removeClass('menuHeighlight');
    this.allProducts = [];
    this.GetSubscriptionDataPreviousSubs();
    this.GetUserAccountSubList();
  }
  GetSubscriptionDataPreviousSubs() {
  
    this._loaderService.show();
    this.previousSubscription = [];
    
  var language =localStorage.getItem('lang');
 
    const bodyData: UserSubscriptionHistoryREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };
    const subscriber = this._subscriptionServuice
      .GetUserSubscriptionHistoryList(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserSubscriptionHistoryRESPONSePOST) => {
      
        this._loaderService.hide();
        this.previousSubscription = data.history;
        subscriber.unsubscribe();
      });
  }

  GetUserAccountSubList() {
   
    this._loaderService.show();
    this.subscritionList = [];
    
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
        this._loaderService.hide();
        this.accountDetial = data;
        const testingData: UserSubscription[] = [
          {
            id: 366,
            userId: 164,
            msisdn: '971564745875',
            productId: '1436',
            productName: 'Arena Bundle Monthly',
            subscriptionDate: 1549864634000,
            chargeDate: 1549864638000,
            expiryDate: 1551592638000,
            amount: '8000',
            channel: 'APP',
            productType: 'Monthly',
            meta1: 'PINAPI',
            meta2: 'Paid',
            mappedItemtypeId: '0',
            activeStatus: '1',
            validity: 20
          },
          {
            id: 367,
            userId: 164,
            msisdn: '971564745875',
            productId: '1436',
            productName: 'Arena Bundle Monthly',
            subscriptionDate: 1549864634000,
            chargeDate: 1549864638000,
            expiryDate: 1551592638000,
            amount: '8000',
            channel: 'APP',
            productType: 'Monthly',
            meta1: 'PINAPI',
            meta2: 'Paid',
            mappedItemtypeId: '0',
            activeStatus: '1',
            validity: 20
          }
        ];

        if (data.userSubscriptionList.length != 0) {
          
          this.subscritionList = data.userSubscriptionList;
        }
        else {
          this.showsubspack = true;
        }
      });
  }

  UnsubscribeUserFromProduct(val: UserSubscription) {
    this._loaderService.show();
    const model: UnsubscribeUserProductApiRequestBodyPost = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      productId: val.productId,
      userId: this._localStorage.GetUserId()
    };
    const subscriber = this._subscriptionService
      .UnsubscribeProduct(model)
      .pipe(
        catchError(x => {
          console.log(x);
          this._loggingService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: UnsubscribeUserProductApiResponsePost) => {
        this._loaderService.hide();
        $('.modal-header .close').click();
        if (+data.statusDescription.statusCode === +this._global.HTTP_CODE_200) {
          // this._toasterService.ShowSuccessTopLeft(
          //   data.statusDescription.statusMessage,
          //   'Unsubscribed successfully'
          // );
          //Emit here
          this.resetmenuheader.emit();
          this.GetUserAccountSubList();
          

          localStorage.setItem('subscribed', 'false');

        } else {
          // this._toasterService.ShowErrorTopLeft(
          //   data.statusDescription.statusMessage,
          //   'Error'
          // );
        }
        this.GetSubscriptionDataPreviousSubs();
      });
  }

  SetupCurrentProductToUnsubscribe(val: UserSubscription) {
    this.currentProductToUnsubscribe = val;
  }

  changeBillingFrequency(productId: string, mappedItemtypeId: string) {
    this._loaderService.show();
    // const monthLongNames = ["January", "February", "March", "April", "May", "June",
    //   "July", "August", "September", "October", "November", "December"
    // ];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const date = new Date();
    var currentDate = date.getDate();
    var month = monthNames[date.getMonth()];
    var currentYear = date.getFullYear();

    var finalDate = month + " " + currentDate + "," + " " + currentYear;
    this.billingFrequencyCurrentDate = finalDate;

    this.hasPackageTypeSelected = false;
    this.ProductPackageType = "";
    this.productId = "";

    var language =localStorage.getItem('lang');

    const bodyData: ProductChangeFrequencyRequestPost = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      userId: +this._localStorage.GetUserId(),
      portalId: this._global.PORTAL_ID,
      mappedItemtypeId: +mappedItemtypeId,
      productId: +productId,
      language:language
    };
    const subscriber = this._subscriptionServuice
      .GetProductChangeFrequency(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: ProductChangeFrequencyResponsePost) => {
        if (+data.statusDescription.statusCode == +this._global.HTTP_CODE_200) {
          
          this.productList = data.productList;
          
          $('#changeBillingFrequencyHidden').click();
          this._loaderService.hide();
        } else if (+data.statusDescription.statusCode == 304) {
          this.UpgradeErrorMessage=data.statusDescription.statusMessage;
          $('#modelOpenUpgradeError').click();
          // this._toasterService.ShowErrorTopLeft(
          //   data.statusDescription.statusMessage,
          //   'Error'
          // );
        }
      });
  }
  changePackType(packtype: string, pricePoint: string, productId: string) {
    this.hasPackageTypeSelected = true;
    this.selectedPricePoint = pricePoint;
    this.ProductPackageType = packtype;
    this.productId = productId;
    if (packtype == "Daily") {
      if (localStorage.getItem('lang')=="ar" ){
        this.translate.setDefaultLang('ar');
        this.selectedPackageType = "يوم"
      }
      else{
        this.translate.setDefaultLang('en');
        this.selectedPackageType = "DAY"
      }
     
    } else if (packtype == "Weekly") {
      if (localStorage.getItem('lang')=="ar" ){
        this.translate.setDefaultLang('ar');
        this.selectedPackageType = "أسبوع"
      }
      else{
        this.translate.setDefaultLang('en');
        this.selectedPackageType = "WEEK"
      }
     
    } 
    else if (packtype == "Monthly") {
      if (localStorage.getItem('lang')=="ar" ){
        this.translate.setDefaultLang('ar');
        this.selectedPackageType = "شهر"
      }
      else{
        this.translate.setDefaultLang('en');
        this.selectedPackageType = "MONTH"
      }
      
    }
  }
  showSubscribepack(item: any) {
    localStorage.setItem('productId', item.productId);
    localStorage.setItem('mappedItemtypeId', item.mappedItemtypeId);
    localStorage.setItem('productType', item.productType);
    var packType = item.productType;
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
        var productId = parseInt(localStorage.getItem('productId'));
        var mappedItemtypeId = parseInt(localStorage.getItem('mappedItemtypeId'));
        var packType = localStorage.getItem('productType');
        for (let i = 0; i < this.allProducts.length; i++) {
          const element = this.allProducts[i];
          if (
            element.productId == productId && element.mappedItemtypeId == mappedItemtypeId &&
            element.packType == packType
          ) {
            this.packageSelected = element;
            break;
          }
        }
        localStorage.setItem(
          this._global.SUBSCRIPTION_PURCHASE_DETIALS,
          JSON.stringify(this.packageSelected)
        );
        this.router.navigate(['Pricing/preview']);
      });
  }

  updateSubscription(productId: string) {
  
    this.resetResendOTP.emit();
    this.SelectedProduct = productId;
    this._loaderService.show();
    const bodyData: SubscriptionRequestPinUpdateChangePackRequestBodyPOST = {
      userId: +this._localStorage.GetUserId(),
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      productId: productId,
    }

    const productSubscriber = this._subscriptionService
      .UpdateChangeRequestPinSubscriptionPack(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SubscriptionConfirmPinUpdateChangePackResponseBodyPOST) => {

      if(data.statusDescription.statusCode=="711")
      {
        this.UpgradeErrorMessage=data.statusDescription.statusMessage;
        $('#modelOpenUpgradeError').click();
        //return this._toasterService.ShowErrorTopLeft(data.statusDescription.statusMessage, 'error');
      }

        if (+data.statusDescription.statusCode == +this._global.HTTP_CODE_200) {
          this.userPinSubscription = data.userPinSubscription;
          localStorage.setItem(this._global.Upgrade_User_Pin_Subscription_Details,JSON.stringify(data.userPinSubscription))
          $("#upgradeSubscriptionHiddenBtn").click();
        }else if(+data.statusDescription.statusCode == 804){
          localStorage.removeItem(this._global.Upgrade_User_Pin_Subscription_Details)
          // this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
          //   position: 'top-left'
          // });
          this.UpgradeErrorMessage=data.statusDescription.statusMessage;
          $('#modelOpenUpgradeError').click();
        }
        this._loaderService.hide();
      });
  }
  ResendUpgradeOTP(){
  
    this._loaderService.show();
    const bodyData: SubscriptionRequestPinUpdateChangePackRequestBodyPOST = {
      userId: +this._localStorage.GetUserId(),
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      productId: this.SelectedProduct,
    };
    const productSubscriber = this._subscriptionService
      .UpdateChangeRequestPinSubscriptionPack(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SubscriptionConfirmPinUpdateChangePackResponseBodyPOST) => {
        this._loaderService.hide();
       

        if (+data.statusDescription.statusCode === +this._global.HTTP_CODE_200) {
          this.userPinSubscription = data.userPinSubscription;
          localStorage.setItem(this._global.Upgrade_User_Pin_Subscription_Details,JSON.stringify(data.userPinSubscription))
        } else if (+data.statusDescription.statusCode === 804){
          localStorage.removeItem(this._global.Upgrade_User_Pin_Subscription_Details)
          // this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
          //   position: 'top-left'
          // });
          this.UpgradeErrorMessage=data.statusDescription.statusMessage;
          $('#modelOpenUpgradeError').click();
        }
        this._loaderService.hide();
      });
  }
}
