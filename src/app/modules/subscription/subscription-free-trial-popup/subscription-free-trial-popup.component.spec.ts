import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionFreeTrialPopupComponent } from './subscription-free-trial-popup.component';

describe('SubscriptionFreeTrialPopupComponent', () => {
  let component: SubscriptionFreeTrialPopupComponent;
  let fixture: ComponentFixture<SubscriptionFreeTrialPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionFreeTrialPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionFreeTrialPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
