import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Global } from './../../../global/global';
import { ToastrManager } from 'ng6-toastr-notifications';
import { element } from '@angular/core/src/render3';
import { CommonJqueryService } from 'src/app/Services/common-jquery.service';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

declare var $: any;
@Component({
  selector: 'app-wishlist-logged-in-filled',
  templateUrl: './wishlist-logged-in-filled.component.html',
  styleUrls: ['./wishlist-logged-in-filled.component.css']
})
export class WishlistLoggedInFilledComponent implements OnInit {
  item :any = {};
  ms :any = {};
  gm:any= {};
  pageData = [];
  userWishList = [];
  userWishListitem = [];
  userWishListVideos = [];
  userWishListGames = [];
  userWishListAPPS = [];
  userWishListMusic = [];
  yearOfRelease: string;
  public showAll = false;
  public showgame = true;
  public showapp = false;
  public showmusic = false;
  hasgame = false;
  hasapp = false;
  hasItemName: string;
  hasGenreName: string;
  filterSelected: string;
  FilterText = 'newest';
  IsSustainMusic: boolean = false;
  IsSustainVideo: boolean = false;
  IsSustainGame: boolean = false;
  defaultImage="assets/images/DefaultImages/Loader_282x422.gif";
  defaultImageMusicGame="assets/images/DefaultImages/Loader_282x422.gif";
  constructor(
    private localStorageService: LocalStorageService,
    private route: Router,
    private wishlistService: WishlistService,
    private global: Global,
    public toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private _commonJqueryService: CommonJqueryService,
    private translate: TranslateService
  ) {
    
if (localStorage.getItem('lang')=="ar" ){
  translate.setDefaultLang('ar');
}
else{
  translate.setDefaultLang('en');
}
  }

