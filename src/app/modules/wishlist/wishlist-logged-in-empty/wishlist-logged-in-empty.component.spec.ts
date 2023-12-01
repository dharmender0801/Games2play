import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistLoggedInEmptyComponent } from './wishlist-logged-in-empty.component';

describe('WishlistLoggedInEmptyComponent', () => {
  let component: WishlistLoggedInEmptyComponent;
  let fixture: ComponentFixture<WishlistLoggedInEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistLoggedInEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistLoggedInEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
