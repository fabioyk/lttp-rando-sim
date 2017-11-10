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
    if (!this.shouldShowCrystal()) {
      return 'url("./assets/dungeon-tracker-icons/dungeon0.png")';    
    } else {
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
