import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './../shared/footer/footer.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistLoggedInEmptyComponent } from './wishlist-logged-in-empty/wishlist-logged-in-empty.component';
import { WishlistLoggedInFilledComponent } from './wishlist-logged-in-filled/wishlist-logged-in-filled.component';
import { WishlistLoggedOutEmptyComponent } from './wishlist-logged-out-empty/wishlist-logged-out-empty.component';
import { WishlistLoggedOutFilledGamesComponent } from './wishlist-logged-out-filled-games/wishlist-logged-out-filled-games.component';
import { WishlistLoggedOutFilledMusicsComponent } from './wishlist-logged-out-filled-musics/wishlist-logged-out-filled-musics.component';
import { WishlistLoggedOutFilledVideosComponent } from './wishlist-logged-out-filled-videos/wishlist-logged-out-filled-videos.component';
import { MenuHeaderComponent } from './../shared/menu-header/menu-header.component';
import { FormsModule } from '@angular/forms';
import { WishlistMainComponent } from './wishlist-main/wishlist-main.component';
import { WishlistBannerComponent } from './wishlist-banner/wishlist-banner.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    WishlistLoggedInEmptyComponent, 
    WishlistLoggedInFilledComponent, 
    WishlistLoggedOutEmptyComponent, 
    WishlistLoggedOutFilledGamesComponent,
    WishlistLoggedOutFilledMusicsComponent, 
    
    WishlistLoggedOutFilledVideosComponent, WishlistMainComponent, WishlistBannerComponent],
    
  imports: [
    CommonModule,
    WishlistRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    //UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
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
  providers: [
    MenuHeaderComponent
  ]
})
export class WishlistModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}