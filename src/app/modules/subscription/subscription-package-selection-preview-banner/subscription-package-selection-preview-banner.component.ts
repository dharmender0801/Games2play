import { ErrorService } from './../../../Services/error.service';
import { Global } from 'src/app/global/global';
import { UserAccountService } from './../../../Services/user-account.service';
import { SessionStorageService } from './../../../Services/session-storage.service';
import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserAccountDetailREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { LoaderService } from 'src/app/Services/loader.service';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-subscription-package-selection-preview-banner',
  templateUrl: './subscription-package-selection-preview-banner.component.html',
  styleUrls: ['./subscription-package-selection-preview-banner.component.css']
})
export class SubscriptionPackageSelectionPreviewBannerComponent implements OnInit {

  @Input() bannerImageLink: string;
  @Input() heading: string;
  @Input() heading1: string;
  @Input() heading2: string;
  @Input() heading3: string;

  constructor(
    private _sessionStorageService: SessionStorageService,
    private _userAccountService: UserAccountService,
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private _customLoaderService: LoaderService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
    }
    else {
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
    this.GetIfUserHasNavigatedFromContent();
  }
  GetIfUserHasNavigatedFromContent() {
    this._customLoaderService.ShowLoader('sub-pack-selection-preview-banner');
    var language = localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language: language
    };
    const subscriber = this._userAccountService.GetAccountDetail(bodyData)
      .pipe(catchError(x => {
        this._errorService.LogError(x);
        subscriber.unsubscribe();
        return throwError(x);
      }))
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        
        this._customLoaderService.HideLoader('sub-pack-selection-preview-banner');
        if (data.userSubscriptionList !== undefined) {
          if (data.userSubscriptionList.length > 0) {
            let hasNavigatedFromContent = this._sessionStorageService.GetUserIsNavigatedFromContent();
            if (hasNavigatedFromContent === 'true') {
              if (+data.userSubscriptionList[0].activeStatus === 2) {
                this.heading = `Free for 7 Days ! With Etisalat Arena, there is a plan for everyone.`;
                this.heading1 = `Discover a world of apps.`;
              } else {
                this.heading = `You are already subscribed (${data.userSubscriptionList[0].productName})`;
                this.heading1 = `and to access the content to ${this._localStorage.GetUpgradePreviousServiceCameFrom()} services you`;
                this.heading3 = `need to update content to all in one  pack`;
              }
            }
          }
        }
      });
  }
}
