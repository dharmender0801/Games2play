import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../login/login.component';
import { StreamingService } from 'src/app/Services/streaming.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GamesDetailsTempComponent } from '../games-details-temp/games-details-temp.component';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {

  img: string;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(GamesDetailsTempComponent) gameDetailData: GamesDetailsTempComponent;
  contentType:number;
  genre: string;
  pageId: any;
  IsLoggedIn: boolean = false;
  gamehreflink: string;
  statusCheck: boolean;
  IsAndroidPhone: boolean = true;
  gameName: string;

  constructor(  private _localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private deviceService: DeviceDetectorService,
    private _streamingService: StreamingService) { }

  ngOnInit() {
  }

  openGamePortal(contentId, imgId) {
    if (imgId == 1) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/20190605/1304/Water_Craft_272x272.jpg";
      this.gameName = "Water Craft";
      this.genre = "Sports";
      this.contentType=1;
    } else if (imgId == 2) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/1560239409578/1422/Ninja_War_272x272.jpg";
      this.gameName = "Ninja War";
      this.genre = "Strategy";
      this.contentType = 1;
    } else if (imgId == 3) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/20190607/1369/Gold_Miner_Jack_272x272.jpg";
      this.gameName = "Gold Miner Jack";
      this.genre = "Casual";
      this.contentType = 1;
    }else if (imgId == 4) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/20190605/1282/Swimming_Pro_272x272.jpg";
      this.gameName = "Swimming Pro";
      this.genre = "Sports";
      this.contentType = 1;
    }else if (imgId == 5) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/20190604/1183/FruitSlasher_272x272.jpg";
      this.gameName = "FruitSlasher";
      this.genre = "Strategy";
      this.contentType = 1;
    }else if (imgId == 6) {
      this.img = "http://app.games2play.co/OoredooPortalCMS/resources/appstore_content/content/15/Html5Game/1560763015968/1485/Cdrone_272x272.jpg";
      this.gameName = "Cdrone";
      this.genre = "Strategy ";
      this.contentType = 1;
    }

    if (!this._localStorageService.GetUserId()) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    } else {
      if (!this.IsAndroidPhone) {

        const data = {
          HeaderRequest:this.deviceService,
          jwtToken: this._localStorageService.GetUserJwtToken(),
          ContentId: contentId,
          userId: this._localStorageService.GetUserId(),
        };

        this._streamingService.GetgameplayLink(data).subscribe((data: any) => {
          this.spinner.show();

          if (data) {
            if (data.statusDescription.statusCode == 200) {

              this.gamehreflink = data.link;
              window.open(this.gamehreflink, "_blank");
              this.IsLoggedIn = true;
              this.spinner.hide();
            }
            else if (data.statusDescription.statusCode == 501) {
              this.spinner.hide();
              this.toastr.infoToastr('Game Not Found', 'Info', {
                position: 'top-left'
              });
            } else if (data.statusDescription.statusCode == 706) {
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if(data.statusDescription.statusCode == 714){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }

          }

        });
      } else {
        this.gameDetailData.openBannerModal(this.gameDetailData.gameDetails, contentId, this.img, this.gameName, this.genre,this.contentType);
      }

    }
  }

}
