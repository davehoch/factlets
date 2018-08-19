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

  constructor(private factletService: FactletService, fb: FormBuilder) {
    this.addFactletForm = fb.group({
      'newFactletControl': [this.getDateStr(), Validators.compose([Validators.required, this.factletValidator])]
    });
    this.newFactletControl = this.addFactletForm.controls['newFactletControl'];
  }

  ngOnInit() {
    this.searchFilter = '';
    this.getFactlets();
  }

  getFactlets(): void {
    this.factletService.getFactlets().subscribe(factlets => {
      this.factlets = factlets;
      this.updateFactlets();
    } // , error => );
    );
  }

  getDateStr(): string {
    return (new Date()).toISOString().slice(0, 10) + ' ';
  }

  addFactlet(contentMarkdown: string): void {
    this.factletService.addFactlet(contentMarkdown).subscribe(factlet => {
      this.factlets.push(factlet);
      this.updateFactlets();
    });

    this.newFactletControl.setValue(this.getDateStr());
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
