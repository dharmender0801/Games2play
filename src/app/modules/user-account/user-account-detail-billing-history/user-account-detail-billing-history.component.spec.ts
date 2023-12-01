import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDetailBillingHistoryComponent } from './user-account-detail-billing-history.component';

describe('UserAccountDetailBillingHistoryComponent', () => {
  let component: UserAccountDetailBillingHistoryComponent;
  let fixture: ComponentFixture<UserAccountDetailBillingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDetailBillingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDetailBillingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
