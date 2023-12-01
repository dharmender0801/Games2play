import { Component, OnInit, Input } from '@angular/core';
import { SearchDataItem } from 'src/app/model/search/search-data-item';
import { ResultDataItem } from 'src/app/model/search/search-result-item';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
declare var $: any;
@Component({
  selector: 'app-search-result-layout-other',
  templateUrl: './search-result-layout-other.component.html',
  styleUrls: ['./search-result-layout-other.component.css']
})
export class SearchResultLayoutOtherComponent implements OnInit {

  @Input() RenderingData: SearchDataItem[]; 
  @Input() searchCategory: string;
  @Input() hasSearched: boolean;
  @Input() SelectAll: string;
  defaultImage = "assets/images/DefaultImages/Loader_282x422.gif";

  SearchType:string=null
  selectAllTabs:boolean=false;
  selectallval:string='singleselect';
  constructor(private translate: TranslateService) { 
   
if (localStorage.getItem('lang')=="ar" ){
  translate.setDefaultLang('ar');
}
else{
  translate.setDefaultLang('en');
}
    
  }

  ngOnInit() {
   
  }
  ImageLoaded(iterator){
    // console.log(iterator);
    $('.image-num-' + iterator).css({opacity:0});
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
  UpdateNotFoundImage(iterator){
    // console.log(iterator);
     $('.image-num-' + iterator).css({opacity: 0});
     $('.image-num-' + iterator).attr('src', 'assets/images/not-found.png');
     $('.image-num-placeholder-' + iterator).addClass('hidden');
     $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
   }

}
