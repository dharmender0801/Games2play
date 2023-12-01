import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayViewComponent } from './video-play-view.component';

describe('VideoPlayViewComponent', () => {
  let component: VideoPlayViewComponent;
  let fixture: ComponentFixture<VideoPlayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
