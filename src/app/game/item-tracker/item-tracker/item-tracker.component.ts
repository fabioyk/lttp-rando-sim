import { Component, OnInit, Input } from '@angular/core';
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
    ['tunic', 'sword', 'shield', 'moonPearl', 'bow', 'hookshot', 'shovel', 'mushroom', 'powder', 'fireRod', 
      'iceRod', 'bombos', 'ether', 'quake', 'lamp', 'hammer', 'flute', 'book', 'bottle',
      'somaria', 'byrna', 'cape', 'mirror', 'boots', 'glove', 'flippers', 'halfMagic', 'agahnim'];
    const itemsToLog = ['Progressive Armor', 'Progressive Sword', 'Progressive Shield', 'Moon Pearl', 'Bow', 'Boomerang',
      'Magic Boomerang', 'Hookshot', 'Shovel', 'Mushroom', 'Magic Powder', 'Fire Rod', 
      'Ice Rod', 'Bombos', 'Ether', 'Quake', 'Lamp', 'Hammer', 'Flute', 'Book Of Mudora', 'Bottle',
      'Cane Of Somaria', 'Cane Of Byrna', 'Magic Cape', 'Magic Mirror', 'Pegasus Boots', 'Progressive Glove', 'Flippers', 'Half Magic', 'Crystal 1', 
      'Crystal 2', 'Crystal 3', 'Crystal 4', 'Crystal 5', 'Crystal 6', 'Crystal 7', 'Agahnim', 
      'Pendant Of Courage', 'Pendant Of Power', 'Pendant Of Wisdom', 'Key', 'Big Key', 'Map', 'Compass'];
  }

  filterDungeons(dungeon:DungeonData) {
    return dungeon.name !== "Aga Tower" && dungeon.name !== "Ganons Tower";
  }

}
