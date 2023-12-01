import { SessionStorageService } from './../../../Services/session-storage.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { UserSubscription } from '../../../model/account/user-subscription-list';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { UserAccountService } from './../../../Services/user-account.service';
import { Global } from './../../../global/global';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailREQUEStBODyPOST } from '../../../model/account/api/user-account-detail-request-body-post';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { SubscriptionProductGetProductsModelApi } from 'src/app/model/subscription/api/subscription-product-get-products-model-api';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { SubscriptionProduct } from 'src/app/model/subscription/subscription-product';
import { SubscriptionMainPackageSingleComponent } from '../subscription-main-package-single/subscription-main-package-single.component';
import { SubscriptionMainPackageAllInOneComponent } from '../subscription-main-package-all-in-one/subscription-main-package-all-in-one.component';
@Component({
  selector: 'app-subscription-main-package-container',
  templateUrl: './subscription-main-package-container.component.html',
  styleUrls: ['./subscription-main-package-container.component.css']
})
export class SubscriptionMainPackageContainerComponent
  implements OnInit, OnDestroy {
    currentProductSelected: SubscriptionProduct;
  @Output()
  subscribeClickedFromSubscriptionMainPackageContainerComponent = new EventEmitter<
    boolean
  >();
  @ViewChild(SubscriptionMainPackageSingleComponent) subscriptionMainPackageSingleComponent: SubscriptionMainPackageSingleComponent;
  @ViewChild(SubscriptionMainPackageAllInOneComponent) subscriptionMainPackageAllInOneComponent: SubscriptionMainPackageAllInOneComponent;
  subscritionList: UserSubscription[];
  accountDetial: UserAccountDetailRESPONSePOST;
  mappedItemtypeId = '0';
  // video mappedid
  videoItemMappedId = '2';
  packageSubscribedStatus = false;
  isUserNavigatedFromContent = 'false';
  allProducts: SubscriptionProduct[];
  constructor(
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _userAccountService: UserAccountService,
    private _sessionStorageService: SessionStorageService,
    private translate: TranslateService,
    private _subscriptionService: SubscriptionService
  ) {

    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
    }
    else {
      translate.setDefaultLang('en');
    }
  }

  ngOnDestroy(): void {

    this._sessionStorageService.SetUserIsNavigatedFromContentToFalse();
    this.isUserNavigatedFromContent = 'false';
  }
  ngOnInit() {
    this.GetUserAccountSubList();
  }
  GetUserNavigationFromContent() {

    let isUserNavigatedFromContentCheck = this._sessionStorageService.GetUserIsNavigatedFromContent();
    this.isUserNavigatedFromContent = this._sessionStorageService.GetUserIsNavigatedFromContent();
  }

  SubscribeClicked(value) {
    this.subscribeClickedFromSubscriptionMainPackageContainerComponent.emit(
      value
    );
  }

  GetUserAccountSubList() {
    this.subscritionList = [];
    var language = localStorage.getItem('lang');

    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language: language
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
        if (data.userSubscriptionList !== undefined) {
          if (+data.statusDescription.statusCode === 400) {
            this.mappedItemtypeId = '0';
          } else if (+data.statusDescription.statusCode === 200) {
            this.accountDetial = data;
            this.subscritionList = data.userSubscriptionList;
            // active status 2 means pack is unsubscribed

            if (
              data.userSubscriptionList.length > 0 &&
              data.userSubscriptionList[0].activeStatus === '2'
            ) {
              this.mappedItemtypeId = '0';
              this.videoItemMappedId = '2';
            } else {
              this.mappedItemtypeId =
                data.userSubscriptionList.length > 0
                  ? data.userSubscriptionList[0].mappedItemtypeId
                  : '0';
              this.videoItemMappedId = this.mappedItemtypeId;
            }
          }
          if (data.userSubscriptionList.length > 0) {
            if (+data.userSubscriptionList[0].mappedItemtypeId !== 0) {
              this.GetUserNavigationFromContent();
              console.log(this.isUserNavigatedFromContent !== 'true');

            }
          }
        }
      });
  }

  getlanguageSubscriptionContainer()
  {
     this.GetUserAccountSubList();
     this.subscriptionMainPackageAllInOneComponent.GetProductList();
     this.subscriptionMainPackageSingleComponent.GetAllProducts();
  }

}
