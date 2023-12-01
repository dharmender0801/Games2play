import { CommonJqueryService } from './../../Services/common-jquery.service';
import { ErrorService } from 'src/app/Services/error.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { AfterViewInit } from '@angular/core';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { SectionService } from '../../Services/section.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Global } from '../../global/global';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PlyrModule, PlyrComponent } from 'ngx-plyr';
import Plyr from 'plyr';
import { UserAccountDetailREQUEStBODyPOST, VideoPlayLinkREQUEStBODyPOST } from 'src/app/model/account/api/user-account-detail-request-body-post';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserAccountDetailRESPONSePOST } from 'src/app/model/account/api/user-account-detail-response-post';
import { UserAccountService } from 'src/app/Services/user-account.service';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { StreamingService } from '../../Services/streaming.service';
import { StreamLinkRESPONSePOST } from 'src/app/model/account/api/stream-link-response-post';
declare var $: any;

@Component({
  selector: 'app-section-music-child',
  templateUrl: './section-music-child.component.html',
  styleUrls: ['./section-music-child.component.css']
})
export class SectionMusicChildComponent implements OnInit, AfterViewInit {
  userId: string;
  wishlist: boolean;
  contentDetails: any = {};
  contentId: string;
  ISAudioPlayerFunction = false;
  IsSubscribed = false;
  loggedIn = false;
  WishlistbtnName: string;
  showwishlistADD: boolean = false;
  showwishlistRemove: boolean = false;
  @Output() AddwishlistmusicClicked = new EventEmitter<boolean>();
  @Output() MusicPlayAlbum = new EventEmitter<boolean>();
  @ViewChild(PlyrComponent)
  plyr: PlyrComponent;
  subscriptionForMusic = '-1';
  mediaPathURL: string;
  mediaName: string;
  opennewtab: boolean = false;
  mediaDuration: string;
  IsLoginCurrentPage: boolean;
  ngAfterViewInit(): void { }
  VideoPlayButtonHide: boolean = true;
  defaultImageBig = "assets/images/DefaultImages/child_page_banner_default.png";
  defaultImage = "assets/images/DefaultImages/Loader_282x282.gif";
  IsLoggedIn: boolean = false;
  PlayMusicUrl: string;
  targetforlink: string;
  IsSubscriptionFinished: boolean = false;
  constructor(
    private sectionService: SectionService,
    private _userAccountService: UserAccountService,
    private spinner: NgxSpinnerService,
    private router: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private route: Router,
    private wishlistService: WishlistService,
    private global: Global,

    public toastr: ToastrManager,
    private _loadlStorageService: LocalStorageService,
    private _sesstionStorageService: SessionStorageService,
    private _localStorage: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private _commonJqueryService: CommonJqueryService,
    private translate: TranslateService,
    private _streamingService: StreamingService,
  ) {
    if (localStorage.getItem('lang') == "ar") {
      translate.setDefaultLang('ar');
    }
    else {
      translate.setDefaultLang('en');
    }
    this.IsLoginCurrentPage = false;

  }

  ngOnInit() {
    this.contentDetails.thumbnails = "assets/images/DefaultImages/Loader_282x282.gif";
    const userid = this.localStorageService.GetUserId();
    this.loggedIn = userid ? true : false;

    window.scrollTo(0, 0);
    this.contentId = this.router.snapshot.queryParamMap.get('id');
    this.getContentDetailMusicChild();
    //this.GetUserAccountDetail();
    this.GetUserAccountSubList();

    // if(this.ISAudioPlayerFunction==false && this.IsLoginCurrentPage ==false)
    //         {
    //           this.GetAudioURL()
    //       }
  }

  GetAudioURL() {

    const bodyData: VideoPlayLinkREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      ContentId: parseInt(this.contentId),
      userId: this._localStorage.GetUserId()
    };

