import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterLoginComponent } from './outer-login.component';

describe('OuterLoginComponent', () => {
  let component: OuterLoginComponent;
  let fixture: ComponentFixture<OuterLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuterLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
