import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  deviceInfo = null;
  IsAndroidPhone: boolean = true;
  isArabic :boolean = false;
  IsIOSPhone: boolean = true;
  constructor( private deviceService: DeviceDetectorService,private router: Router,
    private translate: TranslateService) {
      if (localStorage.getItem('lang')=="ar" ){
        translate.setDefaultLang('ar');
      }
      else{
        translate.setDefaultLang('en');
      }
  
   }

  ngOnInit() {
    this.getDeviceFunction();
  }

  getDeviceFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === 'Android') {
      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
      $('.footer_section').addClass('android_footer');
    }
    else if(this.deviceInfo.os === 'iOS')
    {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
      $('.footer_section').removeClass('android_footer');
    }
    else 
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
      $('.footer_section').removeClass('android_footer');

    }
  }

  openTC(){
    console.log();
    var lang = localStorage.getItem('lang');
    this.router.navigate(["/termsandcondition"]);
    // if(this.isArabic){
    //   lang = "ar";
    // }
    //window.open("http://app.games2play.co/OoredooPortalCMS/termsAndConditions?lang="+lang+"&country=965&operator=123456","_blank");
  }

  openPP(){
    var lang = localStorage.getItem('lang');
    this.router.navigate(["/privacypolicy"]);
    // if(this.isArabic){
    //   lang = "ar";
    // }
   // window.open("http://app.games2play.co/OoredooPortalCMS/privacyPolicy?lang="+lang+"&country=965&operator=123456","_blank");
  }

}
