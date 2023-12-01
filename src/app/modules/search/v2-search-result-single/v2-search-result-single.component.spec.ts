import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2SearchResultSingleComponent } from './v2-search-result-single.component';

describe('V2SearchResultSingleComponent', () => {
  let component: V2SearchResultSingleComponent;
  let fixture: ComponentFixture<V2SearchResultSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2SearchResultSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2SearchResultSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
