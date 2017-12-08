import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../game-data/items';
import { Config } from '../game-data/config';
import { GameService } from '../game-data/game-service.service';

@Component({
  selector: 'app-end-stats',
  templateUrl: './end-stats.component.html',
  styleUrls: ['./end-stats.component.css']
})
export class EndStatsComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;

  constructor(private _gameService:GameService) { }

  ngOnInit() {
  }

  getQuestPerformanceTables() {
    var res = [];
    res.push(['Item Locations Checked', this.generateItemLocationsCheckedTable()]);
    res.push(['Item Completion', this.generateItemCompletionTable()]);    
    return res;
  }

  generateItemLocationsCheckedTable() {
    var res = [];
    res.push(['Overworld', this.items.stats.overworldCount + '/101']);
    res.push(['Dungeons', this.items.stats.dungeonCount + '/131']);
    res.push(['Total', this.items.stats.totalCount + '/232']);
    return res;
  }
  generateItemCompletionTable() {
    var res = [];
    res.push(['Y Items', this.getYItemCount() + '/26']);
    res.push(['A Items', this.getOtherItemCount() + '/6']);
    res.push(['Swords', this.items.sword + '/4']);
    res.push(['Shields', this.items.shield + '/3']);
    res.push(['Mails', this.items.tunic + '/3']);
    res.push(['Capacity Upgrades', this.items.stats.capacityUpgrades + '/15']);
    res.push(['Heart Pieces', this.items.stats.heartPieces + '/24']);
    res.push(['Heart Containers', this.items.stats.heartContainers + '/11']);
    return res;
  }
  generateDungeonCompletionTable() {
    var res = [];
    res.push(['Maps', this.items.stats.maps + '/12']);
    res.push(['Compasses', this.items.stats.compasses + '/11']);
    res.push(['Small Keys', this.items.stats.sks + '/61']);
    res.push(['Big Keys', this.items.stats.bks + '/12']);
    res.push(['Big Chests', this.items.stats.bigChests + '/11']);
    res.push(['Pendants', this.getPendantCount() + '/3']);
    res.push(['Crystals', this.getCrystalCount() + '/7']);
    res.push(['Bosses', this.items.stats.bosses + '/13']);
    return res;
  }

  getDungeonInfoTables() {
    var res = [];
    res.push(['General Dungeon Data', this.generateDungeonCompletionTable()]);
    res.push(['Dungeon Completion', this.generateDungeonDataTable()]);
    res.push(['Boss Kill Stats', this.generateBossSwordsTable()]);
    return res;
  }

  getItemInfoTables() {
    var res = [];
    res.push(['Locations Pre Items', this.generateItemProgressTable()]);
    return res;
  }

  generateDungeonDataTable() {
    var res = [];

    var fullClears = 0;
    var partialClears = 0;
    var clearedItems = 0;
    var partialEntry = 0;
    var untouched = 0;
    this.items.dungeonItemsArray.forEach((dunItems, i) => {
      if (i !== 0 && i !== 4 && i !== 12) {
        if (dunItems.itemsLeft === 0 && dunItems.isBossDefeated) {
          fullClears++;
        } else if (dunItems.isBossDefeated) {
          partialClears++;
        } else if (dunItems.itemsLeft === 0 && !dunItems.isBossDefeated) {
          clearedItems++;
        } else if (dunItems.itemsLeft === this.items.startingItemCount[i] 
          && !dunItems.isBossDefeated && !dunItems.hasCompass && !dunItems.hasMap
          && !dunItems.hasBigKey && dunItems.smallKeys === 0) {
          untouched++;
        } else {
          partialEntry++;
        }
      }
    });

    res.push(['Full Clears', fullClears]);
    res.push(['Killed Boss, left Items', partialClears]);
    res.push(['Cleaned Items', clearedItems]);
    res.push(['Abandoned Dungeons', partialEntry]);
    res.push(['Untouched Dungeons', untouched]);

    return res;
  }
  generateBossSwordsTable() {
    var res = [];
    res.push(['Swordless Kills', this.items.stats.sword0B + '/' + this.items.stats.bosses]);
    res.push(['Fighter Sword Kills', this.items.stats.sword1B + '/' + this.items.stats.bosses]);
    res.push(['Master Sword Kills', this.items.stats.sword2B + '/' + this.items.stats.bosses]);
    res.push(['Tempered Sword Kills', this.items.stats.sword3B + '/' + this.items.stats.bosses]);
    res.push(['Gold Sword Kills', this.items.stats.sword4B + '/' + this.items.stats.bosses]);
    return res;
  }

  generateItemProgressTable() {
    var res = [];
    res.push(['boots', 'Boots', this.items.stats.preBoots]);
    res.push(['mirror', 'Mirror', this.items.stats.preMirror]);
    res.push(['flute', 'Flute', this.items.stats.preFlute]);
    res.push(['glove2', 'Titan Mitts', this.items.stats.preMitts]);
    res.push(['glove1', 'Power Gloves', this.items.stats.preGlove]);
    res.push(['bow', 'Bow', this.items.stats.preBow]);
    res.push(['hammer', 'Hammer', this.items.stats.preHammer]);
    res.push(['sword2', 'Master Sword', this.items.stats.preMS]);
    res.push(['fireRod', 'Fire Rod', this.items.stats.preFireRod]);
    res.push(['iceRod', 'Ice Rod', this.items.stats.preIceRod]);
    res.push(['flippers', 'Flippers', this.items.stats.preFlippers]);
    res.push(['somaria', 'Cane of Somaria', this.items.stats.preSomaria]);
    res.push(['hookshot', 'Hookshot', this.items.stats.preHook]);
    res.push(['lamp', 'Lamp', this.items.stats.preLamp]);
    res.push(['moonPearl', 'Moon Pearl', this.items.stats.prePearl]);
    res.push(['agahnim', 'Dark World Access', this.items.stats.preDW]);
    res.push(['bigKey', 'Ganons Tower Big Key', this.items.stats.totalItemsPreGTBK]);
    res.push(['Ganon', 'Ganon', this.items.stats.preGanon]);

    var dunPrizes = this._gameService.getDungeonPrizes();

    Object.keys(dunPrizes).forEach((dunName) => {
      if (dunPrizes[dunName].indexOf('Crystal') > -1) {
        res.push(['crystal', dunName, this.items.preEachDun[+dunPrizes[dunName].charAt(8)-1]]);    
      }
    });

    res.sort((a, b) => {
      if (a[2] === 0) return 1;
      if (b[2] === 0) return -1;
      return a[2] - b[2];
    });

    return res.map((line) => {
      if (line[2] === 0) {
        return [line[0], line[1], 'Not Found'];
      } else {
        return line;
      }
    });
  }

  getYItemCount():number {
    var counter = 0;

    var yItems = ['hookshot', 'bombs', 'shovel', 'mushroom',
      'powder', 'fireRod', 'iceRod', 'bombos', 'ether', 'quake', 'lamp', 'hammer', 'flute', 'net',
      'book', 'somaria', 'byrna', 'cape', 'mirror'];

    yItems.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    counter += this.items.bottle;
    counter += this.items.boomerang;

    if (this.items.bow > 1) {
      counter++;
    }    

    return counter;
  }

  getOtherItemCount():number {
    var counter = 0;

    var otherItems = ['moonPearl', 'flippers', 'halfMagic', 'boots'];
    otherItems.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    counter += this.items.glove;

    return counter;
  }

  getPendantCount():number {
    var counter = 0;

    var list = ['pendantCourage', 'pendantPower', 'pendantWisdom'];
    list.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    return counter;
  }

  getCrystalCount():number {
    var counter = 0;

    var list = ['crystal1', 'crystal2', 'crystal3', 'crystal4', 'crystal5', 'crystal6', 'crystal7'];
    list.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    return counter;
  }

}
