import { Component, OnInit, OnChanges } from '@angular/core';
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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  modeSelected = 'standard';
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
    this.gameState = 'loading';
    console.log('game component');
    console.log(this._router.url);
    this._seedService.ping();

    var gameMode = '';
    if (this._router.url.indexOf('open') > -1) {
      gameMode = 'open';
    } else {
      gameMode = 'standard';
    }

    this.sub = this._route.queryParams.subscribe(
      params => {
        if (params.seed && +params.seed === this._seedService.lastSeedNum) {
          console.log('in cache!');
          this.gameInit(this._seedService.lastSeedData, this._seedService.lastSeedNum);
        } else if (params.seed) {
          this._seedService.getSeed(gameMode, +params.seed)
            .subscribe((seed) => {
              this.gameInit(seed.data, seed.seed);
            });
        } else {
          this._seedService.getRandomSeed(gameMode)
            .subscribe((seed) => {
              this._location.go(gameMode + '?seed=' + seed.seed);
              this.gameInit(seed.data, seed.seed);
            });
        }
      }
    );
  }

  ngOnChanges() {
    if (this.currentMap === 'light-world' || this.currentMap === 'dark-world') {
      this.lastWorld = this.currentMap;
    }
  }

  /// MAIN MENU
  onSubmit() {
    console.log(this.modeSelected);
    console.log(this.seedNum);

    if (this.seedNum) {
      this._seedService.getSeed(this.modeSelected, +this.seedNum)
        .subscribe(this.getSeed);
    } else {
      this._seedService.getRandomSeed(this.modeSelected)
        .subscribe(this.getSeed);
    }
    
  }

  getSeed(seed:Seed) {
    if (seed.error) {
      console.log(seed);
      this.errorMessage = seed.error;
    } else {
      this.gameInit(seed.data, seed.seed);
      console.log(seed);
    }
  }


  /// GAMEPLAY

  gameInit(seedData:string, seedNumber:number) {
    if (seedData) {
      this.gameService.loadSeed(seedData, seedNumber);
      this.items = new Items();
      this.items.setup();
      this.config = this.gameService.config;
      this.itemLog = [];
      this.dungeonsData = this.gameService.dungeonsData;
      this.gameState = 'playing';
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
        this.itemLog.unshift({
          item: prize,
          location: mapNode.tooltip ? mapNode.tooltip : mapNode.id,
          region: region,
          type: type      
        });
      }, 1*i);
    });
  }

  onDungeonFinished([prizeName, mapName]) {
    this.items.add(
      this._itemNamesService.getItemById(prizeName).shortName, 
      mapName);
    this.itemLog.unshift({
        item: prizeName,
        location: mapName + '\'s Boss',
        region: mapName,
        type: 'get'      
      });
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
