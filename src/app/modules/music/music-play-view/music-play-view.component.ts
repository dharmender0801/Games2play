import { AfterViewInit } from "@angular/core";
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
declare var $: any;
import Plyr from "plyr";

import { LocalStorageService } from "src/app/Services/local-storage.service";
import { WishlistService } from "src/app/Services/wishlist.service";
import { PlyrComponent } from "ngx-plyr";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SectionService } from "../../../Services/section.service";
import {
  MusicPlayLinkREQUEStBODyPOST,
  VideoPlayLinkREQUEStBODyPOST,
  UserAccountDetailREQUEStBODyPOST,
} from "../../../model/account/api/user-account-detail-request-body-post";
import { StreamingService } from "../../../Services/streaming.service";
import { ToastrManager } from "ng6-toastr-notifications";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ErrorService } from "../../../Services/error.service";
import { StreamLinkRESPONSePOST } from "../../../model/account/api/stream-link-response-post";
import { Global } from "../../../global/global";
import { TranslateService } from "@ngx-translate/core";
import { CommonJqueryService } from "../../../Services/common-jquery.service";
import { SessionStorageService } from "../../../Services/session-storage.service";
import { UserAccountService } from "../../../Services/user-account.service";
import { UserAccountDetailRESPONSePOST } from "../../../model/account/api/user-account-detail-response-post";
import { MenuHeaderComponent } from "../../shared/menu-header/menu-header.component";
@Component({
  selector: "app-music-play-view",
  templateUrl: "./music-play-view.component.html",
  styleUrls: ["./music-play-view.component.css"],
})
export class MusicPlayViewComponent implements OnInit {
  ISAudioPlayerFunction = false;
  subscriptionForMusic = "-1";
  contentDetails: {};
  contentId: number;
  mediaPathURL: string;
  mediaName: string;
  userId: string;
  WishlistbtnName: string;
  private route: Router;
  showwishlistADD: boolean = false;
  showwishlistRemove: boolean = false;
  mediaDuration: string;
  IsLoginCurrentPage: boolean;
  @Output() AddwishlistmusicClicked = new EventEmitter<boolean>();
  @Output() MusicPlayAlbum = new EventEmitter<boolean>();
  @ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
  private localStorageService: LocalStorageService;
  loggedIn = false;
  constructor(
    private router: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private sectionService: SectionService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private global: Global,
    private localstorage: LocalStorageService,
    private _streamingService: StreamingService,
    private _errorService: ErrorService,
    private _userAccountService: UserAccountService,
    private wishlistService: WishlistService,
    public toastr: ToastrManager,
    private _global: Global,
    private _sesstionStorageService: SessionStorageService,
    private _localStorage: LocalStorageService,
    private _commonJqueryService: CommonJqueryService,
    private translate: TranslateService
  ) {
    if (localStorage.getItem("lang") == "ar") {
      translate.setDefaultLang("ar");
    } else {
      translate.setDefaultLang("en");
    }
    this.IsLoginCurrentPage = false;
  }

  ngOnInit() {
    const userid = localStorage.getItem("user-id");
    this.loggedIn = userid ? true : false;

    window.scrollTo(0, 0);
    // this.contentId = this.router.snapshot.queryParamMap.get('id');

    const contentIds = this._activatedRoute.paramMap.subscribe((params) => {
      const cId = parseInt(params.get("id"), 10);
      this.contentId = cId;
      if (!isNaN(cId)) {
        this.getContentDetailMusicChild();
        this.GetUserAccountDetail();
      } else {
        this._router.navigate(["/"]);
      }
    });
  }

