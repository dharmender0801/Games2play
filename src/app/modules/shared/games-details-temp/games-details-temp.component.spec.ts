import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesDetailsTempComponent } from './games-details-temp.component';

describe('GamesDetailsTempComponent', () => {
  let component: GamesDetailsTempComponent;
  let fixture: ComponentFixture<GamesDetailsTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesDetailsTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesDetailsTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
