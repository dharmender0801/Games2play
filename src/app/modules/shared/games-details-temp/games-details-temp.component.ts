import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { StreamingService } from 'src/app/Services/streaming.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-games-details-temp',
  templateUrl: './games-details-temp.component.html',
  styleUrls: ['./games-details-temp.component.css']
})
export class GamesDetailsTempComponent implements OnInit {

  defaultImage="assets/images/DefaultImages/Loader_180X270.gif";
  modalRef: BsModalRef | null;
  statusCheck:boolean;
  img:string;
  genreName:string;
  genre:string;
  contentType:number;
  contentId:number;
  IsLoggedIn: boolean = false;
  sectionData:any;
  deviceInfo=null;
  IsIOSPhone=false;
  IsAndroidPhone: boolean = true;
  gamehreflink:string;
  @ViewChild('template') gameDetails: TemplateRef<any>;
  
  constructor(private modalService: BsModalService,
    private _localStorageService: LocalStorageService,
    private _streamingService: StreamingService,
    private spinner: NgxSpinnerService,
    public toastr: ToastrManager,
    private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    this.getDeviceFunction();
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

  openBannerModal(template: TemplateRef<any>,contentId,img,genreName,genre,contentType) {
    this.contentId = contentId;
    this.img = img;
    this.genreName = genreName;
    this.genre = genre;
    this.contentType = contentType;
    this.modalRef = this.modalService.show(template, { backdrop: 'static', keyboard: false });
  }

  closeModal() {
    if (!this.modalRef) {
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
  }

  userLoginCheck(){
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
            this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
              position: 'top-left'
            });
          }else if(data.statusDescription.statusCode == 714){
            this.spinner.hide();
            this.toastr.errorToastr(data.statusDescription.statusMessage, 'Error', {
              position: 'top-left'
            });
          }
       
        }
     
      });
  }

}
