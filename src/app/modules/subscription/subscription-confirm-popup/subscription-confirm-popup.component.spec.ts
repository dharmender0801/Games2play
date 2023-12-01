import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionConfirmPopupComponent } from './subscription-confirm-popup.component';

describe('SubscriptionConfirmPopupComponent', () => {
  let component: SubscriptionConfirmPopupComponent;
  let fixture: ComponentFixture<SubscriptionConfirmPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionConfirmPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionConfirmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
