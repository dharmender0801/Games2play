import {
  Component,
  OnInit,
  ElementRef,
  TemplateRef,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { MenuHeaderService } from "src/app/Services/menu-header.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "src/app/Services/login.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { Global } from "src/app/global/global";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { UserAccountService } from "src/app/Services/user-account.service";
import { UserIdleService } from "angular-user-idle";
import { TranslateService } from "@ngx-translate/core";
import { DeviceDetectorService } from "ngx-device-detector";

import { CountdownComponent } from "ngx-countdown";
import { UserAccountDetailREQUEStBODyPOST } from "src/app/model/account/api/user-account-detail-request-body-post";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { UserAccountDetailRESPONSePOST } from "src/app/model/account/api/user-account-detail-response-post";
import { MenuHeaderComponent } from "src/app/modules/shared/menu-header/menu-header.component";
import { StreamLinkRESPONSePOST } from "../../../model/account/api/stream-link-response-post";
import { StreamingService } from "../../../Services/streaming.service";
import { VideoPlayLinkREQUEStBODyPOST } from "../../../model/account/api/user-account-detail-request-body-post";
import { Product } from "src/app/model/product";
declare var $: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  status = "start";
  filterText = "";
  @ViewChild("countdown") counter: CountdownComponent;
  //@ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
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
  @Output() Isloggedin = new EventEmitter<boolean>();
  @Output() HomePageLoginClicked = new EventEmitter<boolean>();
  openpopup: boolean = false;
  idlelogoutCallOnce: boolean = false;
  menuData = [];
  modalRef: BsModalRef | null;
  signUpModalRef: BsModalRef | null;
  subscribed: boolean = false;
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
  IsAndroidPhone: boolean = true;
  IsIOSPhone: boolean = true;
  loginFormVerifyNumber: boolean = false;
  msisdn: string;
  phonenumber: string;
  loginFormOtpNumber: string;
  showLoginPassword: boolean = true;
  LangSelected: string = "";

  submitted = false;
  public IsResend: boolean = false;
  public show: boolean = false;
  public showlogin: boolean = true;
  public showtryforfree: boolean = true;
  public showlogoutdrp: boolean = false;
  public IsCoundown: boolean = false;
  public phonenovalidation: boolean = false;
  public lengthValidation: boolean = false;
  public phonenoinvalid: boolean = false;
  public otpvalidation: boolean = false;
  public otpinvalid: boolean = false;
  public signUpotpvalidation: boolean = false;
  public signUpotpinvalid: boolean = false;
  public signUpPhoneNumberinvalid: boolean = false;
  menuPageName: string;
  buttonName: string;
  numberStatus: boolean = true;
  mobile: string;
  hasSubscribeTodayClicked: boolean;
  phoneNumRegex =
    /^(?:\+234|00234|0)?(?:50|54|58|51|52|55|56|2|3|4|6|7|9)\d{7}$/;
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

  selectedPack1: string = "btn-danger";
  selectedPack2: string = "btn-default";
  selectedPack3: string = "btn-default";
  selectedPack: number = 90;
  productList: Product[];
  product: Product;

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
    private streamingService: StreamingService,
    private _localStorageService: LocalStorageService
  ) {
    //translate.setDefaultLang('en');
    if (localStorage.getItem("lang") == "ar") {
      translate.setDefaultLang("ar");
    } else {
      translate.setDefaultLang("en");
    }
    this.buttonName = "Register";
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
    let that = this;
    // this._menuHeaderEventEmitter.actionSourceObservable.subscribe(() => {
    //   that.openModal(this.loginTemplate, false, false, false, true,false);
    // });
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();

    if (localStorage.getItem("lang") == "ar") {
      this.LangSelected = "ar";
      this.filterText = "";
      this.translate.setDefaultLang("ar");
      if (this.deviceInfo.os !== "iOS") {
        this.useLanguage("ar");
      }
      this.filterText = "عربى";
    } else {
      this.filterText = "";
      this.translate.setDefaultLang("en");
      if (this.deviceInfo.os !== "iOS") {
        this.useLanguage("en");
      }
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
      localStorage.getItem("loginStatus") != "" &&
      localStorage.getItem("loginStatus") != null
    ) {
      this.showlogoutdrp = true;
      this.mobile = localStorage.getItem("user");
      localStorage.setItem("user", localStorage.getItem("user"));
      this.showlogin = false;
      this.showtryforfree = false;
    } else {
      this.showlogoutdrp = false;
      this.showlogin = true;
      this.showtryforfree = true;
    }
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
    //#endregion

    this.menuPageName = this.activeRoute.snapshot.queryParamMap.get("page");
    // this.getMenuHeaderData();
    //  this.getProductList();
  }

  PricingEnit() {
    this.isSubscribed = localStorage.getItem("subscribed");
  }

  get f() {
    return this.registerForm.controls;
  }

  finishTimer() {
    // console.log("count down", this.counter);
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
    this.buttonName = "Login";
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
    console.log(data);
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
    console.log("Opened");

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

    //For Activation start

    //For Activation end

    this.modalRef = this.modalService.show(template, {
      backdrop: "static",
      keyboard: false,
    });

    if (this._localStorageService.GetUserId() != null) {
      let activationStatus = false;
      let status = localStorage.getItem("subscriptionStatus");
      if (parseInt(status) == 2) {
        activationStatus = true;
      } else {
        activationStatus = false;
      }
      if (activationStatus == false) {
        if (this.mobile != undefined) {
          console.log("Candition True");
          this.phonenumber = this.mobile.substring(3);
          this.buttonName = "Subscribe";
        }
      }
    }

    //$('.login-pop-up').attr('id', 'login');
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
    this.buttonName = "Login";
    this.showButtonContinue = true;
    this.showButtonSubmit = false;
  }

  onSubmit(template: TemplateRef<any>) {
    this.spinner.show();
    this.submitted = true;
    const phoneno = this.registerForm.controls.phonenumber.value;
    const phonenumber = 234 + "" + phoneno;
    const regexphonenumber = "+234" + "" + phoneno;
    const otpnumber = this.registerForm.controls.otpnumber.value;

    if (this.buttonName == "Login") {
      if (phoneno == "" || phoneno == null) {
        this.registerForm.controls.phonenumber.errors;
        //this.phonenovalidation = true;
        this.phonenoinvalid = false;
        this.spinner.hide();
        if (localStorage.getItem("lang") == "en") {
          this.toastr.errorToastr("Mobile Number is required", "Error", {
            position: "top-left",
          });
        } else {
          this.toastr.errorToastr("رقم الجوال مطلوب", "خطأ", {
            position: "top-left",
          });
        }
        return;
      }

      if (phoneno.length < 9) {
        this.registerForm.controls.phonenumber.errors;
        this.phonenoinvalid = false;
        this.spinner.hide();
        if (localStorage.getItem("lang") == "en") {
          this.toastr.errorToastr("Mobile no. is invalid.", "Error", {
            position: "top-left",
          });
        } else {
          this.toastr.errorToastr("رقم الهاتف غير صحيح", "خطأ", {
            position: "top-left",
          });
        }
        return;
      }

      const data = {
        msisdn: phonenumber,
      };

      this.loginService.getCheckNumberAvail(data).subscribe((data: any) => {
        if (data) {
          this.numberStatus = data.status;

          if (this.numberStatus) {
            const data = {
              msisdn: phonenumber,
              transactionId: "000000",
              pin: "1",
              type: "SUB",
              packIndex: this.selectedPack,
              requestID: "0000",
              language: localStorage.getItem("lang"),
            };

            this.loginService.GetloginDatapin(data).subscribe((data: any) => {
              if (data) {
                this.openpopup == false;

                if (data.statusDescription.statusCode == "200") {
                  this.closeModal();
                  localStorage.setItem(
                    "Usertrnsctionid",
                    data.statusDescription.transactionId
                  );
                  localStorage.setItem("Usermbid", phonenumber);
                  localStorage.setItem("type", data.statusDescription.type);
                  localStorage.setItem(
                    "requestID",
                    data.statusDescription.requestID
                  );
                  localStorage.setItem("userId", data.userDetails.id);
                  localStorage.setItem("user", data.userDetails.msisdn);
                  localStorage.setItem("subscribed", "true");
                  localStorage.setItem(
                    this._global.USER_ID,
                    data.userDetails.id
                  );
                  localStorage.setItem(
                    this._global.USER_JWT_TOKEN_KEY,
                    data.userDetails.userTokenDetails.jwtToken
                  );

                  if (data.userSubscriptionList[0] != null) {
                    localStorage.setItem(
                      "subscriptionStatus",
                      data.userSubscriptionList[0].activeStatus
                    );
                    localStorage.setItem(
                      "productId",
                      data.userSubscriptionList[0].productId
                    );
                    localStorage.setItem("activationStatus", "true");
                  } else {
                    localStorage.setItem("activationStatus", "false");
                  }

                  this.showlogin = false;
                  this.showtryforfree = false;
                  this.showlogoutdrp = true;
                  this.mobile = localStorage.getItem("user");

                  //this.GetUserAccountDetails();
                  this.GetUserLanguage();
                  this.loginConfirmed.emit(data);
                  this.subscribed = true;

                  if (data) {
                    window.location.reload();
                  }
                  localStorage.setItem("getIsUserLoggedIn", "true");
                  this.loginService.setIsUserLoggedIn(true);
                } else if (data.statusDescription.statusCode == "803") {
                  this.closeModal();

                  localStorage.setItem("SubscriptionTime", data.loginTime);
                  localStorage.setItem("user", data.userDetails.msisdn);
                  localStorage.setItem("subscribed", "true");
                  localStorage.setItem(
                    this._global.USER_ID,
                    data.userDetails.id
                  );
                  localStorage.setItem(
                    this._global.USER_JWT_TOKEN_KEY,
                    data.userDetails.userTokenDetails.jwtToken
                  );

                  this.showlogin = false;
                  this.showtryforfree = false;
                  this.showlogoutdrp = true;
                  this.mobile = localStorage.getItem("user");

                  this.GetUserAccountDetails();
                  this.GetUserLanguage();
                  this.loginConfirmed.emit(data);
                  this.subscribed = true;

                  if (data) {
                    window.location.reload();
                  }
                } else if (data.statusDescription.statusCode == "802") {
                  this.toastr.errorToastr(
                    data.statusDescription.statusMessage,
                    "Error",
                    {
                      position: "top-left",
                    }
                  );
                  this.registerForm.controls.otpnumber.invalid;
                  this.spinner.hide();
                  this.otpinvalid = true;
                  this.otpvalidation = false;
                  return;
                }
              }
            });
          } else {
            this.spinner.hide();
            this.buttonName = "Register";
          }
        }
      });
    }

    if (this.buttonName == "Register") {
      window.open(
        "http://app.games2play.co/MtnNigeriaBilling/nigeria?cpid=0&kpid=0&pubid=0&msisdn=" +
          phonenumber +
          "&productId=" +
          this.selectedPack +
          "",
        "_self"
      );

      //       this.loginService.ghanaSubscribe(phonenumber,this.selectedPack).subscribe((data: any) => {

      //         if (data) {
      //         if (data.statusCode == '200') {
      //           const data = {
      //             'msisdn': phonenumber,
      //             'transactionId': '000000',
      //             'pin': '1',
      //             'type': 'SUB',
      //             'packIndex': this.selectedPack,
      //             'requestID':'0000',
      //             "language": localStorage.getItem('lang')
      //           };

      //           this.loginService.GetloginDatapin(data).subscribe((data: any) => {

      //             if (data) {
      //               this.openpopup == false;

      //               if (data.statusDescription.statusCode == '200') {

      //                 this.closeModal();
      //                 localStorage.setItem('Usertrnsctionid', data.statusDescription.transactionId);
      //                 localStorage.setItem('Usermbid', phonenumber);
      //                 localStorage.setItem('type', data.statusDescription.type);
      //                 localStorage.setItem('requestID', data.statusDescription.requestID);
      //                 localStorage.setItem("userId", data.userDetails.id);
      //                 localStorage.setItem('user', data.userDetails.msisdn);
      //                 localStorage.setItem('subscribed', "true");
      //                 localStorage.setItem(this._global.USER_ID, data.userDetails.id);
      //                 localStorage.setItem(this._global.USER_JWT_TOKEN_KEY, data.userDetails.userTokenDetails.jwtToken);

      //                 if (data.userSubscriptionList[0] != null) {
      //                   localStorage.setItem("subscriptionStatus", data.userSubscriptionList[0].activeStatus);
      //                   localStorage.setItem("productId", data.userSubscriptionList[0].productId);
      //                   localStorage.setItem("activationStatus", "true");
      //                 } else {
      //                   localStorage.setItem("activationStatus", "false");
      //                 }

      //                 this.showlogin = false;
      //                 this.showtryforfree = false;
      //                 this.showlogoutdrp = true;
      //                 this.mobile = localStorage.getItem('user');

      //                 //this.GetUserAccountDetails();
      //                 this.GetUserLanguage();
      //                 this.loginConfirmed.emit(data);
      //                 this.subscribed = true;

      //                 if (data) {
      //                   window.location.reload();
      //                 }
      //                 localStorage.setItem('getIsUserLoggedIn', "true");
      //                 this.loginService.setIsUserLoggedIn(true);

      //               }
      //               else if (data.statusDescription.statusCode == '803') {

      //                 this.closeModal();

      //                 localStorage.setItem('SubscriptionTime', data.loginTime);
      //                 localStorage.setItem('user', data.userDetails.msisdn);
      //                 localStorage.setItem('subscribed', "true");
      //                 localStorage.setItem(this._global.USER_ID, data.userDetails.id);
      //                 localStorage.setItem(this._global.USER_JWT_TOKEN_KEY, data.userDetails.userTokenDetails.jwtToken);

      //                 this.showlogin = false;
      //                 this.showtryforfree = false;
      //                 this.showlogoutdrp = true;
      //                 this.mobile = localStorage.getItem('user');

      //                 this.GetUserAccountDetails();
      //                 this.GetUserLanguage();
      //                 this.loginConfirmed.emit(data);
      //                 this.subscribed = true;

      //                 if (data) {
      //                   window.location.reload();
      //                 }
      //               }
      //               else if (data.statusDescription.statusCode == '802') {

      //                  this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
      //                    position: 'top-left'
      //                  });
      //                 this.registerForm.controls.otpnumber.invalid;
      //                 this.spinner.hide();
      //                 this.otpinvalid = true;
      //                 this.otpvalidation = false;
      //                 return;
      //               }
      //             }
      //           });
      //       }
      //       else {
      //         this.toastr.errorToastr('Subscription Error try again after sometime.', 'Error', {
      //           position: 'top-left'
      //         });
      //         this.spinner.hide();
      //       }
      // }
      // });
    }

    if (this.buttonName == "Submit") {
      if (otpnumber == "" || otpnumber == null) {
        this.registerForm.controls.otpnumber.invalid;
        this.otpvalidation = true;
        this.otpinvalid = false;
        this.spinner.hide();
        return;
      }

      if (otpnumber.length < 4) {
        this.registerForm.controls.otpnumber.invalid;
        this.otpvalidation = false;
        this.otpinvalid = true;
        this.spinner.hide();
        return;
      }

      const trnsctionid = localStorage.getItem("Usertrnsctionid");
      const type = localStorage.getItem("type");
      const requestID = localStorage.getItem("requestID");
      let Usertrnsctionid;
      if (trnsctionid == null || trnsctionid == "") {
        Usertrnsctionid = localStorage.getItem("Resendtrnsctionid");
      } else {
        Usertrnsctionid = trnsctionid;
      }
      const mbid: number = parseInt(phonenumber);
      const data = {
        HeaderRequest: this.deviceService,
        msisdn: mbid,
        transactionId: Usertrnsctionid,
        pin: otpnumber,
        type: type,
        packIndex: this.selectedPack,
        requestID: requestID,
        language: localStorage.getItem("lang"),
      };

      this.loginService.GetloginDatapin(data).subscribe((data: any) => {
        if (data) {
          this.openpopup == false;

          if (data.statusDescription.statusCode == "200") {
            this.closeModal();

            localStorage.setItem("userId", data.userDetails.id);
            localStorage.setItem("user", data.userDetails.msisdn);
            localStorage.setItem("subscribed", "true");
            localStorage.setItem(this._global.USER_ID, data.userDetails.id);
            localStorage.setItem(
              this._global.USER_JWT_TOKEN_KEY,
              data.userDetails.userTokenDetails.jwtToken
            );

            if (data.userSubscriptionList[0] != null) {
              localStorage.setItem(
                "subscriptionStatus",
                data.userSubscriptionList[0].activeStatus
              );
              localStorage.setItem(
                "productId",
                data.userSubscriptionList[0].productId
              );
              localStorage.setItem("activationStatus", "true");
            } else {
              localStorage.setItem("activationStatus", "false");
            }

            this.showlogin = false;
            this.showtryforfree = false;
            this.showlogoutdrp = true;
            this.mobile = localStorage.getItem("user");

            this.GetUserAccountDetails();
            this.GetUserLanguage();
            this.loginConfirmed.emit(data);
            this.subscribed = true;

            if (data) {
              window.location.reload();
            }
            localStorage.setItem("getIsUserLoggedIn", "true");
            this.loginService.setIsUserLoggedIn(true);
          } else if (data.statusDescription.statusCode == "803") {
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
            this.mobile = localStorage.getItem("user");

            this.GetUserAccountDetails();
            this.GetUserLanguage();
            this.loginConfirmed.emit(data);
            this.subscribed = true;

            if (data) {
              window.location.reload();
            }
          } else if (data.statusDescription.statusCode == "802") {
            this.toastr.errorToastr(
              data.statusDescription.statusMessage,
              "Error",
              {
                position: "top-left",
              }
            );
            this.registerForm.controls.otpnumber.invalid;
            this.spinner.hide();
            this.otpinvalid = true;
            this.otpvalidation = false;
            return;
          }
        }
      });
    }
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

  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  logout(idlelogout: boolean) {
    $(".main_nav li").children().removeClass("menuHeighlight");
    this.spinner.show();
    // this.stop();
    $("#body").removeClass("rtl");
    $("div [class*='col-']").removeClass("pull-right");
    $("a.pull-right").addClass("pull-right");
    $("a.btn.btn-primary").removeClass("pull-left");
    const userid = localStorage.getItem(this._global.USER_ID);
    const token = localStorage.getItem(this._global.USER_JWT_TOKEN_KEY);
    const data = {
      userId: userid,
      jwtToken: token,
      portalId: this._global.PORTAL_ID,
    };

    console.log("idlelogout:::" + idlelogout);
    if (idlelogout == false) {
      console.log("in fist else");
      this.loginService.GetlogoutDatapin(data).subscribe((data: any) => {
        console.log(data);
        if (data) {
          if (data.statusCode === 200) {
            // this.toastr.successToastr('Logout Successful', 'Success', {
            //   position: 'top-left'
            // });
            localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
            console.log("removing token at 569 in login");
            localStorage.clear();
            this.showlogoutdrp = false;
            this.router.navigate([""]);
            //this.spinner.hide();
            // this.showlogin = true;
            // this.showtryforfree = true;
            // this.registerForm.reset();
            // this.show = false;
            // //this.closeModal();
            // this.modalRef.hide();
            // this.IsCoundown = false;
            // this.IsResend = false;
            // this.buttonName = "Login";
            // this.router.navigate([""])
            // this.spinner.hide();

            //   window.location.href = '';
          } else if (data.statusCode === 304) {
            // this.toastr.successToastr('Logout Successful', 'Success', {
            //   position: 'top-left'
            // });
            localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
            console.log("removing token at 589 in login");
            localStorage.clear();
            this.showlogoutdrp = false;
            this.showlogin = true;
            this.showtryforfree = true;
            this.registerForm.reset();
            this.show = false;
            this.closeModal();
            this.IsCoundown = false;
            this.IsResend = false;
            this.buttonName = "Login";
            this.router.navigate([""]);
            //this.spinner.hide();
            // window.location.href = '';
          } else {
            // this.toastr.errorToastr('Something Wrong', 'Oops', {
            // position: 'top-left'
            // });
            console.log("in loose else");
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
              console.log("removing token at 624 in login");
              localStorage.clear();
              this.showlogoutdrp = false;
              this.showlogin = true;
              this.showtryforfree = true;
              this.registerForm.reset();
              this.show = false;
              this.closeModal();
              this.IsCoundown = false;
              this.IsResend = false;
              this.buttonName = "Login";
              this.router.navigate([""]);
              // this.spinner.hide();
              this.openModal(this.loginTemplate, false, false, true);

              this.openpopup == true;
              //
              //   window.location.href = '';
            } else if (data.statusCode == 304) {
              // this.toastr.successToastr('Logout Successful', 'Success', {
              //   position: 'top-left'
              // });
              localStorage.removeItem(this._global.USER_JWT_TOKEN_KEY);
              console.log("removing token at 647 in login");
              localStorage.clear();
              this.showlogoutdrp = false;
              this.showlogin = true;
              this.showtryforfree = true;
              this.registerForm.reset();
              this.show = false;
              this.closeModal();
              this.IsCoundown = false;
              this.IsResend = false;
              this.buttonName = "Login";

              this.router.navigate([""]);
              //this.spinner.hide();
              // window.location.href = '';
              window.location.reload();
            } else {
              // this.toastr.errorToastr('Something Wrong', 'Oops', {
              // position: 'top-left'
              // });
            }
          }
        });
        this.idlelogoutCallOnce = true;
      }
    }
    //this.spinner.show();
  }

  getMenuHeaderData() {
    var language = localStorage.getItem("lang");
    const data = {
      portalId: this._global.PORTAL_ID,
      language: language,
    };
    // this.spinner.show();

    this.menuHeaderService.GetMenuHeaderData(data).subscribe((data: any) => {
      if (data) {
        // this.spinner.hide();
        this.menuData = data;
        if (this._localStorage.GetUserId()) {
          // this.GetUserAccountDetails();
        }
      }
    });
  }

  // redirect(pageName: string) {
  //   $('.main_nav li').children().removeClass('menuHeighlight');
  //   this.menuPageName = pageName;
  //   localStorage.removeItem('genreName');
  //   if (pageName === 'Pricing') {
  //     if (this._localStorage.GetUserId()) {
  //       this.GetUserAccountSubList(pageName);
  //     } else {
  //       this.router.navigate(['/' + pageName]);
  //     }
  //   }
  //   if (pageName === 'Wishlist') {
  //     this.router.navigate(['./Wishlist']);
  //   }
  //   else {
  //     //this.router.navigate(['./' + pageName], { queryParams: { page: pageName } });
  //     this.router.navigate(['./Content'], { queryParams: { page: pageName } });
  //   }
  // }
  redirect(pageID: string, pageName: string) {
    $(".main_nav li").children().removeClass("menuHeighlight");
    localStorage.removeItem("genreName");
    // if(pageID=="10"){
    // var  pageName="Videos";
    // }
    // else if(pageID=="11"){
    //   var  pageName="Music";
    // }
    // else if(pageID=="12"){
    //   var  pageName="Games";
    // }
    // else if(pageID=="13"){
    //   var  pageName="Apps";
    // }
    this.menuPageName = pageName;
    this.router.navigate(["./Content"], { queryParams: { page: pageName } });
  }
  SetupLoginTemplateInLocalVariable() {}

  public restrictNumeric(e) {
    this.otpvalidation = false;
    this.otpinvalid = false;
    this.phonenovalidation = false;
    this.lengthValidation = false;
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
    this.buttonName = "Login";
    this.loginFormVerifyNumber = false;
    this.phonenumber = "";
    this.registerForm.reset();
  }

  //#region  create account section (signup section)

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
    const phonenumber = 234 + "" + this.signUpFormControls.signUpPhoneNumber;
    const regexphonenumber =
      "+234" + "" + this.signUpFormControls.signUpPhoneNumber;
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
        // this.toastr.errorToastr('phone number is invalid format', 'error!', {
        //   position: 'top-left'
        // });
        this.signUpPhoneNumberinvalid = true;
        return;
      }
      const data = {
        msisdn: phonenumber,
      };
      // this.spinner.show();
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
          //  this.spinner.hide();
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
        return;
      }
      // this.spinner.show();
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
        // this.spinner.hide();
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
    localStorage.setItem("subscribed", "true");
    localStorage.setItem(this._global.USER_ID, data.userDetails.id);
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
    this._activatedRoute.paramMap.subscribe((data) => {
      this._activatedRoute.queryParams.subscribe((x) => {
        console.log("x");
        console.log(x);
        if (x.page) {
          this.router.navigate(["Search", x.page]);
        } else {
          this.router.navigate(["Search", "Home"]);
        }
      });
    });
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
    //  this.spinner.show();
    //   var language =localStorage.getItem('lang');
    //   const bodyData: UserAccountDetailREQUEStBODyPOST = {
    //     jwtToken: this._localStorage.GetUserJwtToken(),
    //     portalId: this._global.PORTAL_ID,
    //     userId: this._localStorage.GetUserId(),
    //     language:language
    //   };
    //   const subscriber = this._userAccountService
    //     .GetAccountDetail(bodyData)
    //     .subscribe((data: UserAccountDetailRESPONSePOST) => {
    //       // setting the Image at menu header
    //      // this.spinner.hide();
    //       if (+data.statusDescription.statusCode == 200) {
    //         if (data.userAccountDetail != null) {
    //           var userProfileImageSource ='https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0';
    //           if (userProfileImageSource != "" && userProfileImageSource != null) {
    //             $("#userProfileImage").attr("style", "height:40px;width:40px");
    //             this.toDataURL(userProfileImageSource, (base64Data) => {
    //            //   debugger
    //               sessionStorage.setItem('header-image-key', base64Data);
    //             });
    //             if (sessionStorage.getItem('header-image-key')) {
    //               $("#userProfileImage").attr("src", sessionStorage.getItem('header-image-key'));
    //             } else {
    //               $("#userProfileImage").attr("src", userProfileImageSource);
    //             }
    //           } else {
    //             $("#userProfileImage").attr("src", '/assets/images/icons/top_nav/top_nav_avatar_5.svg');
    //           }
    //         } else {
    //           $("#userProfileImage").attr("src", '/assets/images/icons/top_nav/top_nav_avatar_5.svg');
    //         }
    //       }
    //     });
  }

  toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
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
        console.log("Language Data = ");
        console.log(data);
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
      if (this.deviceInfo.os === "iOS") {
        window.location.reload();
      }

      $("div [class*='col-']").removeClass("pull-right");
      $("a.pull-right").addClass("pull-right");
      $("a.btn.btn-primary").removeClass("pull-left");
    }
    const userid = localStorage.getItem(this._global.USER_ID);
    var language = localStorage.getItem("lang");
    //  this.getMenuHeaderData();
    // this.translate.use(language);
    // this.languageChange.emit(true);
    if (userid != null) {
      const bodyData = {
        userId: this._localStorage.GetUserId(),
        jwtToken: this._localStorage.GetUserJwtToken(),
        portalId: this._global.PORTAL_ID,
        language: language,
      };

      // this._userAccountService.UpdateAccountLanguage(bodyData).subscribe((bodyData: any) => {
      //   if (bodyData) {
      //    // this.getMenuHeaderData();
      //     this.translate.use(language);
      //     this.languageChanged.emit(true);
      //     this.bannerlanguageChanged.emit(true);
      //     this.wishlistlanguageChanged.emit(true);
      //     this.SubscriptionlanguageChanged.emit(true);
      //     this.SubscriptionContainerlanguageChanged.emit(true);
      //     this.AppExternalLink();
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
    //this.languageChange.emit(true);
  }

  AppExternalLink() {
    var language = localStorage.getItem("lang");
    const data = {
      language: language,
    };
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
    // this.spinner.show();
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

  selectPack(packIndex: number, packId: number) {
    this.selectedPack1 = "btn-default";
    this.selectedPack2 = "btn-default";
    // this.selectedPack3 = 'btn-default';
    if (packIndex == 1) {
      this.selectedPack1 = "btn-danger";
    } else if (packIndex == 2) {
      this.selectedPack2 = "btn-danger";
    }
    //else if (packIndex == 3) {
    //   this.selectedPack3 = 'btn-danger';
    // }
    this.selectedPack = packId;

    // this.selectedPack1 = 'btn-default';
    // this.selectedPack2 = 'btn-default';
    // this.selectedPack3 = 'btn-default';
    // if (packIndex == 1) {
    //   this.selectedPack1 = 'btn-danger';
    // } else if (packIndex == 2) {
    //   this.selectedPack2 = 'btn-danger';
    // } else if (packIndex == 3) {
    //   this.selectedPack3 = 'btn-danger';
    // }

    this.selectedPack = packId;
  }

  getAndPlayContent() {
    this.spinner.show();
    const contentId = localStorage.getItem("contentToPlay");
    const bodyData: VideoPlayLinkREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      ContentId: parseInt(contentId),
      userId: this._localStorage.GetUserId(),
    };
    this.streamingService
      .GetContentStreamLink(bodyData)
      .subscribe((data: StreamLinkRESPONSePOST) => {
        if (
          data.statusDescription !== null ||
          data.statusDescription !== undefined
        ) {
          if (data.statusDescription.statusCode !== undefined) {
            if (data.statusDescription.statusCode && data.link) {
              if (+data.statusDescription.statusCode === 200) {
                if (data.isDirectPlay == false) {
                  window.open(data.link, "_blank");
                  this.spinner.hide();
                }
                // else {
                //   //Code for new tab video link

                //   this.loadingService.hide();
                //   this.Videohreflink = data.link;
                //   this.IsLoggedIn = true;

                //   if (this.IsIOSPhone == false) {

                //     // window.open(data.link, '_blank')
                //     this.targetforlink = "_blank"
                //     this.IsLoggedIn = true;
                //   }
                //   else {

                //     // setTimeout(() => {
                //     //   debugger;
                //     //   $('#PlayVideo')[0].click();
                //     // }, 400);

                //     //this.openTab(data.link);
                //     this.Videohreflink = data.link;
                //     this.targetforlink = "_self"
                //     this.IsLoggedIn = true;
                //   }
                // }
              }
              // else {
              //   return this.toastr.errorToastr(data.statusDescription.statusMessage, 'error', {
              //     position: 'top-left'
              //   });
              // }
            } else {
              this.spinner.hide();
            }
          }
          // else {
          //   this.loadingService.hide();
          //   return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
          //     position: 'top-left'
          //   });
          // }
        }
        // else {
        //   this.loadingService.hide();
        //   return this.toastr.errorToastr('Server busy please try again after sometime', 'error', {
        //     position: 'top-left'
        //   });
        // }
      });
  }

  openModalRegister(
    template: TemplateRef<any>,
    isSubscribeTodayClicked: boolean = false,
    isAddwishlistClicked: boolean = false,
    isLoginBtnClicked: boolean = false,
    isVideoPlayMovieClicked: boolean = false,
    isGamePlaygameClicked: boolean = false,
    isMusicPlayAlbumClicked: boolean = false,
    isGamePlaywishlistClicked: boolean = false,
    isMusicPlayWishListClicked: boolean = false,
    msisdn: string
  ) {
    console.log("Msisnd::" + msisdn);
    this.phonenumber = msisdn;
    console.log("Msisnd::" + this.phonenumber);
    this.msisdn = msisdn;
    console.log("Msisdn::" + this.msisdn);
    this.getProductList();
    console.log("Opened");

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

    //For Activation start

    //For Activation end

    this.modalRef = this.modalService.show(template, {
      backdrop: "static",
      keyboard: false,
    });

    if (this._localStorageService.GetUserId() != null) {
      let activationStatus = false;
      let status = localStorage.getItem("subscriptionStatus");
      if (parseInt(status) == 2) {
        activationStatus = true;
      } else {
        activationStatus = false;
      }
      if (activationStatus == false) {
        if (this.mobile != undefined) {
          console.log("Candition True");
          this.phonenumber = this.mobile.substring(3);
          this.buttonName = "Subscribe";
        }
      }
    }

    //$('.login-pop-up').attr('id', 'login');
  }

  hitForCG() {
    console.log("msisdn::" + this.phonenumber + "::yuo::" + this.msisdn);
    // window.open("http://friendzchat.mobi/VodaFoneChat/webapi/registrationjsp/subscribe?msisdn="+this.msisdn+"&productId="+this.selectedPack+"&channel=WEB",'_self');
    //window.open("http://bd.games2play.co/G2PServlet/SubscriptionController?msisdn="+this.msisdn+"&transactionid=0000&productid="+this.selectedPack+"&source=wap",'_self');
  }

  getProductList() {
    let productRequest = {
      operator: "234",
      country: "234",
      itemtypeId: 72,
      language: localStorage.getItem("lang"),
    };

    this.loginService
      .productRequest(productRequest)
      .subscribe((response: any) => {
        this.productList = [];
        if (response.statusDescription.statusCode == 200) {
          this.buttonName = "Register";
          for (let i = 0; i < response.productList.length; i++) {
            let recordNo = i + 1;
            this.product = new Product();
            this.product = response.productList[i];
            this.product.ngClass = "selectedPack" + recordNo;
            this.product.sNo = recordNo;
            if (i == 0) {
              this.selectedPack = parseInt(this.product.productId);
              this.product.className = "btn w-140 btn-danger";
            } else {
              this.product.className = "btn btn-default w-140";
            }
            this.productList.push(this.product);
          }
          this.productList = response.productList;
          console.log("Product List Start");
          console.log(this.productList);
          console.log("Product List End");
        }
      });
  }
}
