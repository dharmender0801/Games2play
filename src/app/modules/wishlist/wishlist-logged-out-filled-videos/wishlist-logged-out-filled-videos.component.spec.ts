import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedOutFilledVideosComponent } from './wishlist-logged-out-filled-videos.component';

describe('WishlistLoggedOutFilledVideosComponent', () => {
  let component: WishlistLoggedOutFilledVideosComponent;
  let fixture: ComponentFixture<WishlistLoggedOutFilledVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedOutFilledVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedOutFilledVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
