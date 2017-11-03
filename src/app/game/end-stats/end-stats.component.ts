import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../game-data/items';
import { Config } from '../game-data/config';

@Component({
  selector: 'app-end-stats',
  templateUrl: './end-stats.component.html',
  styleUrls: ['./end-stats.component.css']
})
export class EndStatsComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;

  constructor() { }

  ngOnInit() {
  }

}
