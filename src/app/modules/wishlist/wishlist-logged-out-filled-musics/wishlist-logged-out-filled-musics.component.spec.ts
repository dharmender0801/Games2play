import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedOutFilledMusicsComponent } from './wishlist-logged-out-filled-musics.component';

describe('WishlistLoggedOutFilledMusicsComponent', () => {
  let component: WishlistLoggedOutFilledMusicsComponent;
  let fixture: ComponentFixture<WishlistLoggedOutFilledMusicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedOutFilledMusicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedOutFilledMusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
