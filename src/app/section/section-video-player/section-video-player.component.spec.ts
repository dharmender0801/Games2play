import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionVideoPlayerComponent } from './section-video-player.component';

describe('SectionVideoPlayerComponent', () => {
  let component: SectionVideoPlayerComponent;
  let fixture: ComponentFixture<SectionVideoPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionVideoPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionVideoPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
