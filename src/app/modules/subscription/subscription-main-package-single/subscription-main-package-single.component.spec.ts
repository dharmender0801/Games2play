import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMainPackageSingleComponent } from './subscription-main-package-single.component';

describe('SubscriptionMainPackageSingleComponent', () => {
  let component: SubscriptionMainPackageSingleComponent;
  let fixture: ComponentFixture<SubscriptionMainPackageSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionMainPackageSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMainPackageSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
