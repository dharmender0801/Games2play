import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(private translate: TranslateService,   private spinner: NgxSpinnerService,) {
    
    if (localStorage.getItem('lang') == "ar") {
      this.translate.setDefaultLang('ar');
    }
    else {
      this.translate.setDefaultLang('en');
    }
  }

  ngOnInit() {

    
  }
}
