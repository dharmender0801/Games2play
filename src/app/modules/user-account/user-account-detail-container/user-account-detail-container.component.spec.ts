import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountDetailContainerComponent } from './user-account-detail-container.component';

describe('UserAccountDetailContainerComponent', () => {
  let component: UserAccountDetailContainerComponent;
  let fixture: ComponentFixture<UserAccountDetailContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountDetailContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
