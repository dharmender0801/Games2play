import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClickStaticBannerComponent } from './non-click-static-banner.component';

describe('NonClickStaticBannerComponent', () => {
  let component: NonClickStaticBannerComponent;
  let fixture: ComponentFixture<NonClickStaticBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonClickStaticBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonClickStaticBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
