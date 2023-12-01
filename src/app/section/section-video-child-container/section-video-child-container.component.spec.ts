import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVideoChildContainerComponent } from './section-video-child-container.component';

describe('SectionVideoChildContainerComponent', () => {
  let component: SectionVideoChildContainerComponent;
  let fixture: ComponentFixture<SectionVideoChildContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVideoChildContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVideoChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
