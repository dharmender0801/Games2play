import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultLayoutHomeComponent } from './search-result-layout-home.component';

describe('SearchResultLayoutHomeComponent', () => {
  let component: SearchResultLayoutHomeComponent;
  let fixture: ComponentFixture<SearchResultLayoutHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultLayoutHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultLayoutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
