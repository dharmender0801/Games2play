import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameContainerComponent } from './game-container/game-container.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GamePlayContainerComponent } from './game-play-container/game-play-container.component';
import { UserIdleModule } from 'angular-user-idle';
@NgModule({
  declarations: [GameContainerComponent,GamePlayContainerComponent, GamePlayComponent],
  imports: [
    CommonModule,
    GameRoutingModule,
   // UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
  ]
})
export class GameModule { }
