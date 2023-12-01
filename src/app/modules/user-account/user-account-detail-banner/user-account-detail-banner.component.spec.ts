import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDetailBannerComponent } from './user-account-detail-banner.component';

describe('UserAccountDetailBannerComponent', () => {
  let component: UserAccountDetailBannerComponent;
  let fixture: ComponentFixture<UserAccountDetailBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDetailBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDetailBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
