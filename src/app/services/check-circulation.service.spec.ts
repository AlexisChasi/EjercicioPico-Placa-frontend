import { TestBed } from '@angular/core/testing';

import { CheckCirculationService } from './check-circulation.service';

describe('CheckCirculationService', () => {
  let service: CheckCirculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckCirculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
