import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2SearchContainerComponent } from './v2-search-container.component';

describe('V2SearchContainerComponent', () => {
  let component: V2SearchContainerComponent;
  let fixture: ComponentFixture<V2SearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2SearchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2SearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
