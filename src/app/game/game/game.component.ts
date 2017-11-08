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

  onAddedItem(mapNode:MapNode, type:string) {
    const itemsToTrack = ['Progressive Armor', 'Progressive Sword', 'Progressive Shield', 'Moon Pearl', 'Bow', 'Boomerang',
    'Magic Boomerang', 'Hookshot', 'Shovel', 'Mushroom', 'Magic Powder', 'Fire Rod', 
    'Ice Rod', 'Bombos', 'Ether', 'Quake', 'Lamp', 'Hammer', 'Flute', 'Book Of Mudora', 'Bottle',
    'Cane Of Somaria', 'Cane Of Byrna', 'Magic Cape', 'Magic Mirror', 'Pegasus Boots', 'Progressive Glove', 'Flippers', 'Half Magic', 'Crystal 1', 
    'Crystal 2', 'Crystal 3', 'Crystal 4', 'Crystal 5', 'Crystal 6', 'Crystal 7', 'Agahnim', 
    'Pendant Of Courage', 'Pendant Of Power', 'Pendant Of Wisdom', 'Key', 'Big Key', 'Map', 'Compass'];
    mapNode.prize.forEach((prizeName) => {
      if (itemsToTrack.indexOf(prizeName) > -1) {
        this.itemLog.unshift({
          item: prizeName,
          location: mapNode.tooltip ? mapNode.tooltip : mapNode.id,
          region: mapNode.id,
          type: type      
        });
      }      
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
