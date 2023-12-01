import { RouterModule } from '@angular/router';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { MenuHeaderComponent } from './menu-header/menu-header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CountdownModule } from 'ngx-countdown';
import { SplitAndGetPipe } from './pipes/split/split-and-get.pipe';
import { LoaderComponent } from './loader/loader.component';
import { UserIdleModule } from 'angular-user-idle';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './login/login.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GamesSearchDetailsComponent } from './games-search-details/games-search-details.component';
import { GamesDetailsTempComponent } from './games-details-temp/games-details-temp.component';
import { SubscritpionComponent } from './subscritpion/subscritpion.component';
import { BannersComponent } from './banners/banners.component';

@NgModule({
  declarations: [
    FooterComponent,
    MenuHeaderComponent,
    StarRatingComponent,
    SplitAndGetPipe,
    LoaderComponent,
    LoginComponent,
    GameDetailsComponent,
    GamesSearchDetailsComponent,
    GamesDetailsTempComponent,
    SubscritpionComponent,
    BannersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    CountdownModule,
    RouterModule,
    UserIdleModule.forRoot({idle: 60, timeout: 10, ping: 10}),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  DeviceDetectorModule.forRoot(),
  LazyLoadImageModule.forRoot({
    preset: intersectionObserverPreset
  })
  ],
  entryComponents:[
    LoginComponent
  ],
  exports:[
    FooterComponent,
    MenuHeaderComponent,
    StarRatingComponent,
    SplitAndGetPipe,
    LoaderComponent,
    LoginComponent,
    GameDetailsComponent,
    GamesSearchDetailsComponent,
    GamesDetailsTempComponent,
    BannersComponent
  ]
})
export class SharedModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}