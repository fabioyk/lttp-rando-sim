import { TestBed, inject } from '@angular/core/testing';

import { ItemNamesService } from './item-names.service';

describe('ItemNamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemNamesService]
    });
  });

  it('should be created', inject([ItemNamesService], (service: ItemNamesService) => {
    expect(service).toBeTruthy();
  }));
});
