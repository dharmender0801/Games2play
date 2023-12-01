import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareImages3InRowStyle19Component } from './square-images3-in-row-style19.component';

describe('SquareImages3InRowStyle19Component', () => {
  let component: SquareImages3InRowStyle19Component;
  let fixture: ComponentFixture<SquareImages3InRowStyle19Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareImages3InRowStyle19Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareImages3InRowStyle19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
