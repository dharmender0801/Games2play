import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from '../../../global/global';
import { SubscriptionConfirmPinUpdateChangePackRequestBodyPOST } from '../../../model/subscription/subscription-confirm-pin-update-change-pack-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SubscriptionService } from '../../../Services/subscription.service';
import { LocalStorageService } from '../../../Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubscriptionConfirmPinUpdateChangePackResponseBodyPOST } from 'src/app/model/subscription/subscription-confirm-pin-update-change-pack-response-body-post';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserPinSubscription } from '../../../model/subscription/user-pin-subscription';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'ngx-countdown';

declare var $:any;

@Component({
  selector: 'app-upgrde-subscription-pack-popup',
  templateUrl: './upgrde-subscription-pack-popup.component.html',
  styleUrls: ['./upgrde-subscription-pack-popup.component.css']
})
export class UpgrdeSubscriptionPackPopupComponent implements OnInit {

  @Output() upgradePinSubscriptionConfirmed = new EventEmitter<boolean>();
  @Output() resendUpgradeOTP = new EventEmitter();
    
  currentNumber: string;
  otpEntered: string="";
  public billingotpinvalid: boolean = false;
  public billingotpvalidation : boolean = false;
  upgradePinSubscriptionDetails:UserPinSubscription;
  IsSignupFormResendCode = false;
  IsSignupFormCountdown = true;
  OTPType = 'password';
  ShowOTP = false;
  UpgradeAlert:string;
  constructor(
    private _loaderService: NgxSpinnerService,
    public toastr: ToastrManager,
    private _global: Global,
    private _localStorage: LocalStorageService,
    private _subscriptionServuice: SubscriptionService,
  ) { }

  ngOnInit() {
    this.GetUserNumber();
  }

  GetUserNumber(): any {
    const number = localStorage.getItem(this._global.USER_NUMBER);
    if (number) {
      this.currentNumber = number;
    } else {
      // TODO
    }
  }

  upgradeConfirmPin() {

    if (this.otpEntered === '' || this.otpEntered === null || this.otpEntered === undefined) {
      // this.toastr.errorToastr(this._global.STRING_OTP_IS_REQUIRED, 'Error', {
      //   position: 'top-left'
      // });
      this.billingotpvalidation=true;
      return;
    }
    // get the details of upgrade pin details
    this.upgradePinSubscriptionDetails= JSON.parse(this._localStorage.GetUpgradeUserPinDetails());
    
    this._loaderService.show();
    const bodyData: SubscriptionConfirmPinUpdateChangePackRequestBodyPOST = {
      userId: +this._localStorage.GetUserId(),
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      productId: this.upgradePinSubscriptionDetails.productId,
      otp:this.otpEntered,
      pinToken:this.upgradePinSubscriptionDetails.pinToken
    }
    const productSubscriber = this._subscriptionServuice
      .UpdateChangeConfirmPinSubscriptionPack(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          productSubscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SubscriptionConfirmPinUpdateChangePackResponseBodyPOST) => {
        if(data.statusDescription.statusCode=="712")
        {
      //     this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
      //   position: 'top-left'
      //  });
      this.UpgradeAlert=data.statusDescription.statusMessage
      $('#modelUpgradeError').click();
        }
        if(+data.statusDescription.statusCode==+this._global.HTTP_CODE_200){
          this.closeUpgradeSubscriptionModal();
          $('#upgradeSubscriptionClosebtn').click();
          $('#changeBillingFrequencyClosebtn').click();
          this._loaderService.hide();

          this.upgradePinSubscriptionConfirmed.emit(true);
        }
        else if(+data.statusDescription.statusCode==704){
          // this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
          //   position: 'top-left'
          // });
          this.billingotpinvalid=true;
        }
        this._loaderService.hide();
      });
  }
  closeUpgradeSubscriptionModal(){
    this.billingotpinvalid=false;
    this.billingotpvalidation=false;
    this.otpEntered="";
  }

  restrictNumeric(e) {
    this.billingotpinvalid=false;
    this.billingotpvalidation=false;
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

  ResendOTP(){
    this.IsSignupFormCountdown = true;
    this.IsSignupFormResendCode = false;
    this.resendUpgradeOTP.emit();
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
