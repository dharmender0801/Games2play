import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonVideoHorizontalScrollComponent } from './non-video-horizontal-scroll.component';

describe('NonVideoHorizontalScrollComponent', () => {
  let component: NonVideoHorizontalScrollComponent;
  let fixture: ComponentFixture<NonVideoHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonVideoHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonVideoHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
