import { Injectable } from '@angular/core';
import { Factlet } from './factlet.model';

@Injectable({
  providedIn: 'root'
})
export class FactletUtilsService {

  static performSort(factlets: Factlet[]): Factlet[] {
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

  static performFilter(factlets: Factlet[], searchFilter: string): Factlet[] {
    // split into separate tokens
    // see if all the tokens are in the string
    const tokens = searchFilter.toLocaleLowerCase().split(' ');

    return factlets.filter((factlet: Factlet) => {
      const target = factlet.contentMarkdown.toLowerCase();
      return tokens.every(token => target.indexOf(token) !== -1);
    });
    // factlet.contentMarkdown.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  static calcDisplayedFactlets(factlets: Factlet[], searchString: string): Factlet[] {
    return FactletUtilsService.performSort(FactletUtilsService.performFilter(factlets, searchString));
  }

  constructor() { }
}
