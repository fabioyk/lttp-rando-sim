import { Component, OnInit, Input } from '@angular/core';
import { DungeonItems } from '../../game-data/dungeon-items';

@Component({
  selector: 'app-dungeon-items',
  templateUrl: './dungeon-items.component.html',
  styleUrls: ['./dungeon-items.component.css']
})
export class DungeonItemsComponent implements OnInit {
  @Input() dungeonItems:DungeonItems;

  constructor() { }

  ngOnInit() {
  }

}
