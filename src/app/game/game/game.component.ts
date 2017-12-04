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
    } else {
      gameMode = 'standard';
    }

    this.sub = this._route.queryParams.subscribe(
      params => {
        if (!params.seed) {
          this._router.navigate(['/']);
        }
        var canGlitch = false;
        if (params.minorGlitches) {
          canGlitch = true;
        }
        if (params.seed && +params.seed === this._seedService.lastSeedNum) {
          this.gameInit(this._seedService.lastSeedData, this._seedService.lastSeedNum, canGlitch);
        } else {
          this._seedService.getSeed(gameMode, params.seed)
            .subscribe((seed) => {
              this.gameInit(seed.data, seed.seed, canGlitch);
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

  gameInit(seedData:string, seedNumber:number, canGlitch:boolean) {
    if (seedData) {
      this.gameService.loadSeed(seedData, seedNumber, canGlitch);
      this.items = new Items();
      this.items.setup();
      this.config = this.gameService.config;
      this.itemLog = [];
      this.dungeonsData = this.gameService.dungeonsData;
      this.gameState = 'playing';

      this.seedDescription = '(' 
        + (this.config.mode === 'standard' ? 'Standard' : 'Open') 
        + ', ' + (this.config.canGlitch ? 'Minor Glitches' : 'No Glitches') 
        + ', Seed ' + seedNumber + ')';
    } else {
      this._router.navigate(['/']);      
    }
  }

  onAddedItem([mapNode, region], type:string) {
    mapNode.prize.forEach((prize, i) => {
      setTimeout(() => {
        if (type !== 'view') {
          this.items.add(this._itemNamesService.getItemById(prize).shortName, region);
        }
        var itemData = this.convertItemName(prize, type);
        this.itemLog.unshift({
          item: prize,
          shortName: itemData[0],
          longName: itemData[1],
          location: mapNode.tooltip ? mapNode.tooltip : mapNode.id,
          region: region,
          type: type      
        });
      }, 1*i);
    });
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
      msg = 'Tried to open ' + mapNode.tooltip + '. ' + mapNode.originalNode.errorMessage;
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

  convertItemName(itemName:string, type:string):[string, string] {
    var res = this._itemNamesService.getItemById(itemName);
    var longName = res.longName, shortName = res.shortName;

    var modifier = type === 'view' ? 1 : 0;
    
    if (res.longName.indexOf('Progressive') > -1) {
      switch (res.shortName) {
        case 'glove':
          switch(this.items.glove + modifier) {
            case 1:
              longName = 'Power Gloves';
              break;
            case 2:
              longName = 'Titan Mitts';
              break;
          }
          shortName = 'glove' + (this.items.glove + modifier);
          break;
        case 'sword':
          switch(this.items.sword + modifier) {
            case 1:
              longName = 'Fighter Sword';
              break;
            case 2:
              longName = 'Master Sword';
              break;
            case 3:
              longName = 'Tempered Sword';
              break;
            case 4:
              longName = 'Golden Sword';
              break;
          }
          shortName = 'sword' + (this.items.sword + modifier);
          break;
        case 'tunic':
          switch(this.items.tunic + modifier) {
            case 2:
              longName = 'Blue Mail';
              break;
            case 3:
              longName = 'Red Mail';
              break;
          }
          shortName = 'tunic' + (this.items.tunic + modifier);
          break;
        case 'shield':
          switch(this.items.shield + modifier) {
            case 1:
              longName = 'Blue Shield';
              break;
            case 2:
              longName = 'Red Shield';
              break;
            case 3:
              longName = 'Mirror Shield';
              break;
          }
          shortName = 'shield' + (this.items.shield + modifier);
          break;
      }
    }

    if (res.shortName === 'bow') {
      shortName = 'bow' + (this.items.bow + modifier*2);
    }
    if (res.shortName === 'silvers') {
      shortName = 'bow1';
    }
    if (res.shortName === 'boomerang') {
      shortName = 'boomerang1';
    }
    if (res.shortName === 'magicBoomerang') {
      shortName = 'boomerang2';
    }

    if (res.shortName.indexOf('Agahnim') > -1) {
      shortName = 'agahnim1';
    }

    if (res.shortName.indexOf('crystal') > -1) {
      shortName = 'crystal';
    }
    return [shortName, longName];
  }

  onDungeonFinished([prizeName, mapName]) {
    if (prizeName.indexOf('Agahnim') === -1) {
      this.items.add(
        this._itemNamesService.getItemById(prizeName).shortName, 
        mapName);

      var itemData = this.convertItemName(prizeName, 'get');
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


  /// FINISHED

  onContinuePlaying() {
    this.gameState = 'playing';
  }

  onBackMainMenu() {
    this._router.navigate(['/']);    
  }
}
