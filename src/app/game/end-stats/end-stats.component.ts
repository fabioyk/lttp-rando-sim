import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../game-data/items';
import { Config } from '../game-data/config';

@Component({
  selector: 'app-end-stats',
  templateUrl: './end-stats.component.html',
  styleUrls: ['./end-stats.component.css']
})
export class EndStatsComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;

  constructor() { }

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
    res.push(['Overworld', this.items.stats.overworldCount + '/000']);
    res.push(['Dungeons', this.items.stats.dungeonCount + '/000']);
    res.push(['Total', this.items.stats.totalCount + '/000']);
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
    res.push(['Item Progress', this.generateItemProgressTable()]);
    return res;
  }

  generateDungeonDataTable() {
    var res = [];

    var fullClears = 0;
    var partialClears = 0;
    var partialEntry = 0;
    var untouched = 0;
    this.items.dungeonItemsArray.forEach((dunItems, i) => {
      if (i !== 0 && i !== 4 && i !== 12) {
        if (dunItems.itemsLeft === 0 && dunItems.isBossDefeated) {
          fullClears++;
        } else if (dunItems.isBossDefeated) {
          partialClears++;
        } else if (dunItems.itemsLeft === this.items.startingItemCount[i] 
          && !dunItems.isBossDefeated && !dunItems.hasCompass && !dunItems.hasMap
          && !dunItems.hasBigKey && dunItems.smallKeys === 0) {
          untouched++
        } else {
          partialEntry++;
        }
      }
    });

    res.push(['Dungeons Full Cleared', fullClears]);
    res.push(['Dungeons Partially Cleared', partialClears]);
    res.push(['Dungeons Entered and not Cleared', partialEntry]);
    res.push(['Dungeons Untouched', untouched]);

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
    res.push(['Items Pre Boots', this.items.stats.preBoots]);
    res.push(['Items Pre Mirror', this.items.stats.preMirror]);
    res.push(['Items Pre Flute', this.items.stats.preFlute]);
    res.push(['Items Pre Mitts', this.items.stats.preMitts]);
    res.push(['Items Pre Bow', this.items.stats.preBow]);
    res.push(['Items Pre Hammer', this.items.stats.preHammer]);
    res.push(['Items Pre Master Sword', this.items.stats.preHammer]);
    res.push(['Items Pre Fire Rod', this.items.stats.preFireRod]);
    res.push(['Items Pre Ice Rod', this.items.stats.preIceRod]);
    res.push(['Items Pre Flippers', this.items.stats.preFlippers]);
    res.push(['Items Pre Cane of Somaria', this.items.stats.preSomaria]);
    res.push(['Items Pre Hookshot', this.items.stats.preHook]);
    res.push(['Items Pre Lamp', this.items.stats.preLamp]);
    res.push(['Items Pre Dark World Access', this.items.stats.preDW]);

    res.sort((a, b) => {
      if (a[1] === 0) return 1;
      if (b[1] === 0) return -1;
      return a[1] - b[1];
    });

    return res.map((line) => {
      if (line[1] === 0) {
        return [line[0], 'Not Found'];
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
