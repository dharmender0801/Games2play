
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlModule } from 'ngx-owl-carousel';
import { AppComponent  } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {Global} from './global/global';
import { MenuHeaderComponent } from './modules/shared/menu-header/menu-header.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { PlyrModule } from 'ngx-plyr';


// section components
import { SectionComponent } from './section/section/section.component';
import { VideoHorizontalScrollComponent } from './section-styles/video-horizontal-scroll/video-horizontal-scroll.component';
// tslint:disable-next-line:max-line-length
import { TwoRowGridHorizontalScrollComponent } from './section-styles/two-row-grid-horizontal-scroll/two-row-grid-horizontal-scroll.component';
import { SquareHorizontalScrollComponent } from './section-styles/square-horizontal-scroll/square-horizontal-scroll.component';
import { RectangleHorizontalScrollComponent } from './section-styles/rectangle-horizontal-scroll/rectangle-horizontal-scroll.component';
import { StaticBannerComponent } from './section-styles/static-banner/static-banner.component';
import { NonClickStaticBannerComponent } from './section-styles/non-click-static-banner/non-click-static-banner.component';
import { NonVideoHorizontalScrollComponent } from './section-styles/non-video-horizontal-scroll/non-video-horizontal-scroll.component';
// tslint:disable-next-line:max-line-length
import { FirstSquareOtherVerticalImagesStyle13Component } from './section-styles/first-square-other-vertical-images-style13/first-square-other-vertical-images-style13.component';
// tslint:disable-next-line:max-line-length
import { FirstSquareLastSquareImagesStyle14Component } from './section-styles/first-square-last-square-images-style14/first-square-last-square-images-style14.component';
// tslint:disable-next-line: max-line-length
import { FirstRectangleOtherSquareImagesStyle15Component } from './section-styles/first-rectangle-other-square-images-style15/first-rectangle-other-square-images-style15.component';
// tslint:disable-next-line:max-line-length
import { FirstSquareLastRectangleImagesStyle16Component } from './section-styles/first-square-last-rectangle-images-style16/first-square-last-rectangle-images-style16.component';
// tslint:disable-next-line:max-line-length
import { FirstTextOtherVerticalImages4InRowStyle17Component } from './section-styles/first-text-other-vertical-images4-in-row-style17/first-text-other-vertical-images4-in-row-style17.component';
// tslint:disable-next-line:max-line-length
import { FirstTextOtherSquareImages2InRowStyle18Component } from './section-styles/first-text-other-square-images2-in-row-style18/first-text-other-square-images2-in-row-style18.component';
import { SquareImages3InRowStyle19Component } from './section-styles/square-images3-in-row-style19/square-images3-in-row-style19.component';
// tslint:disable-next-line:max-line-length
import { FirstTextOtherSquareImages2InRowStyle20Component } from './section-styles/first-text-other-square-images2-in-row-style20/first-text-other-square-images2-in-row-style20.component';
import { StarRatingComponent } from './modules/shared/star-rating/star-rating.component';
import { SubMenuSectionComponent } from './sub-menu-section/sub-menu-section.component';
import { RightSectionComponent } from './right-section/right-section.component';

// ends
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SectionViewAllComponent } from './section/section-view-all/section-view-all.component';
import { SharedModule } from './modules/shared/shared.module';
import { CountdownModule } from 'ngx-countdown';
import { OuterLoginComponent } from './outer-login/outer-login.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { PromotionalbannerComponent } from './promotionalbanner/promotionalbanner.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// import { MusicplayviewComponent } from './modules/music/musicplayview/musicplayview.component';
//import { MusicPlayViewComponent } from './modules/music/music-play-view/music-play-view.component';
import { UserIdleModule } from 'angular-user-idle';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { LoginComponent } from './modules/shared/login/login.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ThumbdownComponent } from './thumbdown/thumbdown.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BannerComponent,
    SectionComponent,
    VideoHorizontalScrollComponent,
    TwoRowGridHorizontalScrollComponent,
    SquareHorizontalScrollComponent,
    RectangleHorizontalScrollComponent,
    StaticBannerComponent,
    NonClickStaticBannerComponent,
    NonVideoHorizontalScrollComponent,
    FirstSquareOtherVerticalImagesStyle13Component,
    FirstSquareLastSquareImagesStyle14Component,
    FirstRectangleOtherSquareImagesStyle15Component,
    FirstSquareLastRectangleImagesStyle16Component,
    FirstTextOtherVerticalImages4InRowStyle17Component,
    FirstTextOtherSquareImages2InRowStyle18Component,
    SquareImages3InRowStyle19Component,
    FirstTextOtherSquareImages2InRowStyle20Component,
    SubMenuSectionComponent,
    RightSectionComponent,
    SectionViewAllComponent,
    OuterLoginComponent,
    HowItWorksComponent,
    PromotionalbannerComponent,
    ScrollTopComponent,
    LandingpageComponent,
    ThumbdownComponent,
    PrivacypolicyComponent,
    TermsandconditionComponent
    
    //MusicPlayViewComponent,
   
   
  ],
  imports: [
    AppRoutingModule,
    PlyrModule,
    HttpClientModule,
    // OwlModule,
    NgxSpinnerModule,
    FormsModule,
    CarouselModule ,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule,
    CountdownModule,
    ScrollingModule,
    InfiniteScrollModule, 
    UserIdleModule.forRoot({
      idle: 300, timeout: 10, ping: 10
    }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),

  LazyLoadImageModule.forRoot({
    preset: intersectionObserverPreset
  })
  ],
  providers: [Global],
  bootstrap: [AppComponent],
  entryComponents: [ MenuHeaderComponent ],
  exports: [
    MenuHeaderComponent,
    LoginComponent,
    
  ]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
