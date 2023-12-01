import { MyPreferencesCountRESPONSePOST } from './../model/account/api/my-preferences-count-response-post';
import { MyPreferencesCountREQUEStBODyPOST } from './../model/account/api/my-preferences-count-request-body-post';
import { MyPreferencesRESPONSePOST } from './../model/account/api/my-preferences-response-post';
import { MyPreferencesREQUEStBodyPOST } from './../model/account/api/my-preferences-request-body-post';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global/global';
import { UserAccountDetailRESPONSePOST, UpdateUserAccountDetailResponsePost } from '../model/account/api/user-account-detail-response-post';
// tslint:disable-next-line:max-line-length
import { UserAccountDetailREQUEStBODyPOST, UpdateUserAccountDetailREQUEStBODyPOST } from '../model/account/api/user-account-detail-request-body-post';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  constructor(private httpClient: HttpClient, private global: Global) {}

  GetAccountDetail(data: UserAccountDetailREQUEStBODyPOST): Observable<UserAccountDetailRESPONSePOST> {
    const url = this.global.BASE + 'web/user/accountdetail';
    return this.httpClient.post<UserAccountDetailRESPONSePOST>(url, data, this.global.httpOptions);
  }
  UpdateAccountDetail(data: UpdateUserAccountDetailREQUEStBODyPOST): Observable<UpdateUserAccountDetailResponsePost> {
    const url = this.global.BASE + 'web/user/updateaccount';
    return this.httpClient.post<UpdateUserAccountDetailResponsePost>(url, data, this.global.httpOptions);
  }
  SaveUserPreferences(_data: MyPreferencesREQUEStBodyPOST) {
    const url = this.global.BASE + 'web/user/preference/save';
    return this.httpClient.post<MyPreferencesRESPONSePOST>(url, _data, this.global.httpOptions);
  }
  GetPreferencesCountData(data:MyPreferencesCountREQUEStBODyPOST){
    const url = this.global.BASE + 'web/user/preference/count';
    return this.httpClient.post<MyPreferencesCountRESPONSePOST>(url, data, this.global.httpOptions);
  }
  UploadImageDetail(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.global.BASE + 'web/user/uploadprofileimage', data, this.global.httpOptions);
  }
  UpdateAccountLanguage(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.global.BASE + 'web/user/updateaccount' , bodyData, this.global.httpOptions);
  }
}
