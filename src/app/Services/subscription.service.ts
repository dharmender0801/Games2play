import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SubscriptionProduct } from './../model/subscription/subscription-product';
// tslint:disable-next-line:max-line-length
import { SubscriptionConfirmPinUpdateChangePackRequestBodyPOST } from './../model/subscription/subscription-confirm-pin-update-change-pack-request-body-post';
// tslint:disable-next-line:max-line-length
import { SubscriptionRequestPinUpdateChangePackRequestBodyPOST } from './../model/subscription/subscription-update-change-pack-request-body-post';
import { NewSubscriptionConfirmResponsePOST } from '../model/subscription/new-subscription-confirm-response-post';
import { NewSubscriptionResponsePOST } from '../model/subscription/new-subscription-response-post';
import { NewSubscriptionBodyPOST } from '../model/subscription/new-subscription';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global/global';
import { Observable } from 'rxjs';
import { NewSubscriptionConfirmRequestBodyPOST } from '../model/subscription/new-subscription-confirm-request-body-post';
// tslint:disable-next-line:max-line-length
import { SubscriptionRequestPinUpdateChangePackResonseBodyPOST } from '../model/subscription/subscription-update-change-pack-resonse-body-post';
// tslint:disable-next-line:max-line-length
import { SubscriptionConfirmPinUpdateChangePackResponseBodyPOST } from '../model/subscription/subscription-confirm-pin-update-change-pack-response-body-post';
import { catchError } from 'rxjs/operators';
import { SubscriptionProductGetProductsModelApi } from '../model/subscription/api/subscription-product-get-products-model-api';
import { UserSubscriptionHistory } from '../model/subscription/api/user-subscription-history';
import { UserSubscriptionHistoryRESPONSePOST, UserBillistoryRESPONSePOST } from '../model/subscription/api/user-subscription-history-response-post';
import { UserSubscriptionHistoryREQUEStBODyPOST } from '../model/subscription/api/user-subscription-history-request-body-post';
import { UnsubscribeUserProductApiRequestBodyPost } from '../model/subscription/api/unsubscribe-user-product-api-request-body-post';
import { UnsubscribeUserProductApiResponsePost } from '../model/subscription/api/unsubscribe-user-product-api-response-post';
import { UserMyPreferenceRequestBodyPOST } from '../model/account/api/user-account-detail-request-body-post';
import { UserMyPreferenceResponsePost } from '../model/account/api/user-account-detail-response-post';
import { ProductChangeFrequencyRequestPost, ProductChangeFrequencyResponsePost } from '../model/account/api/product-change-frequency';
import { UpgradeSubscriptionRequestPINRequestBodyPOST } from '../model/subscription/api/upgrade-subscription-request-pinrequest-body-post';
import { UpgradeSubscriptionRequestPINResponsePOST } from '../model/subscription/api/upgrade-subscription-request-pinresponse-post';
import { UpgradeSubscriptionConfirmPINResponsePOST } from '../model/subscription/api/upgrade-subscription-confirm-pinresponse-post';
import { UpgradeSubscriptionConfirmPINRequestBodyPOST } from '../model/subscription/api/upgrade-subscription-confirm-pinrequest-body-post';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  baseUrl: string;

  constructor(private httpClient: HttpClient,
     private global: Global,
     private _localStorage: LocalStorageService
     ) {
    this.baseUrl = this.global.BASE;
  }
  NewSubscription(
    model: NewSubscriptionBodyPOST
  ): Observable<NewSubscriptionResponsePOST> {
    const url = this.baseUrl + 'web/bill/requestpin';
    return this.httpClient.post<NewSubscriptionResponsePOST>(
      url,
      model,
      this.global.httpOptions
    );
  }
  ConfirmNewSubscription(
    model: NewSubscriptionConfirmRequestBodyPOST
  ): Observable<NewSubscriptionConfirmResponsePOST> {
    const url = this.baseUrl + 'web/bill/confirmpin';
    return this.httpClient.post<NewSubscriptionConfirmResponsePOST>(
      url,
      model,
      this.global.httpOptions
    );
  }
  UpdateChangeRequestPinSubscriptionPack(
    model: SubscriptionRequestPinUpdateChangePackRequestBodyPOST
  ): Observable<SubscriptionRequestPinUpdateChangePackResonseBodyPOST> {
    const url = this.global.BASE + 'web/bill/upgrade/requestpin';
    return this.httpClient.post<
      SubscriptionRequestPinUpdateChangePackResonseBodyPOST
    >(url, model, this.global.httpOptions);
  }
  UpdateChangeConfirmPinSubscriptionPack(
    model: SubscriptionConfirmPinUpdateChangePackRequestBodyPOST
  ) {
    const url = this.global.BASE + 'web/bill/upgrade/confirmpin';
    return this.httpClient.post<
      SubscriptionConfirmPinUpdateChangePackResponseBodyPOST
    >(url, model, this.global.httpOptions);
  }
  GetProducsByItemTypeId(
    itemTypeId: number
  ): Observable<SubscriptionProductGetProductsModelApi> {
    const url = this.global.BASE + 'web/product/get/byitemtypeid';
    
  var language =localStorage.getItem('lang');
    return this.httpClient.post<SubscriptionProductGetProductsModelApi>(
      url,
      {
        portalId: this.global.PORTAL_ID,
        itemtypeId: itemTypeId,
        language:language
      },
      this.global.httpOptions
    );
  }
  GetAllProducts(): Observable<SubscriptionProductGetProductsModelApi> {
    const url = this.global.BASE + 'web/product/get/all';
    
  var language =localStorage.getItem('lang');
  language:language
    return this.httpClient.post<SubscriptionProductGetProductsModelApi>(
      url,
      {
        portalId: this.global.PORTAL_ID,
        userId: this._localStorage.GetUserId(),
        jwtToken: this._localStorage.GetUserJwtToken(),
        language:language
      },
      this.global.httpOptions
    );
  }
  GetUserSubscriptionHistoryList(
    data: UserSubscriptionHistoryREQUEStBODyPOST
  ): Observable<UserSubscriptionHistoryRESPONSePOST> {
    const url = this.global.BASE + 'web/bill/subscription/history';
   // const url = this.global.BASE + 'web/bill/history';
    return this.httpClient.post<UserSubscriptionHistoryRESPONSePOST>(
      url,
      data,
      this.global.httpOptions
    );
  }
  GetUserbILLHistoryList(
    data: UserSubscriptionHistoryREQUEStBODyPOST
  ): Observable<UserBillistoryRESPONSePOST> {
    const url = this.global.BASE + 'web/bill/history';
    return this.httpClient.post<UserBillistoryRESPONSePOST>(
      url,
      data,
      this.global.httpOptions
    );
  }
  UnsubscribeProduct(data: UnsubscribeUserProductApiRequestBodyPost): Observable<UnsubscribeUserProductApiResponsePost> {
    const url = this.global.BASE + 'web/bill/directunsub';
    return this.httpClient.post<UnsubscribeUserProductApiResponsePost>(url, data, this.global.httpOptions);
  }

  UnsubscribeGhanaProduct(number,productId){
    //const url = this.global.BASE + 'web/bill/directunsub';
    //const url = "http://friendzchat.mobi/VodaFoneChat/webapi/registrationjsp/unsub?msisdn="+number+"&productId="+productId+"&channel=Wap";
    const url = "http://app.games2play.co/9MobileNigeriaBilling/unsubscription_token?msisdn="+number+"&productId="+productId+"";
    return this.httpClient.get(url,this.global.httpOptions);
  }

  // My Preference Data
  GetUserMyPreferences(data:UserMyPreferenceRequestBodyPOST):Observable<UserMyPreferenceResponsePost>{
    const url = this.global.BASE + 'web/user/preference/my/preference';
    return this.httpClient.post<UserMyPreferenceResponsePost>(url, data, this.global.httpOptions);
  }

   // Direct sub call
   DirectSubCall(data:NewSubscriptionBodyPOST):Observable<SubscriptionRequestPinUpdateChangePackResonseBodyPOST>{
    const url = this.global.BASE + 'web/bill/directsub';
    return this.httpClient.post<SubscriptionRequestPinUpdateChangePackResonseBodyPOST>(url, data, this.global.httpOptions);
  }

  // change billing frequency Data
  GetProductChangeFrequency(data:ProductChangeFrequencyRequestPost):Observable<ProductChangeFrequencyResponsePost>{
    const url = this.global.BASE + 'web/product/change/frequency';
    return this.httpClient.post<ProductChangeFrequencyResponsePost>(url, data, this.global.httpOptions);
  }

  UpgradeSubscriptionRequestPIN(body: UpgradeSubscriptionRequestPINRequestBodyPOST): Observable<UpgradeSubscriptionRequestPINResponsePOST>{
    const url = this.global.BASE + 'web/bill/upgrade/requestpin';
    return this.httpClient.post<UpgradeSubscriptionRequestPINResponsePOST>(url, body, this.global.httpOptions);
  }

  UpgradeSubscriptionConfirmPIN(body: UpgradeSubscriptionConfirmPINRequestBodyPOST): Observable<UpgradeSubscriptionConfirmPINResponsePOST>{
    const url = this.global.BASE + 'web/bill/upgrade/confirmpin';
    return this.httpClient.post<UpgradeSubscriptionConfirmPINResponsePOST>(url, body, this.global.httpOptions);
  }

}
