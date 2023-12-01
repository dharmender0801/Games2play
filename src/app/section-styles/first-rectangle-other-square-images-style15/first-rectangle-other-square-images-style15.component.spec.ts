import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRectangleOtherSquareImagesStyle15Component } from './first-rectangle-other-square-images-style15.component';

describe('FirstRectangleOtherSquareImagesStyle15Component', () => {
  let component: FirstRectangleOtherSquareImagesStyle15Component;
  let fixture: ComponentFixture<FirstRectangleOtherSquareImagesStyle15Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstRectangleOtherSquareImagesStyle15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstRectangleOtherSquareImagesStyle15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
