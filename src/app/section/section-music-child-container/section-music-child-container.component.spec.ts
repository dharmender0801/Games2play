import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMusicChildContainerComponent } from './section-music-child-container.component';

describe('SectionMusicChildContainerComponent', () => {
  let component: SectionMusicChildContainerComponent;
  let fixture: ComponentFixture<SectionMusicChildContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionMusicChildContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionMusicChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
