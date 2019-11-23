import { Component, OnInit, OnChanges } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Location } from '@angular/common';
import { GameService } from '../game-data/game-service.service';
import { Items } from '../game-data/items';
import { MapNode } from '../game-data/map-node';
import { ItemLogEntry } from '../item-log/item-log-entry';
import { Config } from '../game-data/config';
import { DungeonData } from '../game-data/dungeon-data';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Seed } from '../../shared/seed';
import { SeedApiService } from '../../shared/seed-api.service';
import { ItemNamesService } from '../../log-parse/item-names.service';
import { DungeonNodeStatus } from '../game-data/dungeon-node-status.enum';
import { ThievesTown } from '../game-data/chest-data-filling/thieves-town';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  modeSelected = 'standard';
  isDev = false;
  seedDescription = '';
  seedNum = '';
  errorMessage = '';

  currentMap:string = 'light-world';
  lastWorld:string = 'light-world';
  items:Items;
  config:Config;
  gameMode:string;
  itemLog: ItemLogEntry[];
  dungeonsData:DungeonData[];
  preloadedImages:HTMLImageElement[];
  preloadedMaps:HTMLImageElement[];

  private sub: Subscription;

  gameState:string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private gameService:GameService,
              private _seedService: SeedApiService,
              private _itemNamesService: ItemNamesService,
              private _location: Location) { }

  ngOnInit() {
    this.isDev = isDevMode();

    this.gameState = 'loading';
    this._seedService.ping();

    if (this._router.url.indexOf('open') > -1) {
      this.gameMode = 'open';
    } else if (this._router.url.indexOf('standard') > -1) {
      this.gameMode = 'standard';
    } else if (this._router.url.indexOf('inverted') > -1) {
      this.gameMode = 'inverted';
    } else if (this._router.url.indexOf('qual') > -1) {
      this.gameMode = 'quals';
    } else if (this._router.url.indexOf('mystery') > -1) {
      this.gameMode = 'mystery';
    }

    this.preloadIcons();

    this.sub = this._route.queryParams.subscribe(
      params => {
        var qParams:any = {};
        var canGlitch = true;
        
        qParams.item_placement = params.item_placement ? params.item_placement : 'advanced';        
        qParams.dungeon_items = params.dItems ? params.dItems : 'standard';
        qParams.accessibility = params.accessibility ? params.accessibility : 'items';
        qParams.weapons = params.swords ? params.swords : 'randomized';
        qParams.goal = params.goal ? params.goal : 'ganon';
        qParams.entry_crystals_tower = params.tower ? params.tower : '7';
        qParams.entry_crystals_ganon = params.ganon ? params.ganon : '7';
        qParams.enemizer = params.enemizer ? params.enemizer : 'none';
        qParams.hints = params.hints ? params.hints : 'off';        
        
        if (params.seed) {
          qParams.seed = params.seed;
          qParams.mode = 'open';
        } else {
          qParams.mode = this.gameMode;
        }

        var fullMap = false;
        if (params.fullMap) {
          fullMap = true;          
        }

        if (this._seedService.lastSeed && Date.now() - this._seedService.lastSeedTimestamp < 2000 
          && this._seedService.lastSeedParams) {
          this.gameInit(this._seedService.lastSeed.data, this._seedService.lastSeedParams, canGlitch, fullMap, 
            this._seedService.lastSeed.hints, this._seedService.lastSeed.silversHint, this._seedService.lastSeedParams.enemizer !== 'none', 
            this._seedService.lastSeed.bosses, this._seedService.lastSeed.reqTower, this._seedService.lastSeed.reqGanon, this._seedService.lastSeed.seed);
        } else {
          this._seedService.getSeed(this.gameMode, qParams, false, this.gameMode === 'quals')
            .subscribe((seed) => {              
              this.gameInit(seed.data, qParams, canGlitch, fullMap, seed.hints, seed.silversHint, 
                qParams.enemizer !== 'none', seed.bosses, seed.reqTower, seed.reqGanon, seed.seed);
            });
        }
      }
    );    
  }

  onCreditWarp() {
    this.gameState = 'finished';
  }

  ngOnChanges() {
    if (this.currentMap === 'light-world' || this.currentMap === 'dark-world') {
      this.lastWorld = this.currentMap;
    }
  }

  /// GAMEPLAY

  gameInit(seedData:string, qParams:any, canGlitch:boolean, isFullMap:boolean, hints:string[], 
    silversHint, isEnemizer:boolean, bosses:number[], reqTower:string, reqGanon:string, seedNumber:string="") {
    if (seedData) {
      this.gameService.loadSeed(seedData, seedNumber, canGlitch, isFullMap, isEnemizer, bosses, hints.length > 0);  
      this.items = new Items();
      this.config = this.gameService.config;
      this.config.isFullMap = isFullMap;
      this.config.isMystery = this.gameMode === 'mystery';
      if (hints) {
        this.config.hints = this.shuffleArray(hints);
      }
      this.config.silversHint = silversHint;
      let startingMap = 'light-world';      
      
      if (this.config.mode === 'inverted') {
        DungeonData.lwDungeons = ['Eastern Palace', 'Desert Palace', 'Tower of Hera'];
        this.config.isFullMap = false;
      }

      if (this.config.isFullMap) {
        if (this.config.mode.indexOf('standard') > -1) {
          this.currentMap = 'lw-linkshouse';            
        } else if (this.config.mode === 'inverted') {
          this.config.isFullMap = false;
        } else {
          this.currentMap = 'lw-sq';
        }
      }      
      if (!this.config.isFullMap) {
        startingMap = this.config.mode === 'inverted' ? 'dark-world' : 'light-world';
        this.currentMap = startingMap;
        this.lastWorld = startingMap;
      }

      /*if (this.config.difficulty === 'hard' || this.config.difficulty === 'insane') {
        this.gameService.addItemReplacement('Progressive Armor');
      }
      if (this.config.difficulty === 'insane') {
        this.gameService.addItemReplacement('Progressive Shield');
      }  */
      if (this.config.weapons === 'assured') {
        this.items.sword = 1;
      }
      this.config.towerCrystalsRequested = reqTower;
      this.config.ganonCrystalsRequested = reqGanon;
      
      this.items.setup(this.config.dungeonItems, this.config.isMystery, this.gameService.dungeonsData, 
        this.config.isFullMap, this.config.bosses, this.config.mode === 'inverted');      
      if (this.config.mode.indexOf('standard') === -1 || !this.config.isFullMap) {
        this.items.gameState = 4;
      }
      this.itemLog = [];
      this.dungeonsData = this.gameService.dungeonsData;
      this.gameState = 'playing';
      if (this.config.isFullMap) {
        this.gameService.updateData(this.items, startingMap, startingMap);
      } else {
        this.gameService.updateData(this.items, startingMap, 'ow');
      }
      
      setTimeout(() => {
        this.preloadMaps();
      }, 10000);

      if (!this.config.isMystery) {
        this.seedDescription = '(';
        switch(this.config.dungeonItems) {
          case 'mc': this.seedDescription += 'MC Shuffle '; break;
          case 'mcs': this.seedDescription += 'MCS Shuffle '; break;
          case 'full': this.seedDescription += 'Keysanity '; break;
        }
        switch(this.config.mode) {
          case 'open': this.seedDescription += 'Open '; break;
          case 'inverted': this.seedDescription += 'Inverted '; break;
          default: this.seedDescription += 'Standard '; break;
        }      
        if (this.config.ganonCrystalsRequested !== '7' || this.config.towerCrystalsRequested !== '7') {
          this.seedDescription += this.config.towerCrystalsRequested+'/'+this.config.ganonCrystalsRequested+' Crystals ';
        }
        switch(this.config.weapons) {
          case 'vanilla': this.seedDescription += 'Vanilla Swords '; break;        
          case 'swordless': this.seedDescription += 'Swordless '; break;
        }
        if (this.config.isEnemizer) {
          this.seedDescription += 'Enemizer ';
        }
        switch(this.config.goal) {
          case 'pedestal': this.seedDescription += 'Pedestal '; break;
          case 'dungeons': this.seedDescription += 'All Dungeons '; break;
          case 'triforce': this.seedDescription += 'Triforce Hunt '; break;
        }
        this.seedDescription = this.seedDescription.slice(0,-1);
        this.seedDescription += ')';
      } else {
        this.seedDescription = 'Mystery Seed';
      }
      
      /*switch(this.config.canGlitch) {
        case true: this.seedDescription += ' NMG)'; break;
        case false: this.seedDescription += ' No Glitches)'; break;
      }*/
      if (this.config.vtSeedNumber) {
        this.seedDescription += ' Seed: ' + this.config.vtSeedNumber;

        this._route.queryParams.subscribe(
          params => {
            if (!params.seed) {
              let newParams = JSON.parse(JSON.stringify(params));
              newParams.seed = this.config.vtSeedNumber;
              this._router.navigate([this._router.url.split('?')[0]], {queryParams: newParams});
            }
          });
      }
    } else {
      this._router.navigate(['/']);      
    }
  }

  onAddedItem([mapNode, map, region], type:string) {
    mapNode.prize.forEach((prize, i) => {
      if (type !== 'view') {
        let prizeData = this._itemNamesService.getItemById(prize);
        this.items.add(prizeData.shortName, map);
        if (this.config.difficulty === 'easy') {
          if ((prizeData.longName === 'Progressive Sword' && this.items.sword === 4)
              || (prizeData.longName === 'Progressive Shield' && this.items.shield === 3)
              || (prizeData.longName === 'Progressive Armor' && this.items.tunic === 3)
              || (prizeData.longName === 'Bottle' && this.items.bottle === 4)
              || (prizeData.longName === 'Lamp' && this.items.lamp)) {
            this.gameService.addItemReplacement(prizeData.longName);
          } else if (this.items.totalHealth >= 20) {
            this.gameService.addItemReplacement('Heart Container');
            this.gameService.addItemReplacement('Heart Container (refill)');
            this.gameService.addItemReplacement('Piece of Heart');
          }
        } else if ((this.config.difficulty === 'hard' && ((prizeData.longName === 'Progressive Sword' && this.items.sword === 3)
              || (prizeData.longName === 'Progressive Shield' && this.items.shield === 2)
              || (prizeData.longName === 'Progressive Armor' && this.items.tunic === 2)))
            || (this.config.difficulty === 'expert' && ((prizeData.longName === 'Progressive Sword' && this.items.sword === 2)
              || (prizeData.longName === 'Progressive Shield' && this.items.shield === 1)))
            || (this.config.difficulty === 'insane' && (prizeData.longName === 'Progressive Sword' && this.items.sword === 2))) {
          this.gameService.addItemReplacement(prizeData.longName);          
        }
      }
      var itemData = this._itemNamesService.convertItemName(prize, type, this.items);
      this.itemLog.unshift({
        item: prize,
        shortName: itemData[0],
        longName: itemData[1],
        location: mapNode.tooltip ? mapNode.tooltip : mapNode.id,
        region: map,
        type: type
      });
    });
    if (this.items.triforcePieces >= 20) {
      this.onGameFinished();
    }
    this.gameService.updateData(this.items, map, region);
  }

  onCantItem([mapNode, region, reason]) {
    var msg = '';
    if (+mapNode.status === DungeonNodeStatus.BK_LOCKED
      || +mapNode.status === DungeonNodeStatus.BIG_CHEST) {
      if (!reason) {
        msg = 'Missing Big Key';
      }      
    } else if (+mapNode.status === DungeonNodeStatus.SK_LOCKED) {
      if (!reason) {
        msg = 'Missing Small Key';
      }      
    }
    if (!msg) {
      var typeMsg;
      if (+mapNode.status < 10) {
        typeMsg = 'Tried to go to ';
      } else {
        typeMsg = 'Tried to open ';
      }
      msg = typeMsg + mapNode.tooltip + '. ' + mapNode.originalNode.errorMessage;
    }
    
    this.itemLog.unshift({
      item: mapNode.prize[0],
      shortName: 'cant-item',
      longName: msg,
      location: mapNode.tooltip,
      region: region,
      type: 'cant'
    });
    
  }

  onHintChecked([tooltip, region, hintText]) {
    if (tooltip === 'sign') {      
      this.itemLog.unshift({
        item: 'sign',
        shortName: 'sign',
        longName: hintText,
        location: 'Crystal Requirement',
        region: region,
        type: 'sign'
      });
    } else {
      this.itemLog.unshift({
        item: 'hint',
        shortName: 'hintTile',
        longName: hintText,
        location: tooltip,
        region: region.indexOf('-') === -1 ? region : tooltip,
        type: 'hint'
      });
    }    
  }

  onDungeonFinished([prizeName, mapName]) {
    if (prizeName.indexOf('Agahnim') === -1) {
      this.items.add(
        this._itemNamesService.getItemById(prizeName).shortName, 
        mapName);

      var itemData = this._itemNamesService.convertItemName(prizeName, 'get', this.items);
      this.itemLog.unshift({
        item: prizeName,
        shortName: itemData[0],
        longName: itemData[1],
        location: mapName + '\'s Boss',
        region: mapName,
        type: 'get'      
      });
    }    
  }

  onGameFinished() {
    this.gameState = 'finished';
  }

  preloadIcons() {
    var iconsUrl = [
      'assets/dungeon-tracker-icons/chest0.png', 'assets/dungeon-tracker-icons/chest1.png',
      'assets/dungeon-tracker-icons/chest2.png', 'assets/dungeon-tracker-icons/chest3.png',
      'assets/dungeon-tracker-icons/chest4.png', 'assets/dungeon-tracker-icons/chest5.png',
      'assets/dungeon-tracker-icons/chest6.png'
    ];
    this.preloadedImages = [];
    iconsUrl.forEach((iconUrl, i) => {
      this.preloadedImages[i] = new Image();
      this.preloadedImages[i].src = iconUrl;
    })
  }

  preloadMaps() {
    this.preloadedMaps = [];
    this.dungeonsData.forEach((eachDungeon, i) => {
      this.preloadedMaps[i] = new Image();
      this.preloadedMaps[i].src = 'assets/maps/' + eachDungeon.name + '/' + eachDungeon.startingMap.id + '.png';
    });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  /// FINISHED

  onContinuePlaying() {
    this.gameState = 'playing';
  }

  onBackMainMenu() {
    this._router.navigate(['/']);    
  }
}
