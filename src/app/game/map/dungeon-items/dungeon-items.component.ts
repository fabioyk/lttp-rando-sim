import { Component, OnInit, Input } from '@angular/core';
import { DungeonItems } from '../../game-data/dungeon-items';
import { Config } from '../../game-data/config';

@Component({
  selector: 'app-dungeon-items',
  templateUrl: './dungeon-items.component.html',
  styleUrls: ['./dungeon-items.component.css']
})
export class DungeonItemsComponent implements OnInit {
  @Input() dungeonItems:DungeonItems;
  @Input() config:Config;

  isChestCountShown:boolean;
  chestAmount:number;

  constructor() { }

  ngOnInit() {
    this.isChestCountShown = (this.dungeonItems.dungeonName !== "Aga Tower" || this.config.dungeonItems === 'full') && this.dungeonItems.dungeonName !== "Ganons Tower" && this.dungeonItems.dungeonName !== "Hyrule Castle"
  }

  getDungeonChestCountBg() {
    var chestCount = this.dungeonItems.itemsLeft;
    
    if (this.dungeonItems.dungeonName === 'Aga Tower') {
      chestCount--;
      if (this.dungeonItems.isBossDefeated) {
        chestCount++;
      }
    }
    
    return chestCount;
  }

}
