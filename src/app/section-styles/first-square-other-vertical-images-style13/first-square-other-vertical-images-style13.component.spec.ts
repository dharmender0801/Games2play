import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSquareOtherVerticalImagesStyle13Component } from './first-square-other-vertical-images-style13.component';

describe('FirstSquareOtherVerticalImagesStyle13Component', () => {
  let component: FirstSquareOtherVerticalImagesStyle13Component;
  let fixture: ComponentFixture<FirstSquareOtherVerticalImagesStyle13Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSquareOtherVerticalImagesStyle13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSquareOtherVerticalImagesStyle13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
