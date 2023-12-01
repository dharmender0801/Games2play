import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageSelectionPreviewBannerComponent } from './subscription-package-selection-preview-banner.component';

describe('SubscriptionPackageSelectionPreviewBannerComponent', () => {
  let component: SubscriptionPackageSelectionPreviewBannerComponent;
  let fixture: ComponentFixture<SubscriptionPackageSelectionPreviewBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageSelectionPreviewBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageSelectionPreviewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
