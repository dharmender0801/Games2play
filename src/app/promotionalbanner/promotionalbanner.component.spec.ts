import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalbannerComponent } from './promotionalbanner.component';

describe('PromotionalbannerComponent', () => {
  let component: PromotionalbannerComponent;
  let fixture: ComponentFixture<PromotionalbannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromotionalbannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionalbannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
