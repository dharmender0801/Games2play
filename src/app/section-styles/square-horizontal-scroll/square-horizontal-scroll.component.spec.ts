import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareHorizontalScrollComponent } from './square-horizontal-scroll.component';

describe('SquareHorizontalScrollComponent', () => {
  let component: SquareHorizontalScrollComponent;
  let fixture: ComponentFixture<SquareHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
