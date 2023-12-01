import { SubscriptionProductGetProductsModelApi } from './../../../model/subscription/api/subscription-product-get-products-model-api';
import { PackageDetails } from './../../../model/subscription/package-details';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { PackageBilling } from 'src/app/model/subscription/package-billing';
import { PackageService } from 'src/app/model/subscription/package-service';
import { Global } from 'src/app/global/global';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { SubscriptionProduct } from 'src/app/model/subscription/subscription-product';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
@Component({
  selector: 'app-subscription-main-package-all-in-one',
  templateUrl: './subscription-main-package-all-in-one.component.html',
  styleUrls: ['./subscription-main-package-all-in-one.component.css']
})
export class SubscriptionMainPackageAllInOneComponent
  implements OnInit, OnDestroy {
  currentPackageSelected: PackageBilling;
  allPackagesWithAmounts: PackageBilling[];
  finalPackageDetials: PackageDetails;
  currentProductSelected: SubscriptionProduct;

  @Output() selectStory = new EventEmitter<PackageDetails>();

  @Output()
  subscribeClickedFromSubscriptionMainPackageAllInOneComponent = new EventEmitter<
    boolean
  >();

  allServices: PackageService[];
  allProducts: SubscriptionProduct[];
  isUserNavigatedFromContent = 'false';

  constructor(
    private _global: Global,
    private _subscriptionService: SubscriptionService,
    private _router: Router,
    private _sessionStorageService: SessionStorageService
  ) {}

  ngOnDestroy(): void {
    if (this.isUserNavigatedFromContent === 'true') {
      this._sessionStorageService.SetUserIsNavigatedFromContentForSubUpgradeRequestToTrue();
    }
  }
  ngOnInit() {
    this.GetUserHasNavigatedFromContent();
    this.GetProductList();
  }
  GetUserHasNavigatedFromContent() {
    this.isUserNavigatedFromContent = this._sessionStorageService.GetUserIsNavigatedFromContent();
  }
  SubscribeClicked(productId: number) {
    this.SetupTheCurrentProductSelected(productId);
    localStorage.setItem(
      this._global.SUBSCRIPTION_PURCHASE_DETIALS,
      JSON.stringify(this.currentProductSelected)
    );

    this._router.navigate(['Pricing/preview']);
    //   const urserData = localStorage.getItem(this._global.USER_ID);
    // if (urserData) {
    //   // means we are logged in
    // } else {
    //   this.subscribeClickedFromSubscriptionMainPackageAllInOneComponent.emit(
    //     false
    //   );
    // }
  }
  SetupAllPackagesDetails(): any {
    this.allPackagesWithAmounts.push({
      billingAmount: 3.0,
      billingTime: 'Daily'
    });
    this.allPackagesWithAmounts.push({
      billingAmount: 3.0,
      billingTime: 'Weekly'
    });
    this.allPackagesWithAmounts.push({
      billingAmount: 3.0,
      billingTime: 'Monthly'
    });
  }
  GetCurrentPlanSelectedData(whichPackageClicked): PackageBilling {
    let currentPackageDetials: PackageBilling;
    this.allPackagesWithAmounts.forEach((element: PackageBilling) => {
      if (element.billingTime === whichPackageClicked) {
        currentPackageDetials = element;
      }
    });
    return currentPackageDetials;
  }
  SetupAllServices(): any {
    this.allServices = [
      { serviceName: 'Video' },
      { serviceName: 'Music' },
      { serviceName: 'Games' },
      { serviceName: 'Apps' }
    ];
  }

  GetProductList() {
    // const productSubscriber = this._subscriptionService
    //   .GetProducsByItemTypeId(0)
    //   .pipe(
    //     catchError(x => {
    //       console.log(x);
    //       productSubscriber.unsubscribe();
    //       return throwError(x);
    //     })
    //   )
    //   .subscribe((data: SubscriptionProductGetProductsModelApi) => {
    //     this.allProducts = data.productList;
    //     productSubscriber.unsubscribe();
    //   });
  }
  SetupTheCurrentProductSelected(productId: number) {
    if (this.allProducts.length > 0) {
      for (let i = 0; i < this.allProducts.length; i++) {
        const element = this.allProducts[i];
        if (element.id === productId) {
          this.currentProductSelected = element;
          break;
        }
      }
    }
  }
}
