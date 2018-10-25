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
import { LightWorldMap } from './chest-data-filling/light-world-map';
import { DarkWorldMap } from './chest-data-filling/dark-world-map';
import { DungeonMapData } from './dungeon-map-data';
import { HyruleCastle } from './chest-data-filling/hyrule-castle';
import { DungeonNode } from './dungeon-node';

@Injectable()
export class GameService {
  config: Config;
  dungeonsData: DungeonData[];
  overworldData: OverworldData;
  dungeonAbbrevs = ['ep', 'dp', 'toh', 'ct', 'pod', 'sp', 'sw', 'tt',
    'ip', 'mm', 'tr', 'gt', 'lw', 'dw', 'hc'];
  
  lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower'];
  dwDuns = ['Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower'];
  
  prizesToReplace:any = {};

  constructor(private _itemNamesService: ItemNamesService) { }

  loadSeed(log:string, seedNumber:number, canGlitch:boolean, isFullMap:boolean, isEnemizer:boolean, bosses:number[]) {
    var spoilerLogManager = new SpoilerLog();
    var logObj = spoilerLogManager.convertShortToNormal(log, seedNumber);

    this.config = new Config();

    this.config.difficulty = logObj.difficulty;
    this.config.goal = logObj.goal === '0' ? 'ganon' : 'other';
    this.config.logic = logObj.logic;
    switch(logObj.mode) {
      case '0': this.config.mode = 'standard'; break;
      case '1': this.config.mode = 'open'; break;
      case '2': this.config.mode = 'standard-rando'; break;
      case '3': this.config.mode = 'inverted'; break;
    }    
    if (this.config.mode === 'inverted') {
      this.lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Ganons Tower'];
      this.dwDuns = ['Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Aga Tower'];
    } else {
      this.lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower'];
      this.dwDuns = ['Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower'];
    }
    this.config.variation = logObj.variation === '0' ? 'none' : 'keysanity';
    this.config.vtSeedNumber = logObj.seed;
    this.config.canGlitch = canGlitch;
    this.config.isFullMap = isFullMap;    
    this.config.isEnemizer = isEnemizer;
    this.config.bosses = bosses;
    this.prizesToReplace = {};


    //console.log('Loaded up seed '+this.config.vtSeedNumber);
    
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

    if (isEnemizer) {
      this.dungeonsData.forEach((eachDun, index) => {
        // Not aga tower or GT
        if (index !== 3 && index !== 11) {
          eachDun.dungeonMaps[eachDun.dungeonMaps.length-1].nodes.forEach(eachNode => {
            if (eachNode.status === DungeonNodeStatus.BOSS) {
              let myIndex = index;
              if (myIndex > 3) {
                myIndex--;
              }
              eachNode.canOpen = DungeonNode.bossReqs[bosses[myIndex]];
              eachNode.canGlitch = DungeonNode.glitchedBossReqs[bosses[myIndex]];
            }
          });
        }

        // GT bosses
        if (index === 11) {
          let currentBoss = 10;
          eachDun.dungeonMaps.forEach(eachMap => {
            eachMap.nodes.forEach(eachNode => {
              if (eachNode.status === DungeonNodeStatus.BOSS && currentBoss <= 12) {
                eachNode.canOpen = DungeonNode.bossReqs[bosses[currentBoss]];
                eachNode.canGlitch = DungeonNode.glitchedBossReqs[bosses[currentBoss]];
                currentBoss++;
              }
            });
          });
        } 
      });
    }

    if (isFullMap) {
      this.dungeonsData.push(LightWorldMap.setup(logObj.locations, this.config));
      this.dungeonsData.push(DarkWorldMap.setup(logObj.locations, this.config));
      this.dungeonsData.push(HyruleCastle.setup(logObj.locations, this.config));
    } else {
      this.overworldData = new OverworldData(logObj.locations, this.config);
    }
    
    this.setupData(isFullMap);

    var itemList = logObj.locations;
  }

