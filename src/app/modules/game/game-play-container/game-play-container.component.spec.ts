import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayContainerComponent } from './game-play-container.component';

describe('GamePlayContainerComponent', () => {
  let component: GamePlayContainerComponent;
  let fixture: ComponentFixture<GamePlayContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
