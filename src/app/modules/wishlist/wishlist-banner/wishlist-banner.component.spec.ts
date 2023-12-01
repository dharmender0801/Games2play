import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBannerComponent } from './wishlist-banner.component';

describe('WishlistBannerComponent', () => {
  let component: WishlistBannerComponent;
  let fixture: ComponentFixture<WishlistBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishlistBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