  setupData(isFullMap:boolean) {
    if (!isFullMap) {
      this.overworldData.lwLocations.forEach((location) => {
        var status = '';
        if (location.item[0] === 'warp') {
          status = 'invisible';
        } else if (location.item[0] === 'tr-ledge') {
          status = 'tr-ledge';        
        } else {
          if (location.canView) {
            status = 'viewable';
          } else if (!location.canGet) {
            status = 'getable';
          } else {
            status = 'unavailable';
          }    
        }
        if (location.item[0].charAt(0) === '=') {
          status += ' hint';
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
        if (location.item[0].charAt(0) === '=') {
          status += ' hint';
        }
        location.mapNode = {
          x: (location.x-50)*2,
          y: location.y,
          tooltip: location.location,
          id: location.location,
          status: status,
          prize: location.item,
          originalNode: location,
          isFaded: false
        };
      });
    }
    
    var transitions = [
      DungeonNodeStatus.OPEN_DOOR,
      DungeonNodeStatus.SK_LOCKED,
      DungeonNodeStatus.BK_LOCKED,
      DungeonNodeStatus.WATER_WARP,
      DungeonNodeStatus.HOLE
    ]
    this.dungeonsData.forEach((dungeon) => {
      dungeon.dungeonMaps.forEach((map) => {
        map.nodes.forEach((eachNode, index) => {
          if (eachNode.name === '' && transitions.indexOf(+eachNode.status) > -1) {
            var target = eachNode.content;
            var found = false;
            dungeon.dungeonMaps.forEach((eachMap) => {
              if (eachMap.id === target) {
                eachNode.name = eachMap.name;
                found = true;
              }
            });
            if (!found) {
              this.dungeonsData.forEach(dunData => {
                if (!found) {
                  dunData.dungeonMaps.forEach(dunMap => {
                    if (dunMap.id === target) {
                      eachNode.name = dunMap.name;
                      found = true;
                    }
                  }) 
                }                  
              })
            }
          }
          eachNode.mapNode = {
            x: eachNode.x ? eachNode.x : index * 10 + 15,
            y: eachNode.y ? eachNode.y : (eachNode.status === DungeonNodeStatus.MIRROR ? 30 : 15),
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
    if (this.overworldData) {
      this.overworldData.lwLocations.forEach((location) => {
        if (location.item[0] === 'tr-ledge') {
          if (location.canGet(items, this.config) || (this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config))) {
            location.mapNode.status = 'tr-ledge';
          } else {
            location.mapNode.status = 'invisible';
          }
        } else if (location.item[0] === 'warp') {
          if (location.canGet(items, this.config) || (this.config.canGlitch &&location.canGlitch && location.canGlitch(items, this.config))) {
            location.mapNode.status = 'warp';
          } else {
            location.mapNode.status = 'invisible';
          }
        } else {     
          if (location.location !== 'Ether Tablet' && location.location !== 'Bombos Tablet' && (location.mapNode.status === 'now-getable' 
            || ((location.mapNode.status === 'viewable' || location.mapNode.status === 'g-viewable' || (location.mapNode.status === 'g-getable' && location.canView)
              || location.mapNode.status === 'now-g-getable') && location.canGet(items, this.config))
            || (location.canView && location.canGet(items, this.config) && location.mapNode.status === 'unavailable'))) {            
              
            if (location.mapNode.isFaded || location.mapNode.status === 'g-getable') {
              location.mapNode.status = 'getable';
            } else {
              location.mapNode.status = 'now-getable';
            }          
          } else if (!location.canGet || location.canGet(items, this.config)) {
            location.mapNode.status = 'getable';
          } else if (location.location !== 'Ether Tablet' && location.location !== 'Bombos Tablet' && (location.mapNode.status === 'now-g-getable' 
            || ((location.mapNode.status === 'viewable' || location.mapNode.status === 'g-viewable')
              && this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config))
            || (this.config.canGlitch && location.canViewGlitch && this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config) && location.mapNode.status === 'unavailable'))) {
              if (location.mapNode.isFaded) {
                location.mapNode.status = 'g-getable';
              } else {
                location.mapNode.status = 'now-g-getable';
              }         
          } else if (this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config)) {
            location.mapNode.status = 'g-getable';
          } else if (location.canView && location.canView(items, this.config)) {
            location.mapNode.status = 'viewable';
          } else if (this.config.canGlitch && location.canViewGlitch && location.canViewGlitch(items, this.config)) {
            location.mapNode.status = 'g-viewable';
          } else {
            location.mapNode.status = 'unavailable';
          }
        }
        if (location.item[0].charAt(0) === '=') {
          location.mapNode.status += ' hint';
        }
        location.item = this.checkReplacePrizes(location.item);
        location.mapNode.prize = this.checkReplacePrizes(location.mapNode.prize);
      });
      this.overworldData.dwLocations.forEach((location) => {
        if (location.item[0] === 'warp') {
          if (location.canGet(items, this.config) || (this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config))) {
            location.mapNode.status = 'warp';
          } else {
            location.mapNode.status = 'invisible';
          }
        } else {
          var status = '';
          // if (location.region.indexOf(region) === -1 && this.config.mode !== 'inverted') {
          //   status = 'unreachable';
          // }
          if (location.location !== 'Bombos Tablet' && location.location !== 'Ether Tablet' 
            && (location.mapNode.status.indexOf('now-getable') > -1 
              || (location.canView && (location.mapNode.status.indexOf('unavailable') > -1 
                || location.mapNode.status.indexOf('viewable') > -1 )
              && location.canGet(items, this.config)))
            || (location.mapNode.status.indexOf('now-g-getable') > -1 && location.canGet(items, this.config))) {
            status += ' now-getable';
          } else if (location.location !== 'Bombos Tablet' && location.location !== 'Ether Tablet'
            && (location.mapNode.status.indexOf('now-g-getable') > -1 
              || (this.config.canGlitch && location.canViewGlitch && location.mapNode.status.indexOf('unavailable') > -1
                  && (this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config))))) {
            status += ' now-g-getable';
          } else if (!location.canGet || location.canGet(items, this.config)) {
            status += ' getable';
          } else if (this.config.canGlitch && location.canGlitch && location.canGlitch(items, this.config)) {
            status += ' g-getable';
          } else if (location.canView && location.canView(items, this.config)) {
            status += ' viewable';
          } else if (this.config.canGlitch && location.canViewGlitch && location.canViewGlitch(items, this.config)) {
            status += ' g-viewable';
          } else {
            status += ' unavailable';
          }
  
          location.mapNode.status = status;

          if (location.item[0].charAt(0) === '=') {
            location.mapNode.status += ' hint';
          }
        }        
        location.item = this.checkReplacePrizes(location.item);
        location.mapNode.prize = this.checkReplacePrizes(location.mapNode.prize);
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
            
            if (this.config.mode === 'inverted') {
              status = 'reachable';
            } else {
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
    this.dungeonsData.forEach((dungeon) => {
      dungeon.dungeonMaps.forEach((map) => {        
        map.nodes.forEach((eachNode) => {
          eachNode.content = this.checkReplacePrizes([eachNode.content])[0];
          eachNode.mapNode.prize = this.checkReplacePrizes(eachNode.mapNode.prize);
        });
      });
    });
  }

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

  getMap(mapName:string):[DungeonMapData, DungeonData] {
    var dunIndex = this.dungeonAbbrevs.indexOf(mapName.split('-')[0]);
    var dunMapData, dunData;    
    if (dunIndex > -1) {
      this.dungeonsData[dunIndex].dungeonMaps.forEach((map) => {
        if (map.id === mapName) {
          dunMapData = map;
          dunData = this.dungeonsData[dunIndex];          
        }
      });
      if (dunMapData) {
        return [dunMapData, dunData];
      }
    }
    console.log('Map not found');
    return [null, null];
  }

  addItemReplacement(original:string) {
    let originalItem = this._itemNamesService.getItemByLongName(original);
    if (!this.prizesToReplace[originalItem.id]) {
      let replacementItem;
      if (originalItem.shortName === 'lamp') {
        replacementItem = this._itemNamesService.getItemByShortName('5rupees');
      } else {
        replacementItem = this._itemNamesService.getItemByShortName('20rupees');
      }    
      this.prizesToReplace[originalItem.id] = replacementItem.id.toString();
    }
  }

  checkReplacePrizes(prizeList:string[]) {
    return prizeList.map(eachVal => {
      if (this.prizesToReplace[eachVal]) {
        return this.prizesToReplace[eachVal];
      } else {
        return eachVal;
      }
    });
  }

}