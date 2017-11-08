import { TestBed, inject } from '@angular/core/testing';

import { SeedApiService } from './seed-api.service';

describe('SeedApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeedApiService]
    });
  });

  it('should be created', inject([SeedApiService], (service: SeedApiService) => {
    expect(service).toBeTruthy();
  }));
});
