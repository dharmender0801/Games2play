import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class Global {
    public BASE_API_URL: string;
    public Get_API_login_Check : string;
    public WebStore_API_URL: string;
    public API_Token: string;
    public BASE: string;
    public API_login_otp: string;
    public httpOptions: object;
    public API_logout_otp: string;
    public API_wishlist: string;
    public API_External: string;
    // KEYS SUBSCRIPTION START
    public SUBSCRIPTION_PURCHASE_DETIALS = 'subscription-purchase-details-key';
    // KEYS User Pin Subscription
    public User_Pin_Subscription_Details = 'user-pin-subscription-details-key';
    // KEYS Upgrade User Pin Subscription
    public Upgrade_User_Pin_Subscription_Details = 'upgrade-user-pin-subscription-details-key';
    // KEYS SUBSCRIPTION END
    public USER_NUMBER = 'user';
    public USER_ID = 'user-id';
    public SUBSCRIPTION_TIME = 'SubscriptionTime';
    public USER_JWT_TOKEN_KEY = 'user-jwt-token-key';
    public PORTAL_ID = 73;
    // HTTP CODE START
    // 200
    public HTTP_CODE_200 = '200';
    // 300
    public HTTP_CODE_304 = '304';
    // 700
    public HTTP_CODE_702 = '702';
    public HTTP_CODE_701 = '701';
    // HTTP CODE END

    // TOASTER HEADING START
    public TOASTER_HEADING_INFO = 'Info';
    public TOASTER_HEADING_SUCCESS = 'Success';
    public TOASTER_HEADING_ERROR = 'Error';
    // TOASTER HEADING END

    // URL START
    public URL_SUBSCRIPTION_SUCCESS_PAGE = 'Pricing/preview';
    // URL END

    // STRING START
    public STRING_OTP_IS_REQUIRED = 'OTP number is required';
    public USER = 'user';
    public USER_HAS_FREE_TRIAL_KEY = 'subscription-user-has-free-trial';
    public IS_USER_NAVIGATED_FROM_CONTENT = 'is-user-navigated-from-content';
    public IS_USER_NAVIGATED_FROM_CONTENT_FOR_UPGRADE_SUB_REQUEST = 'is-user-navigated-from-content-for-sub-upgrade-request';
    public UPGRADE_PREVIOUS_SERVICE_CAME_FROM = 'upgrade-service-came-from';
    public  START_YOUR_SUSCRIPTION = 'startYourSubscription';
    public USER_SUBSCRIBED = 'subscribed';
    // STRING END

    constructor() {

        // this.BASE_API_URL = 'http://localhost:8080/OoredooWebStoreAPI/portal/app/';
        // this.WebStore_API_URL = 'http://localhost:8080/OoredooWebStoreAPI/web/portal/';
        // this.BASE = 'http://localhost:8080/OoredooWebStoreAPI/';
        // this.API_login_otp = 'http://localhost:8080/OoredooWebStoreAPI/auth/';
        // this.API_logout_otp = 'http://localhost:8080/OoredooWebStoreAPI/web/user/logout';
        // this.API_wishlist='http://localhost:8080/OoredooWebStoreAPI/web/user/wishlist/';
        // this.API_External='http://localhost:8080/OoredooWebStoreAPI/web/portal/page/external';

        // this.BASE_API_URL = 'http://oomapp.funtastic.mobi/OoredooWebStoreAPI/portal/app/';
        // this.WebStore_API_URL = 'http://oomapp.funtastic.mobi/OoredooWebStoreAPI/web/portal/';
        // this.BASE = 'http://oomapp.funtastic.mobi/OoredooWebStoreAPI/';
        // this.API_login_otp = 'http://oomapp.funtastic.mobi/OoredooWebStoreAPI/auth/';
        // this.API_logout_otp = 'http://oomapp.funtastic.mobi/OoredooWebStoreAPI/web/user/logout';
        // this.API_wishlist='http://oomapp.funtastic.mobi/OoredooWebStoreAPI/web/user/wishlist/';
        // this.API_External='http://oomapp.funtastic.mobi/OoredooWebStoreAPI/web/portal/page/external';

        this.BASE_API_URL = 'http://app.games2play.co/OoredooWebStoreAPI/portal/app/';
        this.WebStore_API_URL = 'http://app.games2play.co/OoredooWebStoreAPI/web/portal/';
        this.BASE = 'http://app.games2play.co/OoredooWebStoreAPI/';
        this.API_login_otp = 'http://app.games2play.co/OoredooWebStoreAPI/auth/';
        this.API_logout_otp = 'http://app.games2play.co/OoredooWebStoreAPI/web/user/logout';
        this.API_wishlist='http://app.games2play.co/OoredooWebStoreAPI/web/user/wishlist/';
        this.API_External='http://app.games2play.co/OoredooWebStoreAPI/web/portal/page/external';

        // this.BASE_API_URL = 'http://124.124.227.249:8081/OoredooWebStoreAPI/portal/app/';
        // this.WebStore_API_URL = 'http://124.124.227.249:8081/OoredooWebStoreAPI/web/portal/';
        // this.BASE = 'http://124.124.227.249:8081/OoredooWebStoreAPI/';
        // this.API_login_otp = 'http://124.124.227.249:8081/OoredooWebStoreAPI/auth/';
        // this.API_logout_otp = 'http://124.124.227.249:8081/OoredooWebStoreAPI/web/user/logout';
        // this.API_wishlist='http://124.124.227.249:8081/OoredooWebStoreAPI/web/user/wishlist/';
        // this.API_External='http://124.124.227.249:8081/OoredooWebStoreAPI/web/portal/page/external';

        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
    }

    public get BASE_API_URLvalue(): string {
        return this.BASE_API_URL;
    }

    public get WebStore_API_URLvalue(): string {
        return this.WebStore_API_URL;
    }

    public get Get_API_Token(): string {
        return this.API_Token;
    }
    public get Get_API_login(): string {
            return this.API_login_otp;
    }
    public get Get_API_logout(): string {
        return this.API_logout_otp;
    }

    public get Get_API_wishlist(): string {
        return this.API_wishlist;
    }
    public get Get_API_ExternalLinks(): string {
        return this.API_External;
    }
}
