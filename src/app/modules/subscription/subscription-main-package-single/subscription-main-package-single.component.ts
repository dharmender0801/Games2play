import { UserAuthService } from './../../../Services/user-auth.service';
import { Router } from '@angular/router';
import { SubscriptionProductGetProductsModelApi } from './../../../model/subscription/api/subscription-product-get-products-model-api';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SubscriptionProduct } from 'src/app/model/subscription/subscription-product';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Global } from 'src/app/global/global';
declare var $:any;

@Component({
  selector: 'app-subscription-main-package-single',
  templateUrl: './subscription-main-package-single.component.html',
  styleUrls: ['./subscription-main-package-single.component.css']
})
export class SubscriptionMainPackageSingleComponent implements OnInit {
  @Input() mappedItemtypeId:string;
  @Input() videoItemMappedId:string;
  videoProducts: SubscriptionProduct[];
  musicProducts: SubscriptionProduct[];
  gameProducts: SubscriptionProduct[];
  appProducts: SubscriptionProduct[];
  mainProducts: SubscriptionProduct[];
  allProducts: SubscriptionProduct[];
  currentProductSelected: SubscriptionProduct;
  @Output()
  subscribeClickedFromSubscriptionMainPackageSingleComponent = new EventEmitter<
    boolean
  >();

  constructor(
    private _subscriptionService: SubscriptionService,
    private _global: Global,
    private _router: Router,
    private _userAuthService: UserAuthService

  ) {}

  ngOnInit() {
    this.allProducts = [];
    this.functionGetProductInfo();

    if(this.videoItemMappedId=="2"){
      this.mappedItemtypeId="2";
    }
  }

  functionGetProductInfo() {
    setTimeout (() => {
      this.GetAllProducts();
      }, 1000);
  }

  GetAllProducts(): any {
    this.GetVideoProducts();
    this.GetMusicProducts();
    this.GetGameProducts();
    this.GetAppProducts();

  }
  GetVideoProducts(): any {
    // const productSubscriber = this._subscriptionService
    //   .GetProducsByItemTypeId(2)
    //   .pipe(
    //     catchError(x => {
    //       console.log(x);
    //       productSubscriber.unsubscribe();
    //       return throwError(x);
    //     })
    //   )
    //   .subscribe((data: SubscriptionProductGetProductsModelApi) => {
    //     this.videoProducts = data.productList;
    //     productSubscriber.unsubscribe();
    //     if(this.mappedItemtypeId=="2"){
    //     this.checkMappedItemTypeId(this.mappedItemtypeId);
    //     }
    //   });
  }
  GetMusicProducts(): any {
    // const productSubscriber = this._subscriptionService
    //   .GetProducsByItemTypeId(1)
    //   .pipe(
    //     catchError(x => {
    //       console.log(x);
    //       productSubscriber.unsubscribe();
    //       return throwError(x);
    //     })
    //   )
    //   .subscribe((data: SubscriptionProductGetProductsModelApi) => {
    //     this.musicProducts = data.productList;
    //     productSubscriber.unsubscribe();
    //     if(this.mappedItemtypeId=="1"){
    //     this.checkMappedItemTypeId(this.mappedItemtypeId);
    //     }
    //   });
  }
  GetGameProducts(): any {
    // const productSubscriber = this._subscriptionService
    //   .GetProducsByItemTypeId(3)
    //   .pipe(
    //     catchError(x => {
    //       console.log(x);
    //       productSubscriber.unsubscribe();
    //       return throwError(x);
    //     })
    //   )
    //   .subscribe((data: SubscriptionProductGetProductsModelApi) => {
    //     this.gameProducts = data.productList;
    //     productSubscriber.unsubscribe();
    //     if(this.mappedItemtypeId=="3"){
    //     this.checkMappedItemTypeId(this.mappedItemtypeId);
    //     }
    //   });
  }
  GetAppProducts(): any {
    // const productSubscriber = this._subscriptionService
    //   .GetProducsByItemTypeId(4)
    //   .pipe(
    //     catchError(x => {
    //       console.log(x);
    //       productSubscriber.unsubscribe();
    //       return throwError(x);
    //     })
    //   )
    //   .subscribe((data: SubscriptionProductGetProductsModelApi) => {
    //     this.appProducts = data.productList;
    //     productSubscriber.unsubscribe();
    //     if(this.mappedItemtypeId=="4"){
    //       this.checkMappedItemTypeId(this.mappedItemtypeId);
    //     }
    //   });
  }
  SetMainProducts(whichCategory: string) {
    switch (whichCategory) {
      case 'music':
        this.mainProducts = this.musicProducts;
        break;
      case 'video':
        this.mainProducts = this.videoProducts;
        break;
      case 'game':
        this.mainProducts = this.gameProducts;
        break;
      case 'app':
        this.mainProducts = this.appProducts;
        break;
    }
  }
  SetupTheCurrentProductSelected(productId: number) {
    this.allProducts = [];
  //  // this.allProducts.push(...this.appProducts);
  //   this.allProducts.push(...this.gameProducts);
  //   this.allProducts.push(...this.mainProducts);
  //   this.allProducts.push(...this.musicProducts);

    if (this.allProducts.length > 0) {
      for (let i = 0; i < this.allProducts.length; i++) {
        const element = this.allProducts[i];
        if (element.id === productId) {
          this.currentProductSelected = element;
        }
      }
    }
  }
  SubscribeClicked(productId: number) {
    // const urserData = this._userAuthService.GetUserIdForLocalDataAuth();
    this.SetupTheCurrentProductSelected(productId);
    localStorage.setItem(
      this._global.SUBSCRIPTION_PURCHASE_DETIALS,
      JSON.stringify(this.currentProductSelected)
    );
    this._router.navigate(['Pricing/preview']);
    // if (urserData) {
    //   // means we are logged in
    // } else {
    //   // this.subscribeClickedFromSubscriptionMainPackageSingleComponent.emit(
    //   //   false
    //   // );
    // }
  }
  checkMappedItemTypeId(mappedItemtypeId:string){
    if(mappedItemtypeId=="1"){
      this.SetMainProducts('music')
    }else if(mappedItemtypeId=="2"){
      this.SetMainProducts('video')
    }else if(mappedItemtypeId=="3"){
      this.SetMainProducts('game')
    }else if(mappedItemtypeId=="4"){
      this.SetMainProducts('app')
    }
  }
}
