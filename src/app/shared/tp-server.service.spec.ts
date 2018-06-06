import { TestBed, inject } from '@angular/core/testing';

import { TpServerService } from './tp-server.service';

describe('TpServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TpServerService]
    });
  });

  it('should be created', inject([TpServerService], (service: TpServerService) => {
    expect(service).toBeTruthy();
  }));
});
