import { Component, OnInit,ViewChild } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { WishlistLoggedInFilledComponent } from 'src/app/modules/wishlist/wishlist-logged-in-filled/wishlist-logged-in-filled.component'
@Component({
  selector: 'app-wishlist-main',
  templateUrl: './wishlist-main.component.html',
  styleUrls: ['./wishlist-main.component.css']
})
export class WishlistMainComponent implements OnInit {
  @ViewChild(WishlistLoggedInFilledComponent) wishlistLoggedInFilledComponent: WishlistLoggedInFilledComponent;
  constructor(
    private translate: TranslateService
  ) { 
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
  
  }
 
  
  wishlistlanguageChanged(){
    this.wishlistLoggedInFilledComponent.ngOnInit();
    this.wishlistLoggedInFilledComponent.setWishlistFiltertext();
  }
}
