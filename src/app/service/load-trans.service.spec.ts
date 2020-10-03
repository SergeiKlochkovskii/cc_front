import { TestBed } from '@angular/core/testing';

import { LoadTransService } from './load-trans.service';

describe('LoadTransService', () => {
  let service: LoadTransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadTransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
