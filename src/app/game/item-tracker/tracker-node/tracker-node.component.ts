import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Config } from '../../game-data/config';
import { Items } from '../../game-data/items';
import { DungeonData } from '../../game-data/dungeon-data';

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.css']
})
export class TrackerNodeComponent implements OnInit {
  @Input() isItem: boolean;

  @Input() itemName:string;
  @Input() value:any;

  @Input() dungeonData:DungeonData;
  @Input() items:Items;
  @Input() config:Config;

  medallionName:string;

  constructor() { }

  ngOnInit() {
    if (!this.isItem) {
      if (this.dungeonData.name === 'Misery Mire') {
        this.medallionName = this.config.mmMedallion;
      }
      if (this.dungeonData.name === 'Turtle Rock') {
        this.medallionName = this.config.trMedallion;
      }
    }
    
  }

  getBgImg() {
    if (this.value === true || this.value === false) {
      return 'url("./assets/item-icons/' + this.itemName + '.png")';
    } else {
      return 'url("./assets/item-icons/' + this.itemName + (this.value > 0 ? this.value : '') + '.png")';      
    }
  }

  isTransparent() {
    if ((typeof this.value === 'boolean' && !this.value) || (this.value === 0)) {
      return 'off';
    }
  }

  shouldShowCrystal() {
    if (DungeonData.lwDungeons.indexOf(this.dungeonData.name) === -1) {
      return this.canViewDarkWorldMap();      
    } else {
      return true;
    }
  }

  canViewDarkWorldMap() {
    return this.items.canWestDeathMountain(this.config) 
        || (this.items.glove && this.items.hammer) || this.items.glove === 2
        || this.items.agahnim;
  }

  shouldShowMedallion() {
    if (!this.isItem && this.dungeonData.name === 'Turtle Rock' && this.canViewTRMedallion()) {
      return true;
    } else if (!this.isItem && this.dungeonData.name === 'Misery Mire' && this.canViewMMMedallion()) {
      return true;
    }
    return false;
  }

  canViewTRMedallion() {
    return this.items.canDarkEastDeathMountain(this.config);
  }
  canViewMMMedallion() {
    return this.items.canMire();
  }

}
