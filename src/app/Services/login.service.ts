import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global/global';
import { debug } from 'util';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string;
  apiLogin:string;
  baseUrllogout: string;
  baseUrlExternal: string;
  public isUserLoggedIn : boolean;

  constructor(private httpClient: HttpClient, private global: Global) {
    this.baseUrl = this.global.Get_API_login ;
    this.apiLogin = this.global.API_login_otp;
    this.baseUrllogout = this.global.Get_API_logout ;
    this.baseUrlExternal = this.global.Get_API_ExternalLinks ;
    this.isUserLoggedIn = false;

  }
  GetloginData(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + 'pushpin', bodyData, httpOptions);
  }

  
  ghanaSubscribe(msisdn,pack) {
    //return this.httpClient.get("http://chatapi.friendzchat.mobi/FcAPI/api/v1/notification/web/subscription?msisdn="+msisdn+"&productId="+pack+"&channel=WAP",httpOptions);
    return this.httpClient.get("http://app.games2play.co/I2CApplication/api/v1/subscribe?msisdn="+msisdn+"&productId="+pack+"&channel=WAP",httpOptions);
  }

  getCheckNumberAvail(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.apiLogin + 'subscription', bodyData, httpOptions);
  }

  GetloginDatapin(data: any) {
    const bodyDatapin = JSON.stringify(data);
    return this.httpClient.post('http://app.games2play.co/OoredooWebStoreAPI/auth/du/user_registration', bodyDatapin, httpOptions);
  }
  GetlogoutDatapin(data: any) {
    const bodyDatapin = JSON.stringify(data);
    return this.httpClient.post(this.baseUrllogout , bodyDatapin, httpOptions);
  }
  GetAppExternalLink(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrlExternal + '/links', bodyData, httpOptions);
  }

  setIsUserLoggedIn(status :boolean){
    localStorage.setItem("loginStatus", ""+status);
  }

  getIsUserLoggedIn(){
    return localStorage.getItem("loginStatus") == "true" ? true : false;
  }

  productRequest(productRequest: any) {
    const bodyData = JSON.stringify(productRequest);
    return this.httpClient.post('http://app.games2play.co/OoredooWebStoreAPI/web/product/get/byitemtypeid', bodyData, httpOptions);
  }

  subscribeRequest(subscribeRequest: any) {
    const bodyData = JSON.stringify(subscribeRequest);
    return this.httpClient.post('http://app.games2play.co/OoredooWebStoreAPI/auth/pushpin', bodyData, httpOptions);
  }

}
