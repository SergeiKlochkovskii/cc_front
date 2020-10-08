import { TestBed } from '@angular/core/testing';

import { DataExchangeService } from './data-exchange.service';

describe('DataChangeService', () => {
  let service: DataExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
