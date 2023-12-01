import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicPlayViewComponent } from './music-play-view.component';

describe('MusicPlayViewComponent', () => {
  let component: MusicPlayViewComponent;
  let fixture: ComponentFixture<MusicPlayViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicPlayViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicPlayViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
