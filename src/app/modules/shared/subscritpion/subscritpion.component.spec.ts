import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscritpionComponent } from './subscritpion.component';

describe('SubscritpionComponent', () => {
  let component: SubscritpionComponent;
  let fixture: ComponentFixture<SubscritpionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscritpionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscritpionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
