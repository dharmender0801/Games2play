import { TestBed, async, inject } from '@angular/core/testing';

import { PreventNavGuard } from './prevent-nav.guard';

describe('PreventNavGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreventNavGuard]
    });
  });

  it('should ...', inject([PreventNavGuard], (guard: PreventNavGuard) => {
    expect(guard).toBeTruthy();
  }));
});
