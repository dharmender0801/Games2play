import { TestBed, async, inject } from '@angular/core/testing';

import { FakeLoginGuard } from './fake-login.guard';

describe('FakeLoginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeLoginGuard]
    });
  });

  it('should ...', inject([FakeLoginGuard], (guard: FakeLoginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
