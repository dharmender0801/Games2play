import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  ShowLoader(loaderId: string){
    $('#' + loaderId).show();
  }
  HideLoader(loaderId: string){
    $('#' + loaderId).hide();
  }
}
