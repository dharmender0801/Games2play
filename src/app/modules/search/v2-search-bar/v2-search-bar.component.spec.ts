import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { V2SearchBarComponent } from './v2-search-bar.component';

describe('V2SearchBarComponent', () => {
  let component: V2SearchBarComponent;
  let fixture: ComponentFixture<V2SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ V2SearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(V2SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
