import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbdownComponent } from './thumbdown.component';

describe('ThumbdownComponent', () => {
  let component: ThumbdownComponent;
  let fixture: ComponentFixture<ThumbdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
