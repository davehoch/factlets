import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Factlet } from '../factlet.model';
import { FactletService } from '../factlet.service';
import { FactletUtilsService } from '../factlet-utils.service';
import { SavedSearchService } from '../saved-search.service';

@Component({
  selector: 'app-factlet-list',
  templateUrl: './factlet-list.component.html',
  styleUrls: ['./factlet-list.component.css']
})

export class FactletListComponent implements OnInit {
  private factlets: Factlet[];
  displayedFactlets: Factlet[];
  searchFilter: string;

  addFactletForm: FormGroup;
  newFactletControl: AbstractControl;

  searchForm: FormGroup;
  searchInputControl: AbstractControl;

  private static getDateStr(): string {
    return (new Date()).toISOString().slice(0, 10) + ' ';
  }

  private static factletValidator(control: FormControl): { [s: string]: boolean } {
    // Make sure it starts with a date
    if (!control.value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return { dateRequired: true };
    }

    // Make sure there's some content
    if (!control.value.match(/^\d{4}-\d{2}-\d{2} .+/)) {
      return { valueRequired: true };
    }
  }

  constructor(fb: FormBuilder,
    private factletService: FactletService,
    private savedSearchService: SavedSearchService) {

    this.addFactletForm = fb.group({
      'newFactletControl': [FactletListComponent.getDateStr(),
      Validators.compose([Validators.required, FactletListComponent.factletValidator])]
    });
    this.newFactletControl = this.addFactletForm.controls['newFactletControl'];

    this.searchForm = fb.group({
      'searchInputControl': ['']
    });
    this.searchInputControl = this.searchForm.controls['searchInputControl'];

    // This could be a better way to go.
    // this.searchInputControl.valueChanges.subscribe(value -> search);
  }

  ngOnInit() {
    this.searchFilter = '';
    this.getFactlets();
    this.savedSearchService.savedSearchClicked$.subscribe(savedSearch => {
      this.searchInputControl.setValue(savedSearch.searchString);
      this.listFilter = savedSearch.searchString;
    },
      err => console.log(err)
    );
  }

  private getFactlets(): void {
    this.factletService.getFactlets().subscribe(factlets => {
      this.factlets = factlets;
      this.updateFactlets();
    },
      err => console.log(err)
    );
  }

  addFactlet(contentMarkdown: string): void {
    this.factletService.addFactlet(contentMarkdown).subscribe(factlet => {
      this.factlets.push(factlet);
      this.updateFactlets();
    },
      err => console.log(err)
    );

    this.newFactletControl.setValue(FactletListComponent.getDateStr());
  }

  get listFilter(): string {
    return this.searchFilter;
  }

  set listFilter(value: string) {
    this.searchFilter = value;
    this.updateFactlets();
  }

  // This method should be called to recalculate displayedFactlets whenever there is
  // a change to the list, or filters
  updateFactlets(): void {
    this.displayedFactlets = FactletUtilsService.calcDisplayedFactlets(this.factlets, this.searchFilter);
  }

  saveCurrentSearch(): void {
    const searchName = window.prompt('Name the search');

    if (searchName) {
      this.savedSearchService.addSavedSearch(searchName, this.searchFilter);
    }
  }
}
