import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTextOtherVerticalImages4InRowStyle17Component } from './first-text-other-vertical-images4-in-row-style17.component';

describe('FirstTextOtherVerticalImages4InRowStyle17Component', () => {
  let component: FirstTextOtherVerticalImages4InRowStyle17Component;
  let fixture: ComponentFixture<FirstTextOtherVerticalImages4InRowStyle17Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTextOtherVerticalImages4InRowStyle17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTextOtherVerticalImages4InRowStyle17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
