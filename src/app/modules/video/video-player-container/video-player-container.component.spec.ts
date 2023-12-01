import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPlayerContainerComponent } from './video-player-container.component';

describe('VideoPlayerContainerComponent', () => {
  let component: VideoPlayerContainerComponent;
  let fixture: ComponentFixture<VideoPlayerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoPlayerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoPlayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
