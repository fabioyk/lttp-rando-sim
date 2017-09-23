import { Component, OnInit, Input } from '@angular/core';
import { ItemLogEntry } from '../item-log-entry';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {
  @Input() itemLogEntry:ItemLogEntry;

  constructor() { }

  ngOnInit() {
  }

}
