import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionVideoPlayerComponent } from './section-video-player/section-video-player.component';
import { SectionVideoChildContainerComponent } from './section-video-child-container/section-video-child-container.component';
import { SectionMusicChildContainerComponent } from './section-music-child-container/section-music-child-container.component';
import { SectionGameChildContainerComponent } from './section-game-child-container/section-game-child-container.component';
import { SectionComponent } from './section/section.component';


const routes: Routes = [
  {path: 'play', component: SectionVideoPlayerComponent},
  {path: 'video-details', component: SectionVideoChildContainerComponent},
  {path: 'music-details', component: SectionMusicChildContainerComponent},
  {path: 'game-details', component: SectionGameChildContainerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionRoutingModule { }
