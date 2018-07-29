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

  constructor(private factletService: FactletService) { }

  ngOnInit() {
    this.getFactlets();
  }

  getFactlets() {
    this.factletService.getFactlets().subscribe(factlets => this.factlets = factlets);
  }
}
