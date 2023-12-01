import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserAccountDetailContainerComponent } from './user-account-detail-container/user-account-detail-container.component';
import { UserAccountDetailSubscriptionsComponent } from './user-account-detail-subscriptions/user-account-detail-subscriptions.component';
import { UserAccountDetailPreferencesComponent } from './user-account-detail-preferences/user-account-detail-preferences.component';
// tslint:disable-next-line:max-line-length
import { UserAccountDetailBillingHistoryComponent } from './user-account-detail-billing-history/user-account-detail-billing-history.component';
import { UserAccountDetailBannerComponent } from './user-account-detail-banner/user-account-detail-banner.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { UpgrdeSubscriptionPackPopupComponent } from './upgrde-subscription-pack-popup/upgrde-subscription-pack-popup.component';
import { CountdownModule } from 'ngx-countdown';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
@NgModule({
  declarations: [
    UserAccountDetailContainerComponent,
    UserAccountDetailSubscriptionsComponent,
    UserAccountDetailPreferencesComponent,
    UserAccountDetailBillingHistoryComponent,
    UserAccountDetailBannerComponent,
    UpgrdeSubscriptionPackPopupComponent
  ],
  imports: [CommonModule, UserAccountRoutingModule, SharedModule, FormsModule, CountdownModule,
    HttpClientModule,
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
]
})
export class UserAccountModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}