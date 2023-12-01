import { SearchByKeywordItemTypeRESPONSePOST } from './../../../model/search/api/search-by-keyword-item-type-response-post';
import { Global } from 'src/app/global/global';
import { SearchByKeywordRESPONSePOST } from './../../../model/search/api/search-by-keyword-response-post';
import { ErrorService } from './../../../Services/error.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { SearchService } from 'src/app/Services/search.service';
import { SearchByKeywordREQUEStBodyPOST } from 'src/app/model/search/api/search-by-keyword-request-body-post';
import { SearchDataItem } from 'src/app/model/search/search-data-item';
import { SearchByKeywordItemTypeREQUEStBodyPOST } from 'src/app/model/search/api/search-by-keyword-item-type-request-body-post';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ResultDataItem } from 'src/app/model/search/search-result-item';
import { data } from '../../../model/banner/api/banner-main-text-without-login-response-post';
import { DeviceDetectorService } from 'ngx-device-detector';
declare var $: any;
@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html',
  styleUrls: ['./search-container.component.css']
})
export class SearchContainerComponent implements OnInit {
  layoutToRender = 'home';
  
  layoutDataForRenderingSearchResults: SearchDataItem[];
 //layoutDataForRenderingSearchResults: ResultDataItem[];
  searchCategoryFromUrl = 'all';
  searchItemType = '-1';
  showSelectAll = false;
  IsAndroidPhone: boolean = true;
  deviceInfo = null;
  IsIOSPhone = false;
  searchTerm: string;
  @ViewChild(SearchBarComponent) searchBarComponent: SearchBarComponent;
  searchCategoryFromUrlForHeading: string;
  hasSearched = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _errorService: ErrorService,
    private deviceService: DeviceDetectorService,
    private _searchService: SearchService,
    private _global: Global,
    private _ngxSpinnerService: NgxSpinnerService
  ) {this.getDeviceFunction();}

  ngOnInit() {
    this.GetRouteParamForLayoutMapping();
  }

  getDeviceFunction() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === 'Android') {

      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
    }
    else if (this.deviceInfo.os === 'iOS') {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
    }
    else {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
  }

  GetRouteParamForLayoutMapping() {
    this._activatedRoute.paramMap
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe(data => {
        if (data.get('layout')) {
          this.layoutToRender = data.get('layout').toLowerCase();
          this.searchCategoryFromUrl = data.get('layout').toLowerCase();
          this.searchCategoryFromUrlForHeading = data.get('layout');
          this.ShowSelecteAllOnHomeOnly();
          // this.SearchValue(this.searchTerm);
        }
      });
  }
  ShowSelecteAllOnHomeOnly(){
    if(this.searchCategoryFromUrl === 'home'){
      this.showSelectAll = true;
      this.searchBarComponent.showSelectAll = true;
    } else {
      this.showSelectAll = false;
      this.searchBarComponent.showSelectAll = false;
    }
  }

  OnInitialLoadFillDataForHomeParam() {
    const bodyData: SearchByKeywordREQUEStBodyPOST = {
      portalId:72,
      keyword: 'Hel',
      lang:localStorage.getItem('lang'),
      androidPhone:this.IsAndroidPhone
    };
    const subscriber = this._searchService
      .GetSearchDataForHomeLayout(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordRESPONSePOST) => {
        
        if (data.result.length > 0) {
          this.layoutDataForRenderingSearchResults = data.result;
        }
        subscriber.unsubscribe();
      });
  }
  OnInitialLoadFillDataForOtheraram() {}
  SearchValue(searchTerm: string) {
   
    this.hasSearched = true;
    this.searchTerm = searchTerm;
   
    if(this.searchTerm.length >=1)
{
    if (this.searchCategoryFromUrl === 'home') {
      if (this.searchItemType !== '-1') {
        this.SearchValueForKyewordAndItemType(this.searchItemType);
      } else {
        if (searchTerm) {
          this.SearchValueForKyeword(searchTerm);
        } else {
          this.SearchValueForKyeword('');
        }
      }
    } else {
      this.SearchValueForKyewordAndItemType(this.searchCategoryFromUrl);
    }
  }
  else
  {
    let json : any = [
      {
        "type": "Videos",
        "data": []
    },
    {
      "type": "Music",
      "data": []
  },
  {
      "type": "Games",
      "data": []
  }
  ];
    this.layoutDataForRenderingSearchResults = json;
  }
  }
  SearchValueWithItemType(itemType: string) {
   //debugger;
   this._ngxSpinnerService.show();
    this.searchItemType = itemType;
    this.SearchValueForKyewordAndItemType(itemType);
  }
  SearchValueForKyewordAndItemType(itemType: string) {
    
  
    //this.ShowLoader();
    //debugger;
    const bodyData: SearchByKeywordItemTypeREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      itemtype: itemType,
      keyword: this.searchTerm,
      androidPhone: this.IsAndroidPhone,
      lang:localStorage.getItem('lang')
    };
    const subscriber = this._searchService
      .GetSearchDataForOtherLayout(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordItemTypeRESPONSePOST) => {
         this._ngxSpinnerService.hide();
        //this.HideLoader();
        if (+data.statusDescription.statusCode === 200) {
         
          if (data.result.length > 0) {
            this.layoutDataForRenderingSearchResults = data.result;
           
          }
          // if (data.result.length > 0) {
          //   this.layoutDataForRenderingSearchResults = data.result;
          // }
           else {
            this.layoutDataForRenderingSearchResults = [];
          }
        } else if (+data.statusDescription.statusCode === 450) {
          this.layoutDataForRenderingSearchResults = [];
        }
      });
  }
  ShowLoader(){
    $('#search-loader').show();
  }
  HideLoader(){
    $('#search-loader').hide();
  }
  SearchValueForKyeword(searchTerm: string) {
     this._ngxSpinnerService.show();
    const bodyData: SearchByKeywordREQUEStBodyPOST = {
      portalId:72,
      keyword: searchTerm,
      lang:localStorage.getItem('lang'),
      androidPhone:this.IsAndroidPhone
    };
    const subscriber = this._searchService
      .GetSearchDataForHomeLayout(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordRESPONSePOST) => {
        this._ngxSpinnerService.hide();
        //this.HideLoader();
        // debugger
        if (data.result.length > 0) {
          this.layoutDataForRenderingSearchResults = data.result;
        
        }
        // if (data.result.length > 0) {
        //   this.layoutDataForRenderingSearchResults = data.result;
        // }
        subscriber.unsubscribe();
      });
  }
  SetCurrentCategorySoWeCanSearchAllData(value){
    this.searchItemType = '-1';
  }
}
