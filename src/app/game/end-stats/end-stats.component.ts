import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../game-data/items';
import { Config } from '../game-data/config';
import { GameService } from '../game-data/game-service.service';
import { ItemNamesService } from '../../log-parse/item-names.service';

@Component({
  selector: 'app-end-stats',
  templateUrl: './end-stats.component.html',
  styleUrls: ['./end-stats.component.css']
})
export class EndStatsComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;

  totals = {
    easy: {
      containers: 11,
      pieces: 24,
      swords: 4,
      mails: 3,
      shields: 3,
      aItems: 7
    },
    normal: {
      containers: 11,
      pieces: 24,
      swords: 4,
      mails: 3,
      shields: 3,
      aItems: 6

    },
    hard: {
      containers: 6,
      pieces: 20,
      swords: 3,
      mails: 2,
      shields: 2,
      aItems: 5
    },
    expert: {
      containers: 1,
      pieces: 20,
      swords: 2,
      mails: 1,
      shields: 1,
      aItems: 5
    },
    insane: {
      containers: 0,
      pieces: 0,
      swords: 2,
      mails: 1,
      shields: 0,
      aItems: 5,
    }
  }

  constructor(private _gameService:GameService,
              private _itemNamesService:ItemNamesService) { }

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
    res.push(['Overworld', this.items.stats.overworldCount +  '/100']);
    res.push(['Dungeons', this.items.stats.dungeonCount + '/116']);
    res.push(['Total', this.items.stats.totalCount + '/216']);
    return res;
  }
  generateItemCompletionTable() {
    var res = [];
    res.push(['Y Items', this.getYItemCount() + '/27']);    
    res.push(['Swords', this.items.sword + '/' + this.totals[this.config.difficulty].swords]);
    res.push(['Shields', this.items.shield + '/' + this.totals[this.config.difficulty].shields]);
    res.push(['Mails', this.items.tunic + '/' + this.totals[this.config.difficulty].mails]);
    res.push(['Heart Pieces', this.items.stats.heartPieces + '/' + this.totals[this.config.difficulty].pieces]);
    res.push(['Heart Containers', this.items.stats.heartContainers + '/' + + this.totals[this.config.difficulty].containers]);
    res.push(['Other Items', this.getOtherItemCount() + '/' + this.totals[this.config.difficulty].aItems]);
    return res;
  }
  generateDungeonCompletionTable() {
    var res = [];
    res.push(['Maps', this.items.stats.maps + '/12']);
    res.push(['Compasses', this.items.stats.compasses + '/11']);
    res.push(['Small Keys', this.items.stats.sks + (this.config.isFullMap ? '/47' : '/44')]);
    res.push(['Big Keys', this.items.stats.bks + '/11']);
    res.push(['Big Chests', this.items.stats.bigChests + '/11']);
    res.push(['Pendants', this.getPendantCount() + '/3']);
    res.push(['Crystals', this.getCrystalCount() + '/7']);
    res.push(['Bosses', this.items.stats.bosses + '/13']);
    return res;
  }
  generateSeedDataTable() {
    var res = [];
    res.push(['Item Placement', this.config.advancedItems ? 'Advanced' : 'Basic']);
    let dungeonItemsText;
    switch(this.config.dungeonItems) {
      case 'standard': dungeonItemsText = 'Standard'; break;
      case 'mc': dungeonItemsText = 'Maps/Compasses'; break;
      case 'mcs': dungeonItemsText = 'Maps/Compasses/Small Keys'; break;
      case 'full': dungeonItemsText = 'Keysanity'; break;
    }
    res.push(['Dungeon Item Shuffle', dungeonItemsText]);
    let accessibilityText;
    switch(this.config.accessibility) {
      case 'item': accessibilityText = '100% Inventory'; break;
      case 'locations': accessibilityText = '100% Locations'; break;
      case 'none': accessibilityText = 'Beatable'; break;
    }
    res.push(['Accessibility', accessibilityText]);
    let goalText;
    switch(this.config.goal) {
      case 'ganon': goalText = 'Defeat Ganon'; break;
      case 'fast_ganon': goalText = 'Fast Ganon'; break;
      case 'dungeons': goalText = 'All Dungeons'; break;
      case 'pedestal': goalText = 'Master Sword Pedestal'; break;
      case 'triforce': goalText = 'Triforce Hunt'; break;
    }
    res.push(['Goal', goalText]);
    res.push(['Open Tower', this.config.towerCrystals]);
    res.push(['Ganon Vulnerable', this.config.ganonCrystals]);
    let worldText;
    switch(this.config.mode) {
      case 'standard': worldText = 'Standard'; break;
      case 'open': worldText = 'Open'; break;
      case 'inverted': worldText = 'Inverted'; break;
    }
    res.push(['World State', worldText]);
    res.push(['Enemizer', this.config.isEnemizer ? 'On' : 'Off']);
    res.push(['Hints', this.config.hintsEnabled ? 'On' : 'Off']);
    let weaponsText;
    switch(this.config.weapons) {
      case 'randomized': weaponsText = 'Randomized'; break;
      case 'assured': weaponsText = 'Assured'; break;
      case 'vanilla': weaponsText = 'Vanilla'; break;
      case 'swordless': weaponsText = 'Swordless'; break;
    }
    res.push(['Swords', weaponsText]);
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

  getSeedDataTables() {
    var res = [];
    res.push(['Seed Information', this.generateSeedDataTable()]);
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
    var medallionsAdded = [];
    res.push(['boots', 'Boots', this.items.stats.preBoots]);
    res.push(['mirror', 'Mirror', this.items.stats.preMirror]);
    res.push(['flute', 'Flute', this.items.stats.preFlute]);
    res.push(['glove2', 'Titan Mitts', this.items.stats.preMitts]);
    res.push(['glove1', 'Power Gloves', this.items.stats.preGlove]);
    res.push(['bow', 'Bow', this.items.stats.preBow]);
    res.push(['bow2', 'Silver Arrows', this.items.stats.preSilvers]);
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
    
    if (this.config.goal === 'pedestal' || this.config.goal === 'dungeons') {
      var dunPrizes = this._gameService.getDungeonPrizes();

      Object.keys(dunPrizes).forEach((dunName) => {
        if (dunPrizes[dunName].indexOf('Pendant') > -1) {
          let pendantName = this._itemNamesService.getItemByLongName(dunPrizes[dunName]).shortName;
          res.push([pendantName, dunName, this.items.preEachPendant[pendantName]]);

          let medallion;
          if (dunName === 'Misery Mire' && !medallionsAdded.includes(this.config.mmMedallion)) {
            medallion = this._itemNamesService.getItemByShortName(this.config.mmMedallion);
          } else if (dunName === 'Turtle Rock' && !medallionsAdded.includes(this.config.trMedallion)) {
            medallion = this._itemNamesService.getItemByShortName(this.config.trMedallion);
          }
          if (medallion) {
            medallionsAdded.push(medallion.shortName);
            res.push([medallion.shortName, medallion.longName, this.items.preEachMedallion[medallion.shortName]]);
          }
        }
      });

      res.push(['triforce', 'Master Sword Pedestal', this.items.stats.totalCount]);
    }
    if (this.config.goal === 'ganon' || this.config.goal === 'dungeons') {
      var dunPrizes = this._gameService.getDungeonPrizes();

      Object.keys(dunPrizes).forEach((dunName) => {
        if (dunPrizes[dunName].indexOf('Crystal') > -1) {
          res.push(['crystal', dunName, this.items.preEachDun[+dunPrizes[dunName].charAt(8)-1]]);    

          if ((dunName === 'Misery Mire' && !medallionsAdded.includes(this.config.mmMedallion))
            || (dunName === 'Turtle Rock' && !medallionsAdded.includes(this.config.trMedallion))) {
            let medallionData = this._itemNamesService.getItemByShortName(this.config.mmMedallion);
            medallionsAdded.push(medallionData.shortName);
            res.push([medallionData.shortName, medallionData.longName, this.items.preEachMedallion[medallionData.shortName]]);
          }
        }
      });
      res.push(['bigKey', 'Ganons Tower Big Key', this.items.stats.totalItemsPreGTBK]);
      res.push(['Ganon', 'Ganon', this.items.stats.preGanon]);
    }
    

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

    if (this.items.hasBow()) {
      counter++;
    }    

    return counter;
  }

  getOtherItemCount():number {
    var counter = 0;

    var otherItems = ['moonPearl', 'flippers', 'boots'];
    otherItems.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    counter += this.items.halfMagic;
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
