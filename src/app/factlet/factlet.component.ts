import { Component, OnInit, Input } from '@angular/core';
import { Factlet } from '../factlet.model';

@Component({
  selector: 'app-factlet',
  templateUrl: './factlet.component.html',
  styleUrls: ['./factlet.component.css']
})
export class FactletComponent implements OnInit {
  @Input() factlet: Factlet;

  constructor() { }

  ngOnInit() {
  }

}
