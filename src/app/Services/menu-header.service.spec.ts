import { TestBed } from '@angular/core/testing';

import { MenuHeaderService } from './menu-header.service';

describe('MenuHeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuHeaderService = TestBed.get(MenuHeaderService);
    expect(service).toBeTruthy();
  });
});
