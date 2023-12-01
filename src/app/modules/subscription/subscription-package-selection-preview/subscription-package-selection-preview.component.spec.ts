import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageSelectionPreviewComponent } from './subscription-package-selection-preview.component';

describe('SubscriptionPackageSelectionPreviewComponent', () => {
  let component: SubscriptionPackageSelectionPreviewComponent;
  let fixture: ComponentFixture<SubscriptionPackageSelectionPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageSelectionPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageSelectionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
