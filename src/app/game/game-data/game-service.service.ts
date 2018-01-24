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
import { ItemNames } from '../../log-parse/item-names.enum';
import { ItemNamesService } from '../../log-parse/item-names.service';
import { DungeonNodeStatus } from './dungeon-node-status.enum';

@Injectable()
export class GameService {
  config: Config;
  dungeonsData: DungeonData[];
  overworldData: OverworldData;

  constructor(private _itemNamesService: ItemNamesService) { }

  loadSeed(log:string, seedNumber:number, canGlitch:boolean) {
    var spoilerLogManager = new SpoilerLog();
    var logObj = spoilerLogManager.convertShortToNormal(log, seedNumber);

    this.config = new Config();

    this.config.difficulty = logObj.difficulty;
    this.config.goal = logObj.goal === '0' ? 'ganon' : 'other';
    this.config.logic = logObj.logic;
    this.config.mode = logObj.mode === '0' ? 'standard' : 'open';
    this.config.variation = logObj.variation === '0' ? 'none' : 'key-sanity';
    this.config.vtSeedNumber = logObj.seed;
    this.config.canGlitch = canGlitch;

    console.log('Loaded up seed '+this.config.vtSeedNumber);
    
    const medallions = ['bombos', 'ether', 'quake'];
    this.config.mmMedallion = medallions[logObj.mmMedallion];
    this.config.trMedallion = medallions[logObj.trMedallion];

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
    this.setupData();

    var itemList = logObj.locations;
  }

  setupData() {
    this.overworldData.lwLocations.forEach((location) => {
      var status = '';
      if (location.item[0] === 'warp') {
        status = 'invisible';
      } else {
        if (location.canView) {
          status = 'viewable';
        } else if (!location.canGet) {
          status = 'getable';
        } else {
          status = 'unavailable';
        }    
      }
      location.mapNode = {
        x: location.x*2,
        y: location.y,
        tooltip: location.location,
        id: location.location,
        status: status,
        prize: location.item,
        originalNode: location,
        isFaded: false
      };
    });
    this.overworldData.dwLocations.forEach((location) => {
      location.mapNode = {
        x: (location.x-50)*2,
        y: location.y,
        tooltip: location.location,
        id: location.location,
        status: 'unreachable unavailable',
        prize: location.item,
        originalNode: location,
        isFaded: false
      };
    });
    this.dungeonsData.forEach((dungeon) => {
      dungeon.dungeonMaps.forEach((map) => {
        map.nodes.forEach((eachNode, index) => {
          if (eachNode.name === '' && (eachNode.status === DungeonNodeStatus.OPEN_DOOR
            || eachNode.status === DungeonNodeStatus.SK_LOCKED
            || eachNode.status === DungeonNodeStatus.BK_LOCKED)) {
              var target = eachNode.content;
              dungeon.dungeonMaps.forEach((eachMap) => {
                if (eachMap.id === target) {
                  eachNode.name = eachMap.name;
                }
              });
          }
          eachNode.mapNode = {
            x: eachNode.x,
            y: eachNode.y,
            tooltip: eachNode.name,
            id: eachNode.content,
            status: eachNode.status.toString(),
            prize: [eachNode.content],
            originalNode: eachNode,
            isFaded: false
          };
        });
      });      
      dungeon.mapNode = {
        x: dungeon.x,
        y: dungeon.y,
        tooltip: dungeon.name,
        id: dungeon.startingMap.id,
        status: 'unavailable',
        prize: [],
        originalNode: dungeon,
        isFaded: false
      };
    });
  }

