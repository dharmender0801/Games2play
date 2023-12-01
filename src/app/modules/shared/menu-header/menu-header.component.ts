import { Global } from "src/app/global/global";
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { MenuHeaderService } from "../../../Services/menu-header.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal";
import { LoginService } from "../../../Services/login.service";
import { FormsModule, ReactiveFormsModule, NgForm } from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TemplateRef } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { NullAstVisitor } from "@angular/compiler";
import { CountdownModule } from "ngx-countdown";
import { CountdownComponent } from "ngx-countdown";
import { LocalStorageService } from "../../../Services/local-storage.service";
import { UserAccountService } from "../../../Services/user-account.service";
import { UserAccountDetailRESPONSePOST } from "src/app/model/account/api/user-account-detail-response-post";
import { throwError } from "rxjs";
import { catchError, count } from "rxjs/operators";
import { UserAccountDetailREQUEStBODyPOST } from "src/app/model/account/api/user-account-detail-request-body-post";
import { UserIdleService } from "angular-user-idle";
import { TranslateService } from "@ngx-translate/core";
import { _ } from "@biesbjerg/ngx-translate-extract/dist/utils/utils";
import { DeviceDetectorService } from "ngx-device-detector";
import { UpdateUserAccountDetailREQUEStBODyPOST } from "../../../model/account/api/user-account-detail-request-body-post";
import { template } from "@angular/core/src/render3";
import { debug } from "util";
import { LoginComponent } from "../login/login.component";
import { SubscriptionService } from "../../../Services/subscription.service";
import { UnsubscribeUserProductApiRequestBodyPost } from "../../../model/subscription/api/unsubscribe-user-product-api-request-body-post";
import { UnsubscribeUserProductApiResponsePost } from "../../../model/subscription/api/unsubscribe-user-product-api-response-post";
import { SubscritpionComponent } from "../subscritpion/subscritpion.component";
//import { LoginComponent } from 'src/app/modules/shared/login/login.component';
declare var $: any;

@Component({
  selector: "app-menu-header",
  templateUrl: "./menu-header.component.html",
  styleUrls: ["./menu-header.component.css"],
  host: {
    "(document:click)": "onClick($event)",
  },
})
export class MenuHeaderComponent implements OnInit {
  status = "start";
  filterText = "";
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(SubscritpionComponent) menuHeadersub: SubscritpionComponent;
  @ViewChild("countdown") counter: CountdownComponent;
  @Output() loginConfirmed = new EventEmitter<boolean>();
  @Output() videoChildPlayMovie = new EventEmitter<boolean>();
  @Output() AddwishlistContent = new EventEmitter<boolean>();
  @Output() gameChildPlayGameClicked = new EventEmitter<boolean>();
  @Output() MusicPlayAlbumMenu = new EventEmitter<boolean>();
  @Output() isMusicAddWishListClicked = new EventEmitter<boolean>();
  @Output() gameChildPlayWishlistClicked = new EventEmitter<boolean>();
  @Output() languageChanged = new EventEmitter<boolean>();
  @Output() bannerlanguageChanged = new EventEmitter<boolean>();
  @Output() wishlistlanguageChanged = new EventEmitter<boolean>();
  @Output() SubscriptionlanguageChanged = new EventEmitter<boolean>();
  @Output() SubscriptionContainerlanguageChanged = new EventEmitter<boolean>();
  @Output() loginbanner = new EventEmitter<boolean>();
  //@ViewChild(LoginComponent) menuHeader: LoginComponent;
  menuData = [];
  modalRef: BsModalRef | null;
  signUpModalRef: BsModalRef | null;
  registerForm: FormGroup;
  signUpForm: FormGroup;
  signUpFormControls: any;
  signUpPhoneNumber: string;
  signupFormHeaderText = "Create your account";
  signupSubmitButtonText = "CONTINUE";
  signUpTermsCondition: boolean = false;
  hasPhoneNumberVerified: boolean = false;
  signUpFormVerificationcode: string;
  IsSignupFormCountdown: boolean = false;
  IsSignupFormResendCode: boolean = false;
  showSignUpPassword: boolean = true;
  languageOld: string;
  IsAndroidPhone: boolean = true;
  IsIOSPhone: boolean = true;
  loginFormVerifyNumber: boolean = false;
  phonenumber: string;
  loginFormOtpNumber: string;
  showLoginPassword: boolean = true;
  LangSelected: string = "";
  subscribed: boolean = false;
  submitted = false;
  public IsResend: boolean = false;
  public show: boolean = false;
  public showlogin: boolean = true;
  public showtryforfree: boolean = true;
  public showlogoutdrp: boolean = false;
  public IsCoundown: boolean = false;
  public phonenovalidation: boolean = false;
  public phonenoinvalid: boolean = false;
  public otpvalidation: boolean = false;
  public otpinvalid: boolean = false;
  public signUpotpvalidation: boolean = false;
  public signUpotpinvalid: boolean = false;
  public signUpPhoneNumberinvalid: boolean = false;
  menuPageName: string;
  buttonName: string;
  mobile: string;
  hasSubscribeTodayClicked: boolean;
  phoneNumRegex =
    /^(?:\+968|00968|0)?(?:50|54|58|51|52|55|56|2|3|4|6|7|9)\d{7}$/;
  isShowPhoneNumber: boolean = false;
  hasAddwishlistClicked: boolean;
  hasVideoPlayMovieClicked: boolean = false;
  hasGamePlayGameClicked: boolean = false;
  hasMusicPlayAlbumClicked: boolean = false;
  hasGamePlayWishlistClicked: boolean = false;
  @ViewChild("template") loginTemplate: TemplateRef<any>;
  isMusicPlayWishListClicked: boolean;
  isSubscribed: string = "false";
  deviceInfo = null;
  validationMobile: string = "";
  LinksItems = [];
  showButtonContinue: boolean = true;
  showButtonSubmit: boolean = false;
  showsignupButtonContinue: boolean = true;
  showshowsignupButtonverify: boolean = false;
  ShowsignUpheaderCreate: boolean = true;
  ShowsignUpHeaderVerify: boolean = false;
  idlelogout: boolean = false;
  idlelogoutCallOnce: boolean = false;
  openpopup: boolean = false;
  loginStatus: boolean;
  selecedPage: string;

