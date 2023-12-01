
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicPlayViewComponent } from './music-play-view/music-play-view.component';

const routes: Routes = [
  {path: ':id',component: MusicPlayViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule { }
