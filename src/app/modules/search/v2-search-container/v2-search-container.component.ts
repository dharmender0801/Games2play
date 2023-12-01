import { SearchByKeywordItemTypeRESPONSePOST } from "./../../../model/search/api/search-by-keyword-item-type-response-post";
import { Global } from "src/app/global/global";
import { SearchByKeywordRESPONSePOST } from "./../../../model/search/api/search-by-keyword-response-post";
import { ErrorService } from "./../../../Services/error.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { SearchService } from "src/app/Services/search.service";
import { SearchByKeywordREQUEStBodyPOST } from "src/app/model/search/api/search-by-keyword-request-body-post";
import { SearchDataItem } from "src/app/model/search/search-data-item";
import { SearchByKeywordItemTypeREQUEStBodyPOST } from "src/app/model/search/api/search-by-keyword-item-type-request-body-post";
import { NgxSpinnerService } from "ngx-spinner";
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ResultDataItem } from "src/app/model/search/search-result-item";
import { data } from "../../../model/banner/api/banner-main-text-without-login-response-post";
import { V2SearchBarComponent } from "../v2-search-bar/v2-search-bar.component";
import { DeviceDetectorService } from "ngx-device-detector";
declare var $: any;

@Component({
  selector: "app-v2-search-container",
  templateUrl: "./v2-search-container.component.html",
  styleUrls: ["./v2-search-container.component.css"],
})
export class V2SearchContainerComponent implements OnInit {
  layoutToRender = "home";

  layoutDataForRenderingSearchResults: SearchDataItem[];
  //layoutDataForRenderingSearchResults: ResultDataItem[];
  @Input() searchCategory: string;

