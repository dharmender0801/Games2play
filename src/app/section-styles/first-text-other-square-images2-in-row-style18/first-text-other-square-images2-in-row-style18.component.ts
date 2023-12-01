import { LocalStorageService } from './../../Services/local-storage.service';
import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { LoginComponent } from '../../modules/shared/login/login.component';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { BsModalService } from 'ngx-bootstrap';
import { StreamingService } from 'src/app/Services/streaming.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { GameDetailsComponent } from 'src/app/modules/shared/game-details/game-details.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginService } from 'src/app/Services/login.service';
import { Global } from 'src/app/global/global';


declare var $: any;
@Component({
  selector: 'app-first-text-other-square-images2-in-row-style18',
  templateUrl: './first-text-other-square-images2-in-row-style18.component.html',
  styleUrls: ['./first-text-other-square-images2-in-row-style18.component.css']
})
export class FirstTextOtherSquareImages2InRowStyle18Component implements OnInit {

  defaultImage = "assets/images/DefaultImages/Loader_180X270.gif";
  statusCheck: boolean;
  IsLoggedIn: boolean = false;
  sectionData: any;
  deviceInfo = null;
  IsIOSPhone = false;
  public showlogoutdrp: boolean = false;
  showLoginPassword: boolean = true;
  public showtryforfree: boolean = true;
  public show: boolean = false;
  public showlogin: boolean = true;
  public IsCoundown: boolean = false;
  public IsResend: boolean = false;
  IsAndroidPhone: boolean = true;
  contentId: string;
  gamehreflink: string;
  @Input() pageData: any;
  @Input() pageId: string;

  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(GameDetailsComponent) gameDetail: GameDetailsComponent;
  @ViewChild('template') loginTemplate: TemplateRef<any>;

  constructor(private route: Router,
    private _localStorageService: LocalStorageService,
    private translate: TranslateService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private _global: Global,
    public toastr: ToastrManager,
    private router: ActivatedRoute,
    private _streamingService: StreamingService,
    private deviceService: DeviceDetectorService) {

    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
    }
    else {
      translate.setDefaultLang('en');
    }
  }

  ngOnInit() {
    this._localStorageService.SetUpgradePreviousServiceCameFrom('game');
    this.getDeviceFunction();
  }

  getDeviceFunction() {
    console.log("In here");
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

  ImageLoaded(iterator) {

    $('.image-num-' + iterator).css({ opacity: 0 });
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
  UpdateNotFoundImage(iterator) {

    $('.image-num-' + iterator).css({ opacity: 0 });
    $('.image-num-' + iterator).attr('src', 'assets/images/not-found.png');
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  userLoginCheck(section) {
    if (!this._localStorageService.GetUserId()) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    } else {
      this.statusCheck = true;

      this.contentId = section.id;
      const data = {
        HeaderRequest:this.deviceService,
        jwtToken: this._localStorageService.GetUserJwtToken(),
        ContentId: this.contentId,
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
            this.toastr.errorToastr('Your validity of pack has been expired. Please recharge your account and try again', 'Error', {
              position: 'top-left'
            });

          }

        }

      });
    }
  }

  userLoginCheckImg(section) {

    console.log("in userLoginCheckImg")
    if (!this._localStorageService.GetUserId()) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    } else {
      if (!this.IsAndroidPhone) {
        this.contentId = section.id;
        const data = {
          HeaderRequest:this.deviceService,
          jwtToken: this._localStorageService.GetUserJwtToken(),
          ContentId: this.contentId,
          userId: this._localStorageService.GetUserId(),
          lang:localStorage.getItem('lang')
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
            }else if(data.statusDescription.statusCode == 712){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if(data.statusDescription.statusCode == 714){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if(data.statusDescription.statusCode == 304){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
              this.logout();

            }else if(data.statusDescription.statusCode == 717){
              this.spinner.hide();
              this.logout();
            }

          }

        });
      } else {
        let activationStatus = false;
        let status = localStorage.getItem("subscriptionStatus");
        this.sectionData = section;
        this.gameDetail.openModal(this.gameDetail.gameDetails, this.sectionData);

      }

    }
  }

  logout(){
    this.spinner.show();
    $('.main_nav li').children().removeClass('activeLink');
    $('#body').removeClass('rtl');
    $("div [class*='col-']").removeClass('pull-right');
    $("a.pull-right").addClass('pull-right');
    $("a.btn.btn-primary").removeClass('pull-left');
    const userid = localStorage.getItem("Usermbid");
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    let newUserId=localStorage.getItem("userId");
    const data = {
      'userId': newUserId,
      'jwtToken': token,
      'portalId': 72,
    };
  
          this.loginService.GetlogoutDatapin(data).subscribe((data: any) => {
            if (data) {
              if (data.statusCode === 200) {
                localStorage.clear();
                localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
                localStorage.removeItem('user');
                localStorage.clear();
                this.showlogoutdrp = false;
                this.showlogin = true;
                this.showtryforfree = true;
    
                this.show = false;
                this.IsCoundown = false;
                this.IsResend = false;
                
                this.route.navigateByUrl("");
               
                window.location.reload();
                
              } else if (data.statusCode === 304) {
                localStorage.clear();
                this.showlogoutdrp = false;
                this.showlogin = true;
                this.showtryforfree = true;
                
                this.show = false;
                this.IsCoundown = false;
                this.IsResend = false;
                this.route.navigate([""])

                window.location.reload();
              }
            }
          });
  }

}
