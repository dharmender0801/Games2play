import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchDetailsComponent } from './games-search-details.component';

describe('GamesSearchDetailsComponent', () => {
  let component: GamesSearchDetailsComponent;
  let fixture: ComponentFixture<GamesSearchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesSearchDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
