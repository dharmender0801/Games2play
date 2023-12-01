import { SubscriptionSuccessContainerComponent } from './subscription-success-container/subscription-success-container.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscriptionMainComponent } from './subscription-main/subscription-main.component';
// tslint:disable-next-line:max-line-length
import { SubscriptionPackageSelectionPreviewContainerComponent } from './subscription-package-selection-preview-container/subscription-package-selection-preview-container.component';

const routes: Routes = [
  {
    path: 'preview',
    component: SubscriptionPackageSelectionPreviewContainerComponent
  },
  { path: 'success', component: SubscriptionSuccessContainerComponent },
  { path: '', component: SubscriptionMainComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule {}