  searchCategoryFromUrl = "all";
  searchItemType = "-1";
  deviceInfo = null;
  IsIOSPhone = false;
  showSelectAll = false;
  IsAndroidPhone: boolean = true;
  searchTerm: string;
  @ViewChild(V2SearchBarComponent) searchBarComponent: V2SearchBarComponent;
  searchCategoryFromUrlForHeading: string;
  hasSearched = false;
  searchCategories: string[];
  stringpasstofetchrecords: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _errorService: ErrorService,
    private _searchService: SearchService,
    private deviceService: DeviceDetectorService,
    private _global: Global,
    private _ngxSpinnerService: NgxSpinnerService
  ) {
    this.getDeviceFunction();
  }

  ngOnInit() {
    //this.HideLoader();
    //$('.main_nav li').children().removeClass('menuHeighlight');
    this.GetRouteParamForLayoutMapping();

    // this.OnInitialLoadFillDataForHomeParam();
  }

  getDeviceFunction() {
    console.log("In here");
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === "Android") {
      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
    } else if (this.deviceInfo.os === "iOS") {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
    } else {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
  }

  GetRouteParamForLayoutMapping() {
    this._activatedRoute.paramMap
      .pipe(
        catchError((x) => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data) => {
        //debugger
        if (data.get("layout")) {
          //this.layoutToRender = data.get('layout').toLowerCase();
          //this.searchCategoryFromUrl = data.get('layout').toLowerCase();
          //this.searchCategoryFromUrlForHeading = data.get('layout');
          //this.ShowSelecteAllOnHomeOnly();
          // this.SearchValue(this.searchTerm);
          if (data.get("layout").toLowerCase() === "home") {
            this.searchBarComponent.searchCategories.push("Videos");
            this.searchBarComponent.searchCategories.push("Music");
            this.searchBarComponent.searchCategories.push("Games");
          } else {
            switch (data.get("layout").toLowerCase()) {
              case "videos":
                this.searchBarComponent.searchCategories.push("Videos");
                break;
              case "music":
                this.searchBarComponent.searchCategories.push("Music");
                break;
              case "games":
                this.searchBarComponent.searchCategories.push("Games");
                break;
              default:
                this.searchBarComponent.searchCategories.push("Videos");
                this.searchBarComponent.searchCategories.push("Music");
                this.searchBarComponent.searchCategories.push("Games");
                break;
            }
          }
        }
      });
  }
  ShowSelecteAllOnHomeOnly() {
    if (this.searchCategoryFromUrl === "home") {
      this.showSelectAll = true;
      this.searchBarComponent.showSelectAll = true;
    } else {
      this.showSelectAll = false;
      this.searchBarComponent.showSelectAll = false;
    }
  }

  OnInitialLoadFillDataForHomeParam() {
    const bodyData: SearchByKeywordREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      keyword: "Hel",
      lang: localStorage.getItem("lang"),
      androidPhone: this.IsAndroidPhone,
    };
    const subscriber = this._searchService
      .GetSearchDataForHomeLayout(bodyData)
      .pipe(
        catchError((x) => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordRESPONSePOST) => {
        if (data.result.length > 0) {
          this.layoutDataForRenderingSearchResults = data.result;
        }
        // if (data.result.length > 0) {
        //   this.layoutDataForRenderingSearchResults = data.result;
        // }
        subscriber.unsubscribe();
      });
  }
  OnInitialLoadFillDataForOtheraram() {}
  SearchValue(searchTerm: string) {
    this.hasSearched = true;
    this.searchTerm = searchTerm;

    if (this.searchTerm.length >= 1) {
      if (this.searchCategoryFromUrl === "home") {
        if (
          this.searchBarComponent.searchCategories.length > 1 ||
          this.searchBarComponent.searchCategories.length === 0
        ) {
          this.SearchValueForKyeword(this.searchTerm);
        } else {
          this.SearchValueWithItemType(
            this.searchBarComponent.searchCategories
          );
        }
        // if (this.searchItemType !== '-1') {
        //   this.SearchValueForKyewordAndItemType(this.searchItemType);
        // } else {
        //   if (searchTerm) {
        //     this.SearchValueForKyeword(searchTerm);
        //   } else {
        //     this.SearchValueForKyeword('');
        //   }
        // }
      } else {
        this.SearchValueForKyeword(this.searchTerm);
      }
    } else {
      let json: any = [
        {
          type: "Videos",
          data: [],
          searchingForThis: true,
        },
        {
          type: "Music",
          data: [],
          searchingForThis: true,
        },
        {
          type: "Games",
          data: [],
          searchingForThis: true,
        },
      ];
      this.layoutDataForRenderingSearchResults = json;
    }
  }
  SearchValueWithItemType(itemType: string[]) {
    //debugger;
    this._ngxSpinnerService.show();
    this.searchCategories = itemType;
    this.layoutDataForRenderingSearchResults = []; // Clear all the values before getting new ones
    this.layoutDataForRenderingSearchResults = [];
    if (itemType.length === 0) {
      this.SearchValueForKyeword(this.searchTerm);
    } else {
      this.stringpasstofetchrecords = itemType.join(",");
      this.SearchValueForKyewordAndItemType(this.stringpasstofetchrecords);
    }
  }
  SearchValueForKyewordAndItemType(itemType) {
    //debugger;
    //this.ShowLoader();
    const bodyData: SearchByKeywordItemTypeREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      itemtype: itemType,
      keyword: this.searchTerm,
      androidPhone: this.IsAndroidPhone,
      lang: localStorage.getItem("lang"),
    };
    console.log(bodyData);
    const subscriber = this._searchService
      .GetSearchDataForOtherLayout(bodyData)
      .pipe(
        catchError((x) => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordItemTypeRESPONSePOST) => {
        //debugger
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
          }
          console.log(this.layoutDataForRenderingSearchResults);
        } else if (+data.statusDescription.statusCode === 450) {
          this.layoutDataForRenderingSearchResults = [];
        }
        //this.MoreThanOneSearchCategory();
        //this.SingleSearchCategory();
      });
  }
  ShowLoader() {
    $("#search-loader").show();
  }
  HideLoader() {
    $("#search-loader").hide();
  }
  SearchValueForKyeword(searchTerm: string) {
    //
    //this._ngxSpinnerService.show();
    //this.ShowLoader();
    const bodyData: SearchByKeywordREQUEStBodyPOST = {
      portalId: this._global.PORTAL_ID,
      keyword: searchTerm,
      lang: localStorage.getItem("lang"),
      androidPhone: this.IsAndroidPhone,
    };
    const subscriber = this._searchService
      .GetSearchDataForHomeLayout(bodyData)
      .pipe(
        catchError((x) => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: SearchByKeywordRESPONSePOST) => {
        // this._ngxSpinnerService.hide();
        //this.HideLoader();
        //
        if (data.result.length > 0) {
          this.layoutDataForRenderingSearchResults = data.result;
        }
        // if (data.result.length > 0) {
        //   this.layoutDataForRenderingSearchResults = data.result;
        // }
        subscriber.unsubscribe();
      });
  }
  SetCurrentCategorySoWeCanSearchAllData(value) {
    this.searchItemType = "-1";
  }

  MoreThanOneSearchCategory(): boolean {
    if (this.searchBarComponent.searchCategories) {
      return this.searchBarComponent.searchCategories.length === 0 ||
        this.searchBarComponent.searchCategories.length > 1
        ? true
        : false;
    } else {
      return true;
    }
  }
  SingleSearchCategory(): boolean {
    if (this.searchBarComponent.searchCategories) {
      return this.searchBarComponent.searchCategories.length === 1
        ? true
        : false;
    } else {
      return false;
    }
  }
}
