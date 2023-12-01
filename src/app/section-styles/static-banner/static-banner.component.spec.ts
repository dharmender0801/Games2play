import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticBannerComponent } from './static-banner.component';

describe('StaticBannerComponent', () => {
  let component: StaticBannerComponent;
  let fixture: ComponentFixture<StaticBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
