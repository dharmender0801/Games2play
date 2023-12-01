import { MenuHeaderComponent } from './../../shared/menu-header/menu-header.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
//import { LoginComponent } from 'src/app/modules/shared/login/login.component';
import { SubscriptionMainPackageContainerComponent } from '../subscription-main-package-container/subscription-main-package-container.component';
declare var $: any;
@Component({
  selector: 'app-subscription-main',
  templateUrl: './subscription-main.component.html',
  styleUrls: ['./subscription-main.component.css']
})
export class SubscriptionMainComponent implements OnInit {
  //@ViewChild(LoginComponent) menuHeader: LoginComponent;
  

  @ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
  @ViewChild(SubscriptionMainPackageContainerComponent) subscriptionMainPackageContainerComponent: SubscriptionMainPackageContainerComponent;
  constructor( private translate: TranslateService
    
  ) { 
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
   
  }

  ngOnInit() {
    $('.main_nav li').children().removeClass('menuHeighlight');
  }
  SubscribeClicked(value){
    // console.log(`Logged from SubscriptionMainComponent ${value}`);
    this.menuHeader.openModal(this.menuHeader.loginTemplate,false,false);
  }
  SubscriptionContainerlanguageChanged(){
    this.subscriptionMainPackageContainerComponent.getlanguageSubscriptionContainer();
   
  }
 

}
