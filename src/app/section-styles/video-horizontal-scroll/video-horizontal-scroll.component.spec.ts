import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoHorizontalScrollComponent } from './video-horizontal-scroll.component';

describe('VideoHorizontalScrollComponent', () => {
  let component: VideoHorizontalScrollComponent;
  let fixture: ComponentFixture<VideoHorizontalScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoHorizontalScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoHorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
