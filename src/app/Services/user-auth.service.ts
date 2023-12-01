import { Global } from 'src/app/global/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private _global: Global
  ) { }

  GetUserIdForLocalDataAuth(): string{
    return localStorage.getItem(this._global.USER_ID);
  }
}
