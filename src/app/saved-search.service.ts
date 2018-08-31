import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { SavedSearch } from './savedSearch.model';

@Injectable({
  providedIn: 'root'
})
export class SavedSearchService {
  savedSearches: SavedSearch[] = [
    { id: 1, name: 'rent', searchString: '((rent))' },
    { id: 2, name: 'daveRent', searchString: '((rent)) ((dave))' },
  ];
  nextIdNum = 3;

  private savedSearchesSource = new Subject<string>();
  savedSearchesChanged$ = this.savedSearchesSource.asObservable();

  private savedSearchClickedSource = new Subject<SavedSearch>();
  savedSearchClicked$ = this.savedSearchClickedSource.asObservable();

  constructor() { }

  getSavedSearches(): Observable<SavedSearch[]> {
    return of(this.savedSearches);
  }

  addSavedSearch(name: string, searchString: string): void {
    this.savedSearches.push({ id: this.nextIdNum++, name: name, searchString: searchString });
    this.savedSearchesSource.next(name);
  }

  savedSearchedClicked(savedSearch: SavedSearch) {
    this.savedSearchClickedSource.next(savedSearch);
  }
}
