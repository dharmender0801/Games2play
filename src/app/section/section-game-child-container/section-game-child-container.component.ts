import { Component, OnInit,ViewChild } from '@angular/core';
import { MenuHeaderComponent } from '../../modules/shared/menu-header/menu-header.component';
import { SectionVideoChildComponent } from '../section-video-child/section-video-child.component';
import { SectionGameChildComponent } from '../section-game-child/section-game-child.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginComponent } from '../../modules/shared/login/login.component';
@Component({
  selector: 'app-section-game-child-container',
  templateUrl: './section-game-child-container.component.html',
  styleUrls: ['./section-game-child-container.component.css']
})
export class SectionGameChildContainerComponent implements OnInit {
 // @ViewChild(MenuHeaderComponent) menuHeader: MenuHeaderComponent;
 @ViewChild(LoginComponent) menuHeader: LoginComponent;
  @ViewChild(SectionGameChildComponent) sectionGameChildComponent: SectionGameChildComponent;
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  GamePlayMovieClicked() {
    this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false, false, false,true);
  }

  GameWishlistClicked(data: boolean) {
    this.menuHeader.openModal(this.menuHeader.loginTemplate, false, false, false, false,false,false,true);
    this.spinner.hide();
  }

  gameChildPlayGameClicked(data: boolean) {
    // check the user is subscribed or not for video
    if(data){
      this.sectionGameChildComponent.GetgameUserAccountSubList();
      window.location.reload();
    }
  }
  gameChildPlayWishlistClicked(data: boolean) {
    // check the user is subscribed or not for video
    if(data){
      this.sectionGameChildComponent.CheckGameWishlistbtnname();
      window.location.reload();
    }
  }
}