  GetAudioURL() {
    const bodyData: VideoPlayLinkREQUEStBODyPOST = {
      jwtToken: localStorage.getItem("user-jwt-token-key"),
      ContentId: this.contentId,
      userId: localStorage.getItem("user-id"),
    };

    this._streamingService
      .GetContentStreamLink(bodyData)
      .pipe(
        catchError((x) => {
          this._errorService.LogError(x);
          return throwError(x);
        })
      )
      .subscribe((data: StreamLinkRESPONSePOST) => {
        if (
          data.statusDescription !== null ||
          data.statusDescription !== undefined
        ) {
          if (data.statusDescription.statusCode !== undefined) {
            if (data.statusDescription.statusCode && data.link) {
              if (+data.statusDescription.statusCode === 200) {
                if (data.isDirectPlay == false) {
                  // alert(data.link);

                  if (data.isDirectPlay == false) {
                    var splitedURL = data.link.substr(
                      0,
                      data.link.lastIndexOf(".")
                    );

                    this.mediaPathURL = splitedURL; //data.link;
                    this.mediaName = data.trackTitle;
                    this.mediaDuration = data.duration;
                    // alert(this.mediaPathURL);

                    // window.open('#/Music/' + this.contentId, '_blank');
                    this.spinner.hide();
                    if (this.ISAudioPlayerFunction === false) {
                      setTimeout(() => {
                        this.AudioPlayerFunction(
                          this.mediaPathURL,
                          this.mediaName,
                          this.mediaDuration
                        );
                      }, 200);
                    }
                  } else {
                    //Code for new tab video link
                    this.spinner.hide();
                    // window.open(data.link, '_blank')
                  }
                }
              } else {
                return this.toastr.errorToastr(
                  data.statusDescription.statusMessage,
                  "error",
                  {
                    position: "top-left",
                  }
                );
              }
            } else {
              this.spinner.hide();
            }
          } else {
            this.spinner.hide();
            return this.toastr.errorToastr(
              "Server busy please try again after sometime",
              "error",
              {
                position: "top-left",
              }
            );
          }
        } else {
          this.spinner.hide();
          return this.toastr.errorToastr(
            "Server busy please try again after sometime",
            "error",
            {
              position: "top-left",
            }
          );
        }
      });
  }

