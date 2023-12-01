import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoRoutingModule } from './video-routing.module';
import { VideoPlayerContainerComponent } from './video-player-container/video-player-container.component';
import { VideoPlayViewComponent } from './video-play-view/video-play-view.component';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [VideoPlayerContainerComponent, VideoPlayViewComponent],
  imports: [
    CommonModule,
    VideoRoutingModule,
   // UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
  ]
})
export class VideoModule { }
