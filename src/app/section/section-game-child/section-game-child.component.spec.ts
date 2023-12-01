import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGameChildComponent } from './section-game-child.component';

describe('SectionGameChildComponent', () => {
  let component: SectionGameChildComponent;
  let fixture: ComponentFixture<SectionGameChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionGameChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGameChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
