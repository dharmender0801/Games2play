import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSquareLastRectangleImagesStyle16Component } from './first-square-last-rectangle-images-style16.component';

describe('FirstSquareLastRectangleImagesStyle16Component', () => {
  let component: FirstSquareLastRectangleImagesStyle16Component;
  let fixture: ComponentFixture<FirstSquareLastRectangleImagesStyle16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSquareLastRectangleImagesStyle16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSquareLastRectangleImagesStyle16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
