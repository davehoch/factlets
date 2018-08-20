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
import { SearchValueService } from '../search-value.service';

@Component({
  selector: 'app-factlet-list',
  templateUrl: './factlet-list.component.html',
  styleUrls: ['./factlet-list.component.css']
})

export class FactletListComponent implements OnInit {
  factlets: Factlet[];
  displayedFactlets: Factlet[];
  searchFilter: string;

  addFactletForm: FormGroup;
  newFactletControl: AbstractControl;

  searchForm: FormGroup;
  searchInputControl: AbstractControl;

  constructor(private factletService: FactletService,
    fb: FormBuilder,
    private searchValueService: SearchValueService) {

    this.addFactletForm = fb.group({
      'newFactletControl': [this.getDateStr(), Validators.compose([Validators.required, this.factletValidator])]
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
    this.searchValueService.savedSearchChanged$.subscribe(savedSearch => {
      this.searchInputControl.setValue(savedSearch.searchString);
      this.listFilter = savedSearch.searchString;
    },
      err => console.log(err)
    );
  }

  getFactlets(): void {
    this.factletService.getFactlets().subscribe(factlets => {
      this.factlets = factlets;
      this.updateFactlets();
    },
      err => console.log(err)
    );
  }

  getDateStr(): string {
    return (new Date()).toISOString().slice(0, 10) + ' ';
  }

  addFactlet(contentMarkdown: string): void {
    this.factletService.addFactlet(contentMarkdown).subscribe(factlet => {
      this.factlets.push(factlet);
      this.updateFactlets();
    },
      err => console.log(err)
    );

    this.newFactletControl.setValue(this.getDateStr());
  }

  get listFilter(): string {
    return this.searchFilter;
  }

  set listFilter(value: string) {
    this.searchFilter = value;
    this.updateFactlets();

    // When the search changes, publish the change to a place that other components can listen to
    this.searchValueService.searchInputChanged(value);
  }

  // This method should be called to recalculate displayedFactlets whenever there is
  // a change to the list, or filters
  updateFactlets(): void {
    this.displayedFactlets = FactletUtilsService.calcDisplayedFactlets(this.factlets, this.searchFilter);
  }

  factletValidator(control: FormControl): { [s: string]: boolean } {
    // Make sure it starts with a date
    if (!control.value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return { dateRequired: true };
    }

    // Make sure there's some content
    if (!control.value.match(/^\d{4}-\d{2}-\d{2} .+/)) {
      return { valueRequired: true };
    }
  }
}
