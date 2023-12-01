import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleHorizontalScrollComponent } from './rectangle-horizontal-scroll.component';

describe('RectangleHorizontalScrollComponent', () => {
  let component: RectangleHorizontalScrollComponent;
  let fixture: ComponentFixture<RectangleHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectangleHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectangleHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
