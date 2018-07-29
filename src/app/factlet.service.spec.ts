import { TestBed, inject } from '@angular/core/testing';

import { FactletService } from './factlet.service';

describe('FactletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactletService]
    });
  });

  it('should be created', inject([FactletService], (service: FactletService) => {
    expect(service).toBeTruthy();
  }));
});