    this._streamingService
      .GetContentStreamLink(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: StreamLinkRESPONSePOST) => {
      
        if (data.statusDescription !== null || data.statusDescription !== undefined) {
          if (data.statusDescription.statusCode !== undefined) {
            if (data.statusDescription.statusCode && data.link) {
              if (+data.statusDescription.statusCode === 200) {



                if (data.isDirectPlay == false) {
                  var splitedURL = data.link.substr(0, data.link.lastIndexOf("."));

                  //  this.mediaPathURL = splitedURL;//data.link;
                  //  this.mediaName=data.trackTitle;
                  //  this.mediaDuration=data.duration;
                  // alert(this.mediaPathURL);
                  // if(this.opennewtab==false)
                  // {
                //  window.open('#/Music/' + this.contentId, '_blank');
                  
                  //}


                  this.PlayMusicUrl = data.link;
                  this.spinner.hide();
                  this.targetforlink = "_blank"
                  this.IsLoggedIn = true;
                  this.spinner.hide();
                  // if (this.ISAudioPlayerFunction === false) {
                  //   setTimeout(() => {
                  //     this.AudioPlayerFunction(this.mediaPathURL,this.mediaName,this.mediaDuration );
                  //   }, 200);
                  // }
                }
                else {

                  //Code for new tab video link

               //  window.open(data.link, '_blank')

               this.PlayMusicUrl = data.link;
               this.spinner.hide();
               this.targetforlink = "_blank"
               this.IsLoggedIn = true;
                  this.spinner.hide();
                }
              }
              else {
                return this.toastr.errorToastr(data.statusDescription.statusMessage, 'error', {
                  position: 'top-left'
                });
              }
            }
            else {
              this.spinner.hide();
            }
          }
          else {
            this.spinner.hide();
            return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
              position: 'top-left'
            });
          }
        }
        else {
          this.spinner.hide();
          return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
            position: 'top-left'
          });
        }
      });
  }
  GetUserAccountDetail() {
    var language = localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language: language
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          this._errorService.LogError(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        //debugger
        if (
          data.userSubscriptionList.length > 0 &&
          data.userSubscriptionList[0].mappedItemtypeId
        ) {
          if (+data.userSubscriptionList[0].activeStatus === 1 || +data.userSubscriptionList[0].activeStatus === 2) {
            this.subscriptionForMusic =
              data.userSubscriptionList[0].mappedItemtypeId;
            if (
              this.loggedIn &&
              (this.subscriptionForMusic === '0' ||
                this.subscriptionForMusic === '1')
            ) {

              this.GetAudioURL()
              this.IsLoginCurrentPage = true;
            }
          }
        }
      });
  }

  // videoSources: Plyr.Source[] = [
  // {
  // src: 'bTqVqk7FSmY',
  // provider: 'youtube',
  // },
  // ];

  // played(event: Plyr.PlyrEvent) {
  // console.log('played', event);
  // }

  // play(): void {
  // this.player.play();
  // }

  getContentDetailMusicChild() {
    var language = localStorage.getItem('lang');
    const data = {
      // "jwtToken":"eyJ0eXBlIjoiSldUIiwia2lkIjoiMTU1MTMzMzA0NTAzMiIsImFsZyI6IlJTNTEyIn0.eyJpc3MiOiJFdGlzYWxhdCBBcHAgU3RvcmUgVmFsaWRhdGUgUGluIFRva2VuIiwiZXhwIjoxNTUyMTk3MDgxLCJqdGkiOiJHbXNQRmJtX0ZKSUNGQ1BOLVk5NUN3IiwiaWF0IjoxNTUxMzMzMDgxLCJuYmYiOjE1NTEzMzI5NjEsInN1YiI6IjkxNzIwNjY2NTc2OSJ9.TzmEv-BuUc-Jz-K_X5xXBagVqM9oZR87ZQf6qTxtZyvYWlk3QndeRGHqE1e71HOVELAFzlYVxmhWmAws1-cnStgLqlCLq2R2098zpnK3Yn_iho_gAAu95ZyLVOKfVcH9qbiQzLB5PtMlYTyGHDji_s5h_75YGa2O4An5vFa0mBe_HDIgNxWbNfosFH8MdvKYQIWJe9GJuxl5pbxyDwv5hTr_nHb_gu6kpWPs2uYMsp7PA5SnAejCr_arkGEzTTLSnz8ogRlPziZai6GQOWrY_UdfudDUcamDNggHnfuXskpNV-667sH5w4Fc-HZ3H-oxKrZuWVyQRMBmyaifQpUPPg",
      contentId: +this.contentId,
      portalId: this._global.PORTAL_ID,
      language: language
      // "userId":169
    };
    this.spinner.show();
    this.sectionService
      .GetContentDetailsChild(data)
      .subscribe((response: any) => {
        if (response) {
          this.spinner.hide();
          if (response.contentDetail != null) {
            this.contentDetails = response.contentDetail;
            localStorage.setItem('musicappId', response.contentDetail.appId);
            localStorage.setItem(
              'musiccontentId',
              response.contentDetail.contentId
            );
            // below code is used to check the content is added or not in wishlist
            // call the below api when user is logged in
            // other wise show the 'Add To Wishlist' by default
            if (this.localStorageService.GetUserId()) {
              // this.wishlistCheckcontent(response.contentDetail.contentId);
              this.wishlistCheckMusiccontent();
            } else {
              this.WishlistbtnName = 'ADD TO WISHLIST';
              this.showwishlistADD = true;
              this.showwishlistRemove = false;
            }
          } else {
            this.contentDetails = {};
          }
        }
      });
  }

  AddwishlistMusic() {
    this.spinner.show();
    const appId = localStorage.getItem('musicappId');
    const contentId = localStorage.getItem('musiccontentId');
    const userId = this.localStorageService.GetUserId();
    const portletid = this.router.snapshot.queryParamMap.get('id');
    if (userId != null) {

      if (this.WishlistbtnName === 'ADD TO WISHLIST') {
        const data = {
          jwtToken: this.localStorageService.GetUserJwtToken(),
          portalId: this.global.PORTAL_ID,
          userId: userId,
          portletid: portletid,
          userWishList: [
            {
              appId: appId,
              addFlag: 1,
              contentId: contentId
            }
          ]
        };
        this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
          if (data) {
            if (+data.statusDescription.statusCode === 200) {
              var language = localStorage.getItem('lang');
              if (language == "ar") {
                this.toastr.successToastr('أضف لقائمة الامنيات', 'نجاح', {
                  position: 'top-left'
                });
              }
              else {

                // this.toastr.successToastr('Wishlist Add Successful', 'Success', {
                //   position: 'top-left'
                // });
              }
              this.WishlistbtnName = 'REMOVE FROM WISHLIST';
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            } else if (+data.statusDescription.statusCode === 151) {
              this.WishlistbtnName = 'REMOVE FROM WISHLIST';
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
              this.toastr.successToastr(
                data.statusDescription.statusMessage,
                'Info',
                {
                  position: 'top-left'
                }
              );
            }
          }
        });
      } else if (this.WishlistbtnName === 'REMOVE FROM WISHLIST') {
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
            if (
              +data.statusDescription.statusCode === 200 ||
              +data.statusDescription.statusCode === 151
            ) {
              var language = localStorage.getItem('lang');
              if (language == "ar") {
                this.toastr.successToastr(
                  'قائمة الامنيات إزالة ناجح',
                  'نجاح',
                  {
                    position: 'top-left'
                  }
                );
              }
              else {
                // this.toastr.successToastr(
                //   'Wishlist Remove Successful',
                //   'Success',
                //   {
                //     position: 'top-left'
                //   }
                // );
              }

              this.WishlistbtnName = 'ADD TO WISHLIST';
              this.showwishlistADD = true;
              this.showwishlistRemove = false;
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            }
            // else if (+data.statusDescription.statusCode == 151) {
            // this.toastr.successToastr(data.statusDescription.statusMessage, 'Info', {
            // position: 'top-left'
            // });
            // }
          }
        });
      }
    } else if (this.userId == null) {
      this.AddwishlistmusicClicked.emit(true);
    }
  }

  playMusicAlbum() {
    if (!this.localStorageService.GetUserId()) {
      this.MusicPlayAlbum.emit(true);
      this.IsLoggedIn = false;
    }
    else {
      if(this.IsSubscriptionFinished ==true)
      {
        this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
        this.route.navigate(['Pricing']);
        this.IsSubscriptionFinished=false;
        this.IsLoggedIn = false;
      }
    }
  }

  //#region on User account subscription list
  GetUserAccountSubList() {
    // debugger;
    this.spinner.show();
    var language = localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: this.localStorageService.GetUserId(),
      language: language
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        // debugger;
        this.spinner.hide();


        if (+data.statusDescription.statusCode === 400) {
        } else if (+data.statusDescription.statusCode === 200) {
          //this.GetAudioURL();

          if (
            data.userSubscriptionList != null &&
            data.userSubscriptionList.length > 0
          ) {
            if (+data.userSubscriptionList[0].activeStatus !== +'706') {
              // redirect to account details is pack is already subscribed
              if (+data.userSubscriptionList[0].activeStatus === +'1' || +data.userSubscriptionList[0].activeStatus === 2) {
                if (
                  data.userSubscriptionList[0].mappedItemtypeId === '0' ||
                  data.userSubscriptionList[0].mappedItemtypeId === '1'
                ) {
                  // user is subscribed to play Music
                  // Todo: //
                  // this.ShowMusicPlayer=true;
                  this.GetUserAccountDetail();

                } else {
                  // alert('user is not subscribed for this service');
                  // this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
                  // this.route.navigate(['Pricing']);
                  this.spinner.hide();
                  this.IsSubscriptionFinished =true;
                }
              } else {
                // this._sesstionStorageService.SetUserIsNavigatedFromContentToFalse();
                // this.route.navigate(['Pricing']);

                this.spinner.hide();
                this.IsSubscriptionFinished =true;
              }
            }
            else {
              $('#modelOpenMusic').click();
            }

          } else {
            // this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
            // this.route.navigate(['Pricing']);

            this.spinner.hide();
            this.IsSubscriptionFinished =true;
          }
          // active status 2 means pack is unsubscribed
        }

      });
  }
  //#endregion

  AudioPlayerFunction(path, medianame, mediaduration) {


    this.ISAudioPlayerFunction === true;
    const supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
      // initialize plyr
      const player = new Plyr('#audio1', {
        controls: [
          'restart',
          'play',
          'progress',
          'current-time',
          'duration',
          'mute',
          'volume'
        ]
      });
    }

    let index = 0,
      playing = false,
      mediaPath = path,
      extension = '',
      tracks = [
        {
          track: 1,
          name: medianame,
          duration: mediaduration,
          file: ''
        },
        // {
        //   track: 2,
        //   name: 'The Forsaken - Broadwing Studio (Final Mix)',
        //   duration: '8:30',
        //   file: 'BS_TF'
        // },
        // {
        //   track: 3,
        //   name: 'All The King\'s Men - Broadwing Studio (Final Mix)',
        //   duration: '5:01',
        //   file: 'BS_ATKM'
        // },
        // {
        //   track: 4,
        //   name: 'The Forsaken - Broadwing Studio (First Mix)',
        //   duration: '8:31',
        //   file: 'BSFM_TF'
        // },
        // {
        //   track: 5,
        //   name: 'All The King\'s Men - Broadwing Studio (First Mix)',
        //   duration: '5:05',
        //   file: 'BSFM_ATKM'
        // },
        // {
        //   track: 6,
        //   name: 'All This Is - Alternate Cuts',
        //   duration: '2:48',
        //   file: 'AC_ATI'
        // },
        // {
        //   track: 7,
        //   name: 'All The King\'s Men (Take 1) - Alternate Cuts',
        //   duration: '5:44',
        //   file: 'AC_ATKMTake_1'
        // },
        // {
        //   track: 8,
        //   name: 'All The King\'s Men (Take 2) - Alternate Cuts',
        //   duration: '5:26',
        //   file: 'AC_ATKMTake_2'
        // },
        // {
        //   track: 9,
        //   name: 'Magus - Alternate Cuts',
        //   duration: '5:46',
        //   file: 'AC_M'
        // },
        // {
        //   track: 10,
        //   name: 'The State Of Wearing Address (fucked up) - Alternate Cuts',
        //   duration: '5:25',
        //   file: 'AC_TSOWAfucked_up'
        // },
        // {
        //   track: 11,
        //   name: 'Magus - Popeye\'s (New Years \'04 - \'05)',
        //   duration: '5:53',
        //   file: 'PNY04-05_M'
        // },
        // {
        //   track: 12,
        //   name: 'On The Waterfront - Popeye\'s (New Years \'04 - \'05)',
        //   duration: '4:40',
        //   file: 'PNY04-05_OTW'
        // },
        // {
        //   track: 13,
        //   name: 'Trance - Popeye\'s (New Years \'04 - \'05)',
        //   duration: '13:15',
        //   file: 'PNY04-05_T'
        // },
        // {
        //   track: 14,
        //   name: 'The Forsaken - Popeye\'s (New Years \'04 - \'05)',
        //   duration: '8:12',
        //   file: 'PNY04-05_TF'
        // },
        // {
        //   track: 15,
        //   name: 'The State Of Wearing Address - Popeye\'s (New Years \'04 - \'05)',
        //   duration: '7:02',
        //   file: 'PNY04-05_TSOWA'
        // },
        // {
        //   track: 16,
        //   name: 'Magus - Popeye\'s (Valentine\'s Day \'05)',
        //   duration: '5:43',
        //   file: 'PVD_M'
        // }
      ],
      buildPlaylist = $(tracks).each(function (key, value) {
        let trackNumber = value.track,
          trackName = value.name,
          trackDuration = value.duration;
        if (trackNumber.toString().length === 1) {
          trackNumber = '0' + trackNumber;
        }
        $('#plList').append(
          '<li> \
<div class="plItem"> \
<span class="plNum">' +
          trackNumber +
          '.</span> \
<span class="plTitle">' +
          trackName +
          '</span> \
<span class="plLength">' +
          trackDuration +
          '</span> \
</div> \
</li>'
        );
      }),
      trackCount = tracks.length,
      npAction = $('#npAction'),
      npTitle = $('#npTitle'),
      audio = $('#audio1')
        .on('play', function () {
          playing = true;
          npAction.text('Now Playing...');
        })
        .on('pause', function () {
          playing = false;
          npAction.text('Paused...');
        })
        .on('ended', function () {
          npAction.text('Paused...');
          if (index + 1 < trackCount) {
            index++;
            loadTrack(index);
            audio.play();
          } else {
            audio.pause();
            index = 0;
            loadTrack(index);
          }
        })
        .get(0),
      btnPrev = $('#btnPrev').on('click', function () {
        if (index - 1 > -1) {
          index--;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      btnNext = $('#btnNext').on('click', function () {
        if (index + 1 < trackCount) {
          index++;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      li = $('#plList li').on('click', function () {
        const id = parseInt($(this).index());
        if (id !== index) {
          playTrack(id);
        }
      }),
      playalbum = $('#playalbum').on('click', function () {
        playTrack(0);
      }),
      loadTrack = function (id) {
        $('.plSel').removeClass('plSel');
        $('#plList li:eq(' + id + ')').addClass('plSel');
        npTitle.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].file + extension;
      },
      playTrack = function (id) {
        loadTrack(id);
        audio.play();
      };
    extension = audio.canPlayType('audio/mpeg')
      ? '.mp3'
      : audio.canPlayType('audio/ogg')
        ? '.ogg'
        : '';
    loadTrack(index);
  }

  //#region check the content is added in whishlist or not
  wishlistCheckMusiccontent() {
    this.spinner.show();
    const data = {
      jwtToken: this.localStorageService.GetUserJwtToken(),
      portalId: this.global.PORTAL_ID,
      userId: +this.localStorageService.GetUserId(),
      contentId: this.router.snapshot.queryParamMap.get('id')
    };
    this.wishlistService
      .GetAddRemoveWishlistData(data)
      .subscribe((data: any) => {
        if (+data.statusDescription.statusCode === 200) {
          if (data.isInWishlist === true) {
            this.WishlistbtnName = 'REMOVE FROM WISHLIST';
            this.showwishlistADD = false;
            this.showwishlistRemove = true;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          } else if (data.isInWishlist === false) {
            this.WishlistbtnName = 'ADD TO WISHLIST';
            this.showwishlistADD = true;
            this.showwishlistRemove = false;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
        }
      });
  }

  //#endregion

  CheckMusicWishlistbtnname() {
    this.spinner.show();
    const cId = localStorage.getItem('contentId');
    const usrId = this.localStorageService.GetUserId();
    const userId = this.localStorageService.GetUserId();
    if (userId != null) {
      const data = {
        jwtToken: this.localStorageService.GetUserJwtToken(),
        portalId: this.global.PORTAL_ID,
        userId: usrId,
        // contentId: cId,
        contentId: this.router.snapshot.queryParamMap.get('id')
      };
      this.wishlistService
        .GetAddRemoveWishlistData(data)
        .subscribe((data: any) => {
          if (data) {
            if (data.isInWishlist === true) {
              this.WishlistbtnName = 'REMOVE FROM WISHLIST';
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
              //this.AddwishlistMusic();
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            } else {
              this.WishlistbtnName = 'ADD TO WISHLIST';
              this.showwishlistADD = true;
              this.showwishlistRemove = false;
              // this.AddwishlistMusic();
              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            }
          }
        });
    } else if (this.userId == null) {
      this.AddwishlistmusicClicked.emit(true);
    }
  }
  ImageLoaded() {
    this._commonJqueryService.ImageLoaded();
    $('#mainMusic').fadeIn();
    this.VideoPlayButtonHide = true;
  }
  UpdateNotFoundImage() {
    this._commonJqueryService.UpdateNotFoundImage();
  }
}
