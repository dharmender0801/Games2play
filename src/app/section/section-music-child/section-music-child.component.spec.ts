import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMusicChildComponent } from './section-music-child.component';

describe('SectionMusicChildComponent', () => {
  let component: SectionMusicChildComponent;
  let fixture: ComponentFixture<SectionMusicChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionMusicChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMusicChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
