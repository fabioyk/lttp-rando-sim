import { Injectable } from '@angular/core';
import { Config } from './config';
import { DungeonData } from './dungeon-data';
import { OverworldData } from './overworld-data';
import { SpoilerLog } from './spoiler-log';
import { EasternPalace } from './chest-data-filling/eastern-palace';
import { DesertPalace } from './chest-data-filling/desert-palace';
import { TowerHera } from './chest-data-filling/tower-hera';
import { CastleTower } from './chest-data-filling/castle-tower';
import { PalaceDarkness } from './chest-data-filling/palace-darkness';
import { SwampPalace } from './chest-data-filling/swamp-palace';
import { SkullWoods } from './chest-data-filling/skull-woods';
import { ThievesTown } from './chest-data-filling/thieves-town';
import { IcePalace } from './chest-data-filling/ice-palace';
import { MiseryMire } from './chest-data-filling/misery-mire';
import { TurtleRock } from './chest-data-filling/turtle-rock';
import { GanonsTower } from './chest-data-filling/ganons-tower';
import { MapNode } from './map-node';
import { Items } from './items';

@Injectable()
export class GameService {
  config: Config;
  dungeonsData: DungeonData[];
  overworldData: OverworldData;

  constructor() { }

  loadSeed(log:string) {
    var spoilerLogManager = new SpoilerLog();
    var logObj = spoilerLogManager.convertShortToNormal(log);

    this.config = new Config();

    this.config.difficulty = logObj.difficulty;
    this.config.goal = logObj.goal === '0' ? 'ganon' : 'other';
    this.config.logic = logObj.logic;
    this.config.mode = 'standard';
    this.config.variation = logObj.variation;
    this.config.vtSeedNumber = logObj.seed;

    console.log('Loaded up seed '+this.config.vtSeedNumber);
    
    const medallions = ['bombos', 'ether', 'quake'];
    this.config.mmMedallion = medallions[logObj.mmMedallion];
    this.config.trMedallion = medallions[logObj.trMedallion];

    console.log('Medallions:',this.config.mmMedallion,this.config.trMedallion);

    this.dungeonsData = [];
    this.dungeonsData.push(EasternPalace.setup(logObj.locations, this.config));
    this.dungeonsData.push(DesertPalace.setup(logObj.locations, this.config));
    this.dungeonsData.push(TowerHera.setup(logObj.locations, this.config));
    this.dungeonsData.push(CastleTower.setup(logObj.locations, this.config));
    this.dungeonsData.push(PalaceDarkness.setup(logObj.locations, this.config));
    this.dungeonsData.push(SwampPalace.setup(logObj.locations, this.config));
    this.dungeonsData.push(SkullWoods.setup(logObj.locations, this.config));
    this.dungeonsData.push(ThievesTown.setup(logObj.locations, this.config));
    this.dungeonsData.push(IcePalace.setup(logObj.locations, this.config));
    this.dungeonsData.push(MiseryMire.setup(logObj.locations, this.config));
    this.dungeonsData.push(TurtleRock.setup(logObj.locations, this.config));
    this.dungeonsData.push(GanonsTower.setup(logObj.locations, this.config));    
    this.overworldData = new OverworldData(logObj.locations, this.config);

    var itemList = logObj.locations;
  }

  setupData() {

  }

  getAccessibleNodes(items:Items, mapName:string):MapNode[] {
    var accNodes:MapNode[] = [];

    if (mapName === 'light-world') {
      this.overworldData.lwLocations.forEach((location) => {
        if (!location.canGet || location.canGet(items, this.config)) {
          accNodes.push({
            x: location.x*2,
            y: location.y,
            tooltip: location.location,
            id: location.location,
            status: 'getable',
            prize: location.item,
            originalNode: location
          })
        } else if (location.canView && location.canView(items, this.config)) {
          accNodes.push({
            x: location.x*2,
            y: location.y,
            tooltip: location.location,
            id: location.location,
            status: 'viewable',
            prize: location.item,
            originalNode: location
          })
        }
      });
    } else if (mapName === 'dark-world') {
      this.overworldData.dwLocations.forEach((location) => {
        if (!location.canGet || location.canGet(items, this.config)) {
          accNodes.push({
            x: (location.x-50)*2,
            y: location.y,
            tooltip: location.location,
            id: location.location,
            status: 'getable',
            prize: location.item,
            originalNode: location
          })
        } else if (location.canView && location.canView(items, this.config)) {
          accNodes.push({
            x: (location.x-50)*2,
            y: location.y,
            tooltip: location.location,
            id: location.location,
            status: 'viewable',
            prize: location.item,
            originalNode: location
          })
        }
      });
    }

    return accNodes;
  }

  getAccessibleDungeons(items:Items, world:string):MapNode[] {
    var accNodes:MapNode[] = [];

    const lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower'];

    if (world === 'light-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (lwDuns.indexOf(dungeon.name) > -1 && dungeon.canEnter(items, this.config)) {
          accNodes.push({
            x: dungeon.x,
            y: dungeon.y,
            tooltip: dungeon.name,
            id: dungeon.startingMap.id,
            status: 'getable',
            prize: [],
            originalNode: dungeon
          });
        }
      })
    } else if (world === 'dark-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (lwDuns.indexOf(dungeon.name) === -1 && dungeon.canEnter(items, this.config)) {
          accNodes.push({
            x: dungeon.x,
            y: dungeon.y,
            tooltip: dungeon.name,
            id: dungeon.startingMap.id,
            status: 'getable',
            prize: [],
            originalNode: dungeon
          });
        }
      })
    }

    return accNodes;
  }

}
