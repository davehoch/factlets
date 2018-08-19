import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SavedSearch } from './savedSearch.model';

const savedSearchs: SavedSearch[] = [
  { id: 1, name: 'rent', searchString: '((rent))' },
  { id: 2, name: 'daveRent', searchString: '((rent)) ((dave))' },
];
let nextIdNum = 3;
@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {

  constructor() { }

  getSavedSearches(): Observable<SavedSearch[]> {
    return of(savedSearchs);
  }

  addSavedSearch(name: string, searchString: string): Observable<SavedSearch> {
    return of({ id: nextIdNum++, name: name, searchString: searchString });
  }
}
