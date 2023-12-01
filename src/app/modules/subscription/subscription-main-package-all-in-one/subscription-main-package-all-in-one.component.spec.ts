import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMainPackageAllInOneComponent } from './subscription-main-package-all-in-one.component';

describe('SubscriptionMainPackageAllInOneComponent', () => {
  let component: SubscriptionMainPackageAllInOneComponent;
  let fixture: ComponentFixture<SubscriptionMainPackageAllInOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionMainPackageAllInOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMainPackageAllInOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
