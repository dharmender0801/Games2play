import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2SearchResultAllComponent } from './v2-search-result-all.component';

describe('V2SearchResultAllComponent', () => {
  let component: V2SearchResultAllComponent;
  let fixture: ComponentFixture<V2SearchResultAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2SearchResultAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2SearchResultAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
