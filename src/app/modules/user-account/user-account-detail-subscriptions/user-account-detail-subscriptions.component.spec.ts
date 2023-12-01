import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDetailSubscriptionsComponent } from './user-account-detail-subscriptions.component';

describe('UserAccountDetailSubscriptionsComponent', () => {
  let component: UserAccountDetailSubscriptionsComponent;
  let fixture: ComponentFixture<UserAccountDetailSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDetailSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDetailSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
