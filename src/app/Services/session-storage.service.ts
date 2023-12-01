import { Global } from 'src/app/global/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(
    private _global: Global
  ) { }

  GetUserIsNavigatedFromContent(): string{
    return sessionStorage.getItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT);
  }
  SetUserIsNavigatedFromContentToTrue(){
    return sessionStorage.setItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT, JSON.stringify(true));
  }
  SetUserIsNavigatedFromContentToFalse(){
    return sessionStorage.setItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT, JSON.stringify(false));
  }
  SetUserIsNavigatedFromContentForSubUpgradeRequestToTrue(){
    return sessionStorage.setItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT_FOR_UPGRADE_SUB_REQUEST, JSON.stringify(true));
  }
  SetUserIsNavigatedFromContentForSubUpgradeRequestToFalse(){
    return sessionStorage.setItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT_FOR_UPGRADE_SUB_REQUEST, JSON.stringify(false));
  }
  GetUserIsNavigatedFromContentForSubUpgradeRequest(): string{
    return sessionStorage.getItem(this._global.IS_USER_NAVIGATED_FROM_CONTENT_FOR_UPGRADE_SUB_REQUEST);
  }
}
