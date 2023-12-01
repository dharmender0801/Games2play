import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSquareLastSquareImagesStyle14Component } from './first-square-last-square-images-style14.component';

describe('FirstSquareLastSquareImagesStyle14Component', () => {
  let component: FirstSquareLastSquareImagesStyle14Component;
  let fixture: ComponentFixture<FirstSquareLastSquareImagesStyle14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstSquareLastSquareImagesStyle14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSquareLastSquareImagesStyle14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
