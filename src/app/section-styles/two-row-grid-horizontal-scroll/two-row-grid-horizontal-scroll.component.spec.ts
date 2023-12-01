import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoRowGridHorizontalScrollComponent } from './two-row-grid-horizontal-scroll.component';

describe('TwoRowGridHorizontalScrollComponent', () => {
  let component: TwoRowGridHorizontalScrollComponent;
  let fixture: ComponentFixture<TwoRowGridHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoRowGridHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoRowGridHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
