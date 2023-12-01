import { SharedModule } from './modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionComponent } from './section/section/section.component';
import { SubMenuSectionComponent } from './sub-menu-section/sub-menu-section.component';
import { LoginAuthGuard } from './guard/login-auth.guard';
import { OuterLoginComponent } from './outer-login/outer-login.component';
import { FakeLoginGuard } from './guard/fake-login.guard';
import { FakeLoginUserLoggedinGuard } from './guard/fake-login-user-loggedin.guard';
import { MusicPlayViewComponent } from './modules/music/music-play-view/music-play-view.component';
import { LoginComponent } from 'src/app/modules/shared/login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ThumbdownComponent } from './thumbdown/thumbdown.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';

const routes: Routes = [
  {
        path: 'Login',
        redirectTo: "",
      },
  {
    path: 'Search',
    loadChildren: './modules/search/search.module#SearchModule'
  },
  {
    path: 'Game',
    loadChildren:
      './modules/game/game.module#GameModule',
      canActivate: [LoginAuthGuard]
  },
  {
    path: 'Music',
    loadChildren:
    './modules/music/music.module#MusicModule',
 //   component:MusicPlayViewComponent,
      canActivate: [LoginAuthGuard]
  },
  {
    path: 'Video',
    loadChildren:
      './modules/video/video.module#VideoModule',
      canActivate: [LoginAuthGuard]
  },
  { path: 'Login', component: OuterLoginComponent , canActivate: [FakeLoginUserLoggedinGuard]},
  { path: '', component: SubMenuSectionComponent },
  {
    path: 'Wishlist',
    loadChildren:
      './modules/wishlist/wishlist.module#WishlistModule',
      canActivate: [LoginAuthGuard]
  },
  {path:'banner',component:ThumbdownComponent},
  {
    path: 'Pricing',
    loadChildren:
      './modules/subscription/subscription.module#SubscriptionModule',
       // canActivate: [LoginAuthGuard]
  },
  {
    path: 'Account',
    loadChildren:
      './modules/user-account/user-account.module#UserAccountModule',
      canActivate: [LoginAuthGuard]
  },
  {
    path: 'section',
    loadChildren: './section/section.module#SectionModule'
  },
  { path: 'login', component: LoginComponent},
  { path: 'lp/:Usertrnsctionid/:Usermbid/:requestID/:user-id/:userjwttokenkey/:productId/:loginStatus', 
    component: LandingpageComponent},
    { path: 'termsandcondition', component: TermsandconditionComponent},
    { path: 'privacypolicy', component: PrivacypolicyComponent},
  //{ path: '', component: SectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), SharedModule],
  exports: [RouterModule,SharedModule]
})
export class AppRoutingModule {}
