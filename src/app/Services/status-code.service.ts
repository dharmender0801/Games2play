import { ToasterService } from 'src/app/Services/toaster.service';
import { Global } from './../global/global';
import { StatusDescription } from './../model/other/status-description';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StatusCodeService {
  constructor(
    private _global: Global,
    private _localStorageService: LocalStorageService,
    private _toasterService: ToasterService,
    private _router: Router
  ) {}

  ManageStatusCodeImplementation(statusDescription: StatusDescription) {
    switch (statusDescription.statusCode) {
      // 100
      // 200
      case this._global.HTTP_CODE_200:
        this._toasterService.ShowSuccessTopLeft(
          statusDescription.statusMessage,
          this._global.TOASTER_HEADING_SUCCESS
        );
        break;
        // 300
      case this._global.HTTP_CODE_304:
        this._localStorageService.ClearLoaclStorage();
        this._router.navigate(['/']);
        break;
        // 700
      case this._global.HTTP_CODE_702:
        this._toasterService.ShowErrorTopLeft(
          statusDescription.statusMessage,
          this._global.TOASTER_HEADING_ERROR
        );
        break;
      default:
        this._toasterService.ShowInfoTopLeft(
          statusDescription.statusMessage,
          this._global.TOASTER_HEADING_INFO
        );
        break;
    }
  }
  StatusCodeIs304() {
    this._localStorageService.ClearLoaclStorage();
    this._router.navigate(['/']);
    // location.reload();
  }
}
