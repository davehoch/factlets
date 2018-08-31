import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { SavedSearch } from '../savedSearch.model';
import { SavedSearchService } from '../saved-search.service';

@Component({
  selector: 'app-saved-search-list',
  templateUrl: './saved-search-list.component.html',
  styleUrls: ['./saved-search-list.component.css']
})
export class SavedSearchListComponent implements OnInit {
  savedSearches: SavedSearch[];

  private static searchNameValidator(control: FormControl): { [s: string]: boolean } {
    // Make sure there aren't any duplicates
    // if (this.savedSearches.find(savedSearch => savedSearch.name === control.value)) {
    //   return { duplicateName: true };
    // }

    // Make sure there is a search string
    // if (!this.currentSearchString || this.currentSearchString === '') {
    //   return { emptySearchString: true };
    // }

    return null;
  }

  constructor(private savedSearchService: SavedSearchService) {
  }

  ngOnInit() {
    this.getSavedSearches();

    // Whenever the saves searches change, reload them
    this.savedSearchService.savedSearchesChanged$.subscribe(value => {
      this.getSavedSearches();
    },
      err => console.log(err)
    );
  }

  private getSavedSearches(): void {
    this.savedSearchService.getSavedSearches().subscribe(savedSearches => {
      this.savedSearches = savedSearches;
    },
      err => console.log(err)
    );
  }

  searchClicked(savedSearch: SavedSearch): void {
    // publish the fact that a saved search was clicked on
    this.savedSearchService.savedSearchedClicked(savedSearch);
  }
}
