import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Config } from '../../game-data/config';
import { Items } from '../../game-data/items';
import { DungeonData } from '../../game-data/dungeon-data';
import { ItemNamesService } from '../../../log-parse/item-names.service';
import { DungeonItems } from '../../game-data/dungeon-items';

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
  isAgaTowerOrGt:boolean;
  chestCountText:string;
  keyCountText:string;

  isMmMedallionShown:boolean;
  isTrMedallionShown:boolean;

  duns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 
      'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Aga Tower', 'Ganons Tower'];

  constructor(private _itemNamesService:ItemNamesService) { }

  ngOnInit() {
    if (!this.isItem) {
      this.isAgaTowerOrGt = this.dungeonData.name === 'Aga Tower' || this.dungeonData.name === 'Ganons Tower';
      if (this.dungeonData.name === 'Misery Mire') {
        this.medallionName = this.config.mmMedallion;
      }
      if (this.dungeonData.name === 'Turtle Rock') {
        this.medallionName = this.config.trMedallion;
      }
    }
    
  }

  getBgImg() {
    if (this.itemName === 'fluteShovel') {
      if ((this.items.shovel && this.items.flute) || (!this.items.shovel && !this.items.flute)) {
        return 'url("./assets/item-icons/allflute.png")';
      } else if (this.items.shovel) {
        return 'url("./assets/item-icons/shovel.png")';  
      } else {
        return 'url("./assets/item-icons/flute.png")';
      }
    } else if (this.itemName === 'powderMush') {
      if ((this.items.powder && this.items.mushroom) || (!this.items.powder && !this.items.mushroom)) {
        return 'url("./assets/item-icons/allpowder.png")';
      } else if (this.items.powder) {
        return 'url("./assets/item-icons/powder.png")';  
      } else {
        return 'url("./assets/item-icons/mushroom.png")';
      }
    } else if (this.itemName === 'triforcePieces') {
      return 'url("./assets/item-icons/triforcePieces.png")';  
    } else if (typeof this.items[this.itemName] === 'boolean') {
      if (this.itemName === 'boots' && this.config.noLogic) {
        return 'url("./assets/item-icons/boots_go.png")';  
      }
      return 'url("./assets/item-icons/' + this.itemName + '.png")';
    } else {
      return 'url("./assets/item-icons/' + this.itemName + (this.value > 0 ? this.value : '') + '.png")';      
    }
  }

  getDungeonBg() {
    if (this.config.isEnemizer && this.dungeonData.name !== 'Aga Tower' && this.dungeonData.name !== 'Ganons Tower') {
      if (this.config.checkedBosses[this.duns.indexOf(this.dungeonData.name)]) {
        return 'url("./assets/dungeon-tracker-icons/boss' + this.config.bosses[this.duns.indexOf(this.dungeonData.name)] + '2.png")';
      } else {
        return 'url("./assets/dungeon-tracker-icons/boss.png")';
      }
    } else {
      return 'url("./assets/dungeon-tracker-icons/boss' + this.duns.indexOf(this.dungeonData.name) + '2.png")';
    }    
  }

  checkMmMedallion() {
    if (this.items.mmMedallionChecked && this.itemName === this.config.mmMedallion) {
      return 'mm-medallion-text';
    } else {
      return 'invisible';
    }
  }

  checkTrMedallion() {
    if (this.items.trMedallionChecked && this.itemName === this.config.trMedallion) {
      return 'tr-medallion-text';
    } else {
      return 'invisible';
    }
  }

  getDungeonBeatenClass() {
    return this.items.getDungeonItems(this.dungeonData.name).isBossDefeated ? 'dungeon-node-bg' : 'dungeon-node-bg grayscale';
  }

  getDungeonChestCountBg() {
    this.chestCountText = '';
    var chestCount = this.items.getDungeonItems(this.dungeonData.name).itemsLeft;
    if (this.isAgaTowerOrGt) {
      chestCount--;
      if (this.items.getDungeonItems(this.dungeonData.name).isBossDefeated) {
        chestCount++;
      }
    }
     
    if (chestCount >= 6) {
      this.chestCountText = chestCount.toString();
      chestCount = 6;
    }
    if (chestCount < 0) {
      chestCount = 0;
    }
    return 'url("./assets/dungeon-tracker-icons/chest' + chestCount + '.png")';
  }

  getDungeonPrizeBg() {
    switch(this.items.getDungeonItems(this.dungeonData.name).mapPrizeStatus) {      
      case DungeonItems.CRYSTAL:
        return 'url("./assets/dungeon-tracker-icons/dungeon1.png")';
      case DungeonItems.RED_CRYSTAL:
        return 'url("./assets/dungeon-tracker-icons/dungeon2.png")';
      case DungeonItems.GREEN_PENDANT:
        return 'url("./assets/dungeon-tracker-icons/dungeon3.png")';
      case DungeonItems.PENDANT:
        return 'url("./assets/dungeon-tracker-icons/dungeon4.png")';
      case DungeonItems.SOME_CRYSTAL:
        return 'url("./assets/dungeon-tracker-icons/dungeonC.png")';
      case DungeonItems.SOME_PENDANT:
        return 'url("./assets/dungeon-tracker-icons/dungeonP.png")';
      case DungeonItems.UNKNOWN:
      default:
        return 'url("./assets/dungeon-tracker-icons/dungeon0.png")';
    }
  }

  getDungeonInitials() {
    return 'url("./assets/dungeon-tracker-icons/initials' + this.duns.indexOf(this.dungeonData.name) + '.png")';
  }

  getBigKeyIconClass() {
    if (this.dungeonData.name === 'Aga Tower') {
      return 'invisible';
    }
    if (!this.items.getDungeonItems(this.dungeonData.name).hasBigKey) {
      return 'grayscale';
    }
  }
  getSmallKeysIconClass() {
    this.keyCountText = '';
    if (this.dungeonData.name === 'Eastern Palace') {
      return 'invisible';
    }
    if (this.items.getDungeonItems(this.dungeonData.name).smallKeys === 0) {
      return 'grayscale';
    } else {
      this.keyCountText = this.items.getDungeonItems(this.dungeonData.name).smallKeys.toString();
    }
  }

  isMedallionDungeon() {
    return this.dungeonData.name == 'Misery Mire' || this.dungeonData.name == 'Turtle Rock';      
  }

  isTransparent() {
    if ((this.itemName === 'fluteShovel' && !this.items.shovel && !this.items.flute) 
        || (this.itemName === 'powderMush' && !this.items.powder && !this.items.mushroom)
        || (this.itemName !== 'health' && this.itemName !== 'triforcePieces' && ((typeof this.value === 'boolean' && !this.value) || (this.value === 0)))) {
      return 'off';
    }
  }

  canViewDarkWorldMap() {
    return this.items.canWestDeathMountain(this.config.canGlitch) 
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
}
