import { Component, OnInit, Input, isDevMode } from '@angular/core';
import { Items } from '../../game-data/items';
import { GameService } from '../../game-data/game-service.service';
import { Config } from '../../game-data/config';
import { DungeonData } from '../../game-data/dungeon-data';

@Component({
  selector: 'app-item-tracker',
  templateUrl: './item-tracker.component.html',
  styleUrls: ['./item-tracker.component.css']
})
export class ItemTrackerComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;
  @Input() dungeonsData:DungeonData[];
  itemsToTrack:string[];

  constructor(private _gameService:GameService) { }

  ngOnInit() {    
    this.itemsToTrack = 
      ['tunic', 'sword', 'shield', 'moonPearl', 'health', 
      'bow', 'boomerang', 'hookshot', 'mushroom', 'powder', 
      'fireRod', 'iceRod', 'bombos', 'ether', 'quake', 
      'lamp', 'hammer', 'fluteShovel', 'net', 'book', 
      'bottle', 'somaria', 'byrna', 'cape', 'mirror', 
      'boots', 'glove', 'flippers', 'halfMagic', 'agahnim'];

    if (this.config.goal === 'triforce') {
      this.itemsToTrack[8] = 'powderMush';
      this.itemsToTrack[9] = 'triforcePieces';
    }
  }

  getDungeons() {
    var blacklist;
    if (this.config.variation !== 'keysanity') {    
      blacklist = ['Aga Tower', 'Ganons Tower', 'Light World', 'Dark World', 'Hyrule Castle'];
    } else {
      blacklist = ['Light World', 'Dark World', 'Hyrule Castle'];      
    }
    return this.dungeonsData.filter((dungeon) => {
      return blacklist.indexOf(dungeon.name) === -1;
    });
  }

  onItemClicked(itemName:string) {
    if (itemName === 'boots') {
      this.config.noLogic = !this.config.noLogic;
    }
    if (isDevMode()) {
      if (typeof this.items[itemName] === 'boolean') {
        if (this.items[itemName]) {
          this.items[itemName] = false;
        } else {
          this.items[itemName] = true;
        }      
      } else {
        this.items[itemName]++;
        if (this.items[itemName] > 2) {
          this.items[itemName] = 0;
        }
      }
      this._gameService.updateData(this.items, 'light-world');
      this._gameService.updateData(this.items, 'dark-world');
    }    
  }

}
