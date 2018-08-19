import { TestBed, inject } from '@angular/core/testing';

import { FactletUtilsService } from './factlet-utils.service';

describe('FactletUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactletUtilsService]
    });
  });

  it('should be created', inject([FactletUtilsService], (service: FactletUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