  updateData(items:Items, world:string, region:string='') {
    this.overworldData.lwLocations.forEach((location) => {
      if (location.item[0] === 'warp') {
        if (location.canGet(items, this.config) || (location.canGlitch && location.canGlitch(items, this.config))) {
          location.mapNode.status = 'warp';
        } else {
          location.mapNode.status = 'invisible';
        }
      } else {     
        if (location.location !== 'Ether Tablet' && (location.mapNode.status === 'now-getable' 
          || ((location.mapNode.status === 'viewable' || location.mapNode.status === 'g-viewable' || (location.mapNode.status === 'g-getable' && location.canView))
            && location.canGet(items, this.config))
          || (location.canView && location.canGet(items, this.config) && location.mapNode.status === 'unavailable'))) {
          location.mapNode.status = 'now-getable';
        } else if (!location.canGet || location.canGet(items, this.config)) {
          location.mapNode.status = 'getable';
        } else if (location.location !== 'Ether Tablet' && (location.mapNode.status === 'now-g-getable' 
          || ((location.mapNode.status === 'viewable' || location.mapNode.status === 'g-viewable')
            && location.canGlitch && location.canGlitch(items, this.config))
          || (location.canViewGlitch && location.canGlitch && location.canGlitch(items, this.config) && location.mapNode.status === 'unavailable'))) {
          location.mapNode.status = 'now-g-getable';        
        } else if (location.canGlitch && location.canGlitch(items, this.config)) {
          location.mapNode.status = 'g-getable';
        } else if (location.canView && location.canView(items, this.config)) {
          location.mapNode.status = 'viewable';
        } else if (location.canViewGlitch && location.canViewGlitch(items, this.config)) {
          location.mapNode.status = 'g-viewable';
        } else {
          location.mapNode.status = 'unavailable';
        }
      }
    });
    this.overworldData.dwLocations.forEach((location) => {
      var status = '';
      if (location.region.indexOf(region) === -1) {
        status = 'unreachable';
      }   
      if (location.location !== 'Bombos Tablet' 
        && (location.mapNode.status.indexOf('now-getable') > -1 
          || (location.canView && location.mapNode.status.indexOf('unavailable') > -1
          && location.canGet(items, this.config)))
        || (location.mapNode.status.indexOf('now-g-getable') > -1 && location.canGet(items, this.config))) {
        status += ' now-getable';
      } else if (location.location !== 'Bombos Tablet' 
        && (location.mapNode.status.indexOf('now-g-getable') > -1 
          || (location.canViewGlitch && location.mapNode.status.indexOf('unavailable') > -1
              && (location.canGlitch && location.canGlitch(items, this.config))))) {
        status += ' now-g-getable';
      } else if (!location.canGet || location.canGet(items, this.config)) {
        status += ' getable';
      } else if (location.canGlitch && location.canGlitch(items, this.config)) {
        status += ' g-getable';
      } else if (location.canView && location.canView(items, this.config)) {
        status += ' viewable';
      } else if (location.canViewGlitch && location.canViewGlitch(items, this.config)) {
        status += ' g-viewable';
      } else {
        status += ' unavailable';
      }

      location.mapNode.status = status;      
    });
    if (world === 'light-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (this.lwDuns.indexOf(dungeon.name) > -1) {
          var status = 'unavailable';
          if (dungeon.canEnter(items, this.config)) {
            status = 'getable';
          }
          dungeon.mapNode.status = status;
        }
      })
    } else if (world === 'dark-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (this.lwDuns.indexOf(dungeon.name) === -1) {
          var status = 'unavailable';

          if (region && region !== 'all') {
            if ((region === 'ip' && dungeon.name === 'Ice Palace')
              || (region === 'mire' && dungeon.name === 'Misery Mire')
              || (region === 'dm' 
                && (dungeon.name === 'Turtle Rock' || dungeon.name === 'Ganons Tower'))
              || (region === 'ow' && (dungeon.name !== 'Ice Palace' 
                  && dungeon.name !== 'Misery Mire' 
                  && dungeon.name !== 'Turtle Rock'
                  && dungeon.name !== 'Ganons Tower' ))) {
              if (dungeon.canEnter(items, this.config)) {
                status = 'getable';
              }
            }
          } else {
            if (dungeon.canEnter(items, this.config)) {
              status = 'getable';
            }
          }

          if ((region === 'ip' && dungeon.name === 'Ice Palace')
            || (region === 'mire' && dungeon.name === 'Misery Mire')
            || (region === 'dm' 
              && (dungeon.name === 'Turtle Rock' || dungeon.name === 'Ganons Tower'))
            || (region === 'ow' && (dungeon.name !== 'Ice Palace' 
                && dungeon.name !== 'Misery Mire' 
                && dungeon.name !== 'Turtle Rock'
                && dungeon.name !== 'Ganons Tower' ))) {
            status = 'reachable';
          } else {
            status = 'unavailable';
          }

          if (dungeon.canEnter(items, this.config)) {
            status += ' getable';
          } else {
            status += ' unaccessible';
          }
          dungeon.mapNode.status = status;
          

        }   
      })
    }
  }

  lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower'];
  getAccessibleDungeons(items:Items, world:string, region:string=''):MapNode[] {
    var accNodes:MapNode[] = [];

    if (world === 'light-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (this.lwDuns.indexOf(dungeon.name) > -1) {
          var status = 'unavailable';
          if (dungeon.canEnter(items, this.config)) {
            status = 'getable';
          }
          accNodes.push({
            x: dungeon.x,
            y: dungeon.y,
            tooltip: dungeon.name,
            id: dungeon.startingMap.id,
            status: status,
            prize: [],
            originalNode: dungeon,
            isFaded: false
          });
        }        
      })
    } else if (world === 'dark-world') {
      this.dungeonsData.forEach((dungeon) => {
        if (this.lwDuns.indexOf(dungeon.name) === -1) {
          var status = 'unavailable';


          if (region && region !== 'all') {
            if ((region === 'ip' && dungeon.name === 'Ice Palace')
              || (region === 'mire' && dungeon.name === 'Misery Mire')
              || (region === 'dm' 
                && (dungeon.name === 'Turtle Rock' || dungeon.name === 'Ganons Tower'))
              || (region === 'ow' && (dungeon.name !== 'Ice Palace' 
                  && dungeon.name !== 'Misery Mire' 
                  && dungeon.name !== 'Turtle Rock'
                  && dungeon.name !== 'Ganons Tower' ))) {
              if (dungeon.canEnter(items, this.config)) {
                status = 'getable';
              }
            }
          } else {
            if (dungeon.canEnter(items, this.config)) {
              status = 'getable';
            }
          }

          if ((region === 'ip' && dungeon.name === 'Ice Palace')
            || (region === 'mire' && dungeon.name === 'Misery Mire')
            || (region === 'dm' 
              && (dungeon.name === 'Turtle Rock' || dungeon.name === 'Ganons Tower'))
            || (region === 'ow' && (dungeon.name !== 'Ice Palace' 
                && dungeon.name !== 'Misery Mire' 
                && dungeon.name !== 'Turtle Rock'
                && dungeon.name !== 'Ganons Tower' ))) {
            status = 'reachable';
          } else {
            status = 'unavailable';
          }

          if (dungeon.canEnter(items, this.config)) {
            status += ' getable';
          } else {
            status += ' unaccessible';
          }
          
          accNodes.push({
            x: dungeon.x,
            y: dungeon.y,
            tooltip: dungeon.name,
            id: dungeon.startingMap.id,
            status: status,
            prize: [],
            originalNode: dungeon,
            isFaded: false
          });
        }   
      })
    }

    return accNodes;
  }

  getDungeonPrizes() {
    var obj = {};
    this.dungeonsData.forEach((dunData, i) => {
      if (i !== 3 && i !== 11) {
        obj[dunData.name] = this._itemNamesService.getItemById(dunData.dungeonPrize).longName;
      }
    });
    return obj;
  }

}
/*
1x1 room
top     50 19
left    13 53.5
right   79 53.5
bottom  50 88 or 84

2x2 room
top     50 9.5
left    7 51.5
right   93 51.5
bottom  50 95
*/