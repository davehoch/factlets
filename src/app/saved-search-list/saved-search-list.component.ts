import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { SavedSearchService } from '../saved-search.service';
import { SavedSearch } from '../savedSearch.model';
import { SearchValueService } from '../search-value.service';

@Component({
  selector: 'app-saved-search-list',
  templateUrl: './saved-search-list.component.html',
  styleUrls: ['./saved-search-list.component.css']
})
export class SavedSearchListComponent implements OnInit {
  savedSearches: SavedSearch[];

  addSavedSearchForm: FormGroup;
  searchNameControl: AbstractControl;

  currentSearchString: string;

  constructor(private savedSearchService: SavedSearchService,
    fb: FormBuilder,
    private searchValueService: SearchValueService
  ) {
    this.addSavedSearchForm = fb.group({
      'searchNameControl': ['', Validators.compose([Validators.required, this.searchNameValidator])]
    });
    this.searchNameControl = this.addSavedSearchForm.controls['searchNameControl'];
  }

  ngOnInit() {
    this.getSavedSearches();
    this.searchValueService.searchInputChanged$.subscribe(value => {
      this.currentSearchString = value;
    },
      err => console.log(err)
    );
  }

  getSavedSearches(): void {
    this.savedSearchService.getSavedSearches().subscribe(savedSearches => {
      this.savedSearches = savedSearches;
    },
      err => console.log(err)
    );
  }

  addSavedSearch(name: string): void {
    this.savedSearchService.addSavedSearch(name, this.currentSearchString).subscribe(savedSearch => {
      this.savedSearches.push(savedSearch);
    },
      err => console.log(err)
    );

    this.searchNameControl.setValue('');
  }

  searchNameValidator(control: FormControl): { [s: string]: boolean } {
    // Make sure there aren't any duplicates
    // if (this.savedSearches.find(savedSearch => savedSearch.name === control.value)) {
    //   return { duplicateName: true };
    // }

    // Make sure there is a search string
    // if (!this.currentSearchString || this.currentSearchString === '') {
    //   return { emptySearchString: true };
    // }

    if (false) {
      return { fake: true };
    }
  }

  searchClicked(savedSearch: SavedSearch): void {
    this.searchValueService.savedSearchChanged(savedSearch);
  }
}