  constructor(
    private menuHeaderService: MenuHeaderService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public toastr: ToastrManager,
    private activeRoute: ActivatedRoute,
    private _global: Global,
    private _activatedRoute: ActivatedRoute,
    private _localStorage: LocalStorageService,
    private _userAccountService: UserAccountService,
    private userIdle: UserIdleService,
    private translate: TranslateService,
    private deviceService: DeviceDetectorService,
    private activatedRoute: ActivatedRoute,
    private _eref: ElementRef,
    private subscriptionService: SubscriptionService,
    private _loaderService: NgxSpinnerService
  ) {
    translate.setDefaultLang("en");
    if (localStorage.getItem("lang") == "ar") {
      translate.setDefaultLang("en");
    } else {
      translate.setDefaultLang("en");
    }
    this.buttonName = "Continue";
    this.loginStatus = loginService.getIsUserLoggedIn();
    this.selecedPage = "Videos";
  }
  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target))
      // or some similar check
      $("#etisalat_apps").removeClass("open");
  }

  showSuccess() {
    this.toastr.successToastr("This is success toast.", "Success!");
  }

  showError() {
    this.toastr.errorToastr("This is error toast.", "Oops!");
  }

  showWarning() {
    this.toastr.warningToastr("This is warning toast.", "Alert!");
  }

  showInfo() {
    this.toastr.infoToastr("This is info toast.", "Info");
  }
  OpenApps() {
    $("#etisalat_apps").addClass("open");
  }

  ngOnInit() {
    this.menuPageName = "Games";
    //  this.router.navigate(['./']);
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();

    if (localStorage.getItem("lang") == "ar") {
      this.LangSelected = "en";
      this.filterText = "";
      this.translate.setDefaultLang("en");
      this.useLanguage("ar");

      this.filterText = "عربى";
    } else {
      this.filterText = "";
      this.translate.setDefaultLang("en");
      // if (this.deviceInfo.os !== 'iOS') {
      //   this.useLanguage('en');
      // }
      this.useLanguage("en");
      this.LangSelected = "en";
      this.filterText = "English";
    }
    this.isSubscribed = localStorage.getItem("subscribed");
    this.AppExternalLink();

    $("#close_etisalatapp").on("click", function () {
      $("#etisalat_apps").removeClass("open");
    });

    //Get device
    this.getDeviceFunction();

    //StartCode
    if (
      localStorage.getItem("user") != "" &&
      localStorage.getItem("user") != null
    ) {
      this.showlogoutdrp = true;
      this.mobile = localStorage.getItem("user");
      this.showlogin = false;
      this.showtryforfree = false;
    } else {
      this.showlogoutdrp = false;
      this.showlogin = true;
      this.showtryforfree = true;
      this.registerForm = this.formBuilder.group({
        phonenumber: ["", Validators.required],
        otpnumber: ["", Validators.required],
      });

      //#region signup section
      this.signUpForm = this.formBuilder.group({
        signUpPhoneNumber: ["", Validators.required],
        signUpTermsCondition: ["", Validators.required],
        signUpFormVerificationcode: [""],
      });
    }
    //#endregion

    this.menuPageName = this.activeRoute.snapshot.queryParamMap.get("page");
    //this.getMenuHeaderData();
  }

  PricingEnit() {
    this.isSubscribed = localStorage.getItem("subscribed");
  }

  get f() {
    return this.registerForm.controls;
  }

  finishTimer() {
    this.status = "finished";
    this.IsResend = true;
    this.IsCoundown = false;
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
  reset() {
    this.registerForm.reset();
    this.show = false;
    this.closeModal();
    this.IsCoundown = false;
    this.IsResend = false;
    this.phonenovalidation = false;
    this.phonenoinvalid = false;
    this.otpvalidation = false;
    this.otpinvalid = false;
    localStorage.removeItem("Usertrnsctionid");
    this.buttonName = "Continue";
    this.showButtonContinue = true;
    this.showButtonSubmit = false;
    this.validationMobile = "";
  }

  close_etisalatapp() {
    $("#etisalat_apps").removeClass("open");
  }

  resend() {
    // this.spinner.show();
    let phnno = localStorage.getItem("Usermbid");
    const data = {
      msisdn: phnno,
    };
    this.loginService.GetloginData(data).subscribe((data: any) => {
      if (data) {
        if (data.statusDescription.transactionId != "") {
          localStorage.setItem(
            "Resendtrnsctionid",
            data.statusDescription.transactionId
          );
          localStorage.removeItem("Usertrnsctionid");
          this.IsCoundown = true;
          this.IsResend = false;
          this.loginFormOtpNumber = "";
          this.showLoginPassword = true;
        }
      }
      // this.spinner.hide();
    });
  }

  HomePageLoginClicked(clickevent) {}

  openModal(
    template: TemplateRef<any>,
    isSubscribeTodayClicked: boolean = false,
    isAddwishlistClicked: boolean = false,
    isLoginBtnClicked: boolean = false,
    isVideoPlayMovieClicked: boolean = false,
    isGamePlaygameClicked: boolean = false,
    isMusicPlayAlbumClicked: boolean = false,
    isGamePlaywishlistClicked: boolean = false,
    isMusicPlayWishListClicked: boolean = false
  ) {
    if (isLoginBtnClicked) {
      localStorage.setItem("startYourSubscription", "false");
    } else if (isSubscribeTodayClicked) {
      localStorage.setItem("startYourSubscription", "true");
    }
    // close sign up model
    this.closeSignUpModel();
    // ends

    this.clearLoginForm();

    this.hasSubscribeTodayClicked = isSubscribeTodayClicked;
    this.hasAddwishlistClicked = isAddwishlistClicked;
    this.hasVideoPlayMovieClicked = isVideoPlayMovieClicked;
    this.hasGamePlayGameClicked = isGamePlaygameClicked;
    this.hasMusicPlayAlbumClicked = isMusicPlayAlbumClicked;
    this.hasGamePlayWishlistClicked = isGamePlaywishlistClicked;
    this.isMusicPlayWishListClicked = isMusicPlayWishListClicked;

    this.menuHeader.openModal(
      this.menuHeader.loginTemplate,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    );

    $(".login-pop-up").attr("id", "login");
  }

  openModalSubscription(
    template: TemplateRef<any>,
    isSubscribeTodayClicked: boolean = false,
    isAddwishlistClicked: boolean = false,
    isLoginBtnClicked: boolean = false,
    isVideoPlayMovieClicked: boolean = false,
    isGamePlaygameClicked: boolean = false,
    isMusicPlayAlbumClicked: boolean = false,
    isGamePlaywishlistClicked: boolean = false,
    isMusicPlayWishListClicked: boolean = false
  ) {
    if (isLoginBtnClicked) {
      localStorage.setItem("startYourSubscription", "false");
    } else if (isSubscribeTodayClicked) {
      localStorage.setItem("startYourSubscription", "true");
    }
    // close sign up model
    this.closeSignUpModel();
    // ends

    this.clearLoginForm();

    this.hasSubscribeTodayClicked = isSubscribeTodayClicked;
    this.hasAddwishlistClicked = isAddwishlistClicked;
    this.hasVideoPlayMovieClicked = isVideoPlayMovieClicked;
    this.hasGamePlayGameClicked = isGamePlaygameClicked;
    this.hasMusicPlayAlbumClicked = isMusicPlayAlbumClicked;
    this.hasGamePlayWishlistClicked = isGamePlaywishlistClicked;
    this.isMusicPlayWishListClicked = isMusicPlayWishListClicked;

    this.menuHeadersub.openModal(
      this.menuHeadersub.loginTemplate,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    );

    $(".login-pop-up").attr("id", "login");
  }

  clearLoginForm() {
    this.phonenumber = "";
    this.loginFormOtpNumber = "";
    this.loginFormVerifyNumber = false;

    this.show = false;
    this.IsResend = false;
    this.IsCoundown = false;
    this.isShowPhoneNumber = false;
    this.showLoginPassword = true;
    this.buttonName = "Continue";
    this.showButtonContinue = true;
    this.showButtonSubmit = false;
  }

  test() {
    this.menuHeader.openModal(
      this.menuHeader.loginTemplate,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true
    );
  }

  onSubmit(template: TemplateRef<any>) {
    this.spinner.show();
    this.submitted = true;
    const phoneno = this.registerForm.controls.phonenumber.value;
    const phonenumber = 234 + "" + phoneno;
    const regexphonenumber = "+968" + "" + phoneno;
    const otpnumber = this.registerForm.controls.otpnumber.value;
    if (this.buttonName == "Continue") {
      if (phoneno == "" || phoneno == null) {
        this.registerForm.controls.phonenumber.errors;
        this.phonenovalidation = true;
        this.phonenoinvalid = false;
        this.spinner.hide();
        return;
      } else if (!this.phoneNumRegex.test(regexphonenumber)) {
        this.phonenoinvalid = true;
        this.phonenovalidation = false;
        this.spinner.hide();
        return;
      }

      const data = {
        msisdn: phonenumber,
      };
      this.loginService.GetloginData(data).subscribe((data: any) => {
        if (data) {
          if (data.statusDescription.statusCode === 200) {
            localStorage.setItem(
              "Usertrnsctionid",
              data.statusDescription.transactionId
            );
            localStorage.setItem("Usermbid", phonenumber);
            this.buttonName = "Submit";
            this.isShowPhoneNumber = true;
            this.show = true;
            this.IsCoundown = true;
            this.loginFormVerifyNumber = true;
            this.loginFormOtpNumber = "";
            this.showLoginPassword = true;
            this.spinner.hide();
            this.validationMobile = "";
            this.showButtonContinue = false;
            this.showButtonSubmit = true;
          } else {
            this.validationMobile = data.statusDescription.statusMessage;
            this.spinner.hide();
          }
        }
      });
    }
    if (this.buttonName == "Submit") {
      if (otpnumber == "" || otpnumber == null) {
        this.registerForm.controls.otpnumber.invalid;
        this.otpvalidation = true;
        this.otpinvalid = false;
        return;
      }
      const trnsctionid = localStorage.getItem("Usertrnsctionid");
      let Usertrnsctionid;
      if (trnsctionid == null || trnsctionid == "") {
        Usertrnsctionid = localStorage.getItem("Resendtrnsctionid");
      } else {
        Usertrnsctionid = trnsctionid;
      }
      const mbid: number = parseInt(phonenumber);
      const data = {
        msisdn: mbid,
        transactionId: Usertrnsctionid,
        pin: otpnumber,
      };
      // this.spinner.show();
      this.loginService.GetloginDatapin(data).subscribe((data: any) => {
        // alert("menu Submit");
        console.log(data);
        if (data) {
          this.spinner.hide();

          //User Idle Activity

          // this.IdleTimeout();
          this.openpopup == false;
          // End

          if (data.statusDescription.statusCode == "200") {
            // this.toastr.successToastr('Login Successful', 'Success', {
            //   position: 'top-left'
            // });

            this.closeModal();

            localStorage.setItem("user", data.userDetails.msisdn);
            localStorage.setItem("subscribed", "true");
            localStorage.setItem(this._global.USER_ID, data.userDetails.id);
            localStorage.setItem(
              this._global.USER_JWT_TOKEN_KEY,
              data.userDetails.userTokenDetails.jwtToken
            );
            this.showlogin = false;
            this.showtryforfree = false;
            this.showlogoutdrp = true;
            this.mobile = localStorage.getItem("userMobile");

            //this.GetUserAccountDetails();
            this.GetUserLanguage();
            this.loginConfirmed.emit(data);
            if (data) {
              window.location.reload();
            }

            // New Subscription Event is fired when you come from Pircing confirm page
          } else if (data.statusDescription.statusCode == "803") {
            // this.toastr.infoToastr('Login Successful', 'Info', {
            //   position: 'top-left'
            // });

            this.closeModal();

            localStorage.setItem("SubscriptionTime", data.loginTime);
            localStorage.setItem("user", data.userDetails.msisdn);
            localStorage.setItem("subscribed", "true");
            localStorage.setItem(this._global.USER_ID, data.userDetails.id);
            localStorage.setItem(
              this._global.USER_JWT_TOKEN_KEY,
              data.userDetails.userTokenDetails.jwtToken
            );
            this.showlogin = false;
            this.showtryforfree = false;
            this.showlogoutdrp = true;
            this.mobile = localStorage.getItem("userMobile");

            //this.GetUserAccountDetails();
            this.GetUserLanguage();
            this.loginConfirmed.emit(data);

            this.subscribed = true;
            this.loginbanner.emit(true);
            if (data) {
              window.location.reload();
            }
            // New Subscription Event is fired when you come from Pircing confirm page
          } else if (data.statusDescription.statusCode == "802") {
            this.registerForm.controls.otpnumber.invalid;
            this.otpinvalid = true;
            this.otpvalidation = false;
            // this.toastr.errorToastr('Invalid OTP', 'Oops', {
            //   position: 'top-left'
            // });
            return;
          } else {
          }
        }
        //this.spinner.hide();
      });
    }
  }
  removearena() {
    //  debugger
    $(".main_nav li").children().removeClass("activeLink");
  }

  IdleTimeout() {
    this.userIdle.resetTimer();
    this.userIdle.startWatching();
    this.userIdle.onTimerStart().subscribe((count) => console.log(count));
    this.idlelogoutCallOnce = false;
    if (this.openpopup == false) {
      this.userIdle.onTimeout().subscribe(() => this.logout(true));
    }
  }
  // resetIdleTimeout(){
  //   this.userIdle.resetTimer();
  //   this.userIdle.startWatching();
  //   this.userIdle.onTimerStart().subscribe(
  //     count => console.log(count)
  //     );
  //   this.idlelogoutCallOnce=false;
  //   this.userIdle.onTimeout().subscribe(() => this.logout(true));
  // }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
    //this.openpopup=false;
  }

  logout(idlelogout: boolean) {
    this.spinner.show();
    $(".main_nav li").children().removeClass("activeLink");
    $("#body").removeClass("rtl");
    $("div [class*='col-']").removeClass("pull-right");
    $("a.pull-right").addClass("pull-right");
    $("a.btn.btn-primary").removeClass("pull-left");
    const userid = localStorage.getItem("Usermbid");
    this.languageOld = localStorage.getItem("lang");
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    let newUserId = localStorage.getItem("userId");
    const data = {
      userId: newUserId,
      jwtToken: token,
      portalId: this._global.PORTAL_ID,
    };

    if (idlelogout == false) {
      this.loginService.GetlogoutDatapin(data).subscribe((data: any) => {
        if (data) {
          if (data.statusCode === 200) {
            console.log("old lang::" + this.languageOld);
            localStorage.clear();
            localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
            localStorage.removeItem("user");
            localStorage.clear();
            this.showlogoutdrp = false;
            this.showlogin = true;
            this.showtryforfree = true;
            this.show = false;
            this.closeModal();
            this.IsCoundown = false;
            localStorage.setItem("lang", this.languageOld);
            this.IsResend = false;
            this.buttonName = "Continue";
            this.router.navigateByUrl("");
            window.location.reload();
          } else if (data.statusCode === 304) {
            localStorage.clear();
            this.showlogoutdrp = false;
            this.showlogin = true;
            this.showtryforfree = true;
            // this.registerForm.reset();
            this.show = false;
            this.closeModal();
            localStorage.setItem("lang", this.languageOld);
            this.IsCoundown = false;
            this.IsResend = false;
            this.buttonName = "Continue";
            this.router.navigate([""]);

            window.location.reload();
          }
        }
      });
    } else {
      if (this.idlelogoutCallOnce == false) {
        this.loginService.GetlogoutDatapin(data).subscribe((data: any) => {
          if (data) {
            if (data.statusCode === 200) {
              // this.toastr.successToastr('Logout Successful', 'Success', {
              //   position: 'top-left'
              // });
              localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
              localStorage.clear();
              this.showlogoutdrp = false;
              this.showlogin = true;
              this.showtryforfree = true;
              this.registerForm.reset();
              this.show = false;
              this.closeModal();
              this.IsCoundown = false;
              this.IsResend = false;
              this.buttonName = "Continue";
              this.router.navigate(["/Login"]);
              this.spinner.hide();
              this.openModal(this.loginTemplate, false, false, true);

              this.openpopup == true;
              //
              //   window.location.href = '';
            } else if (data.statusCode == 304) {
              // this.toastr.successToastr('Logout Successful', 'Success', {
              //   position: 'top-left'
              // });
              localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
              localStorage.clear();
              this.showlogoutdrp = false;
              this.showlogin = true;
              this.showtryforfree = true;
              this.registerForm.reset();
              this.show = false;
              this.closeModal();
              this.IsCoundown = false;
              this.IsResend = false;
              this.buttonName = "Continue";

              this.router.navigate(["/Login"]);
              this.spinner.hide();
              window.location.reload();
              // window.location.href = '';
            }
          }
        });
        this.idlelogoutCallOnce = true;
      }
    }
  }

  getMenuHeaderData() {
    var language = localStorage.getItem("lang");
    console.log("lang::" + language);
    const data = {
      portalId: this._global.PORTAL_ID,
      language: language,
    };
    // this.spinner.show();

    this.menuHeaderService.GetMenuHeaderData(data).subscribe((data: any) => {
      if (data) {
        this.menuData = data;
      }
    });
  }

  redirect(pageID: string, pageName: string) {
    $(".main_nav li").children().removeClass("activeLink");
    localStorage.removeItem("genreName");
    localStorage.setItem("pID", pageID);

    this.menuPageName = pageName;
    this.router.navigate(["./Content"], { queryParams: { page: pageName } });
  }
  SetupLoginTemplateInLocalVariable() {}

  public restrictNumeric(e) {
    this.otpvalidation = false;
    this.otpinvalid = false;
    this.phonenovalidation = false;
    this.phonenoinvalid = false;
    this.signUpPhoneNumberinvalid = false;
    this.signUpotpinvalid = false;
    this.signUpotpvalidation = false;
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  changePhoneNumber() {
    this.show = false;
    this.IsCoundown = false;
    this.isShowPhoneNumber = false;
    this.buttonName = "Continue";
    this.loginFormVerifyNumber = false;
    this.phonenumber = "";
    this.registerForm.reset();
  }

  openSignUpModel(template: TemplateRef<any>) {
    this.phonenovalidation = false;
    this.phonenoinvalid = false;
    this.signUpForm.reset();
    this.hasPhoneNumberVerified = false;
    this.signUpPhoneNumber = "";
    this.signUpTermsCondition = false;
    this.signupFormHeaderText = "Create your account";
    this.ShowsignUpheaderCreate = true;
    this.ShowsignUpHeaderVerify = false;
    this.signupSubmitButtonText = "CONTINUE";
    this.showsignupButtonContinue = true;
    this.showshowsignupButtonverify = false;
    this.closeModal();
    this.signUpModalRef = this.modalService.show(template, {
      class: "modal-sm verify_sub",
      backdrop: "static",
      keyboard: false,
    });
    $(".verify_sub").attr("id", "verify_sub");
  }
  closeSignUpModel() {
    if (!this.signUpModalRef) {
      return;
    }
    this.signUpModalRef.hide();
    this.signUpModalRef = null;
    this.signUpFormVerificationcode = "";
    this.showSignUpPassword = true;
    this.signUpPhoneNumberinvalid = false;
    this.showsignupButtonContinue = true;
    this.showshowsignupButtonverify = false;
    this.ShowsignUpheaderCreate = true;
    this.ShowsignUpHeaderVerify = false;
  }

  onSignUpFormSubmit() {
    this.signUpFormControls = this.signUpForm.value;
    const phonenumber = 968 + "" + this.signUpFormControls.signUpPhoneNumber;
    const regexphonenumber =
      "+968" + "" + this.signUpFormControls.signUpPhoneNumber;
    if (this.signupSubmitButtonText == "CONTINUE") {
      if (
        this.signUpFormControls.signUpPhoneNumber == "" ||
        this.signUpFormControls.signUpPhoneNumber == null
      ) {
        this.toastr.errorToastr("phone number is required", "Required", {
          position: "top-left",
        });
        return;
      } else if (!this.phoneNumRegex.test(regexphonenumber)) {
        this.signUpPhoneNumberinvalid = true;
        this.spinner.hide();
        return;
      }
      const data = {
        msisdn: phonenumber,
      };
      this.spinner.show();
      this.loginService.GetloginData(data).subscribe((data: any) => {
        if (data) {
          if (data.statusDescription.transactionId != "") {
            localStorage.setItem(
              "Usertrnsctionid",
              data.statusDescription.transactionId
            );
            localStorage.setItem("Usermbid", phonenumber);
            this.hasPhoneNumberVerified = true;
            this.signupFormHeaderText = "Verify your account";
            this.ShowsignUpheaderCreate = false;
            this.ShowsignUpHeaderVerify = true;
            this.signupSubmitButtonText = "VERIFY";
            this.showsignupButtonContinue = false;
            this.showshowsignupButtonverify = true;
            this.IsSignupFormCountdown = true;
            this.IsSignupFormResendCode = false;
          }
          this.spinner.hide();
        }
      });
    } else if (this.signupSubmitButtonText == "VERIFY") {
      if (
        this.signUpFormVerificationcode == "" ||
        this.signUpFormVerificationcode == null
      ) {
        // this.toastr.errorToastr('Verification code is required', 'Required', {
        //   position: 'top-left'
        // });
        this.signUpotpvalidation = true;
        this.spinner.hide();
        return;
      }
      //  this.spinner.show();
      const trnsctionid = localStorage.getItem("Usertrnsctionid");
      let Usertrnsctionid;
      if (trnsctionid == null || trnsctionid == "") {
        Usertrnsctionid = localStorage.getItem("Resendtrnsctionid");
      } else {
        Usertrnsctionid = trnsctionid;
      }
      const mbid: number = parseInt(phonenumber);
      const data = {
        msisdn: mbid,
        transactionId: Usertrnsctionid,
        pin: +this.signUpFormVerificationcode,
      };
      this.loginService.GetloginDatapin(data).subscribe((data: any) => {
        if (data) {
          if (data.statusDescription.statusCode == "200") {
            this.toastr.successToastr("Login Successful", "Success", {
              position: "top-left",
            });
            this.closeSignUpModel();
            this.saveValuesAfterRegistration(data);
          } else if (data.statusDescription.statusCode == "803") {
            this.toastr.infoToastr(
              data.statusDescription.statusMessage,
              "Info",
              {
                position: "top-left",
              }
            );
            this.closeSignUpModel();
            this.saveValuesAfterRegistration(data);
          } else if (data.statusDescription.statusCode == "802") {
            // this.toastr.errorToastr('Invalid verification code', 'Oops', {
            //   position: 'top-left'
            // });
            this.signUpotpinvalid = true;
            // this.spinner.hide();
            return;
          } else {
          }
        }
        this.spinner.hide();
      });
    }
  }

  changePhoneNumberSignupForm() {
    this.hasPhoneNumberVerified = false;
    this.signUpPhoneNumber = "";
    this.signUpTermsCondition = false;
    this.signupFormHeaderText = "Create your account";
    this.ShowsignUpheaderCreate = true;
    this.ShowsignUpHeaderVerify = false;
    this.signupSubmitButtonText = "CONTINUE";
    this.showshowsignupButtonverify = false;
    this.showsignupButtonContinue = true;
    this.signUpFormVerificationcode = "";
    this.showSignUpPassword = true;
  }

  saveValuesAfterRegistration(data: any) {
    localStorage.setItem("user", data.userDetails.msisdn);
    localStorage.setItem("subscribed", data.subscribed);
    localStorage.setItem(this._global.USER_ID, data.userId);
    localStorage.setItem(
      this._global.USER_JWT_TOKEN_KEY,
      data.userDetails.userTokenDetails.jwtToken
    );
    this.showlogin = false;
    this.showtryforfree = false;
    this.showlogoutdrp = true;
  }

  signUpformResendCode() {
    // this.spinner.show();
    const phonenumber = 234 + "" + this.signUpFormControls.signUpPhoneNumber;
    const data = {
      msisdn: phonenumber,
    };
    this.loginService.GetloginData(data).subscribe((data: any) => {
      if (data) {
        if (data.statusDescription.statusCode == "200") {
          localStorage.setItem(
            "Resendtrnsctionid",
            data.statusDescription.transactionId
          );
          localStorage.removeItem("Usertrnsctionid");
          this.IsSignupFormCountdown = true;
          this.IsSignupFormResendCode = false;
          this.signUpFormVerificationcode = "";
          this.showSignUpPassword = true;
        }
      }
      // this.spinner.hide();
    });
  }

  finishsignUpformTimer() {
    this.IsSignupFormCountdown = false;
    this.IsSignupFormResendCode = true;
  }

  showVerificationCode() {
    if ($("#signUpVerificatioCode").attr("type") == "password") {
      this.showSignUpPassword = false;
      $("#signUpVerificatioCode").attr("type", "text");
    } else if ($("#signUpVerificatioCode").attr("type") == "text") {
      this.showSignUpPassword = true;
      $("#signUpVerificatioCode").attr("type", "password");
    }
  }

  //#endregion

  showLoginVerificationCode() {
    if ($("#loginVerificationCode").attr("type") == "password") {
      this.showLoginPassword = false;
      $("#loginVerificationCode").attr("type", "text");
    } else if ($("#loginVerificationCode").attr("type") == "text") {
      this.showLoginPassword = true;
      $("#loginVerificationCode").attr("type", "password");
    }
  }

  startYourSubscruption() {
    localStorage.setItem("startYourSubscription", "true");
    this.router.navigate(["./Pricing"]);
  }

  //#region on  User account subscription list
  GetUserAccountSubList(pageName: string) {
    // this.spinner.show();
    var language = localStorage.getItem("lang");
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
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
        // this.spinner.hide();
        if (+data.statusDescription.statusCode == 400) {
        } else if (+data.statusDescription.statusCode == 200) {
          if (
            data.userSubscriptionList != null &&
            data.userSubscriptionList.length > 0
          ) {
            // redirect to account details is pack is already subscribed
            if (data.userSubscriptionList[0].activeStatus == "1") {
              this.router.navigate(["Account/detail"], {
                queryParams: { tab: "subscription_pack" },
              });
            } else {
              this.router.navigate(["/" + pageName]);
            }
          }
          // active status 2 means pack is unsubscribed
        }
      });
  }
  //#endregion
  NavigateToSearch() {
    // $('.main_nav li').children().removeClass('activeLink');
    this.spinner.show();
    //code by aman
    this.router.navigate(["./Search", "Games"]);

    this.spinner.hide();
  }

  stop() {
    this.userIdle.stopTimer();
  }

  stopWatching() {
    this.userIdle.stopWatching();
  }

  startWatching() {
    this.userIdle.startWatching();
  }

  restart() {
    this.userIdle.resetTimer();
  }

  //#region  get user account detail
  GetUserAccountDetails() {
    // this.spinner.show();
    var language = localStorage.getItem("lang");
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
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
        // setting the Image at menu header
        // this.spinner.hide();
        if (+data.statusDescription.statusCode == 200) {
          if (data.userAccountDetail != null) {
            //     const userid=  localStorage.getItem(this._global.USER_ID);
            //     if(userid!=null){

            //      this.menuData=null;
            //     localStorage.removeItem('lang');
            //    localStorage.setItem('lang', data.userAccountDetail.language);
            //  this.getMenuData();
            //     }
            var userProfileImageSource = data.userAccountDetail.profileImage;
            if (
              userProfileImageSource != "" &&
              userProfileImageSource != null
            ) {
              $("#userProfileImage").attr("style", "height:40px;width:40px");
              $("#userProfileImage").attr("src", userProfileImageSource);
            } else {
              $("#userProfileImage").attr(
                "src",
                "/assets/images/icons/top_nav/top_nav_avatar_5.svg"
              );
            }
          } else {
            $("#userProfileImage").attr(
              "src",
              "/assets/images/icons/top_nav/top_nav_avatar_5.svg"
            );
          }
        }
      });
  }

  GetUserLanguage() {
    // this.spinner.show();
    var language = localStorage.getItem("lang");
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language: language,
    };
    const subscriber = this._userAccountService
      .GetAccountDetail(bodyData)
      .subscribe((data: UserAccountDetailRESPONSePOST) => {
        // setting the Image at menu header
        // this.spinner.hide();
        if (+data.statusDescription.statusCode == 200) {
          if (data.userAccountDetail != null) {
            const userid = localStorage.getItem(this._global.USER_ID);
            if (userid != null) {
              this.menuData = null;
              localStorage.removeItem("lang");
              localStorage.setItem("lang", data.userAccountDetail.language);
              this.getMenuData();
            }
          } else {
          }
        }
      });
  }
  ImageLoaded(iterator) {
    // console.log(iterator);
    $(".image-profile").css({ opacity: 0 });
    $(".image-num-placeholder").addClass("hidden");
    $(".image-profile").removeClass("hidden").animate({ opacity: 1 }, 1000);
  }

  UpdateNotFoundImage(iterator) {
    // console.log(iterator);
    $(".image-profile").css({ opacity: 0 });
    $(".image-profile").attr("src", "assets/images/not-found.png");
    $(".image-num-placeholder").addClass("hidden");
    $(".image-profile").removeClass("hidden").animate({ opacity: 1 }, 1000);
  }
  //#endregion

  SetLanguage(lang: string) {
    var url = window.location.href;
    var arr = url.split("#")[1];

    if (arr == "/?lang=ar" || arr == "/?lang=en" || arr == "/" || arr == "") {
      this.router.navigate(["./"], { queryParams: { lang: lang } });
    }
    this.useLanguage(lang);
  }
  refresh(language: string) {
    this.useLanguage(language);

    location.reload();
  }
  // Language select code
  useLanguage(language: string) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    localStorage.setItem("lang", language);
    if (language == "ar") {
      this.filterText = "";
      this.filterText = "عربى";

      $("#body").removeClass("ltr");
      $("#body").addClass("rtl");
      $("div [class*='col-']").addClass("pull-right");
      $("a.pull-right").removeClass("pull-right");
      $("a.btn.btn-primary").addClass("pull-left");
    } else {
      this.filterText = "";
      this.filterText = "English";
      $("#body").removeClass("rtl");
      // if (this.deviceInfo.os === 'iOS') {

      //   window.location.reload();
      // }

      $("div [class*='col-']").removeClass("pull-right");
      $("a.pull-right").addClass("pull-right");
      $("a.btn.btn-primary").removeClass("pull-left");
    }
    const userid = localStorage.getItem(this._global.USER_ID);
    var language = localStorage.getItem("lang");

    if (userid != null) {
      const bodyData = {
        userId: this._localStorage.GetUserId(),
        jwtToken: this._localStorage.GetUserJwtToken(),
        portalId: this._global.PORTAL_ID,
        language: language,
      };

      // this._userAccountService.UpdateAccountLanguage(bodyData).subscribe((bodyData: any) => {

      //   if (bodyData) {
      //     this.getMenuHeaderData();
      //     this.translate.use(language);
      //     this.languageChanged.emit(true);
      //     this.bannerlanguageChanged.emit(true);
      //     this.wishlistlanguageChanged.emit(true);
      //     this.SubscriptionlanguageChanged.emit(true);
      //     this.SubscriptionContainerlanguageChanged.emit(true);
      //    // this.AppExternalLink();
      //   }

      // });
    } else {
      this.translate.use(language);
      //this.getMenuHeaderData();
      this.languageChanged.emit(true);
      this.bannerlanguageChanged.emit(true);
      this.SubscriptionContainerlanguageChanged.emit(true);
      this.AppExternalLink();
    }
  }
  AppExternalLink() {
    // var language = localStorage.getItem('lang');
    // const data = {
    //   'language': language
    // };
    // this.loginService.GetAppExternalLink(data).subscribe((data: any) => {
    //   if (data) {
    //     this.LinksItems = data;
    //   }
    //   // this.spinner.hide();
    // });
  }
  getMenuData() {
    var language = localStorage.getItem("lang");
    if (language == "ar") {
      $("#body").addClass("rtl");
      $("div [class*='col-']").addClass("pull-right");
      $("a.pull-right").removeClass("pull-right");
      $("a.btn.btn-primary").addClass("pull-left");
    } else {
      $("#body").removeClass("rtl");
      $("div [class*='col-']").removeClass("pull-right");
      $("a.pull-right").addClass("pull-right");
      $("a.btn.btn-primary").removeClass("pull-left");
    }
    const data = {
      portalId: this._global.PORTAL_ID,
      language: language,
    };
    this.menuHeaderService.GetMenuHeaderData(data).subscribe((data: any) => {
      if (data) {
        //  this.spinner.hide();
        this.menuData = data;
        if (localStorage.getItem("lang") == "ar") {
          this.translate.setDefaultLang("ar");
          this.useLanguage("ar");
        } else {
          this.translate.setDefaultLang("en");
          this.useLanguage("en");
        }
      }
    });
  }

  openUnsubPackConfirmation() {
    $("#unsubModal").modal("show");
  }

  unsubGhanaConfirm() {
    this._loaderService.show();

    const number = localStorage.getItem("Usermbid");
    const product = localStorage.getItem("productId");

    if (number != null) {
      this.subscriptionService
        .UnsubscribeGhanaProduct(number, product)
        .subscribe((data: any) => {
          if (data) {
            if (data.statusDescription.statusCode == 200) {
              this.logout(false);
              localStorage.clear();
              localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
              localStorage.removeItem("user");
              localStorage.clear();
              this.closeModal();
              this.buttonName = "Continue";
              this.router.navigateByUrl("");

              window.location.reload();
            } else {
              console.log("in 200");
              this.logout(false);
              localStorage.clear();
              localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
              localStorage.removeItem("user");
              localStorage.clear();
              this.closeModal();
              this.buttonName = "Continue";
              this.router.navigateByUrl("");
              //this.spinner.hide();
              window.location.reload();
            }
          }
        });
    } else {
      this.logout(false);
      localStorage.clear();
      localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
      localStorage.removeItem("user");
      localStorage.clear();
      this.closeModal();
      this.buttonName = "Continue";
      this.router.navigateByUrl("");
      //this.spinner.hide();
      window.location.reload();
    }
  }

  unsubConfirm() {
    this._loaderService.show();
    const model: UnsubscribeUserProductApiRequestBodyPost = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      productId: localStorage.getItem("productId"),
      userId: this._localStorage.GetUserId(),
    };
    console.log(model);
    const subscriber = this.subscriptionService
      .UnsubscribeProduct(model)
      .subscribe((data: UnsubscribeUserProductApiResponsePost) => {
        if (
          +data.statusDescription.statusCode === +this._global.HTTP_CODE_200
        ) {
          console.log("in 200");
          this.logout(false);
          localStorage.clear();
          localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
          localStorage.removeItem("user");
          localStorage.clear();
          this.closeModal();
          this.buttonName = "Continue";
          this.router.navigateByUrl("");
          //this.spinner.hide();
          window.location.reload();
        }
      });
  }

  closeUnsubPackConfirmation() {
    $("#unsubModal").modal("hide");
  }

  getPageName(pageName: string) {
    if (localStorage.getItem("lang") == "en") {
      if (pageName == "Videos") {
        return "Movies";
      }
    }
    return pageName;
  }

  logoutConfirmation() {
    $("#logoutConfirmationModal").modal("show");
  }

  closeLogoutConfirmation() {
    $("#logoutConfirmationModal").modal("hide");
  }
}
