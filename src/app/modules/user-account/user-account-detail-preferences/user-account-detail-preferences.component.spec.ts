import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDetailPreferencesComponent } from './user-account-detail-preferences.component';

describe('UserAccountDetailPreferencesComponent', () => {
  let component: UserAccountDetailPreferencesComponent;
  let fixture: ComponentFixture<UserAccountDetailPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDetailPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDetailPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
