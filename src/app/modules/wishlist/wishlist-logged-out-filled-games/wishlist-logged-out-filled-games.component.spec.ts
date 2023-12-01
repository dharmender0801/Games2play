import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedOutFilledGamesComponent } from './wishlist-logged-out-filled-games.component';

describe('WishlistLoggedOutFilledGamesComponent', () => {
  let component: WishlistLoggedOutFilledGamesComponent;
  let fixture: ComponentFixture<WishlistLoggedOutFilledGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedOutFilledGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedOutFilledGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
