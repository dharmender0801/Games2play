import { ToasterService } from 'src/app/Services/toaster.service';
import { ErrorService } from 'src/app/Services/error.service';
import { UserAccountService } from './../../../Services/user-account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuHeaderComponent } from '../../shared/menu-header/menu-header.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionPackageSelectionPreviewComponent } from '../subscription-package-selection-preview/subscription-package-selection-preview.component';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserAccountDetailREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { NewSubscriptionBodyPOST } from '../../../model/subscription/new-subscription';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { Router } from '@angular/router';
import { Global } from './../../../global/global';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { LoginComponent } from '../../shared/login/login.component';
import { SubscriptionRequestPinUpdateChangePackResonseBodyPOST } from 'src/app/model/subscription/subscription-update-change-pack-resonse-body-post';
declare var $: any;
@Component({
  selector: 'app-subscription-package-selection-preview-container',
  templateUrl:
    './subscription-package-selection-preview-container.component.html',
  styleUrls: [
    './subscription-package-selection-preview-container.component.css'
  ]
})
export class SubscriptionPackageSelectionPreviewContainerComponent
  implements OnInit {
    @ViewChild(LoginComponent) menuHeader: LoginComponent;
  //@ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
  @ViewChild(SubscriptionPackageSelectionPreviewComponent)
  packageSelectionPreview: SubscriptionPackageSelectionPreviewComponent;

  constructor(
    private _localStorageService: LocalStorageService,
    private _userAccountService: UserAccountService,
    private _loaderService: NgxSpinnerService,
    private _localStorage: LocalStorageService,
    private _subscriptionService: SubscriptionService,
    private _router: Router,
    private _global: Global,
    private _errorService: ErrorService,
    private _toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.GetUserAccountAndSetFreeTrialVar();
  }

  OpenLoginPopopAsUserIsNotLoggedIn(valeu: boolean) {
    this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false);
  }

  GetUserAccountAndSetFreeTrialVar() {
    let GetUserId = this._localStorageService.GetUserId();
    var language =localStorage.getItem('lang');
    const userAccountDetailREQUEStBODyPOST: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorageService.GetUserJwtToken(),
      portalId: this._localStorageService.GetPortalId(),
      userId: GetUserId,
      language:language
    };
    // tslint:disable-next-line:max-line-length
    const userAccountDetials = this._userAccountService
      .GetAccountDetail(userAccountDetailREQUEStBODyPOST)
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        this._localStorageService.SetUserHasFreeTrialKey(data.hasFreeTrial);
      });
  }

  LoginConfirmed(data: any) {
 
    this.GetUserAccountAndSetFreeTrialVar();
    if (data) {
      var startYourSubscription = localStorage.getItem('startYourSubscription');
      if (startYourSubscription == 'true' || startYourSubscription == 'True') {
        // $('#btnOpenFreeTrialModal').click();
        this._loaderService.show();
        const jewToken = this._localStorage.GetUserJwtToken();
        const newSubBodyPost: NewSubscriptionBodyPOST = {
          userId: +this._localStorage.GetUserId(),
          productId: this._localStorage.GetSubscriptionPackageDetails()
            .productId,
          jwtToken: jewToken,
          portalId: this._global.PORTAL_ID
        };
        // this.GetUserSubscriptionDetails();
        this.GetUserSubscriptionDetails()
          .pipe(
            catchError(x => {
              console.log(x);
              return throwError(x);
            })
          )
          .subscribe((data: UserAccountDetailRESPONSePOST) => {
           
            if (+data.statusDescription.statusCode == 400) {
            } else if (+data.statusDescription.statusCode == 200) {
              if (data.userSubscriptionList.length > 0) {
                localStorage.setItem(
                  'checkSuccesStatus',
                  data.userSubscriptionList[0].activeStatus
                );
                if (data.userSubscriptionList[0].activeStatus != '1') {

                  this.packageSelectionPreview.UpgradeSubscription();
                } else {
                  this._loaderService.hide();
                  this._router.navigate(['Pricing/success']);
                }
              } else {
                const productSubscriber = this._subscriptionService
                  .DirectSubCall(newSubBodyPost)
                  .pipe(catchError(x => {
                    this._errorService.LogError(x);
                    return throwError(x);
                  }))
                  .subscribe((resdata:SubscriptionRequestPinUpdateChangePackResonseBodyPOST) => {
                    if(resdata.statusDescription.statusCode=="712")
                    {
                     return this._toasterService.ShowErrorTopLeft(resdata.statusDescription.statusMessage, 'error');
                    }
                    if (+resdata.statusDescription.statusCode === +this._global.HTTP_CODE_200) {
                      this._loaderService.hide();
                      this._router.navigate(['Pricing/success']);
                    }else {
                      this._toasterService.ShowErrorTopLeft(resdata.statusDescription.statusMessage, 'Problem');
                    }
                  });
              }
              // active status 2 means pack is unsubscribed
            }
          });
      } else {
        this.packageSelectionPreview.NewSubscriptionGenerateOTP();
      }
      // console.log(data);
      // var startYourSubscription=localStorage.getItem('startYourSubscription')
      // if (startYourSubscription == undefined || startYourSubscription == "" || startYourSubscription == null) {

      // }else if(startYourSubscription!=null && JSON.parse(localStorage.getItem('startYourSubscription'))){
      //   //$('#btnConfirmSubscriptionModal').click();

      // }
      // else{
      //   this.packageSelectionPreview.NewSubscriptionGenerateOTP();
      // }
    }
    // location.reload();
    // this.packageSelectionPreview.NewSubscription();
  }

  FreeTrialPopupCloseOpenNewSubscription(data: boolean) {
    this.GetUserAccountAndSetFreeTrialVar();
    this.packageSelectionPreview.NewSubscriptionGenerateOTP();
  }

  GetUserSubscriptionDetails(): Observable<any> {
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
    };
    return this._userAccountService.GetAccountDetail(bodyData);
  }
}
