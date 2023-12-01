import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedOutEmptyComponent } from './wishlist-logged-out-empty.component';

describe('WishlistLoggedOutEmptyComponent', () => {
  let component: WishlistLoggedOutEmptyComponent;
  let fixture: ComponentFixture<WishlistLoggedOutEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedOutEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedOutEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
