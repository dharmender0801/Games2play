import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { StreamingService } from "src/app/Services/streaming.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrManager } from "ng6-toastr-notifications";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import { Global } from "src/app/global/global";
import { LoginService } from "src/app/Services/login.service";
declare var $: any;

@Component({
  selector: "app-games-search-details",
  templateUrl: "./games-search-details.component.html",
  styleUrls: ["./games-search-details.component.css"],
})
export class GamesSearchDetailsComponent implements OnInit {
  defaultImage = "assets/images/DefaultImages/Loader_180X270.gif";
  modalRef: BsModalRef | null;
  statusCheck: boolean;
  IsLoggedIn: boolean = false;
  sectionData: any;
  public showlogoutdrp: boolean = false;
  showLoginPassword: boolean = true;
  public showtryforfree: boolean = true;
  public show: boolean = false;
  public showlogin: boolean = true;
  public IsCoundown: boolean = false;
  public IsResend: boolean = false;
  deviceInfo = null;
  IsIOSPhone = false;
  IsAndroidPhone: boolean = true;
  contentId: string;
  gamehreflink: string;
  @ViewChild("template") gameSearchDetails: TemplateRef<any>;
  constructor(
    private modalService: BsModalService,
    private route: Router,
    private loginService: LoginService,
    private _global: Global,
    private _localStorageService: LocalStorageService,
    private _streamingService: StreamingService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private deviceService: DeviceDetectorService
  ) {}

  ngOnInit() {
    this.getDeviceFunction();
  }

  getDeviceFunction() {
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

  userLoginCheck() {
    this.contentId = this.sectionData.contentId;

    const data = {
      HeaderRequest: this.deviceService,
      jwtToken: this._localStorageService.GetUserJwtToken(),
      ContentId: this.contentId,
      userId: this._localStorageService.GetUserId(),
    };
    console.log(data);
    this._streamingService.GetgameplayLink(data).subscribe((data: any) => {
      this.spinner.show();
      if (data) {
        if (data.statusDescription.statusCode == 200) {
          this.gamehreflink = data.link;

          window.open(this.gamehreflink, "_blank");
          this.IsLoggedIn = true;
          this.spinner.hide();
        } else if (data.statusDescription.statusCode == 501) {
          this.spinner.hide();
          this.toastr.infoToastr("Game Not Found", "Info", {
            position: "top-left",
          });
        } else if (data.statusDescription.statusCode == 706) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 712) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 714) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 304) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
          this.logout();
        }
      }
    });
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  openModal(template: TemplateRef<any>, sectionData) {
    this.sectionData = sectionData;
    console.log(this.sectionData);
    this.modalRef = this.modalService.show(template, {
      backdrop: "static",
      keyboard: false,
    });
  }

  userLoginCheckDownload() {
    const data = {
      HeaderRequest: this.deviceService,
      jwtToken: this._localStorageService.GetUserJwtToken(),
      contentId: this.sectionData.catnr,
      userId: this._localStorageService.GetUserId(),
      appId: this.sectionData.appId,
      portalId: this._global.PORTAL_ID,
      lang: localStorage.getItem("lang"),
    };
    this._streamingService.GetgamedownloadLink(data).subscribe((data: any) => {
      if (data) {
        if (data.statusDescription.statusCode == 200) {
          this.gamehreflink = "";
          this.gamehreflink = data.downloadData.downloadURL;
          window.open(this.gamehreflink, "_blank");
          this.IsLoggedIn = true;
          this.spinner.hide();
          this.closeModal();
        } else if (data.statusDescription.statusCode == 501) {
          this.toastr.infoToastr("Game Not Found", "Info", {
            position: "top-left",
          });
        } else if (data.statusDescription.statusCode == 706) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 712) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 714) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
        } else if (data.statusDescription.statusCode == 304) {
          this.spinner.hide();
          this.toastr.errorToastr(
            data.statusDescription.statusMessage,
            "Error",
            {
              position: "top-left",
            }
          );
          this.logout();
        }
      }
    });
  }

  logout() {
    this.spinner.show();
    $(".main_nav li").children().removeClass("activeLink");
    $("#body").removeClass("rtl");
    $("div [class*='col-']").removeClass("pull-right");
    $("a.pull-right").addClass("pull-right");
    $("a.btn.btn-primary").removeClass("pull-left");
    const userid = localStorage.getItem("Usermbid");
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    let newUserId = localStorage.getItem("userId");
    const data = {
      userId: newUserId,
      jwtToken: token,
      portalId: this._global.PORTAL_ID,
    };

    this.loginService.GetlogoutDatapin(data).subscribe((data: any) => {
      if (data) {
        if (data.statusCode === 200) {
          localStorage.clear();
          localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
          localStorage.removeItem("user");
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
          this.route.navigate([""]);

          window.location.reload();
        }
      }
    });
  }
}
