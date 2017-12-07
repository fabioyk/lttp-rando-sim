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
    ['tunic', 'sword', 'shield', 'moonPearl', 'health', 
     'bow', 'boomerang', 'hookshot', 'mushroom', 'powder', 
     'fireRod', 'iceRod', 'bombos', 'ether', 'quake', 
     'lamp', 'hammer', 'flute', 'shovel', 'book', 
     'bottle', 'somaria', 'byrna', 'cape', 'mirror', 
     'boots', 'glove', 'flippers', 'halfMagic', 'agahnim'];
  }

  filterDungeons(dungeon:DungeonData) {
    return dungeon.name !== "Aga Tower" && dungeon.name !== "Ganons Tower";
  }

}
