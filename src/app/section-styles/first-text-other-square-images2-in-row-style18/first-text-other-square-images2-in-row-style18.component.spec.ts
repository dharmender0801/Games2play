import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTextOtherSquareImages2InRowStyle18Component } from './first-text-other-square-images2-in-row-style18.component';

describe('FirstTextOtherSquareImages2InRowStyle18Component', () => {
  let component: FirstTextOtherSquareImages2InRowStyle18Component;
  let fixture: ComponentFixture<FirstTextOtherSquareImages2InRowStyle18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTextOtherSquareImages2InRowStyle18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTextOtherSquareImages2InRowStyle18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
