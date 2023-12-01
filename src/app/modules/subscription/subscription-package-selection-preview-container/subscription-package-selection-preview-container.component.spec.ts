import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageSelectionPreviewContainerComponent } from './subscription-package-selection-preview-container.component';

describe('SubscriptionPackageSelectionPreviewContainerComponent', () => {
  let component: SubscriptionPackageSelectionPreviewContainerComponent;
  let fixture: ComponentFixture<SubscriptionPackageSelectionPreviewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageSelectionPreviewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageSelectionPreviewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
