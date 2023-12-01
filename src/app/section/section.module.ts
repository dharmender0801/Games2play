import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionRoutingModule } from './section-routing.module';
import { SectionVideoPlayerComponent } from './section-video-player/section-video-player.component';
import { SectionComponent } from './section/section.component';
import { SectionVideoChildComponent } from './section-video-child/section-video-child.component';
import { SectionVideoChildContainerComponent } from './section-video-child-container/section-video-child-container.component';
import { SectionMusicChildComponent } from './section-music-child/section-music-child.component';
import { SectionMusicChildContainerComponent } from './section-music-child-container/section-music-child-container.component';
import { SharedModule } from '../modules/shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SectionGameChildContainerComponent } from './section-game-child-container/section-game-child-container.component';
import { SectionGameChildComponent } from './section-game-child/section-game-child.component';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    SectionVideoPlayerComponent,
    SectionVideoChildComponent, 
    SectionVideoChildContainerComponent,
    SectionMusicChildComponent, 
    SectionMusicChildContainerComponent, SectionGameChildContainerComponent, SectionGameChildComponent ],
  imports: [
    CommonModule,
    SectionRoutingModule,
    SharedModule,
    HttpClientModule,
   // UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
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
})
export class SectionModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}