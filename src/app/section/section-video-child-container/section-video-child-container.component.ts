import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { SectionVideoChildComponent } from '../section-video-child/section-video-child.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../../modules/shared/login/login.component';
@Component({
  selector: 'app-section-video-child-container',
  templateUrl: './section-video-child-container.component.html',
  styleUrls: ['./section-video-child-container.component.css']
})
export class SectionVideoChildContainerComponent implements OnInit {
  //@ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
  @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(SectionVideoChildComponent) sectionVideoChildComponent: SectionVideoChildComponent;

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  videoPlayMovieClicked(data: boolean) {
    this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false, false, true,false);
  }

  videoChildPlayMovie(data: boolean) {
    // check the user is subscribed or not for video
    if(data){
      this.sectionVideoChildComponent.GetUserAccountSubList();
    }
    window.location.reload();
  }

   // check the Add or Remove Wishlist Button
  AddwishlistContent(data: boolean) {
    if(data){
      this.sectionVideoChildComponent.CheckWishlistbtnname();
    }
    this.spinner.hide();
    window.location.reload();
  }
  //#region  Addwishlist
  AddwishlistClicked(value: boolean) {
    if (value) {
      this.menuHeader.openModal(this.menuHeader.loginTemplate, false, true,false,false,false);
      this.spinner.hide();
    }
  }
  //#endregion
}
