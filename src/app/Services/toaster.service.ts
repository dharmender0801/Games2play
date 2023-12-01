import { ToastrManager } from 'ng6-toastr-notifications';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(private _toasterService: ToastrManager) {}

  ShowErrorTopLeft(errorMessage, title) {
    this._toasterService.errorToastr(errorMessage, title, {
      position: 'top-left'
    });
  }
  ShowInfoTopLeft(message, title) {
    this._toasterService.infoToastr(message, title, {
      position: 'top-left'
    });
  }
  ShowSuccessTopLeft(message, title){
    this._toasterService.successToastr(message, title, {
      position: 'top-left'
    });
  }
  ShowSuccessTopLeftWithCustomTime(message: string, title: string, time: number){
    this._toasterService.successToastr(message, title, {
      position: 'top-left',
      toastTimeout: time
    });
  }

  

}
