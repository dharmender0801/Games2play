import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionViewAllComponent } from './section-view-all.component';

describe('SectionViewAllComponent', () => {
  let component: SectionViewAllComponent;
  let fixture: ComponentFixture<SectionViewAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionViewAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
