import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultLayoutOtherComponent } from './search-result-layout-other.component';

describe('SearchResultLayoutOtherComponent', () => {
  let component: SearchResultLayoutOtherComponent;
  let fixture: ComponentFixture<SearchResultLayoutOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultLayoutOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultLayoutOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
