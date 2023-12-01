import { GameContainerComponent } from './game-container/game-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayContainerComponent } from './game-play-container/game-play-container.component';

const routes: Routes = [
  {path: ':id', component: GamePlayContainerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
