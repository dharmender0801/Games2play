import { TestBed } from '@angular/core/testing';

import { CommonJqueryService } from './common-jquery.service';

describe('CommonJqueryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonJqueryService = TestBed.get(CommonJqueryService);
    expect(service).toBeTruthy();
  });
});
