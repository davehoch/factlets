import { TestBed, inject } from '@angular/core/testing';

import { SearchValueService } from './search-value.service';

describe('SearchValueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchValueService]
    });
  });

  it('should be created', inject([SearchValueService], (service: SearchValueService) => {
    expect(service).toBeTruthy();
  }));
});
