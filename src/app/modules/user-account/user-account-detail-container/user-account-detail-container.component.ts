import { UpgrdeSubscriptionPackPopupComponent } from './../upgrde-subscription-pack-popup/upgrde-subscription-pack-popup.component';
import { MyPreferencesCountRESPONSePOST } from './../../../model/account/api/my-preferences-count-response-post';
import { MyPreferencesCountREQUEStBODyPOST } from './../../../model/account/api/my-preferences-count-request-body-post';
import { LoaderService } from 'src/app/Services/loader.service';
import { UserAccountDetailPreferencesComponent } from './../user-account-detail-preferences/user-account-detail-preferences.component';
import { ToasterService } from './../../../Services/toaster.service';
import { MyPreferencesRESPONSePOST } from './../../../model/account/api/my-preferences-response-post';
import { ErrorService } from './../../../Services/error.service';
import { Global } from 'src/app/global/global';
import { MyPreferencesREQUEStBodyPOST } from './../../../model/account/api/my-preferences-request-body-post';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { MyPreferencesUserSubItemType } from './../../../model/account/my-preferences-user-sub-item-type';
import { Component, OnInit, ViewChild, CompilerFactory } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountDetailSubscriptionsComponent } from '../user-account-detail-subscriptions/user-account-detail-subscriptions.component';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { MenuHeaderComponent } from '../../shared/menu-header/menu-header.component';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { UserAccountDetailBillingHistoryComponent } from '../user-account-detail-billing-history/user-account-detail-billing-history.component';
//import { LoginComponent } from 'src/app/modules/shared/login/login.component';
declare var $: any;

@Component({
  selector: 'app-user-account-detail-container',
  templateUrl: './user-account-detail-container.component.html',
  styleUrls: ['./user-account-detail-container.component.css']
})
export class UserAccountDetailContainerComponent implements OnInit {
  //@ViewChild(LoginComponent) resetMenuHeader: LoginComponent;
  // @ViewChild(UserAccountDetailSubscriptionsComponent) userAccountDetailSubscriptionsComponent: UserAccountDetailSubscriptionsComponent;
  // @ViewChild(UserAccountDetailPreferencesComponent) userAccountDetailPreferencesComponent: UserAccountDetailPreferencesComponent;
  // @ViewChild(UpgrdeSubscriptionPackPopupComponent) upgrdeSubscriptionPackPopupComponent: UpgrdeSubscriptionPackPopupComponent;
  @ViewChild(MenuHeaderComponent) resetMenuHeader: MenuHeaderComponent;
  @ViewChild(UserAccountDetailBillingHistoryComponent) userAccountDetailBillingHistoryComponent:UserAccountDetailBillingHistoryComponent

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _userAccountService: UserAccountService,
    private _global: Global,
    private _localStorage: LocalStorageService,
    private _errorService: ErrorService,
    private _toasterService: ToasterService,
    private _customLoaderService: LoaderService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
   }

  ngOnInit() {
    this.SetupTabSelection();
    this.RegisterRouteChange();
    // this.GetPreferencesCount();
  }
  RegisterRouteChange(): any {
    this.router.events.subscribe(val => {
      this.SetupTabSelection();
    });
  }

  SetupTabSelection() {
    const tabSelect = this.activatedRoute.snapshot.queryParams.tab;
    if (tabSelect) {
      $('a[href^="#' + tabSelect + '"]').click();
    }
  }
  upgradePinSubscriptionConfirmed(data: any) {
    // this.userAccountDetailSubscriptionsComponent.GetSubscriptionDataPreviousSubs();
    // this.userAccountDetailSubscriptionsComponent.GetUserAccountSubList();
  }
  UpdatePreference(data: MyPreferencesUserSubItemType) {

    // const savePreferenceBody: MyPreferencesREQUEStBodyPOST = {
    //   portalId: this._global.PORTAL_ID,
    //   userId: this._localStorage.GetUserId(),
    //   jwtToken: this._localStorage.GetUserJwtToken(),
    //   preferenceData: {
    //     id: 0,
    //     itemtype: this.userAccountDetailPreferencesComponent.currentMappedItemTypeSelected,
    //     itemDescription: 'Apps',
    //     subItemTypeList: [data]
    //   }
    // };


    // this.SavePreference(savePreferenceBody);
  }
  SavePreference(savePreferenceBody: MyPreferencesREQUEStBodyPOST) {
    this._userAccountService.SaveUserPreferences(savePreferenceBody)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe((data: MyPreferencesRESPONSePOST) => {
      this._customLoaderService.HideLoader('user-preferences-loader');
      if (+data.statusDescription.statusCode !== +this._global.HTTP_CODE_200) {
        this._toasterService.ShowErrorTopLeft(data.statusDescription.statusMessage, 'Error');
      } else {
        // this.userAccountDetailPreferencesComponent.GetPreferencesCount();
        // this._toasterService.ShowSuccessTopLeftWithCustomTime(data.statusDescription.statusMessage, 'Preference Saved', 1000);

      }
    });
  }
  GetPreferencesCount(){
    var language =localStorage.getItem('lang');
    const getPreferencesCOuntBody:MyPreferencesCountREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      userId: this._localStorage.GetUserId(),
      portalId: this._global.PORTAL_ID,
      'language':language
    };
    const subscriber = this._userAccountService.GetPreferencesCountData(getPreferencesCOuntBody)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe((resData:MyPreferencesCountRESPONSePOST) => {
      if (+resData.statusDescription.statusCode === +this._global.HTTP_CODE_200) {
        // this.userAccountDetailPreferencesComponent.preferencesCountDynamic = resData.preferenceCount;
        // this.userAccountDetailPreferencesComponent.SetPreferencesCountForEveryCategory();
      }
    });
  }
  ResendUpgradeOTP(){
    // this.userAccountDetailSubscriptionsComponent.ResendUpgradeOTP();
  }

  ResetResendOTPCounter(){
    // this.upgrdeSubscriptionPackPopupComponent.ResetCounter();
  }

  ResetMenuHeader(){
    this.resetMenuHeader.PricingEnit();
  }

  SubscriptionlanguageChanged(){
    // this.userAccountDetailSubscriptionsComponent.GetUserAccountSubList();
    // this.userAccountDetailSubscriptionsComponent.GetSubscriptionDataPreviousSubs();
    //this.userAccountDetailBillingHistoryComponent.GetSubScriptionHistory();
    // this.userAccountDetailPreferencesComponent.GetPreferencesCount();
  }

}
