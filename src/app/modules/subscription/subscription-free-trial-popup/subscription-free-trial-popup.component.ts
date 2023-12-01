import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SubscriptionPackageSelectionPreviewContainerComponent } from "../subscription-package-selection-preview-container/subscription-package-selection-preview-container.component";
declare var $: any;
@Component({
  selector: "app-subscription-free-trial-popup",
  templateUrl: "./subscription-free-trial-popup.component.html",
  styleUrls: ["./subscription-free-trial-popup.component.css"]
})
export class SubscriptionFreeTrialPopupComponent implements OnInit {
  @Output()
  subscriptionPackageSelectionPreviewContainerComponent = new EventEmitter<
    boolean
  >();

  constructor() {}

  ngOnInit() {}

  FreeTrialOkClicked() {
    this.CloseSubModal();
    this.subscriptionPackageSelectionPreviewContainerComponent.emit(true);
  }

  CloseSubModal() {
    $(".modal-header .close").click();
  }
}
