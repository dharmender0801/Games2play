import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionMainPackageContainerComponent } from './subscription-main-package-container.component';

describe('SubscriptionMainPackageContainerComponent', () => {
  let component: SubscriptionMainPackageContainerComponent;
  let fixture: ComponentFixture<SubscriptionMainPackageContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionMainPackageContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionMainPackageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
