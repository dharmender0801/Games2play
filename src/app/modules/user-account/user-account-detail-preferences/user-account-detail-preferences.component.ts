import { MyPreferencesCountREQUEStBODyPOST } from './../../../model/account/api/my-preferences-count-request-body-post';
import { MyPreferencesCountRESPONSePOST } from './../../../model/account/api/my-preferences-count-response-post';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { MyPreferencesAside } from './../../../model/account/my-preferences-aside';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Global } from './../../../global/global';
import { ErrorService } from './../../../Services/error.service';
import { catchError } from 'rxjs/operators';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';

import { throwError } from 'rxjs';
import { UserMyPreferenceRequestBodyPOST } from '../../../model/account/api/user-account-detail-request-body-post';
import { UserMyPreferenceResponsePost } from '../../../model/account/api/user-account-detail-response-post';
import { UserPreferenceData } from '../../../model/account/user-subscription-list';
import { MyPreferencesUserSubItemType } from 'src/app/model/account/my-preferences-user-sub-item-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from 'src/app/Services/loader.service';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
declare var $: any;
@Component({
  selector: 'app-user-account-detail-preferences',
  templateUrl: './user-account-detail-preferences.component.html',
  styleUrls: ['./user-account-detail-preferences.component.css']
})
export class UserAccountDetailPreferencesComponent implements OnInit {
  preferenceData: UserPreferenceData;
  @Output() myPreferencesClicked = new EventEmitter<
    MyPreferencesUserSubItemType
  >();
  currentMappedItemTypeSelected: number = 2;
  currentMappedItemTypeSelectedDescription: string;
  listOfAllPreferencesReceivedFromApi: MyPreferencesUserSubItemType[];
  preferencesCountDynamic: MyPreferencesAside[];
  preferenceCountApps: MyPreferencesAside;
  preferenceCountGames: MyPreferencesAside;
  preferenceCountMusic: MyPreferencesAside;
  preferenceCountVideo: MyPreferencesAside;

  constructor(
    private _subscriptionService: SubscriptionService,
    private _localStorageService: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private _loaderService: NgxSpinnerService,
    private _customLoaderService: LoaderService,
    private _localStorage: LocalStorageService,
    private _userAccountService: UserAccountService,
    private translate: TranslateService

  ) { if (localStorage.getItem('lang')=="ar" ){
    translate.setDefaultLang('ar');
  }
  else{
    translate.setDefaultLang('en');
  }}

  ngOnInit() {
    $('.main_nav li').children().removeClass('menuHeighlight');
    this.GetPreferencesCount();

    // this.SetCurrentPreferenceData();
  }

  SetPreferencesCountForEveryCategory() {
  
    if (this.preferencesCountDynamic.length > 0) {
      this.preferencesCountDynamic.forEach(element => {
        switch (element.name.toLowerCase()) {
          case 'apps':
            this.preferenceCountApps = element;
            break;
          case 'games':
            this.preferenceCountGames = element;
            break;
          case 'music':
            this.preferenceCountMusic = element;
            break;
          case 'videos':
            this.preferenceCountVideo = element;
            break;
        }
      });
    }
  }

  GetListOfPreferencesForMappedItemTypeId(id: number) {
    this.listOfAllPreferencesReceivedFromApi = [
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Entertainment'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Travel'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Health & Fitness'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Reading'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Kids'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Yoga'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Shopping'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Sports & Activities'
      },
      {
        addFlag: 1,
        id: '2',
        isAdded: true,
        language: 'en',
        subItemDescription: 'Cooking'
      }
    ];
  }
  GetMyPreferencesTabData(itemTypeId: number) {
 
    // this._loaderService.show();
    this._customLoaderService.ShowLoader('user-preferences-loader');
    this.currentMappedItemTypeSelected = itemTypeId;
    var language =localStorage.getItem('lang');
    const body: UserMyPreferenceRequestBodyPOST = {
      jwtToken: this._localStorageService.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: +this._localStorageService.GetUserId(),
      itemTypeId: itemTypeId,
      'language':language
    };
    const subscriber = this._subscriptionService
      .GetUserMyPreferences(body)
      .pipe(
        catchError(x => {
          console.log(x);
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserMyPreferenceResponsePost) => {
        this._customLoaderService.HideLoader('user-preferences-loader');
        if (+data.statusDescription.statusCode === 200) {
          this.preferenceData = data.preferenceData;
     
        }
      });
  }

  SetCurrentPreferenceData() {}

  GetCurrentPreferenceData(data: MyPreferencesUserSubItemType) {
    this._customLoaderService.ShowLoader('user-preferences-loader');
    data.isAdded = !data.isAdded;
    data.addFlag = data.isAdded ? 1 : 0;
   
    const currentPreference: MyPreferencesUserSubItemType = data;
    this.SavePreference(currentPreference);
  }

  SavePreference(data: MyPreferencesUserSubItemType) {
    const currentPreferenceSelected: MyPreferencesUserSubItemType = data;
    this.myPreferencesClicked.emit(currentPreferenceSelected);
  }
  GetPreferencesCount(){

    var language =localStorage.getItem('lang');
    const getPreferencesCOuntBody:MyPreferencesCountREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      userId: this._localStorage.GetUserId(),
      portalId: this._global.PORTAL_ID,
      language:language
    };
    const subscriber = this._userAccountService.GetPreferencesCountData(getPreferencesCOuntBody)
    .pipe(catchError(x => {
      this._errorService.LogError(x);
      return throwError(x);
    }))
    .subscribe((resData:MyPreferencesCountRESPONSePOST) => {
      if (+resData.statusDescription.statusCode === +this._global.HTTP_CODE_200) {
        this.preferencesCountDynamic = resData.preferenceCount;
        this.GetMyPreferencesTabData(this.currentMappedItemTypeSelected);
        this.SetPreferencesCountForEveryCategory();
      }
    });
  }
}
