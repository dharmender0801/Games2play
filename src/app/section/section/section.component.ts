import { PromotionalbannerComponent } from './../../promotionalbanner/promotionalbanner.component';
import { BannerComponent } from './../../banner/banner.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SectionService } from '../../Services/section.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { HowItWorksComponent } from 'src/app/how-it-works/how-it-works.component';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { NavigationEnd } from '@angular/router';
import {Router } from '@angular/router';
import { SubscriptionMainPackageAllInOneComponent } from 'src/app/modules/subscription/subscription-main-package-all-in-one/subscription-main-package-all-in-one.component';
import { LoginComponent } from '../../modules/shared/login/login.component';
declare var $ : any;
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
//  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(BannerComponent) bannerComponent: BannerComponent;
  @ViewChild(PromotionalbannerComponent) promotionalbannerComponent: PromotionalbannerComponent;
  @ViewChild(HowItWorksComponent) howitworkscomponent: HowItWorksComponent;
  @ViewChild('SubscriptionMainPackageAllInOneComponent') subscription: SubscriptionMainPackageAllInOneComponent;


  sections = [];
  pageId:string;
  IsSafaribrowser = false
  browser = null
  public showhowitwork: boolean = true;
  public IsAndroidPhone: boolean = false;
  public IsIOSPhone: boolean = false;
  
  deviceInfo = null;
  constructor(
    private sectionService: SectionService,
    private spinner: NgxSpinnerService,
    private deviceService: DeviceDetectorService,
    private _localStorage: LocalStorageService,
    private translate: TranslateService,
    private route: Router,
  ) {
    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
   }


  getDeviceFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.browser= this.deviceService.browser;
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === 'Android') {
      
      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
    }
    else if(this.deviceInfo.os === 'iOS')
    {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
    }
    else 
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
    if(this.browser=="Safari"){
      this.IsSafaribrowser=true;
    }
    
  }

  ngOnInit() {
    this.getDeviceFunction();
    
    if(sessionStorage.getItem('IsSafaribrowser')== null ){ 
      if(this.IsSafaribrowser==true){
       setTimeout(() => {
        $('#modelOpensafaripopup')[0].click();
        sessionStorage.setItem('IsSafaribrowser', 'first');
        ///localStorage.setItem('IsSafaribrowser','first');
        
       }, 300);
          
       }
    }
    //this.getSections();
    if (localStorage.getItem('loginStatus') != "" && localStorage.getItem('loginStatus') != null) {
      this.showhowitwork = false;
    }
    else {
      this.showhowitwork = true;
    }
    //lang change
    // this.getCurrentRouteUrlChange();
  }

  getCurrentRouteUrlChange() {
    this.route.events.subscribe(event => {
      
      if (event instanceof NavigationEnd) {
         if(event.url==='/?lang=ar' || event.url==='/?lang=en')
         {
         // this.getSections();
          this.getDeviceFunction();
         }
      }
    });
  }

  LoginConfirmed(value){
   // debugger;
    // this.promotionalbannerComponent.loggedIn = true;
    // this.bannerComponent.ngOnInit();
    // this.bannerComponent.GetBannerData();
    // this.promotionalbannerComponent.GetBannerText();
    // this.howitworkscomponent.RefreshHowItWorks();
    // this.getSections();

  }

  getSections() {
   // debugger
   console.log("in getSections");
    var language =localStorage.getItem('lang');
  
    let data = {
      'portalId': 73,
      'pageName': 'Index Page',
      'subPageId': 0,
      'userId' : this._localStorage.GetUserId(),
      'language':language,
      'jwtToken': this._localStorage.GetUserJwtToken(),
    }
    console.log("request payload = ");
    console.log(data);
    this.spinner.show();
    this.sectionService.GetSectionData(data).subscribe((response: any) => {
      console.log(response);
      if (response) {
        this.spinner.hide();
        this.pageId=response.pageId;
        this.sections = response.content;
        console.log(this.sections);
      }
    });
  }

  subscribeTodayClicked(value: boolean) {
    if (value) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate,true,false,false,false,false);
    }
  }
  BottomBannerClicked(value: boolean) {
    if (value) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate,false,false,false,false,false,false,false,false);
    }
  }
  bannerlanguageChanged(){
    this.bannerComponent.ngOnInit();
    this.bannerComponent.GetBannerData();
    setTimeout(() => {
      this.promotionalbannerComponent.GetBannerText();
    }, 100);
    //this.howitworkscomponent.RefreshHowItWorks();
    this.getSections();
  
  }

  getPacks(){}
}
