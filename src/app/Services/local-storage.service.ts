import { Global } from "./../global/global";
import { Injectable } from "@angular/core";
import { SubscriptionProduct } from "../model/subscription/subscription-product";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  SetUserHasFreeTrialKey(hasFreeTrial: boolean): any {
    localStorage.setItem(this._global.USER_HAS_FREE_TRIAL_KEY, `${hasFreeTrial}`);
  }
  GetUserHasFreeTrialKey(): any {
    return localStorage.getItem(this._global.USER_HAS_FREE_TRIAL_KEY);
  }
  SaveSubscriptionPinToken(pinToken: string): any {
    localStorage.setItem(this._global.User_Pin_Subscription_Details, pinToken);
  }
  productSelected: SubscriptionProduct;
  jwtToken: string;
  constructor(private _global: Global) {}

  GetUserNumber(): string {
    return localStorage.getItem(this._global.USER);
  }
  GetMappedItemtypeId(): number {
    this.productSelected = JSON.parse(
      localStorage.getItem(this._global.SUBSCRIPTION_PURCHASE_DETIALS)
    );
    return this.productSelected.mappedItemtypeId;
  }

  GetSubscriptionPackageDetails(): SubscriptionProduct {
    this.productSelected = JSON.parse(
      localStorage.getItem(this._global.SUBSCRIPTION_PURCHASE_DETIALS)
    );
    return this.productSelected;
  }

  GetUserJwtToken(): string {
    this.jwtToken = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    return this.jwtToken;
  }

  GetUserId(): string {
    return localStorage.getItem(this._global.USER_ID);
  }


  GetSubscriptionTime(): string {
    return localStorage.getItem(this._global.SUBSCRIPTION_TIME);
  }

  GetUserPinToken(): string {
    return localStorage.getItem(this._global.User_Pin_Subscription_Details);
  }
  GetPortalId():number{
    return 7;
  }

  SaveProductDetials(packageeee:SubscriptionProduct){
    localStorage.setItem(
      this._global.SUBSCRIPTION_PURCHASE_DETIALS,
      JSON.stringify(packageeee)
      );
  }

  GetUpgradeUserPinDetails(): string {
    return localStorage.getItem(this._global.Upgrade_User_Pin_Subscription_Details);
  }

  SetUpgradePreviousServiceCameFrom(value: string){
    return localStorage.setItem(this._global.UPGRADE_PREVIOUS_SERVICE_CAME_FROM,value);
  }
  GetUpgradePreviousServiceCameFrom(){
    return localStorage.getItem(this._global.UPGRADE_PREVIOUS_SERVICE_CAME_FROM);
  }

  SetStartYourSubscription(value:string){
    localStorage.setItem(this._global.START_YOUR_SUSCRIPTION , value);
  }
  GetStartYourSubscription(value: string): string{
    return localStorage.getItem(this._global.START_YOUR_SUSCRIPTION);
  }

  SetUserSubscribed(value: string){
    localStorage.setItem(this._global.USER_SUBSCRIBED, value);
  }
  GetUserSubscribed(): string{
    return localStorage.getItem(this._global.USER_SUBSCRIBED);
  }

  ClearLoaclStorage(){
    localStorage.clear();
  }
}
