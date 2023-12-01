import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuSectionComponent } from './sub-menu-section.component';

describe('SubMenuSectionComponent', () => {
  let component: SubMenuSectionComponent;
  let fixture: ComponentFixture<SubMenuSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubMenuSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
