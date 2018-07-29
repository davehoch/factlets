import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Factlet } from './factlet';

const factlets: Factlet[] = [
  { id: 1, contentMarkdown: '2015-01-01 note 1 ((dave)) ((test)) ((rent))' },
  { id: 2, contentMarkdown: '2017-01-01 note 3 ((dave)) ((rebekah))' },
  { id: 3, contentMarkdown: '2016-01-01 note 2 ((rebekah)) ((rent))' },
];

@Injectable({
  providedIn: 'root'
})
export class FactletService {

  constructor() { }

  getFactlets(): Observable<Factlet[]> {
    return of(factlets);
  }
}
