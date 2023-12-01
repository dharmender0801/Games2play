import { ToasterService } from './../../../Services/toaster.service';
import { NewSubscriptionBodyPOST } from './../../../model/subscription/new-subscription';
import { LocalStorageService } from './../../../Services/local-storage.service';
import { Global } from 'src/app/global/global';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { SubscriptionProduct } from 'src/app/model/subscription/subscription-product';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NewSubscriptionResponsePOST } from 'src/app/model/subscription/new-subscription-response-post';
import { NewSubscriptionConfirmRequestBodyPOST } from 'src/app/model/subscription/new-subscription-confirm-request-body-post';
import { NewSubscriptionConfirmResponsePOST } from 'src/app/model/subscription/new-subscription-confirm-response-post';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

declare var $: any;

@Component({
  selector: 'app-subscription-popup',
  templateUrl: './subscription-popup.component.html',
  styleUrls: ['./subscription-popup.component.css']
})
export class SubscriptionPopupComponent implements OnInit {
  currentNumber: string;
  currentProduct: SubscriptionProduct;
  otpEntered = '';
  userId: any;
  pinToken: any;
  public otpsubinvalid = false;
  public otpsubvalidation = false;
  IsSignupFormResendCode = false;
  IsSignupFormCountdown = true;
  ShowOTP = false;
  OTPType = 'password';
  errormessage:string;
  constructor(
    private _global: Global,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _subscriptionService: SubscriptionService,
    public toastr: ToastrManager,
    private _loaderService: NgxSpinnerService,
    private _toasterService: ToasterService,
    private translate: TranslateService
  ) {    
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }}

  ngOnInit() {
    this.GetUserNumber();
    // this.NewSubscriptionGenerateOTP();
  }

  GetUserNumber(): any {
    const number = localStorage.getItem(this._global.USER_NUMBER);
    if (number) {
      this.currentNumber = number;
    } else {
      // TODO
    }
  }
  // Original method
  // ConfirmClicked() {
  //   if (this.otpEntered === '' || this.otpEntered === null || this.otpEntered === undefined ) {
  //     this.toastr.errorToastr(this._global.STRING_OTP_IS_REQUIRED, 'Error',
  //     {
  //       position: 'top-left'
  //   });
  //     return;
  //   }
  //   this._loaderService.show();
  //   this.currentProduct = this._localStorageService.GetSubscriptionPackageDetails();
  //   const jewToken = this._localStorageService.GetUserJwtToken();
  //   this.userId = this._localStorageService.GetUserId();
  //   const newSubBodyPost: NewSubscriptionBodyPOST = {
  //     userId: this.userId,
  //     productId: this.currentProduct.productId,
  //     jwtToken: jewToken,
  //     portalId: 7
  //   };
  //   const productSubscriber =  this._subscriptionService
  //     .NewSubscription(newSubBodyPost)
  //     .pipe(
  //       catchError(x => {
  //         console.log(x);
  //         productSubscriber.unsubscribe();
  //         return throwError(x);
  //       })
  //     )
  //     .subscribe((data: NewSubscriptionResponsePOST) => {
  //       if (+data.statusDescription.statusCode === +this._global.HTTP_CODE_701) {
  //         this._toasterService.ShowInfoTopLeft(data.statusDescription.statusMessage, 'Info');
  //         this.CloseSubModal();
  //         this._loaderService.hide();
  //       } else {
  //         this.ConfirmOTP(data);
  //       }
  //     });
  // }
  // ConfirmOTP(data: NewSubscriptionResponsePOST): any {
  //   const jwtToken = this._localStorageService.GetUserJwtToken();
  //   this.currentProduct = this._localStorageService.GetSubscriptionPackageDetails();
  //   const newSubConfirnReqPOSTBody: NewSubscriptionConfirmRequestBodyPOST = {
  //     jwtToken: jwtToken,
  //     otp: this.otpEntered,
  //     pinToken: data.userPinSubscription.pinToken,
  //     portalId: this._global.PORTAL_ID,
  //     productId: this.currentProduct.productId,
  //     userId: this.userId
  //   };
  //   const productConfirmSub = this._subscriptionService.ConfirmNewSubscription(newSubConfirnReqPOSTBody)
  //   .pipe(
  //     catchError(x => {
  //       console.log(x);
  //       productConfirmSub.unsubscribe();
  //       return throwError(x);
  //     })
  //   )
  //   // tslint:disable-next-line:no-shadowed-variable
  //   .subscribe((data: NewSubscriptionConfirmResponsePOST) => {
  //     this.otpEntered = '';
  //     this._loaderService.hide();
  //     if (data.statusDescription.statusCode === this._global.HTTP_CODE_200) {
  //       productConfirmSub.unsubscribe();
  //       this._router.navigate([this._global.URL_SUBSCRIPTION_SUCCESS_PAGE]);
  //       this.CloseSubModal();
  //       this._router.navigate(['Pricing/success']);
  //     } else {
  //       this._toasterService.ShowErrorTopLeft(data.statusDescription.statusMessage, 'Error');
  //       productConfirmSub.unsubscribe();
  //       // TODO
  //     }
  //   });
  // }

  NewSubscriptionGenerateOTP() {
    this.ResetCounter();
    this._loaderService.show();
    this.currentProduct = this._localStorageService.GetSubscriptionPackageDetails();
    const jewToken = this._localStorageService.GetUserJwtToken();
    this.userId = this._localStorageService.GetUserId();
    const newSubBodyPost: NewSubscriptionBodyPOST = {
      userId: this.userId,
      productId: this.currentProduct.productId,
      jwtToken: jewToken,
      portalId: this._global.PORTAL_ID
    };
    const productSubscriber = this._subscriptionService
      .NewSubscription(newSubBodyPost)
      .pipe(
        catchError(x => {
          this._loaderService.hide();
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: NewSubscriptionResponsePOST) => {

        if (data.userPinSubscription.status === 804) {
          this.errormessage=data.userPinSubscription.message;
          $('#modelOpenerror').click();
         // return this.toastr.errorToastr(data.userPinSubscription.message);
        }
        this._localStorageService.SaveSubscriptionPinToken(data.userPinSubscription.pinToken);
        this._loaderService.hide();
        if (
          +data.statusDescription.statusCode === +this._global.HTTP_CODE_701
        ) {
          this._toasterService.ShowInfoTopLeft(
            data.statusDescription.statusMessage,
            'Info'
          );
          this.CloseSubModal();
          this._loaderService.hide();
        } else {
          // this.ConfirmOTP(data);
        }
      });
  }
  // Modified method
  ConfirmClicked() {
    if (
      this.otpEntered === '' ||
      this.otpEntered === null ||
      this.otpEntered === undefined
    ) {
      // this.toastr.errorToastr(this._global.STRING_OTP_IS_REQUIRED, 'Error', {
      //   position: 'top-left'
      // });
      this.otpsubvalidation = true;
      return;
    }
  
    this._loaderService.show();
    this.currentProduct = this._localStorageService.GetSubscriptionPackageDetails();
    const jewToken = this._localStorageService.GetUserJwtToken();
    this.userId = this._localStorageService.GetUserId();
    this.pinToken = this._localStorageService.GetUserPinToken();
    const newSubBodyPost: NewSubscriptionConfirmRequestBodyPOST = {
      jwtToken: jewToken,
      otp: this.otpEntered,
      pinToken: this.pinToken,
      portalId: this._global.PORTAL_ID,
      productId: this.currentProduct.productId,
      userId: this.userId
    };
    this.ConfirmOTP(newSubBodyPost);
  }
  ConfirmOTP(data: NewSubscriptionConfirmRequestBodyPOST): any {
   
    const productConfirmSub = this._subscriptionService
      .ConfirmNewSubscription(data)
      .pipe(
        catchError(x => {
          console.log(x);
          productConfirmSub.unsubscribe();
          return throwError(x);
        })
      )
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data: NewSubscriptionConfirmResponsePOST) => {
       
      
        this.otpEntered = '';
        this._loaderService.hide();
        if (
          +data.statusDescription.statusCode === +this._global.HTTP_CODE_200
        ) {
          productConfirmSub.unsubscribe();
          this._router.navigate([
            './' + this._global.URL_SUBSCRIPTION_SUCCESS_PAGE
          ]);
          this.CloseSubModal();
          this._router.navigate(['Pricing/success']);
        } else {

          // this._toasterService.ShowErrorTopLeft(
          //   data.statusDescription.statusMessage,
          //   'Error'
          // );
        // alert(data.statusDescription.statusCode);
          if(data.statusDescription.statusCode=='704'){
           this.otpsubinvalid = true;
         }
         else
         {
          this.errormessage=data.userPinSubscription.message;
          $('#modelOpenerror').click();
         // this._toasterService.ShowErrorTopLeft(data.statusDescription.statusMessage, 'Error');
         }
        productConfirmSub.unsubscribe();
          // TODO
        }
      });
  }

  CheckOTPRequired() {
    if (
      this.otpEntered === '' ||
      this.otpEntered === null ||
      this.otpEntered === undefined
    ) {
      this.toastr.errorToastr(this._global.STRING_OTP_IS_REQUIRED);
    }
  }
  CloseSubModal() {
    this.otpsubinvalid = false;
    this.otpsubvalidation = false;
    $('.modal-header .close').click();
  }

  restrictNumeric(e) {
    this.otpsubvalidation = false;
    this.otpsubinvalid = false;
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  signUpformResendCode() {
    this.NewSubscriptionGenerateOTP();
    this.IsSignupFormCountdown = true;
    this.IsSignupFormResendCode = false;
  }
  ResetCounter() {
    this.IsSignupFormCountdown = false;
    this.IsSignupFormResendCode = false;
    setTimeout(() => {
    this.IsSignupFormCountdown = true;
    }, 1);
  }

  finishsignUpformTimer() {
    this.IsSignupFormCountdown = false;
    this.IsSignupFormResendCode = true;
  }
  ShowOTPField(){
    this.ShowOTP = !this.ShowOTP;
    if (this.ShowOTP) {
      this.OTPType = 'text';
    } else {
      this.OTPType = 'password';
    }
  }
}
