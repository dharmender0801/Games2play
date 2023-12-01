import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SearchDataItem } from 'src/app/model/search/search-data-item';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { LoginComponent } from '../../shared/login/login.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { StreamingService } from 'src/app/Services/streaming.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GameDetailsComponent } from '../../shared/game-details/game-details.component';

@Component({
  selector: 'app-v2-search-result-all',
  templateUrl: './v2-search-result-all.component.html',
  styleUrls: ['./v2-search-result-all.component.css']
})
export class V2SearchResultAllComponent implements OnInit {
  
  statusCheck:boolean;
  IsLoggedIn: boolean = false;
  sectionData:any;
  deviceInfo=null;
  IsIOSPhone=false;
  IsAndroidPhone: boolean = true;
  contentId: string;
  gamehreflink:string;
  @Input() RenderingData: SearchDataItem[]; 
  @Input() searchCategory: string;
  @Input() hasSearched: boolean;
  @Input() SelectAll: string;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(GameDetailsComponent) gameDetail : GameDetailsComponent;
  defaultImage = "assets/images/DefaultImages/Loader_282x422.gif";
  
  constructor(private _localStorageService: LocalStorageService,
    private _streamingService: StreamingService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    //this.RenderingData = [];
  }

  userLoginCheckImg(section){
    console.log("in Double");
    if(!this._localStorageService.GetUserId()){
      this.menuHeader.openModal(this.menuHeader.loginTemplate);
      this.statusCheck = false;
    }else{

  console.log(this.IsAndroidPhone);

      if(!this.IsAndroidPhone){
        this.contentId = section.id;
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
        this.gameDetail.openModal(this.gameDetail.gameDetails,this.sectionData);
      }

    }
  }

}