  GetUserAccountDetail() {
    var language = localStorage.getItem("lang");
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: localStorage.getItem("user-jwt-token-key"),
      portalId: this._global.PORTAL_ID,
      userId: localStorage.getItem("user-id"),
      language: language,
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError((x) => {
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
          if (
            +data.userSubscriptionList[0].activeStatus === 1 ||
            +data.userSubscriptionList[0].activeStatus === 2
          ) {
            this.subscriptionForMusic =
              data.userSubscriptionList[0].mappedItemtypeId;
            if (
              this.loggedIn &&
              (this.subscriptionForMusic === "0" ||
                this.subscriptionForMusic === "1")
            ) {
              this.GetAudioURL();
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
    var language = localStorage.getItem("lang");
    const data = {
      // "jwtToken":"eyJ0eXBlIjoiSldUIiwia2lkIjoiMTU1MTMzMzA0NTAzMiIsImFsZyI6IlJTNTEyIn0.eyJpc3MiOiJFdGlzYWxhdCBBcHAgU3RvcmUgVmFsaWRhdGUgUGluIFRva2VuIiwiZXhwIjoxNTUyMTk3MDgxLCJqdGkiOiJHbXNQRmJtX0ZKSUNGQ1BOLVk5NUN3IiwiaWF0IjoxNTUxMzMzMDgxLCJuYmYiOjE1NTEzMzI5NjEsInN1YiI6IjkxNzIwNjY2NTc2OSJ9.TzmEv-BuUc-Jz-K_X5xXBagVqM9oZR87ZQf6qTxtZyvYWlk3QndeRGHqE1e71HOVELAFzlYVxmhWmAws1-cnStgLqlCLq2R2098zpnK3Yn_iho_gAAu95ZyLVOKfVcH9qbiQzLB5PtMlYTyGHDji_s5h_75YGa2O4An5vFa0mBe_HDIgNxWbNfosFH8MdvKYQIWJe9GJuxl5pbxyDwv5hTr_nHb_gu6kpWPs2uYMsp7PA5SnAejCr_arkGEzTTLSnz8ogRlPziZai6GQOWrY_UdfudDUcamDNggHnfuXskpNV-667sH5w4Fc-HZ3H-oxKrZuWVyQRMBmyaifQpUPPg",
      contentId: +this.contentId,
      portalId: this._global.PORTAL_ID,
      language: language,
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
            localStorage.setItem("musicappId", response.contentDetail.appId);
            localStorage.setItem(
              "musiccontentId",
              response.contentDetail.contentId
            );
            // below code is used to check the content is added or not in wishlist
            // call the below api when user is logged in
            // other wise show the 'Add To Wishlist' by default
            if (localStorage.getItem("user-id")) {
              // this.wishlistCheckcontent(response.contentDetail.contentId);
              this.wishlistCheckMusiccontent();
            } else {
              this.WishlistbtnName = "ADD TO WISHLIST";
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
    const appId = localStorage.getItem("musicappId");
    const contentId = localStorage.getItem("musiccontentId");
    const userId = localStorage.getItem("user-id");
    const portletid = this.router.snapshot.queryParamMap.get("id");
    if (userId != null) {
      // this.route.navigate(['./Wishlist']);
      // const data = {
      // jwtToken: localStorage.getItem('user-jwt-token-key'),
      // portalId: this.global.PORTAL_ID,
      // userId: userId,
      // portletid:portletid,
      // "userWishList": [
      // {
      // "appId": appId,
      // "addFlag": 1,
      // "contentId": contentId
      // }

      // ]
      // };
      // this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
      // if (data) {
      // if (data.statusDescription.statusCode == '200' || data.statusDescription.statusCode == '151') {
      // this.toastr.successToastr('Wishlist Add Successful', 'Success', {
      // position: 'top-left'
      // });
      // this.route.navigate(['./Wishlist']);
      // }
      // }
      // });
      if (this.WishlistbtnName === "ADD TO WISHLIST") {
        const data = {
          jwtToken: localStorage.getItem("user-jwt-token-key"),
          portalId: this.global.PORTAL_ID,
          userId: userId,
          portletid: portletid,
          userWishList: [
            {
              appId: appId,
              addFlag: 1,
              contentId: contentId,
            },
          ],
        };
        this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
          if (data) {
            if (+data.statusDescription.statusCode === 200) {
              var language = localStorage.getItem("lang");
              if (language == "ar") {
                this.toastr.successToastr("أضف لقائمة الامنيات", "نجاح", {
                  position: "top-left",
                });
              } else {
                this.toastr.successToastr(
                  "Wishlist Add Successful",
                  "Success",
                  {
                    position: "top-left",
                  }
                );
              }
              this.WishlistbtnName = "REMOVE FROM WISHLIST";
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
            } else if (+data.statusDescription.statusCode === 151) {
              this.WishlistbtnName = "REMOVE FROM WISHLIST";
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
              this.toastr.successToastr(
                data.statusDescription.statusMessage,
                "Info",
                {
                  position: "top-left",
                }
              );
            }
          }
        });
      } else if (this.WishlistbtnName === "REMOVE FROM WISHLIST") {
        const data = {
          jwtToken: localStorage.getItem("user-jwt-token-key"),
          portalId: this.global.PORTAL_ID,
          userId: userId,
          userWishList: [
            {
              appId: appId,
              addFlag: 0,
              contentId: contentId,
            },
          ],
        };
        this.wishlistService.SaveWishlistData(data).subscribe((data: any) => {
          if (data) {
            if (
              +data.statusDescription.statusCode === 200 ||
              +data.statusDescription.statusCode === 151
            ) {
              var language = localStorage.getItem("lang");
              if (language == "ar") {
                this.toastr.successToastr("قائمة الامنيات إزالة ناجح", "نجاح", {
                  position: "top-left",
                });
              } else {
                // this.toastr.successToastr(
                //   'Wishlist Remove Successful',
                //   'Success',
                //   {
                //     position: 'top-left'
                //   }
                // );
              }

              this.WishlistbtnName = "ADD TO WISHLIST";
              this.showwishlistADD = true;
              this.showwishlistRemove = false;
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
    if (localStorage.getItem("user-id")) {
      // user is logged in
      this.GetUserAccountSubList();
    } else {
      // user is not logged in
      this.MusicPlayAlbum.emit(true);
    }
  }

  //#region on User account subscription list
  GetUserAccountSubList() {
    // debugger;
    this.spinner.show();
    var language = localStorage.getItem("lang");
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: localStorage.getItem("user-jwt-token-key"),
      portalId: this.global.PORTAL_ID,
      userId: localStorage.getItem("user-id"),
      language: language,
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .pipe(
        catchError((x) => {
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
            if (+data.userSubscriptionList[0].activeStatus !== +"706") {
              // redirect to account details is pack is already subscribed
              if (
                +data.userSubscriptionList[0].activeStatus === +"1" ||
                +data.userSubscriptionList[0].activeStatus === 2
              ) {
                if (
                  data.userSubscriptionList[0].mappedItemtypeId === "0" ||
                  data.userSubscriptionList[0].mappedItemtypeId === "1"
                ) {
                  // user is subscribed to play Music
                  // Todo: //
                  // this.ShowMusicPlayer=true;
                  this.GetUserAccountDetail();
                } else {
                  // alert('user is not subscribed for this service');
                  this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
                  this.route.navigate(["Pricing"]);
                }
              } else {
                this._sesstionStorageService.SetUserIsNavigatedFromContentToFalse();
                this.route.navigate(["Pricing"]);
              }
            } else {
              $("#modelOpenMusic").click();
            }
          } else {
            this._sesstionStorageService.SetUserIsNavigatedFromContentToTrue();
            this.route.navigate(["Pricing"]);
          }
          // active status 2 means pack is unsubscribed
        }
      });
  }
  //#endregion

  AudioPlayerFunction(path, medianame, mediaduration) {
    this.ISAudioPlayerFunction === true;
    const supportsAudio = !!document.createElement("audio").canPlayType;
    if (supportsAudio) {
      // initialize plyr
      const player = new Plyr("#audio1", {
        controls: [
          "restart",
          "play",
          "progress",
          "current-time",
          "duration",
          "mute",
          "volume",
        ],
      });
    }

    let index = 0,
      playing = false,
      mediaPath = path,
      extension = "",
      tracks = [
        {
          track: 1,
          name: medianame,
          duration: mediaduration,
          file: "",
        },
      ],
      buildPlaylist = $(tracks).each(function (key, value) {
        let trackNumber = value.track,
          trackName = value.name,
          trackDuration = value.duration;
        if (trackNumber.toString().length === 1) {
          trackNumber = "0" + trackNumber;
        }
        $("#plList").append(
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
            "</span> \
</div> \
</li>"
        );
      }),
      trackCount = tracks.length,
      npAction = $("#npAction"),
      npTitle = $("#npTitle"),
      audio = $("#audio1")
        .on("play", function () {
          playing = true;
          npAction.text("Now Playing...");
        })
        .on("pause", function () {
          playing = false;
          npAction.text("Paused...");
        })
        .on("ended", function () {
          npAction.text("Paused...");
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
      btnPrev = $("#btnPrev").on("click", function () {
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
      btnNext = $("#btnNext").on("click", function () {
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
      li = $("#plList li").on("click", function () {
        const id = parseInt($(this).index());
        if (id !== index) {
          playTrack(id);
        }
      }),
      playalbum = $("#playalbum").on("click", function () {
        playTrack(0);
      }),
      loadTrack = function (id) {
        $(".plSel").removeClass("plSel");
        $("#plList li:eq(" + id + ")").addClass("plSel");
        npTitle.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].file + extension;
      },
      playTrack = function (id) {
        loadTrack(id);
        audio.play();
      };
    extension = audio.canPlayType("audio/mpeg")
      ? ".mp3"
      : audio.canPlayType("audio/ogg")
      ? ".ogg"
      : "";
    loadTrack(index);
  }

  //#region check the content is added in whishlist or not
  wishlistCheckMusiccontent() {
    const data = {
      jwtToken: localStorage.getItem("user-jwt-token-key"),
      portalId: this.global.PORTAL_ID,
      userId: +localStorage.getItem("user-id"),
      contentId: this.router.snapshot.queryParamMap.get("id"),
    };
    this.wishlistService
      .GetAddRemoveWishlistData(data)
      .subscribe((data: any) => {
        if (+data.statusDescription.statusCode === 200) {
          if (data.isInWishlist === true) {
            this.WishlistbtnName = "REMOVE FROM WISHLIST";
            this.showwishlistADD = false;
            this.showwishlistRemove = true;
          } else if (data.isInWishlist === false) {
            this.WishlistbtnName = "ADD TO WISHLIST";
            this.showwishlistADD = true;
            this.showwishlistRemove = false;
          }
        }
      });
  }

  //#endregion

  CheckMusicWishlistbtnname() {
    const cId = localStorage.getItem("contentId");
    const usrId = this.localStorageService.GetUserId();
    const userId = localStorage.getItem("user-id");
    if (userId != null) {
      const data = {
        jwtToken: localStorage.getItem("user-jwt-token-key"),
        portalId: this.global.PORTAL_ID,
        userId: usrId,
        // contentId: cId,
        contentId: this.router.snapshot.queryParamMap.get("id"),
      };
      this.wishlistService
        .GetAddRemoveWishlistData(data)
        .subscribe((data: any) => {
          if (data) {
            if (data.isInWishlist === true) {
              this.WishlistbtnName = "REMOVE FROM WISHLIST";
              this.showwishlistADD = false;
              this.showwishlistRemove = true;
              this.AddwishlistMusic();
            } else {
              this.WishlistbtnName = "ADD TO WISHLIST";
              this.showwishlistADD = true;
              this.showwishlistRemove = false;
              this.AddwishlistMusic();
            }
          }
        });
    } else if (this.userId == null) {
      this.AddwishlistmusicClicked.emit(true);
    }
  }
  ImageLoaded() {
    this._commonJqueryService.ImageLoaded();
  }
  UpdateNotFoundImage() {
    this._commonJqueryService.UpdateNotFoundImage();
  }
}
