import { BannerMainTextWithoutLoginREQUEStBodyPOST } from './../model/banner/api/banner-main-text-without-login-request-body-post';
import { BannerMainTextWithLoginREQUEStBodyPOST } from './../model/banner/api/banner-main-text-with-login-request-body-post';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global/global';
import { BannerMainTextWithLoginRESPONSePOST } from '../model/banner/api/banner-main-text-with-login-response-post';
import { BannerMainTextWithoutLoginRESPONSePOST } from '../model/banner/api/banner-main-text-without-login-response-post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, private global: Global) {
    this.baseUrl = this.global.WebStore_API_URLvalue;
  }

  GetBannerData(data: any) {

    const bodyData = JSON.stringify(data);
   
    return this.httpClient.post(this.baseUrl + 'banner', bodyData, httpOptions);
  }
  GetMainBannerDynamicTextWithLogin(
    body: BannerMainTextWithLoginREQUEStBodyPOST
  ): Observable<BannerMainTextWithLoginRESPONSePOST> {
    const url = this.global.BASE + 'web/portal/static/banner';
    return this.httpClient.post<BannerMainTextWithLoginRESPONSePOST>(
      url,
      body,
      this.global.httpOptions
    );
  }
  GetMainBannerDynamicTextWithoutLogin(
    body: BannerMainTextWithoutLoginREQUEStBodyPOST
  ): Observable<BannerMainTextWithoutLoginRESPONSePOST> {
    const url = this.global.BASE + 'web/portal/static/banner';
    return this.httpClient.post<BannerMainTextWithoutLoginRESPONSePOST>(
      url,
      body,
      this.global.httpOptions
    );
  }
}
