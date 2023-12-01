import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedInFilledComponent } from './wishlist-logged-in-filled.component';

describe('WishlistLoggedInFilledComponent', () => {
  let component: WishlistLoggedInFilledComponent;
  let fixture: ComponentFixture<WishlistLoggedInFilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedInFilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedInFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
