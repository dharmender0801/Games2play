import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTextOtherSquareImages2InRowStyle20Component } from './first-text-other-square-images2-in-row-style20.component';

describe('FirstTextOtherSquareImages2InRowStyle20Component', () => {
  let component: FirstTextOtherSquareImages2InRowStyle20Component;
  let fixture: ComponentFixture<FirstTextOtherSquareImages2InRowStyle20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTextOtherSquareImages2InRowStyle20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTextOtherSquareImages2InRowStyle20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
