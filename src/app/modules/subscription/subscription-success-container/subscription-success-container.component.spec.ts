import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSuccessContainerComponent } from './subscription-success-container.component';

describe('SubscriptionSuccessContainerComponent', () => {
  let component: SubscriptionSuccessContainerComponent;
  let fixture: ComponentFixture<SubscriptionSuccessContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionSuccessContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionSuccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
