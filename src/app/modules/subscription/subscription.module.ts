import { SharedModule } from './../shared/shared.module';
import { FooterComponent } from './../shared/footer/footer.component';
import { MenuHeaderComponent } from './../shared/menu-header/menu-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionMainComponent } from './subscription-main/subscription-main.component';
import { SubscriptionBannerComponent } from './subscription-banner/subscription-banner.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionMainPackageContainerComponent } from './subscription-main-package-container/subscription-main-package-container.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionMainPackageAllInOneComponent } from './subscription-main-package-all-in-one/subscription-main-package-all-in-one.component';
import { SubscriptionMainPackageSingleComponent } from './subscription-main-package-single/subscription-main-package-single.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionPackageSelectionPreviewComponent } from './subscription-package-selection-preview/subscription-package-selection-preview.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionPackageSelectionPreviewBannerComponent } from './subscription-package-selection-preview-banner/subscription-package-selection-preview-banner.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionPackageSelectionPreviewContainerComponent } from './subscription-package-selection-preview-container/subscription-package-selection-preview-container.component';
import { SubscriptionPopupComponent } from './subscription-popup/subscription-popup.component';
import { SubscriptionSuccessComponent } from './subscription-success/subscription-success.component';
import { SubscriptionSuccessContainerComponent } from './subscription-success-container/subscription-success-container.component';
import { FormsModule } from '@angular/forms';
import { SubscriptionpackageSelectionPreviewPricingPromotionalSectionComponent } from './subscriptionpackage-selection-preview-pricing-promotional-section/subscriptionpackage-selection-preview-pricing-promotional-section.component';
import { SubscriptionPackageWhatYouGetSectionComponent } from './subscription-package-what-you-get-section/subscription-package-what-you-get-section.component';
import { SubscriptionFreeTrialPopupComponent } from './subscription-free-trial-popup/subscription-free-trial-popup.component';
import { SubscriptionConfirmPopupComponent } from './subscription-confirm-popup/subscription-confirm-popup.component';
import { SubscriptionPopupUpgradeComponent } from './subscription-popup-upgrade/subscription-popup-upgrade.component';
import { CountdownModule } from 'ngx-countdown';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    SubscriptionMainComponent,
    SubscriptionBannerComponent,
    SubscriptionMainPackageContainerComponent,
    SubscriptionMainPackageAllInOneComponent,
    SubscriptionMainPackageSingleComponent,
    SubscriptionPackageSelectionPreviewComponent,
    SubscriptionPackageSelectionPreviewBannerComponent,
    SubscriptionPackageSelectionPreviewContainerComponent,
    SubscriptionPopupComponent,
    SubscriptionSuccessComponent,
    SubscriptionSuccessContainerComponent,
    SubscriptionpackageSelectionPreviewPricingPromotionalSectionComponent,
    SubscriptionPackageWhatYouGetSectionComponent,
    SubscriptionFreeTrialPopupComponent,
    SubscriptionConfirmPopupComponent,
    SubscriptionPopupUpgradeComponent
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    SharedModule,
    FormsModule,
    CountdownModule,
    HttpClientModule,
    //UserIdleModule.forRoot({idle: 1800, timeout: 10, ping: 10}),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    MenuHeaderComponent
  ]
})
export class SubscriptionModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}