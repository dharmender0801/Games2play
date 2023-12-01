import { ToasterService } from './../../../Services/toaster.service';
import { NewSubscriptionBodyPOST } from './../../../model/subscription/new-subscription';
import { LocalStorageService } from './../../../Services/local-storage.service';
import { Global } from 'src/app/global/global';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
// tslint:disable-next-line:max-line-length
import { UpgradeSubscriptionRequestPINRequestBodyPOST } from 'src/app/model/subscription/api/upgrade-subscription-request-pinrequest-body-post';
import { UpgradeSubscriptionRequestPINResponsePOST } from 'src/app/model/subscription/api/upgrade-subscription-request-pinresponse-post';
// tslint:disable-next-line:max-line-length
import { UpgradeSubscriptionConfirmPINRequestBodyPOST } from 'src/app/model/subscription/api/upgrade-subscription-confirm-pinrequest-body-post';
import { UpgradeSubscriptionConfirmPINResponsePOST } from 'src/app/model/subscription/api/upgrade-subscription-confirm-pinresponse-post';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';
import { StatusCodeService } from 'src/app/Services/status-code.service';
declare var $: any;

@Component({
  selector: 'app-subscription-popup-upgrade',
  templateUrl: './subscription-popup-upgrade.component.html',
  styleUrls: ['./subscription-popup-upgrade.component.css']
})
export class SubscriptionPopupUpgradeComponent implements OnInit, OnDestroy {
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
  constructor(
    private _global: Global,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _subscriptionService: SubscriptionService,
    public toastr: ToastrManager,
    private _loaderService: NgxSpinnerService,
    private _toasterService: ToasterService,
    private _sessionStorageService: SessionStorageService,
    private _statusCodeService: StatusCodeService
  ) {}

  ngOnInit() {
    this.GetUserNumber();
    // this.NewSubscriptionGenerateOTP();
  }
  ngOnDestroy(): void {
    this._sessionStorageService.SetUserIsNavigatedFromContentForSubUpgradeRequestToFalse();
  }

  GetUserNumber(): any {
    const number = localStorage.getItem(this._global.USER_NUMBER);
    if (number) {
      this.currentNumber = number;
    } else {
      // TODO
    }
  }
  UpgradeSubscriptionGenerateOTP() {
    this.ResetCounter();
    this._loaderService.show();
    this.currentProduct = this._localStorageService.GetSubscriptionPackageDetails();
    const jewToken = this._localStorageService.GetUserJwtToken();
    this.userId = this._localStorageService.GetUserId();
    const newSubBodyPost: UpgradeSubscriptionRequestPINRequestBodyPOST = {
      userId: this.userId,
      productId: this.currentProduct.productId,
      jwtToken: jewToken,
      portalId: this._global.PORTAL_ID
    };
    const productSubscriber = this._subscriptionService
      .UpgradeSubscriptionRequestPIN(newSubBodyPost)
      .pipe(
        catchError(x => {
          this._loaderService.hide();
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UpgradeSubscriptionRequestPINResponsePOST) => {
        // if (data.userPinSubscription.status === 804) {
        //   return this.toastr.errorToastr(data.userPinSubscription.message);
        // }
        this._localStorageService.SaveSubscriptionPinToken(
          data.userPinSubscription.pinToken
        );
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
    const newSubBodyPost: UpgradeSubscriptionConfirmPINRequestBodyPOST = {
      jwtToken: jewToken,
      otp: this.otpEntered,
      pinToken: this.pinToken,
      portalId: this._global.PORTAL_ID,
      productId: this.currentProduct.productId,
      userId: this.userId
    };
    this.ConfirmOTP(newSubBodyPost);
  }
  ConfirmOTP(data: UpgradeSubscriptionConfirmPINRequestBodyPOST) {
   
    const productConfirmSub = this._subscriptionService
      .UpgradeSubscriptionConfirmPIN(data)
      .pipe(
        catchError(x => {
          console.log(x);
          productConfirmSub.unsubscribe();
          return throwError(x);
        })
      )
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe((data: UpgradeSubscriptionConfirmPINResponsePOST) => {
        if (data) {
          if (data.statusDescription) {
            if (data.statusDescription.statusCode) {
              if (data.statusDescription.statusCode !== this._global.HTTP_CODE_200) {
                this._statusCodeService.ManageStatusCodeImplementation(data.statusDescription);
              }
            }
          }
        }
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
          // this._toasterService.ShowErrorTopLeft(data.statusDescription.statusMessage, 'Error');
          this.otpsubinvalid = true;
          productConfirmSub.unsubscribe();
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
    this.UpgradeSubscriptionGenerateOTP();
    this.IsSignupFormCountdown = true;
    this.IsSignupFormResendCode = false;
  }

  finishsignUpformTimer() {
    this.IsSignupFormCountdown = false;
    this.IsSignupFormResendCode = true;
  }

  ResetCounter() {
    this.IsSignupFormCountdown = false;
    this.IsSignupFormResendCode = false;
    setTimeout(() => {
    this.IsSignupFormCountdown = true;
    }, 1);
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
