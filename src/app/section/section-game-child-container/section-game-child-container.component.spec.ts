import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionGameChildContainerComponent } from './section-game-child-container.component';

describe('SectionGameChildContainerComponent', () => {
  let component: SectionGameChildContainerComponent;
  let fixture: ComponentFixture<SectionGameChildContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionGameChildContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionGameChildContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
