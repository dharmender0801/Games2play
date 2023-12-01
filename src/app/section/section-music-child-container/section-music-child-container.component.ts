import { UpdateUserAccountDetailResponsePost, UserAccountDetailRESPONSePOST } from './../../model/account/api/user-account-detail-response-post';
import { ErrorService } from 'src/app/Services/error.service';
import { throwError } from 'rxjs';
import { UserAccountDetailREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { Global } from 'src/app/global/global';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { SectionMusicChildComponent } from '../section-music-child/section-music-child.component';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../../modules/shared/login/login.component';
@Component({
  selector: 'app-section-music-child-container',
  templateUrl: './section-music-child-container.component.html',
  styleUrls: ['./section-music-child-container.component.css']
})
export class SectionMusicChildContainerComponent implements OnInit {
  //@ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(SectionMusicChildComponent) sectionMusicChildComponent: SectionMusicChildComponent;
  constructor(
    private _userAccountService: UserAccountService,
    private _localStorageService: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }
  AddwishlistmusicClicked(value: boolean) {
   // debugger
    if (value) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false, false, false, false, false, false, true);
    }
    this.spinner.hide();
  }
  MusicPlayAlbumClicked(value: boolean) {
    if (value) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false, false, false, false, true);
    }
  }
  MusicPlayAlbumMenuClicked(value: boolean) {
    //debugger
    if (value) {
      this.sectionMusicChildComponent.GetUserAccountSubList();
      window.location.reload();
    }

  }

  LoginConfirmed(data) {
    if (data) {
      var language =localStorage.getItem('lang');
      const bodyData: UserAccountDetailREQUEStBODyPOST = {
        jwtToken: this._localStorageService.GetUserJwtToken(),
        portalId: this._global.PORTAL_ID,
        userId: this._localStorageService.GetUserId(),
        language:language
      };
      const subscriber = this._userAccountService.GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((resdata: UserAccountDetailRESPONSePOST) => {
        if (resdata.userSubscriptionList.length > 0) {
          if (resdata.userSubscriptionList[0].mappedItemtypeId === '0' ||
          resdata.userSubscriptionList[0].mappedItemtypeId === '1') {
            // location.reload();

            this.sectionMusicChildComponent.loggedIn = true;
            setTimeout(() => {
             // this.sectionMusicChildComponent.AudioPlayerFunction();
              this.sectionMusicChildComponent.CheckMusicWishlistbtnname();
            }, 10);


          }
        }
      });
    }

  }


}
