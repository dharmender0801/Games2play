import { Component, OnInit } from "@angular/core";
import { LocalStorageService } from "src/app/Services/local-storage.service";
import { SubscriptionService } from "src/app/Services/subscription.service";
import { Global } from "src/app/global/global";
import { UserAccountService } from "src/app/Services/user-account.service";
import { UserAccountDetailREQUEStBODyPOST } from "src/app/model/account/api/user-account-detail-request-body-post";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { UserAccountDetailRESPONSePOST } from "src/app/model/account/api/user-account-detail-response-post";
import { UserSubscription } from "src/app/model/account/user-subscription-list";
import { UpdateUserAccountDetailREQUEStBODyPOST } from "../../../model/account/api/user-account-detail-request-body-post";
import { UpdateUserAccountDetailResponsePost } from "../../../model/account/api/user-account-detail-response-post";
import { NgxSpinnerService } from "ngx-spinner";
import { ToasterService } from "src/app/Services/toaster.service";
import { ToastrManager } from "ng6-toastr-notifications";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

declare var $: any;
@Component({
  selector: "app-user-account-detail-banner",
  templateUrl: "./user-account-detail-banner.component.html",
  styleUrls: ["./user-account-detail-banner.component.css"]
})
export class UserAccountDetailBannerComponent implements OnInit {
  accountDetial: UserAccountDetailRESPONSePOST;
  subscritionList: UserSubscription[];
  imageuplaoder: boolean;
  imageformatinvalid: boolean;
  userProfileForm:FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _localStorage: LocalStorageService,
    private _loaderService: NgxSpinnerService,
    private _subscriptionServuice: SubscriptionService,
    private _global: Global,
    private _userAccountService: UserAccountService,
    private toster: ToastrManager,
    private translate: TranslateService
  ) {

    if (localStorage.getItem('lang')=="ar" ){
      translate.setDefaultLang('ar');
    }
    else{
      translate.setDefaultLang('en');
    }
  }

  currentUserNumber: string;
  userName: string;
  IsEditUpdateShow: boolean = false;
  IsUserNameShow: boolean = true;
  userNameValid: boolean = true;
  hasUsernameEmpty: boolean = false;
  ngOnInit() {
    this._loaderService.show();
    // this.GetUserAccountSubList();
    this.GetCurrentUserNumber();
    this._loaderService.hide();
  }
  GetCurrentUserNumber(): any {
    this.currentUserNumber = this._localStorage.GetUserNumber();
  }

  GetUserAccountSubList() {
    var language =localStorage.getItem('lang');
    const bodyData: UserAccountDetailREQUEStBODyPOST = {
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorage.GetUserId(),
      language:language
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
        // setting the Image at menu header
        if (+data.statusDescription.statusCode == 200) {
          this.accountDetial = data;
          localStorage.setItem('username', data.userAccountDetail.name);
          this.subscritionList = data.userSubscriptionList;
          if (data.userAccountDetail != null) {
            var userProfileImageSource = data.userAccountDetail.profileImage;
            if(userProfileImageSource!="" && userProfileImageSource!=null){
              $("#userProfileImage").attr("style", "height:40px;width:40px");
              $("#userProfileImage").attr("src", userProfileImageSource);
            }else{
              $("#userProfileImage").attr("src", '/assets/images/icons/top_nav/top_nav_avatar_5.svg');
              $("#userAccountProfileImage").attr("src", '/assets/images/icons/top_nav/top_nav_avatar_5.svg');
            }

            if(data.userAccountDetail.name!="") {
              this.hasUsernameEmpty = false;
            } else {
              this.hasUsernameEmpty = true;
            }

          }else{
            this.hasUsernameEmpty = true;
            $("#userAccountProfileImage").attr("src", '/assets/images/icons/top_nav/top_nav_avatar_5.svg');
          }
        }
      });
  }
  editUserName() {
    this.userName = this.accountDetial.userAccountDetail.name;
    this.IsEditUpdateShow = true;
    this.IsUserNameShow = false;
    this.hasUsernameEmpty=false;
  }
  cancelUserName() {
    this.IsEditUpdateShow = false;
    this.IsUserNameShow = true;
    this.userNameValid = true;
    if(this.accountDetial.userAccountDetail.name!="") {
      this.hasUsernameEmpty = false;
    } else {
      this.hasUsernameEmpty = true;
    }
  }

  updateUserName() {
    let NameRegex = /^[a-z ,.'-]+$/i;
    if (!NameRegex.test(this.userName)) {
      this.userNameValid = false;
      return;
    }
    this._loaderService.show();
    const bodyData: UpdateUserAccountDetailREQUEStBODyPOST = {
      userId: this._localStorage.GetUserId(),
      jwtToken: this._localStorage.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      language: "en",
      name: this.userName
    };
    const subscriber = this._userAccountService
      .UpdateAccountDetail(bodyData)
      .pipe(
        catchError(x => {
          console.log(x);
          subscriber.unsubscribe();
          return throwError(x);
        })
      )
      .subscribe((data: UpdateUserAccountDetailResponsePost) => {
        if (data.statusCode == "200") {
          this.IsEditUpdateShow = false;
          this.IsUserNameShow = true;
          this.accountDetial.userAccountDetail.name = this.userName;
          if(this.userName!="") {
            this.hasUsernameEmpty = false;
          } else {
            this.hasUsernameEmpty = true;
          }
        }
        this.userNameValid = true;
        this._loaderService.hide();
      });
  }

  onSelectFile(event) {
    this._loaderService.show();
    this.imageformatinvalid = false;
    var allowedFiles = [".jpg", ".png",".jpeg"];

    var regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(" + allowedFiles.join("|") + ")$"
    );
    var fileUploads = $("#imageupload");
    if (!regex.test(fileUploads.val().toLowerCase())) {
      this.imageformatinvalid = true;
      this._loaderService.hide();
      //$("#imageupload").val('');
      return false;
    } else {
      this.imageformatinvalid = false;
    }
    //if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onloadend = e => {
      reader.result;
    };
    setTimeout(() => {
      reader.onloadend;
      var imageUrl = reader.result;
      // }
      const data = {
        jwtToken: this._localStorage.GetUserJwtToken(),
        portalId: this._global.PORTAL_ID,
        userId: this._localStorage.GetUserId(),
        imageData: reader.result
      };

      this._userAccountService
        .UploadImageDetail(data)
        .subscribe((data: any) => {
          if (data) {
            if (data.statusDescription.statusCode == "200") {
              
              this.toster.successToastr("Image Upload Successful", "Success", {
                position: "top-left"
              });
              this.imageuplaoder = false;
              this.GetUserAccountSubList();
              this._loaderService.hide();
            } else {
              this.toster.warningToastr("Something Went Wrong", "Oops", {
                position: "top-left"
              });
              this._loaderService.hide();
            }
          }
        });
    }, 1000);
  }
}