  ngOnInit() {
    this.item.thumbnails = "assets/images/DefaultImages/Loader_282x422.gif";
    this.ms.thumbnails = "assets/images/DefaultImages/Loader_282x282.gif";
    this.gm.thumbnails = "assets/images/DefaultImages/Loader_282x282.gif";
    $('.main_nav li').children().removeClass('menuHeighlight');
    this.GetUserWishlist('null');
    this.SelectTopWistlistSideItem();
  }
  SelectTopWistlistSideItem(): any {
    $('.sidebar_category .main_categories .active').click();
  }
  SetFilterText() {
    if (this.filterSelected === 'newest') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.FilterText= "الأحدث";
      }
      else
      {
        this.FilterText= "NEWEST";
      }
    } 
    else if (this.filterSelected === 'AtoZ') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.FilterText= "أ - ي";
      }
      else
      {
        this.FilterText = 'A - Z';
      }
     
    }
     else if (this.filterSelected === 'ZtoA') {
      if(localStorage.getItem('lang')=="ar")
      {
        this.FilterText= "ي - أ";
      }
      else
      {
        this.FilterText = 'Z - A';
      }
    }
    // if (this.filterSelected === 'newest') {
    //   this.FilterText = 'newest';

    // } else if (this.filterSelected === 'AtoZ') {
    //   this.FilterText = 'A - Z';
    // } else if (this.filterSelected === 'ZtoA') {
    //   this.FilterText = 'Z - A';
    // }
  }
  // GetUserWishlist() {

  //   let userId = this.localStorageService.GetUserId();
  //   const data = {
  //     jwtToken: this.localStorageService.GetUserJwtToken(),
  //     portalId: this.global.PORTAL_ID,
  //     userId: userId,
  //   };
  //   this.wishlistService.GetWishlistData(data).subscribe((data: any) => {
  //     if (data) {
  //       if (+data.statusDescription.statusCode == 200) {
  //         this.pageData = data;
  //         this.userWishList = data.wishList;
  //       }

  //       //  this.userWishList=data.userWishList.Videos;
  //       //  this.userWishListGames=data.userWishList.Games;
  //       //  this.userWishListAPPS=data.userWishList.APPS;
  //       //  this.userWishListMusic=data.userWishList.Music;
  //     }
  //   });
  // }
  sortA_Z() {
    this.filterSelected = 'AtoZ';
    this.SetFilterText();
    this.GetUserWishlist('asc');
  }
  sortZ_A() {
    this.filterSelected = 'ZtoA';
    this.SetFilterText();
    this.GetUserWishlist('desc');
  }
  GetUserWishlist(order: string) {
//debugger
    this.spinner.show();
    const userId = this.localStorageService.GetUserId();
    var language =localStorage.getItem('lang');
    const data = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: userId,
      'language':language
    };
    this.wishlistService.GetWishlistData(data).subscribe((data: any) => {
      if (data) {

        if (+data.statusDescription.statusCode === 200) {
          this.pageData = data;

          if (data.wishList.length > 0) {
            const videosData = data.wishList.filter(function(item) {
              return item.category === 'Videos';
            });
            const gamesData = data.wishList.filter(function(item) {
              return item.category === 'Games';
            });
            const musicData = data.wishList.filter(function(item) {
              return item.category === 'Music';
            });
            const appsData = data.wishList.filter(function(item) {
              return item.category === 'Apps';
            });

            this.userWishListGames = gamesData.length > 0 ? gamesData[0].data : [];
            this.userWishListMusic = musicData.length > 0 ? musicData[0].data : [];
            this.userWishList = videosData.length > 0 ? videosData[0].data : [];
            this.userWishListAPPS = appsData.length > 0 ? appsData[0].data : [];
          }

          // below code is commented for app wishlist
          // this.userWishListAPPS=data.wishList[3].data;

          this.userWishListitem = data.wishlistCounts;
          if (data.wishlistCounts.length > 0) {
         //   this.hasGenreName = data.wishlistCounts[0].name;
           // this.redirect(data.wishlistCounts[0].name);
             // below code is bf default top Active Class app wishlist
            // this.hasGenreName = data.wishlistCounts[0].pageName;
            // this.redirect(data.wishlistCounts[0].pageName);
            if(this.IsSustainMusic ==true){
        
              if(data.wishlistCounts[1].count>0){
                this.hasGenreName = data.wishlistCounts[1].pageName;
                this.redirect(data.wishlistCounts[1].pageName);
              }
            }
             else if(this.IsSustainVideo ==true){
              if(data.wishlistCounts[0].count>0){ 
                this.hasGenreName = data.wishlistCounts[0].pageName;
                this.redirect(data.wishlistCounts[0].pageName);
              }
             }
             else if(this.IsSustainGame ==true){
              if(data.wishlistCounts[2].count>0){
                this.hasGenreName = data.wishlistCounts[2].pageName;
                this.redirect(data.wishlistCounts[2].pageName);
              }
             }
             else{
            if(data.wishlistCounts[0].count>0){ 
              this.hasGenreName = data.wishlistCounts[0].pageName;
              this.redirect(data.wishlistCounts[0].pageName);
            }
            else if(data.wishlistCounts[1].count>0){
              this.hasGenreName = data.wishlistCounts[1].pageName;
              this.redirect(data.wishlistCounts[1].pageName);
            }
            else if(data.wishlistCounts[2].count>0){
              this.hasGenreName = data.wishlistCounts[2].pageName;
              this.redirect(data.wishlistCounts[2].pageName);
            }
          }
          }
          if (order === 'asc') {
            this.userWishList = this.userWishList.sort((a, b) =>
              a.creativeTitle.localeCompare(b.creativeTitle)
            );
            this.userWishListMusic = this.userWishListMusic.sort((a, b) =>
              a.creativeTitle.localeCompare(b.creativeTitle)
            );
            this.userWishListGames = this.userWishListGames.sort((a, b) =>
              a.creativeTitle.localeCompare(b.creativeTitle)
            );
          } else if (order === 'desc') {
            this.userWishList = this.userWishList.sort((a, b) =>
              b.creativeTitle.localeCompare(a.creativeTitle)
            );
            this.userWishListMusic = this.userWishListMusic.sort((a, b) =>
              b.creativeTitle.localeCompare(a.creativeTitle)
            );
            this.userWishListGames = this.userWishListGames.sort((a, b) =>
              b.creativeTitle.localeCompare(a.creativeTitle)
            );
          }
        }
      }
      this.spinner.hide();
    });
  }
  redirectVideoChildPage(contentId: any) {
    this.route.navigate(['./section/video-details'], {
      queryParams: { id: contentId }
    });
  }

  redirectMusicChildPage(contentId: any) {
    this.route.navigate(['./section/music-details'], {
      queryParams: { id: contentId }
    });
  }
  redirectGameChildPage(contentId: any) {
    this.route.navigate(['./section/game-details'], {
      queryParams: { id: contentId }
    });
  }

  redirect(pageName: string) {
    // $('.main_nav li').children().removeClass('active')
    //  event.target.classList.add('active');
    if (pageName === 'Videos') {
      this.showAll = true;
      this.showmusic = false;
      this.showgame = false;
      this.showapp = false;
      this.hasGenreName = pageName;
    } else if (pageName === 'Music') {
      this.showAll = false;
      this.showmusic = true;
      this.showgame = false;
      this.showapp = false;
      this.hasGenreName = pageName;
    } else if (pageName === 'Games') {
      this.showAll = false;
      this.showmusic = false;
      this.showapp = false;
      this.showgame = true;
      this.hasGenreName = pageName;
    } else if (pageName === 'APPS') {
      this.showAll = false;
      this.showmusic = false;
      this.showgame = false;
      this.showapp = true;
      this.hasGenreName = pageName;
    }
  }

  NewestClicked() {
    this.filterSelected = 'newest';
    this.SetFilterText();
    this.GetUserWishlist('null');
  }

  ImageLoaded(iterator) {
    this._commonJqueryService.ImageLoadedWithIterator(iterator);
  }
  UpdateNotFoundImage(iterator) {
    this._commonJqueryService.UpdateNotFoundImageWithIterator(iterator);
  }

  setWishlistFiltertext(){

    if (localStorage.getItem('lang')=="ar" ){
      this.translate.setDefaultLang('ar');
      this.FilterText= "الأحدث";
    }
    else{
      this.translate.setDefaultLang('en');
      this.FilterText= "NEWEST";
    }
  }
  removewishlistvideo(portalId:any,appid: any,contentid:any){
    const appId = appid;//localStorage.getItem('appId');
    const contentId = contentid;
    const portletid =portalId; //this.router.snapshot.queryParamMap.get('id');
    const userId = this.localStorageService.GetUserId();
    const data = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: userId,
      userWishList: [
        {
          appId: appId,
          addFlag: 0,
          contentId: contentId
        }
      ]
    };
    this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
      if (data) {
         if (data.statusDescription.statusCode == 200 ) {
          //  this.toastr.successToastr('Wishlist Remove Successful', 'Success', {
          //       position: 'top-left'
          //     });
          this.IsSustainVideo=true;
          this.IsSustainMusic=false;
          this.IsSustainGame=false;
              this.GetUserWishlist('null');
             
         }
       
      }
    });
  }
  removewishlist( portalId:any,appid: any,contentid:any){
   
    const appId = appid;
    const contentId = contentid;
    const portletid =portalId; 
    const userId = this.localStorageService.GetUserId();
    const data = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: userId,
      userWishList: [
        {
          appId: appId,
          addFlag: 0,
          contentId: contentId
        }
      ]
    };
    this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
      if (data) {
         if (data.statusDescription.statusCode == 200 ) {
         this.IsSustainMusic=true;
         this.IsSustainGame=false;
         this.IsSustainVideo=false;
              this.GetUserWishlist('null');
              
         }
       
      }
    });
  }
  removewishlistgame(portalId:any,appid: any,contentid:any){
    const appId = appid;
    const contentId = contentid;
    const portletid =portalId; 
    const userId = this.localStorageService.GetUserId();
    const data = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: userId,
      userWishList: [
        {
          appId: appId,
          addFlag: 0,
          contentId: contentId
        }
      ]
    };
    this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
      if (data) {
         if (data.statusDescription.statusCode == 200 ) {
         this.IsSustainMusic=false;
         this.IsSustainGame=true;
         this.IsSustainVideo=false;
              this.GetUserWishlist('null');
              
         }
       
      }
    });
  }
}
