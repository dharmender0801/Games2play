import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVideoChildComponent } from './section-video-child.component';

describe('SectionVideoChildComponent', () => {
  let component: SectionVideoChildComponent;
  let fixture: ComponentFixture<SectionVideoChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVideoChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVideoChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
