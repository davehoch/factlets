import { Component, OnInit } from '@angular/core';
import { Factlet } from '../factlet';
import { FactletService } from '../factlet.service';

@Component({
  selector: 'app-factlet-list',
  templateUrl: './factlet-list.component.html',
  styleUrls: ['./factlet-list.component.css']
})

export class FactletListComponent implements OnInit {
  factlets: Factlet[];
  displayedFactlets: Factlet[];
  searchFilter: string;

  constructor(private factletService: FactletService) { }

  ngOnInit() {
    this.searchFilter = '';
    this.getFactlets();
  }

  getFactlets() {
    this.factletService.getFactlets().subscribe(factlets => {
      this.factlets = factlets;
      this.displayedFactlets = this.calcDisplayedFactlets(factlets, this.searchFilter);
    } // , error => );
    );
  }

  get listFilter(): string {
    return this.searchFilter;
  }

  set listFilter(value: string) {
    this.searchFilter = value;
    this.displayedFactlets = this.calcDisplayedFactlets(this.factlets, this.searchFilter);
  }

  calcDisplayedFactlets(factlets: Factlet[], searchString: string): Factlet[] {
    return this.performSort(this.performFilter(factlets, searchString));
  }

  performFilter(factlets: Factlet[], filterBy: string): Factlet[] {
    filterBy = filterBy.toLocaleLowerCase();
    return factlets.filter((factlet: Factlet) =>
      factlet.contentMarkdown.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  // This needs to be called on data load, whenever a factlet is added or modified
  performSort(factlets: Factlet[]): Factlet[] {
    return factlets.sort((left, right) => {
      const leftVal = left.contentMarkdown;
      const rightVal = right.contentMarkdown;

      if (leftVal > rightVal) {
        return 1;
      }

      if (leftVal < rightVal) {
        return -1;
      }

      return 0;
    });
  }
}
