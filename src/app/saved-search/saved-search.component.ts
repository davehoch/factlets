import { Component, OnInit, Input } from '@angular/core';
import { SavedSearch } from '../savedSearch.model';

@Component({
  selector: 'app-saved-search',
  templateUrl: './saved-search.component.html',
  styleUrls: ['./saved-search.component.css']
})
export class SavedSearchComponent implements OnInit {
  @Input() savedSearch: SavedSearch;

  constructor() { }

  ngOnInit() {
  }

}
