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
    this.itemsToTrack = ['tunic', 'sword', 'shield', 'moonPearl', 'bow', 'hookshot', 'shovel', 'mushroom', 'powder', 'fireRod', 
      'iceRod', 'bombos', 'ether', 'quake', 'lamp', 'hammer', 'flute', 'book', 'bottle',
      'somaria', 'byrna', 'cape', 'mirror', 'boots', 'glove', 'flippers', 'halfMagic', 'crystal1', 
      'crystal2', 'crystal3', 'crystal4', 'crystal5', 'crystal6', 'crystal7', 'agahnim', 
      'pendantCourage', 'pendantPower', 'pendantWisdom'];
  }

}
