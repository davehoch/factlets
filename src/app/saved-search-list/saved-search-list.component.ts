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

@Component({
  selector: 'app-saved-search-list',
  templateUrl: './saved-search-list.component.html',
  styleUrls: ['./saved-search-list.component.css']
})
export class SavedSearchListComponent implements OnInit {
  savedSearches: SavedSearch[];

  addSavedSearchForm: FormGroup;
  searchNameControl: AbstractControl;

  constructor(private savedSearchService: SavedSearchService, fb: FormBuilder) {
    this.addSavedSearchForm = fb.group({
      'searchNameControl': ['', Validators.compose([Validators.required, this.searchNameValidator])]
    });
    this.searchNameControl = this.addSavedSearchForm.controls['searchNameControl'];

  }

  ngOnInit() {
    this.getSavedSearches();
  }

  getSavedSearches(): void {
    this.savedSearchService.getSavedSearches().subscribe(savedSearches => {
      this.savedSearches = savedSearches;
    } // , error => );
    );
  }

  addSavedSearch(name: string): void {
    this.savedSearchService.addSavedSearch(name, 'fake search').subscribe(savedSearch => {
      this.savedSearches.push(savedSearch);
    });

    this.searchNameControl.setValue('');
  }

  searchNameValidator(control: FormControl): { [s: string]: boolean } {
    // Make sure it starts with a date
    // if (!control.value.match(/^\d{4}-\d{2}-\d{2}/)) {
    //   return { dateRequired: true };
    // }

    // // Make sure there's some content
    // if (!control.value.match(/^\d{4}-\d{2}-\d{2} .+/)) {
    //   return { valueRequired: true };
    // }

    if (false) {
      return { fake: true };
    }
  }
}
