import { ErrorService } from './../../../Services/error.service';
import { Global } from './../../../global/global';
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/Services/subscription.service';
import { UserSubscriptionHistory } from 'src/app/model/subscription/api/user-subscription-history';
import { UserSubscriptionHistoryREQUEStBODyPOST } from 'src/app/model/subscription/api/user-subscription-history-request-body-post';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-user-account-detail-billing-history',
  templateUrl: './user-account-detail-billing-history.component.html',
  styleUrls: ['./user-account-detail-billing-history.component.css']
})
export class UserAccountDetailBillingHistoryComponent implements OnInit {

  subBillHistory: UserSubscriptionHistory[];
  public showlogoutdrp: boolean = false;
  showLoginPassword: boolean = true;
  public showtryforfree: boolean = true;
  public show: boolean = false;
  public showlogin: boolean = true;
  public IsCoundown: boolean = false;
  public IsResend: boolean = false;

  constructor(
    private _subscriptionHistory: SubscriptionService,
    private loginService: LoginService,
    public toastr: ToastrManager,
    private route: Router,
    private _localStorageService: LocalStorageService,
    private _global: Global,
    private _errorService: ErrorService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    console.log("in history controller");
    $('.main_nav li').children().removeClass('menuHeighlight');
    this.GetSubScriptionHistory();
  }

  GetSubScriptionHistory() {
    this.spinner.show();
    var language =localStorage.getItem('lang');

    let body: UserSubscriptionHistoryREQUEStBODyPOST = {
      jwtToken: this._localStorageService.GetUserJwtToken(),
      portalId: this._global.PORTAL_ID,
      userId: this._localStorageService.GetUserId(),
      language:language
    };

    const subscriber = this._subscriptionHistory.GetUserbILLHistoryList(body)
      .subscribe((data:any) => {
        if(data){
          if(data.statusDescription.statusCode=='304'){
              this.toastr.errorToastr('Session is expired. Please login again.', 'Error', {
                position: 'top-left'
              });
              this.logout();
          }else{
            this.subBillHistory = data.history;
           this.spinner.hide();
          }
        }
        
      });
  }

  logout(){
    //this.spinner.show();
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
