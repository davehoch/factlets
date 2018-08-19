import { TestBed, inject } from '@angular/core/testing';

import { SavedSearchService } from './saved-search.service';

describe('SavedSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedSearchService]
    });
  });

  it('should be created', inject([SavedSearchService], (service: SavedSearchService) => {
    expect(service).toBeTruthy();
  }));
});
