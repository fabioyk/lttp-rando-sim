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

    var gameMode = '';
    if (this._router.url.indexOf('open') > -1) {
      gameMode = 'open';
    } else if (this._router.url.indexOf('standard-rando') > -1) {
      gameMode = 'standard-rando';
    } else if (this._router.url.indexOf('standard') > -1) {
      gameMode = 'standard';
    } else if (this._router.url.indexOf('keysanity') > -1) {
      gameMode = 'keysanity'
    } else if (this._router.url.indexOf('tourney') > -1) {
      gameMode = 'tourney'
    } else if (this._router.url.indexOf('inverted') > -1) {
      gameMode = 'inverted';
    }
    localStorage.setItem('modeSelected', gameMode);

    this.preloadIcons();

    this.sub = this._route.queryParams.subscribe(
      params => {
        /*if (!params.seed) {
          this._router.navigate(['/']);
        }*/
        var canGlitch = false;
        if (params.minorGlitches) {
          canGlitch = true;
        }
        var fullMap = false;
        if (params.fullMap) {
          fullMap = true;
          if (gameMode.indexOf('standard') > -1) {
            this.currentMap = 'lw-linkshouse';            
          } else if (gameMode === 'inverted') {
            fullMap = false;
          } else {
            this.currentMap = 'lw-sq';
          }
        }
        localStorage.setItem('glitchSelected', canGlitch ? 'yes' : 'no');
        //if (params.seed && +params.seed === this._seedService.lastSeedNum) {
          //this.gameInit(this._seedService.lastSeedData, this._seedService.lastSeedNum, canGlitch, fullMap, );
        //} else {
          this._seedService.getSeed(gameMode, params.seed)
            .subscribe((seed) => {
              this.gameInit(seed.data, seed.seed, canGlitch, fullMap, seed.hints);
            });
        //}
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

  gameInit(seedData:string, seedNumber:number, canGlitch:boolean, isFullMap:boolean, hints:string[]) {
    if (seedData) {      
      this.gameService.loadSeed(seedData, seedNumber, canGlitch, isFullMap);
      this.items = new Items();
      this.config = this.gameService.config;
      this.config.isFullMap = isFullMap;
      this.config.hints = this.shuffleArray(hints);
      let startingMap = 'light-world';
      if (!isFullMap) {
        startingMap = this.config.mode === 'inverted' ? 'dark-world' : 'light-world';
        this.currentMap = startingMap;
        this.lastWorld = startingMap;
      }
      
      if (this.config.mode === 'inverted') {
        DungeonData.lwDungeons = ['Eastern Palace', 'Desert Palace', 'Tower of Hera'];        
      }
      
      this.items.setup(this.config.variation === 'key-sanity', this.gameService.dungeonsData, isFullMap);      
      if (this.config.mode.indexOf('standard') === -1 || !isFullMap) {
        this.items.gameState = 4;
      }
      this.itemLog = [];
      this.dungeonsData = this.gameService.dungeonsData;
      this.gameState = 'playing';
      if (isFullMap) {
        this.gameService.updateData(this.items, startingMap, startingMap);
      } else {
        this.gameService.updateData(this.items, startingMap, 'ow');
      }
      
      setTimeout(() => {
        this.preloadMaps();
      }, 10000);

      this.seedDescription = '(' 
        + (this.config.mode === 'standard' ? 'Standard Classic' : (this.config.mode === 'standard-rando' ? 'Standard Random Weapon' : (this.config.mode === 'inverted' ? 'Inverted' : (this.config.variation === 'none' ? 'Open' : 'Keysanity'))))
        + ', ' + (this.config.canGlitch ? 'Minor Glitches' : 'No Glitches') //+ ', Seed ' + seedNumber 
        + ')';
    } else {
      this._router.navigate(['/']);      
    }
  }

  onAddedItem([mapNode, map, region], type:string) {
    mapNode.prize.forEach((prize, i) => {
      if (type !== 'view') {
        this.items.add(this._itemNamesService.getItemById(prize).shortName, map);        
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

  onHintChecked([mapNode, region, hintText]) {
    this.itemLog.unshift({
      item: 'hint',
      shortName: 'hintTile',
      longName: hintText,
      location: mapNode.tooltip,
      region: region.indexOf('-') === -1 ? region : mapNode.tooltip,
      type: 'hint'
    });
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
