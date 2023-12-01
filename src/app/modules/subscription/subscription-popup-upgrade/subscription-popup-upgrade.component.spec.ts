import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPopupUpgradeComponent } from './subscription-popup-upgrade.component';

describe('SubscriptionPopupUpgradeComponent', () => {
  let component: SubscriptionPopupUpgradeComponent;
  let fixture: ComponentFixture<SubscriptionPopupUpgradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPopupUpgradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPopupUpgradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
