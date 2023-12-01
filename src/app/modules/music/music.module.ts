import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';

import { MusicPlayViewComponent } from './music-play-view/music-play-view.component'; 
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpLoaderFactory } from '../wishlist/wishlist.module';
import { HttpClient } from '@angular/common/http';
import { MenuHeaderComponent } from '../shared/menu-header/menu-header.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ MusicPlayViewComponent],
  imports: [
    CommonModule,
    MusicRoutingModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  SharedModule
  ],
  providers: [
    MenuHeaderComponent
  ]
})
export class MusicModule { }
