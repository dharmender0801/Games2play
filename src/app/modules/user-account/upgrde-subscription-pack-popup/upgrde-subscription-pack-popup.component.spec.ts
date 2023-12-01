import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgrdeSubscriptionPackPopupComponent } from './upgrde-subscription-pack-popup.component';

describe('UpgrdeSubscriptionPackPopupComponent', () => {
  let component: UpgrdeSubscriptionPackPopupComponent;
  let fixture: ComponentFixture<UpgrdeSubscriptionPackPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgrdeSubscriptionPackPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgrdeSubscriptionPackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
