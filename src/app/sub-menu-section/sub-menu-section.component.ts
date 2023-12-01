import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SectionService } from '../Services/section.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { Global } from '../global/global';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { PromotionalbannerComponent } from 'src/app/promotionalbanner/promotionalbanner.component';
import { BannerComponent } from 'src/app/banner/banner.component';
import { HowItWorksComponent } from 'src/app/how-it-works/how-it-works.component';
import { RightSectionComponent } from 'src/app/right-section/right-section.component';
import { SectionComponent } from 'src/app/section/section/section.component';
import { LoginComponent } from '../modules/shared/login/login.component';
import { LocalStorageService } from '../Services/local-storage.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { StreamingService } from '../Services/streaming.service';
import { GameDetailsComponent } from '../modules/shared/game-details/game-details.component';
import { GamesDetailsTempComponent } from '../modules/shared/games-details-temp/games-details-temp.component';
import { DeviceDetectorService } from 'ngx-device-detector';


declare var $: any;



@Component({
  selector: 'app-sub-menu-section',
  templateUrl: './sub-menu-section.component.html',
  styleUrls: ['./sub-menu-section.component.css']
})


export class SubMenuSectionComponent implements OnInit {
 
  customOptions: OwlOptions = {
    loop: true,
    items:3,
    mouseDrag: true,
    lazyLoad: true,
    touchDrag: false,
    pullDrag: true,
    margin:10,
    autoplay:true,
    autoplayHoverPause:true,
    dots: false,
    autoHeight:true,
    autoplayTimeout:3000,
    center:false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    },
  }


  @ViewChild(BannerComponent) bannerComponent: BannerComponent;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  // @ViewChild(PromotionalbannerComponent) promotionalbannerComponent: PromotionalbannerComponent;
  // @ViewChild(HowItWorksComponent) howitworkscomponent: HowItWorksComponent;
  @ViewChild(SectionComponent) sectionComponent: SectionComponent;
  @ViewChild(RightSectionComponent) rightSectionComponent: RightSectionComponent;
  @ViewChild(GameDetailsComponent) gameDetail: GameDetailsComponent;
  @ViewChild(GamesDetailsTempComponent) gameDetailData: GamesDetailsTempComponent;
  pageUrl: string;
  sectionId: any;
  bannerArray:any;
  numberStatus:boolean = true;
  IsAndroidPhone: boolean = true;
  contentId: string;
  gamehreflink: string;
  sectionData: any;
  img: string;
  contentType:number;
  genre: string;
  pageId: any;
  itemTypeCounts = [];
  genresItems = [];
  pageDataByGenre = [];
  hasGenreName: string;
  public showlogoutdrp: boolean = false;
  showLoginPassword: boolean = true;
  public showtryforfree: boolean = true;
  public show: boolean = false;
  public showlogin: boolean = true;
  public IsCoundown: boolean = false;
  public IsResend: boolean = false;
  hasGenre: string;
  gameName: string;
  msisdn:string;
  deviceInfo = null;
  IsIOSPhone = false;
  //Infinite Scrolling
  private noOfItemsToShowInitially: number = 20;
  private itemsToLoad: number = 50;
  itemsToShow = [];
  tmpItemsToShow = [];
  img1: any;
  img2: any;
  IsLoggedIn: boolean = false;
  statusCheck: boolean;
  img3: any;

  bannerImages: string[];
  bannerImagesStatus: boolean = false;
  isFullListDisplayed: boolean = false;
  filterText = '';
  filterSelected = '';
  constructor(
    private sectionService: SectionService,
    private _localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private route: Router,
    private loginService: LoginService,
    private _streamingService: StreamingService,
    private router: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private myElement: ElementRef,
    private _global: Global,
    private translate: TranslateService,
  ) {
    //this.headerTesting();
    this.getPageDataByGenre();
    this.getDeviceFunction();
    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
      this.filterText = "الأحدث";
    } else {
      translate.setDefaultLang('en');
      this.filterText = "Sort";
    }
  }

  headerTesting(){
    this.spinner.show();
    this._streamingService.heTesting().subscribe((data: any) => {
      if(data.statusCode == '100'){
        this.msisdn = data.msisdn;
        const reqData = {
          "msisdn": this.msisdn
        }

        this.loginService.getCheckNumberAvail(reqData).subscribe((data:any)=>{
          if(data){
            this.numberStatus = data.status;

            if(this.numberStatus){

              const data = {
                "HeaderRequest":this.deviceService,
                'msisdn': this.msisdn,
                'transactionId': '0000',
                'pin': '0000',
                'type': 'RESUB',
                'packIndex': '0000',
                'requestID': '0000',
                "language": localStorage.getItem('lang')
              };

              this.loginService.GetloginDatapin(data).subscribe((data: any) => {

                localStorage.setItem("userId", data.userDetails.id);
                localStorage.setItem('user', data.userDetails.msisdn);
                localStorage.setItem('subscribed', "true");
                localStorage.setItem('Usertrnsctionid', '0000');
                localStorage.setItem('startYourSubscription', 'false');
                localStorage.setItem('Usermbid', data.userDetails.msisdn);
                localStorage.setItem(this._global.USER_ID, data.userDetails.id);
                localStorage.setItem(this._global.USER_JWT_TOKEN_KEY, data.userDetails.userTokenDetails.jwtToken);

                if (data.userSubscriptionList[0] != null) {
                  localStorage.setItem("subscriptionStatus", data.userSubscriptionList[0].activeStatus);
                  localStorage.setItem("productId", data.userSubscriptionList[0].productId);
                  localStorage.setItem("activationStatus", "true");
                } else {
                  localStorage.setItem("activationStatus", "false");
                }
              });

            }else{
              this.menuHeader.openModalRegister(this.menuHeader.loginTemplate, false, false, false, false, false, false, false, true,this.msisdn);
            }
          }
        });
      }else{
           //this.spinner.hide();
            //this.route.navigate(["banner"]);
          //this.menuHeader.openModal(this.menuHeader.loginTemplate);
          //this.menuHeader.openModalRegister(this.menuHeader.loginTemplate, false, false, false, false, false, false, false, true,this.msisdn);
      }
    });
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

  openGamePortals(slideData){
    if (!this._localStorageService.GetUserId()) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    } else {
      if (!this.IsAndroidPhone) {

        const data = {
          HeaderRequest:this.deviceService,
          jwtToken: this._localStorageService.GetUserJwtToken(),
          ContentId: slideData.id,
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
            }else if(data.statusDescription.statusCode == 712){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if (data.statusDescription.statusCode == 706) {
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if(data.statusDescription.statusCode == 714){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
            }else if(data.statusDescription.statusCode == 717){
              this.spinner.hide();
              this.logout();
            }else if(data.statusDescription.statusCode == 304){
              this.spinner.hide();
              this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
                position: 'top-left'
              });
              this.logout();
            }

          }

        });
      } else {
        slideData.appName = slideData.info;
        slideData.usercomment = slideData.bannerText[1];
        this.gameDetail.openModal(this.gameDetail.gameDetails, slideData);
      }

    }
  }

  banners(){
    let dataBanner = {
      'portalId': 72,
      'pageName': 'Games',
      'subPageId': 0,
      'language': localStorage.getItem('lang')
    }
    this.sectionService.GetBanner(dataBanner).subscribe((response: any) => {
      if(response){
        if(response.statusDescription.statusCode=='200'){
          this.bannerArray = response.data;
        }else{
          this.bannerArray=[];
        }
        
      }
    });
  }

  ngOnInit() {
   // this.banners();
    this.pageUrl = "Games";
    this.router.queryParams.subscribe(queryParams => {
      
      this.getLeftSubmeuSection();
      $('.main_nav li').children().removeClass('menuHeighlight')
      $('.main_nav').find('.' + this.pageUrl).addClass('menuHeighlight')
      this.pageId = this.router.snapshot.queryParamMap.get('pageId');
      this.sectionId = this.router.snapshot.queryParamMap.get('sectionId');

      if (this.sectionId != null) {
        this.getViewAllSection();
      }
      else {

      }
    });
    this.hasGenreName = 'All';

  }

  loginbanner(value) {
    var pid = localStorage.getItem('pID')
    this.bannerComponent.ngOnInit();
    this.getLeftSubmeuSection();
    this.getPageDataByGenre();
    this.getPageDataByLeftSectionClick(pid);
  }
  getLeftSubmeuSection() {
    this.spinner.show();

    var language = localStorage.getItem('lang');
    const userid = localStorage.getItem(this._global.USER_ID);
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);

    if (userid != null) {
      let data = {
        'portalId': 72,
        'pageName': this.pageUrl,
        'language': language,
        'userId': userid,
        'jwtToken': token,
      }
      this.sectionService.GetLeftSubmeuSection(data).subscribe((response: any) => {
        if (response) {

          if(response.statusDescription.statusCode=='304'){
            this.toastr.errorToastr('Session is expired. Login again.', 'Error', {
              position: 'top-left'
            });

            this.logout();
          }else{
            this.genresItems = response.dataCount.genreCounts;
          }
          
        }
      });
    }
    else {
      let data = {
        'portalId': 72,
        'pageName': this.pageUrl,
        'language': language,
      }
      this.sectionService.GetLeftSubmeuSection(data).subscribe((response: any) => {
        if (response) {
          this.genresItems = response.dataCount.genreCounts;
        }
      });
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

  getPageDataByLeftSectionClick(pageID: string) {
    this.spinner.show();
    
    if (pageID == "9") {
      var pageName = "Videos";
    }
    else if (pageID == "10") {
      var pageName = "Music";
    }
    else if (pageID == "11") {
      var pageName = "Games";
    }
    else if (pageID == "12") {
      var pageName = "Apps";
    }

    var language = localStorage.getItem('lang');
    let data = {
      'portalId': 72,
      "pageId": "pageID",
      'genre': 'All',
      'language': language
    }
    this.sectionService.GetPageDataByGenre(data).subscribe((response: any) => {
      if (response) {
        this.pageDataByGenre = response.staticData[1];
        console.log(this.pageDataByGenre);
        if (this.pageDataByGenre != undefined) {
          this.itemsToShow = [];
          this.noOfItemsToShowInitially = 10;
          this.itemsToShow = this.pageDataByGenre.slice(0, this.noOfItemsToShowInitially);
          this.tmpItemsToShow = this.itemsToShow;
        }
        this.route.navigate(['./Content'], { queryParams: { page: pageName } });
      }
      this.spinner.hide();
    });
  }
  getPageDataByGenre() {

    var pageId = "";
    if (this.pageUrl == 'Videos') {
      pageId = "9";
    }
    else if (this.pageUrl == 'Music') {
      pageId = "10";
    }
    else if (this.pageUrl == 'Games') {
      pageId = "11";
    }
    else if (this.pageUrl == 'Apps') {
      pageId = "12";
    }

    this.spinner.show();
    
    let data = {
      "portalId": 72,
      "genre": "All",
      "pageId": "11",
      "language": localStorage.getItem('lang'),
      "androidPhone":this.IsAndroidPhone
    }
    this.sectionService.GetPageDataByGenre(data).subscribe((response: any) => {
      if (response) {

        this.pageDataByGenre = [];
        this.itemsToShow = response.staticData[0];
        this.tmpItemsToShow = response.staticData[0];
        response.staticData[0].forEach(childObj => {
          (this.pageDataByGenre).push(childObj);
        })

        if (this.pageDataByGenre) {
          if (this.noOfItemsToShowInitially <= this.pageDataByGenre.length) {
            this.noOfItemsToShowInitially += this.itemsToLoad;
            this.itemsToShow = this.pageDataByGenre.slice(0, this.noOfItemsToShowInitially);
            this.tmpItemsToShow = this.itemsToShow;
          } else {
            this.isFullListDisplayed = true;
          }
        }
      }
      this.spinner.hide();
    });
  }

  @HostListener('window:scroll', ['$event'])
  scrollHandler(event) {

    if (this.noOfItemsToShowInitially <= this.pageDataByGenre.length) {
      this.noOfItemsToShowInitially += this.itemsToLoad;
      this.itemsToShow = this.pageDataByGenre.slice(0, this.noOfItemsToShowInitially);
      this.tmpItemsToShow = this.itemsToShow;

    } else {
      this.isFullListDisplayed = true;
    }

  }

  redirect(pageID: string, pageName: string) {

    $('.main_nav li').children().removeClass('menuHeighlight')
    $('.main_nav').find('.' + pageName).addClass('menuHeighlight')
    localStorage.removeItem('genreName');
    this.hasGenreName = '';
    this.hasGenre = '';
    this.rightSectionComponent.filterSelected = 'newest';
    this.rightSectionComponent.SetFilterText();
    this.getPageDataByLeftSectionClick(pageID);
  }
  
  genreClick(genreName: string) {
    var pageId = "";
    if (this.pageUrl == 'Videos') {
      pageId = "9";
    }
    else if (this.pageUrl == 'Music') {
      pageId = "10";
    }
    else if (this.pageUrl == 'Games') {
      pageId = "11";
    }
    else if (this.pageUrl == 'Apps') {
      pageId = "12";
    }
    this.spinner.show();
    var language = localStorage.getItem('lang');
    this.hasGenreName = genreName;
    this.hasGenre = this.pageUrl;
    const uid = localStorage.getItem(this._global.USER_ID);
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    if (uid != null) {
      let data = {
        'portalId': 72,
        "pageId": pageId,
        'genre': genreName,
        'language': language,
        "userId": uid,
        'jwtToken': token,
        "androidPhone":this.IsAndroidPhone
      }
      this.sectionService.GetPageDataByGenre(data).subscribe((response: any) => {

        if (response) {
          this.pageDataByGenre = response.staticData[0];
          this.itemsToShow = response.staticData[0];
          this.tmpItemsToShow = response.staticData[0];
        }
        this.spinner.hide();
      });
      localStorage.setItem('genreName', genreName);
    }
    else {
      let data = {

        "portalId": 72,
        "genre": genreName,
        "pageId": parseInt(pageId),
        "language": language
      }
      this.sectionService.GetPageDataByGenre(data).subscribe((response: any) => {

        if (response) {

          this.pageDataByGenre = response.staticData[0];
          this.itemsToShow = response.staticData[0];
          this.tmpItemsToShow = response.staticData[0];
        }
        this.spinner.hide();
      });
      localStorage.setItem('genreName', genreName);
    }

  }

  getsubCheck(id) {
    if (!this._localStorageService.GetUserId()) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    } else {

      if (!this.IsAndroidPhone) {
        this.contentId = id;
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
      } else {
        this.sectionData = id;
        this.gameDetail.openModal(this.gameDetail.gameDetails, this.sectionData);
      }

    }
  }

  getViewAllSection() {

    var language = localStorage.getItem('lang');
    let data = {
      'portalId': 72,
      'pageId': +this.pageId,
      'sectionId': +this.sectionId,
      'language': language
    }
    this.sectionService.GetSectionDataViewAll(data).subscribe((response: any) => {
      if (response) {
        if (response != undefined) {
          this.pageDataByGenre = response.staticData[1];
        } else {
          this.pageDataByGenre = [];
        }
      }
      this.spinner.hide();
    });
  }

  languageChanged() {
    this.getLeftSubmeuSection();
    this.getPageDataByGenre();
    this.bannerComponent.GetBannerData();
    this.bannerComponent.GetBannerDataLogin();
    this.rightSectionComponent.setoninitFiltertext();

  }

  sortA_Z() {
    this.spinner.show();
    this.itemsToShow = this.itemsToShow.sort((a, b) => a.info.localeCompare(b.info));
    this.SetFilterText("AtoZ");
    this.spinner.hide();
  }

  sortZ_A() {
    this.spinner.show();
    this.itemsToShow = this.itemsToShow.sort((a, b) => b.info.localeCompare(a.info));
    this.SetFilterText("ZtoA");
    this.spinner.hide();
  }

  SetFilterText(filter: string) {
    this.filterSelected = filter;
    this.filterText = 'Sort';
  }

  NewestClicked() {
    window.location.reload();
  }

}
