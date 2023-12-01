import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionPackageWhatYouGetSectionComponent } from './subscription-package-what-you-get-section.component';

describe('SubscriptionPackageWhatYouGetSectionComponent', () => {
  let component: SubscriptionPackageWhatYouGetSectionComponent;
  let fixture: ComponentFixture<SubscriptionPackageWhatYouGetSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionPackageWhatYouGetSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPackageWhatYouGetSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
