import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchDataItem } from 'src/app/model/search/search-data-item';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { StreamingService } from 'src/app/Services/streaming.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginComponent } from '../../shared/login/login.component';
import { GameDetailsComponent } from '../../shared/game-details/game-details.component';
import { GamesSearchDetailsComponent } from '../../shared/games-search-details/games-search-details.component';

@Component({
  selector: 'app-v2-search-result-single',
  templateUrl: './v2-search-result-single.component.html',
  styleUrls: ['./v2-search-result-single.component.css']
})
export class V2SearchResultSingleComponent implements OnInit {
  
  statusCheck:boolean;
  IsLoggedIn: boolean = false;
  sectionData:any;
  deviceInfo=null;
  IsIOSPhone=false;
  lang:string;
  IsAndroidPhone: boolean = true;
  contentId: string;
  gamehreflink:string;
  @Input() RenderingData: SearchDataItem[];
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(GamesSearchDetailsComponent) gameDetail : GamesSearchDetailsComponent;
  @Input() searchCategory: string[];
  @Input() hasSearched: boolean;
  @Input() SelectAll: string;
  SingleCategory: string;
  private _router: Router
  defaultImage = "assets/images/DefaultImages/Loader_282x422.gif";
  
  constructor(private _localStorageService: LocalStorageService,
    private _streamingService: StreamingService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.getDeviceFunction();
    if (localStorage.getItem('lang')=="ar" ){
      this.lang = "ar"
    }
    else{
      this.lang = "en";
    }
  }

  getDeviceFunction() {
    console.log("In here");
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    if (this.deviceInfo.os === 'Android') {
      
      this.IsAndroidPhone = true;
      this.IsIOSPhone = false;
    }
    else if(this.deviceInfo.os === 'iOS')
    {
      this.IsIOSPhone = true;
      this.IsAndroidPhone = false;
    }
    else
    {
      this.IsAndroidPhone = false;
      this.IsIOSPhone = false;
    }
  }

  CheckIfCategoryExists(category): boolean{
    let categoryFound = this.searchCategory.find(x => {
      return x === category;
    });
    return categoryFound ? true : false;
  }

  userLoginCheckImg(section){
    console.log(section);
    if(!this._localStorageService.GetUserId()){
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    }else{
      if(!this.IsAndroidPhone){
        this.contentId = section.contentId;
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
              
              this.gamehreflink=data.link;
              window.open(this.gamehreflink,"_blank");
              this.IsLoggedIn=true;
             this.spinner.hide();
            }
            else if (data.statusDescription.statusCode == 501) {
              this.spinner.hide();
               this.toastr.infoToastr('Game Not Found', 'Info', {
                  position: 'top-left'
                });
            }else if(data.statusDescription.statusCode == 706){
              this.spinner.hide();
              this.toastr.errorToastr('Your validity of pack has been expired. Please recharge your account and try again', 'Error', {
                position: 'top-left'
              });
  
            }
         
          }
       
        });
      }else{
        this.sectionData = section;
        console.log(this.sectionData);
        this.gameDetail.openModal(this.gameDetail.gameSearchDetails,this.sectionData);
      }

    }
  }
}
