import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WishlistMainComponent} from './wishlist-main/wishlist-main.component';
import { WishlistLoggedInEmptyComponent} from './wishlist-logged-in-empty/wishlist-logged-in-empty.component'
import { WishlistLoggedInFilledComponent } from './wishlist-logged-in-filled/wishlist-logged-in-filled.component';
import { WishlistLoggedOutEmptyComponent } from './wishlist-logged-out-empty/wishlist-logged-out-empty.component';
import { WishlistLoggedOutFilledGamesComponent } from './wishlist-logged-out-filled-games/wishlist-logged-out-filled-games.component';
import { WishlistLoggedOutFilledMusicsComponent } from './wishlist-logged-out-filled-musics/wishlist-logged-out-filled-musics.component';
import { WishlistLoggedOutFilledVideosComponent } from './wishlist-logged-out-filled-videos/wishlist-logged-out-filled-videos.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'wishlist-logged-in-empty',
    component: WishlistLoggedInEmptyComponent
  },
  {
    path: 'wishlist-logged-in-filled',
    component: WishlistLoggedInFilledComponent
  },
  {
    path: 'wishlist-logged-out-empty',
    component: WishlistLoggedOutEmptyComponent
  },
  {
    path: 'wishlist-logged-out-filled-games',
    component: WishlistLoggedOutFilledGamesComponent
  },
  {
    path: 'wishlist-logged-out-filled-musics',
    component: WishlistLoggedOutFilledMusicsComponent
  },
  {
    path: 'wishlist-logged-out-filled-videos',
    component: WishlistLoggedOutFilledVideosComponent
  },
  { path: '', component: WishlistMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistRoutingModule { }
