import { Component, OnInit, OnChanges } from '@angular/core';
import { GameService } from '../game-data/game-service.service';
import { Items } from '../game-data/items';
import { MapNode } from '../game-data/map-node';
import { ItemLogEntry } from '../item-log/item-log-entry';
import { Config } from '../game-data/config';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  currentMap:string = 'light-world';
  lastWorld:string = 'light-world';
  items:Items;
  config:Config;
  itemLog: ItemLogEntry[];

  constructor(private gameService:GameService) { }

  ngOnInit() {
    this.items = new Items();
    this.items.setup();
    this.config = new Config();
    this.itemLog = [];
    console.log(this.gameService.config);
  }

  ngOnChanges() {
    if (this.currentMap === 'light-world' || this.currentMap === 'dark-world') {
      this.lastWorld = this.currentMap;
    }
  }

  onAddedItem(mapNode:MapNode, type:string) {
    const itemsToTrack = ['Progressive Armor', 'Progressive Sword', 'Progressive Shield', 'Moon Pearl', 'Bow', 'Boomerang',
    'Magic Boomerang', 'Hookshot', 'Shovel', 'Mushroom', 'Magic Powder', 'Fire Rod', 
    'Ice Rod', 'Bombos', 'Ether', 'Quake', 'Lamp', 'Hammer', 'Flute', 'Book Of Mudora', 'Bottle',
    'Cane Of Somaria', 'Cane Of Byrna', 'Magic Cape', 'Magic Mirror', 'Pegasus Boots', 'Progressive Glove', 'Flippers', 'Half Magic', 'Crystal 1', 
    'Crystal 2', 'Crystal 3', 'Crystal 4', 'Crystal 5', 'Crystal 6', 'Crystal 7', 'Agahnim', 
    'Pendant Of Courage', 'Pendant Of Power', 'Pendant Of Wisdom', 'Key', 'Big Key', 'Map', 'Compass'];
    mapNode.prize.forEach((prizeName) => {
      if (itemsToTrack.indexOf(prizeName) > -1) {
        this.itemLog.unshift({
          item: prizeName,
          location: mapNode.tooltip,
          region: mapNode.id,
          type: type      
        });
      }      
    });
  }
}
