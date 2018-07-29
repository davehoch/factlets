import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Factlet } from './factlet';

const factlets: Factlet[] = [
  { id: 1, contentMarkdown: 'note 1 ((dave)) ((test)) ((rent))' },
  { id: 2, contentMarkdown: 'note 2 ((dave)) ((rebekah))' },
  { id: 3, contentMarkdown: 'note 3 ((rebekah)) ((rent))' },
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
