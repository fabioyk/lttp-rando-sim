import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Config } from '../../game-data/config';
import { Items } from '../../game-data/items';
import { DungeonData } from '../../game-data/dungeon-data';
import { ItemNamesService } from '../../../log-parse/item-names.service';

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
  heartCount:string;

  constructor(private _itemNamesService:ItemNamesService) { }

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

  getDungeonBg() {
    var duns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 
      'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock'];

    return 'url("./assets/dungeon-tracker-icons/boss' + duns.indexOf(this.dungeonData.name) 
      + (this.items.getDungeonItems(this.dungeonData.name).isBossDefeated ? '2' : '') + '.png")';
  }

  getDungeonChestCountBg() {
    return 'url("./assets/dungeon-tracker-icons/chest' + this.items.getDungeonItems(this.dungeonData.name).itemsLeft + '.png")';
  }

  getDungeonPrizeBg() {
    var shouldShow = false, heardDungeonMusic = false;
    if (DungeonData.lwDungeons.indexOf(this.dungeonData.name) > -1) {
      shouldShow = this.items.lwMapOpen;
    } else {
      shouldShow = this.items.dwMapOpen;
    }
    if (this.items.getDungeonItems(this.dungeonData.name).isBossDefeated) {
      shouldShow = true;
    }

    if (this.items.hasVisitedDungeon(this.dungeonData.name)) {
      heardDungeonMusic = true;
    }
    
    if (shouldShow) {
      switch(this._itemNamesService.getItemById(this.dungeonData.dungeonPrize).shortName) {
        case 'crystal5':
        case 'crystal6':
          return 'url("./assets/dungeon-tracker-icons/dungeon2.png")';
        case 'pendantCourage':
          return 'url("./assets/dungeon-tracker-icons/dungeon3.png")';
        case 'pendantPower':
        case 'pendantWisdom':
          return 'url("./assets/dungeon-tracker-icons/dungeon4.png")';
        default:
          return 'url("./assets/dungeon-tracker-icons/dungeon1.png")';
      }
    } else if (heardDungeonMusic) {
      switch(this._itemNamesService.getItemById(this.dungeonData.dungeonPrize).shortName) {        
        case 'pendantCourage':
        case 'pendantPower':
        case 'pendantWisdom':
          return 'url("./assets/dungeon-tracker-icons/dungeonP.png")';
        default:
          return 'url("./assets/dungeon-tracker-icons/dungeonC.png")';
      }
    } else {
      return 'url("./assets/dungeon-tracker-icons/dungeon0.png")';          
    }
  }

  getDungeonMedallionBg() {
    if (this.isMedallionDungeon()) {
      if (!this.shouldShowMedallion()) {
        return 'url("./assets/dungeon-tracker-icons/medallion0.png")';
      } else {
        var medallions = ['bombos', 'ether', 'quake'];
        return 'url("./assets/dungeon-tracker-icons/medallion' + (medallions.indexOf(this.medallionName) + 1) + '.png")';
      }
    } else {
      return '';
    }    
  }

  isMedallionDungeon() {
    return this.dungeonData.name == 'Misery Mire' || this.dungeonData.name == 'Turtle Rock';      
  }

  isTransparent() {
    if (this.itemName !== 'health' && ((typeof this.value === 'boolean' && !this.value) || (this.value === 0))) {
      return 'off';
    }
  }

  canViewDarkWorldMap() {
    return this.items.canWestDeathMountain(this.config) 
        || (this.items.glove && this.items.hammer) || this.items.glove === 2
        || this.items.agahnim;
  }

  shouldShowMedallion() {
    if (!this.isItem && this.dungeonData.name === 'Turtle Rock' && this.items.trMedallionChecked) {
      return true;
    } else if (!this.isItem && this.dungeonData.name === 'Misery Mire' && this.items.mmMedallionChecked) {
      return true;
    }
    return false;
  }

  getHealth() {
    return 3 + this.items.stats.heartContainers + Math.floor(this.items.stats.heartPieces/4);


  }
}
