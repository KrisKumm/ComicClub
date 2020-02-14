import { TestBed } from '@angular/core/testing';

import { ColectionServiceService } from './colection-service.service';

describe('ColectionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColectionServiceService = TestBed.get(ColectionServiceService);
    expect(service).toBeTruthy();
  });
});
