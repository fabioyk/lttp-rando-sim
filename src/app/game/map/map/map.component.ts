import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Items } from '../../game-data/items';
import { GameService } from '../../game-data/game-service.service';
import { MapNode } from '../../game-data/map-node';
import { DungeonMapData } from '../../game-data/dungeon-map-data';
import { DungeonData } from '../../game-data/dungeon-data';
import { Config } from '../../game-data/config';
import { DungeonNodeStatus } from '../../game-data/dungeon-node-status.enum';
import { DungeonItems } from '../../game-data/dungeon-items';
import { ItemNamesService } from '../../../log-parse/item-names.service';
import { DungeonNode } from '../../game-data/dungeon-node';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() items: Items;
  @Input() currentMap: string;
  @Input() config: Config;
  @Output() addedItem = new EventEmitter<[MapNode, string, string]>();
  @Output() viewItem = new EventEmitter<[MapNode, string, string]>();
  @Output() cantItem = new EventEmitter<[MapNode, string, boolean]>();
  @Output() finishedDungeon = new EventEmitter<[string, string]>();
  @Output() onGameFinished = new EventEmitter<string>();
  tooltip:string;
  isDev = false;
  hasUsedMirror = false;
  currentRegion = 'ow';

  warpButtonText:string;

  preloadedImages = [];
  currentDungeonMap: DungeonMapData;
  currentDungeon: DungeonData;
  currentDungeonItems: DungeonItems;

  mirrorNode: DungeonNode;
  mirrorMap:string;
  mirrorRegion: number;
  mirrorOrigin: number;
  dungeonMirrorMap:string;

  dungeonFinishMap:string;
  dungeonFinishRegion:number;

  constructor(private gameService:GameService,
              private itemNameService:ItemNamesService) { }

  ngOnInit() {    
    this.isDev = isDevMode();    
    if (this.config.isFullMap) {      
      [this.currentDungeonMap, this.currentDungeon] = this.gameService.getMap(this.currentMap);
      this.currentDungeonMap.preloadImages(this.currentDungeon.name);      
      this.changeMap(this.currentDungeonMap.id);
      this.currentDungeonItems = this.items.getDungeonItems(this.currentDungeon.name);      
    }
    this.clearTooltip();

    this.preloadMapsAndIcons();
  }

  ngOnChanges() {
    if (this.currentMap === 'light-world' || this.currentMap === 'dark-world') {
      if (this.currentDungeonMap) {
        this.currentDungeonMap.cleanPreload();
      }
      this.currentDungeon = null;
      this.currentDungeonMap = null;
      this.currentDungeonItems = null;
    }
  }

  onNodeClick(nodeClicked:MapNode) {
    if (nodeClicked.status.indexOf('unreachable') > -1) {
      return;
    }
    if (this.items.spFlooded) {
      this.unfloodSwamp();
    }
    if ((nodeClicked.status.indexOf('now-getable') > -1 || nodeClicked.status.indexOf('now-g-getable') > -1) 
        && !nodeClicked.isFaded) {
      this.viewItem.emit([nodeClicked, this.currentMap, this.currentRegion]);
      if (nodeClicked.status.indexOf('now-getable') > -1) {
        nodeClicked.status = 'getable';
      } else {
        nodeClicked.status = 'g-getable';
      }      
      this.gameService.updateData(this.items, this.currentMap, this.currentRegion);
    } else if (nodeClicked.status.indexOf('getable') > -1) {
      if (!nodeClicked.originalNode.isOpened && nodeClicked.status.indexOf('unreachable') === -1) {
        this.addPrizes(nodeClicked, this.currentMap);
        if (nodeClicked.originalNode) {
          nodeClicked.originalNode.isOpened = true;
        }
        nodeClicked.status = 'opened'
        if (nodeClicked.tooltip === 'Ganon') {
          this.onGameFinished.emit('');
        }
      }
    } else if (nodeClicked.status.indexOf('viewable') > -1) {
      this.viewItem.emit([nodeClicked, this.currentMap, this.currentRegion]);
    } else if (nodeClicked.status === 'warp') {
      this.currentRegion = nodeClicked.id;
      this.changeMap('dark-world');
    }
  }

  addPrizes(node:MapNode, region:string) {
    this.addedItem.emit([node, region, this.currentRegion]);    
  }

  onDungeonClick(dungeonClicked:MapNode) {
    if (dungeonClicked.status.indexOf('getable') > -1 && dungeonClicked.status.indexOf('unavailable') === -1) {
      this.changeDungeon(dungeonClicked.originalNode.startingMap.id);
    }    
  }

  nonDuns = ['lw', 'dw'];
  changeDungeon(destinationMap:string) {
    if (this.currentDungeonMap) {
      this.currentDungeonMap.cleanPreload();
    }
    if (this.currentDungeonMap && this.nonDuns.indexOf(this.currentDungeonMap.id.split('-')[0]) > -1 && this.nonDuns.indexOf(destinationMap.split('-')[0]) === -1) {
      this.dungeonFinishMap = this.currentDungeonMap.id;
      this.dungeonFinishRegion = this.items.currentRegionInMap;
      this.dungeonMirrorMap = destinationMap;
    }
    if (destinationMap === 'dw-desert') {
      this.checkMedallion('mm');
    }
    if (destinationMap === 'dw-trportal') {
      this.checkMedallion('tr');
    }
    this.resetDungeons();
    if (destinationMap !== 'sp-entry') {
      this.unfloodSwamp();
    }
    [this.currentDungeonMap, this.currentDungeon] = this.gameService.getMap(destinationMap);
    this.currentDungeonMap.preloadImages(this.currentDungeon.name);      
    this.changeMap(this.currentDungeonMap.id);
    this.items.visitDungeon(this.currentDungeon.name);
    this.checkMapsLeft();
    this.currentDungeonItems = this.items.getDungeonItems(this.currentDungeon.name);
    if (this.currentDungeon.name === 'Turtle Rock') {
      this.items.trMedallionChecked = true;
    }
    if (this.currentDungeon.name === 'Misery Mire') {
      this.items.mmMedallionChecked = true;
    }
  }

  changeMapInDungeon(destination:string) {
    if (this.currentDungeonMap) {
      this.currentDungeonMap.cleanPreload();
    }
    if (destination === 'exit') {
      this.leaveDungeon();
    } else {
      var nextPlace:DungeonMapData;
      this.currentDungeon.dungeonMaps.forEach((dunMap) => {
        if (dunMap.id === destination) {
          nextPlace = dunMap;
        }
      });
      if (nextPlace) {
        this.currentDungeonMap = nextPlace;
        this.currentDungeonMap.preloadImages(this.currentDungeon.name);
        this.changeMap(nextPlace.id);
      }
    }    
  }

  onDungeonNodeClick(dungeonNode:MapNode) {
    //this.onNodeMouseEnter(dungeonNode);
    if (dungeonNode.originalNode.canOpen(this.items, this.config)
      || (this.config.canGlitch && dungeonNode.originalNode.canGlitch 
        && dungeonNode.originalNode.canGlitch(this.items, this.config) )) {
      switch(+dungeonNode.status) {
        case DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_DOOR.toString();
        case DungeonNodeStatus.SQ_OPTION:
        case DungeonNodeStatus.HOLE:
        case DungeonNodeStatus.WATER_WARP:
        case DungeonNodeStatus.OPEN_DOOR:
          if (dungeonNode.prize[0] === 'hc-darkchest' && this.items.gameState === 2) {
            this.items.gameState = 3;
          } else if (dungeonNode.prize[0] === 'hc-sanctuary' && this.items.gameState === 3) {
            this.items.gameState = 4;
          }
          if (this.items.spFlooded && dungeonNode.prize[0].substr(0, 2) === 'dw') {
            this.unfloodSwamp();
          }
          if (dungeonNode.prize[0] === 'Ganon') {
            this.addPrizes(dungeonNode, this.currentDungeon.name);
            this.onGameFinished.emit('');            
          } else if (dungeonNode.prize[0] !== 'exit' && dungeonNode.prize[0].split('-')[0] !== this.currentDungeonMap.id.split('-')[0]) {            
            this.changeDungeon(dungeonNode.prize[0]);
            this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;
          } else {            
            this.changeMapInDungeon(dungeonNode.prize[0]);
            this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;            
          }          
          break;
        case DungeonNodeStatus.SK_LOCKED:
          if (this.currentDungeonItems.smallKeys > 0) {
            this.currentDungeonItems.smallKeys--;
            dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_DOOR.toString();
            this.currentDungeon.dungeonMaps.forEach((dunMap) => {
              if (dunMap.id === dungeonNode.prize[0]) {
                dunMap.nodes.forEach(eachNode => {
                  if (eachNode.content === this.currentDungeonMap.id) {
                    eachNode.status = DungeonNodeStatus.OPEN_DOOR.toString();
                  }
                });
              }
            });
          }  else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, false]);
          }
          break;
        case DungeonNodeStatus.BK_LOCKED:
          if (this.currentDungeonItems.hasBigKey) {
            this.changeMapInDungeon(dungeonNode.prize[0]);
            this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;            
          } else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, false]);
          }
          break;
        case DungeonNodeStatus.BIG_CHEST:
          if (this.currentDungeonItems.hasBigKey) {
            this.addPrizes(dungeonNode, this.currentDungeon.name);
            this.items.stats.bigChests++;
            dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_BIG_CHEST.toString();
          } else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, false]);
          }
          break;
        case DungeonNodeStatus.VIEWABLE_CLOSED_CHEST:
        case DungeonNodeStatus.VIEWABLE_GETABLE_CLOSED_CHEST:
        case DungeonNodeStatus.CLOSED_CHEST:
          if (dungeonNode.tooltip === 'Old Man') {
            this.items.oldManRescued = true;
          } else if (dungeonNode.tooltip === 'Blacksmiths Item') {
            this.items.blacksmithsRescued = true;
          } else if (dungeonNode.tooltip === 'Spectacle Rock Item') {
            this.currentDungeon.dungeonMaps.forEach((map) => {
              map.nodes.forEach((node) => {
                if (node.name === 'Spectacle Rock Item') {
                  node.status = DungeonNodeStatus.OPEN_CHEST;
                }
              });
            })
          } else if (dungeonNode.tooltip === 'Link\'s Uncle' && this.items.gameState === 0) {
            this.items.gameState = 1;
          } else if (dungeonNode.tooltip === 'Zelda\'s Chest' && this.items.gameState === 1) {
            this.items.gameState = 2;
          } else if (dungeonNode.tooltip === 'Potion Shop Item') {
            this.items.mushroom = false;
          }
          if (dungeonNode.originalNode.accessibleSectionArray[0] === -1 && +dungeonNode.status === DungeonNodeStatus.CLOSED_CHEST) {
            this.items.currentRegionInMap = 0;
          }
          if (this.config.isFullMap && this.currentDungeonMap.isIndoors) {
            this.addPrizes(dungeonNode, this.currentDungeonMap.name);            
          } else {
            this.addPrizes(dungeonNode, this.currentDungeon.name);            
          }
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_CHEST.toString();
          break;
        case DungeonNodeStatus.BOSS:
          if (this.currentDungeon.name === 'Aga Tower' || this.currentDungeon.name === 'Ganons Tower') {
            this.currentRegion = 'ow';
            if (this.currentDungeon.name === 'Aga Tower') {
              this.items.agahnim = 1; // Meh fix, but works for now
            }
          }
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_CHEST.toString();          
          this.defeatDungeon(this.currentDungeon.name === 'Aga Tower');
          break;
        case DungeonNodeStatus.GROUND_KEY:
          this.items.add('smallKey-'+DungeonData.allDungeonNames.indexOf(this.currentDungeon.name), this.currentDungeon.name, true);
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
        case DungeonNodeStatus.EMPTY:
          break;
        case DungeonNodeStatus.SWITCH_FLIPPED:
        case DungeonNodeStatus.SWITCH:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          var nextState;
          if (+dungeonNode.status === DungeonNodeStatus.SWITCH) {
            nextState = DungeonNodeStatus.SWITCH_FLIPPED;
          } else {
            nextState = DungeonNodeStatus.SWITCH;            
          }          
          dungeonNode.originalNode.status = nextState.toString();
          break;
        case DungeonNodeStatus.WATER_SWITCH:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.WATER_SWITCH_FLIPPED.toString();
          break;
        case DungeonNodeStatus.BLIND_RESCUE:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.BLIND_RESCUED.toString();
          break;
        case DungeonNodeStatus.TT_BOMB_FLOOR:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.TT_BOMB_FLOOR_DONE.toString();
          break;
        case DungeonNodeStatus.PORTAL:
          var name = this.currentDungeonMap.id.split('-');
          if (name[1] === 'trportal' && !this.items.isTROpened 
            && this.items[this.config.trMedallion] && this.items.sword) {
            this.items.isTROpened = true;
          }
          name[0] = 'dw';
          this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;          
          this.changeDungeon(name.join('-'));          
          break;
        case DungeonNodeStatus.MIRROR:
          var name = this.currentDungeonMap.id.split('-');
          if (name[0] === 'dw') {
            name[0] = 'lw';
            this.mirrorOrigin = this.items.currentRegionInMap;
            this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;
            setTimeout(() => {
              this.mirrorNode = new DungeonNode(dungeonNode.originalNode.name,
                dungeonNode.originalNode.x, dungeonNode.originalNode.y,
                dungeonNode.originalNode.status, DungeonNode.noReqs,
                dungeonNode.originalNode.content, dungeonNode.originalNode.errorMessage,
                [dungeonNode.originalNode.destinationSection], this.mirrorOrigin);
              this.mirrorNode.mapNode = {
                x: dungeonNode.originalNode.mapNode.x,
                y: dungeonNode.originalNode.mapNode.y,
                tooltip: dungeonNode.originalNode.mapNode.tooltip,
                id: dungeonNode.originalNode.mapNode.id,
                status: dungeonNode.originalNode.mapNode.status,
                prize: dungeonNode.originalNode.mapNode.prize,
                originalNode: this.mirrorNode,
                isFaded: dungeonNode.originalNode.mapNode.isFaded
              };
            }, 1);
          } else {
            name[0] = 'dw';
            if (this.mirrorOrigin) {
              this.items.currentRegionInMap = this.mirrorOrigin;
              this.mirrorOrigin = 0;
            } else {
              this.items.currentRegionInMap = dungeonNode.originalNode.destinationSection;
            }
          }
          this.mirrorNode = null;
          this.mirrorRegion = dungeonNode.originalNode.destinationSection;          
          this.mirrorMap = name.join('-');
          this.changeDungeon(this.mirrorMap);
          break;
        case DungeonNodeStatus.FROG:
          this.items.hasBlacksmiths = true;
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
        case DungeonNodeStatus.PURPLE_CHEST:
          this.items.hasPurpleChest = true;
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
          case DungeonNodeStatus.BIG_BOMB:
          this.items.hasBigBomb = true;
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
        case DungeonNodeStatus.BOOK_CHECKABLE_ITEM:
          if (this.items.book) {
            this.addPrizes(dungeonNode, this.currentDungeon.name);
            dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();            
          } else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, true]);
          }
          break;
        case DungeonNodeStatus.PEDESTAL:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
        case DungeonNodeStatus.DUCK:
          this.items.isFluteActivated = true;
          dungeonNode.originalNode.status = DungeonNodeStatus.EMPTY.toString();
          break;
      }
    } else if (dungeonNode.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST.toString()
      || ((dungeonNode.status === DungeonNodeStatus.BOOK_CHECKABLE_ITEM.toString()
        || dungeonNode.status === DungeonNodeStatus.PEDESTAL.toString()) && this.items.book)) {
      if (this.config.isFullMap && this.currentDungeonMap.isIndoors) {
        this.viewItem.emit([dungeonNode, this.currentDungeonMap.name, this.currentRegion]);  
      } else {
        this.viewItem.emit([dungeonNode, this.currentDungeon.name, this.currentRegion]);
      }      
    } else {
      this.cantItem.emit([dungeonNode, this.currentDungeon.name, true]);
    }
  }

  leaveDungeon(isAgaBeingDefeated:boolean = false) {
    if (this.currentDungeonMap) {
      this.currentDungeonMap.cleanPreload();
    }

    if (this.config.isFullMap) {
      if (isAgaBeingDefeated || this.currentDungeon.name === 'Ganons Tower') {
        this.changeDungeon('dw-hyrule-castle');
      } else if (this.currentDungeon.name === 'Turtle Rock') {
        this.changeDungeon('dw-trportal');
      } else {
        this.changeDungeon(this.dungeonFinishMap);
        this.items.currentRegionInMap = this.dungeonFinishRegion;
      }
      this.dungeonFinishMap = '';
      this.dungeonFinishRegion = 0;
    } else {
      if (this.gameService.lwDuns.indexOf(this.currentDungeon.name) > -1 && (this.currentDungeon.name !== 'Aga Tower' || !isAgaBeingDefeated)) {
        this.changeMap('light-world');
      } else {
        this.changeMap('dark-world');
      }
      this.unfloodSwamp();
    }
  
    this.resetDungeons();    

    if (this.currentDungeonMap) {
      this.currentDungeonMap.cleanPreload();
    }
    
    if (!this.config.isFullMap) {
      this.currentDungeon = null;
      this.currentDungeonMap = null;
      this.currentDungeonItems = null;
    }    
  }

  unfloodSwamp() {
    this.gameService.dungeonsData[5].dungeonMaps.forEach(map => {
      map.nodes.forEach(node => {
        if (node.status == DungeonNodeStatus.WATER_SWITCH_FLIPPED) {
          node.status = DungeonNodeStatus.WATER_SWITCH;
          this.items.remove('flood', 'Swamp Palace');
        }
      });
    });
  }

  resetDungeons() {
    this.items.crystalSwitch = false;

    this.gameService.dungeonsData[8].dungeonMaps.forEach(map => {
      if (map.id === 'ip-push-block') {
        map.nodes.forEach(node => {
          if (node.content == 'ip-switch-room') {
            node.status = DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK;
            this.items.ipBlockPushed = false;
          }
        });
      }
    });
  }

  resetCrystalSwitch() {
    var switchDungeons = ['Swamp Palace', 'Misery Mire', 'Ice Palace'];
    this.gameService.dungeonsData.forEach((dunData:DungeonData) => {
      if (switchDungeons.indexOf(dunData.name) > -1) {
        dunData.dungeonMaps.forEach((map) => {
          map.nodes.forEach((node) => {
            if (node.status == DungeonNodeStatus.SWITCH_FLIPPED) {
              node.status = DungeonNodeStatus.SWITCH;
            }
          })
        })
      }
    });
  }

  changeTooltip(mapNode:MapNode) {
    if (mapNode.prize[0] === 'warp') {
      this.tooltip = 'Dark World Portal';
    } else {
      this.tooltip = mapNode.tooltip;
    }    
    if (this.currentDungeon && mapNode.prize[0] === 'exit') {
      this.tooltip = 'Leave the Dungeon';
    } else if (this.currentDungeon 
      && mapNode.originalNode.canOpen 
      && mapNode.originalNode.errorMessage 
      && !mapNode.originalNode.canOpen(this.items, this.config)
      && (!mapNode.originalNode.canGlitch || !mapNode.originalNode.canGlitch(this.items, this.config)) ) {
        this.tooltip += '. ' + mapNode.originalNode.errorMessage;
    } else if (!this.currentDungeon 
        && (mapNode.status.indexOf('getable') > -1 
            && (mapNode.status.indexOf('unreachable') > -1 || mapNode.status.indexOf('unavailable') > -1))) {
      this.tooltip += '. Unreachable from here';
    }
    
  }
  clearTooltip() {
    if (this.currentMap === 'light-world') {
      this.tooltip = 'Light World';
    } else if (this.currentMap === 'dark-world') {
      this.tooltip = 'Dark World';
    } else {
      this.tooltip = this.currentDungeonMap.name;
    }
  }

  defeatDungeon(isAgaTower:boolean) {    
    this.finishedDungeon.emit([this.currentDungeon.dungeonPrize, this.currentDungeon.name]);    
    this.currentDungeonItems.isBossDefeated = true;
    this.currentDungeonItems.checkThisMap();
    this.checkMapsLeft();
    this.leaveDungeon(isAgaTower);
  }

  onSaveAndQuit() {
    if (!this.config.isFullMap) {
      this.currentRegion = 'ow';
      this.hasUsedMirror = false;    
      if (this.currentDungeon) {
        var isLwDun = this.gameService.lwDuns.indexOf(this.currentDungeon.name) > -1;
        this.leaveDungeon();
        if (!isLwDun && this.items.agahnim && this.items.mirror) {
          this.changeMap('dark-world');
        } else {
          this.changeMap('light-world');
        }
      } else {
        if (this.currentMap === 'dark-world' && this.items.agahnim && this.items.mirror) {
          this.changeMap('dark-world');      
        } else {
          this.changeMap('light-world');
        }      
      }
    } else {
      if (this.mirrorNode) {
        this.mirrorNode = null;
        this.mirrorMap = '';
      }
      var isDwDun = this.gameService.dwDuns.indexOf(this.currentDungeon.name) > -1;
      if (this.items.agahnim && this.items.mirror 
          && (this.currentMap.split('-')[0] === 'dw' || isDwDun)) {
        this.changeDungeon('dw-hyrule-castle');
      } else {
        this.changeDungeon('lw-sq');
      }
    }
    
  }

  onWarpClicked() {
    this.resetCrystalSwitch();
    this.items.crystalSwitch = false;
    if (this.config.isFullMap) {
      if (!this.items.mirror) {
        if (this.items.gameState === 2) {
          this.changeDungeon('hc-zelda');
        } else if (this.items.gameState === 3) {
          this.changeDungeon('hc-darkchest');          
        } else {
          this.changeDungeon(this.dungeonMirrorMap);          
        }
      } else {
        this.changeDungeon(this.dungeonMirrorMap);
      }      
      return;
    }
    if (this.canWarpToDW()) {
      this.changeMap('dark-world');
    } else if (this.currentMap === 'dark-world') {
      if (this.items.mirror) {
        this.hasUsedMirror = true;
      }
      this.changeMap('light-world');
    } else if (this.currentDungeon) {
      if (this.currentDungeonMap) {
        this.currentDungeonMap.cleanPreload();
      }
      this.currentDungeonMap = this.currentDungeon.startingMap;
      this.currentDungeonMap.preloadImages(this.currentDungeon.name);      
      this.changeMap(this.currentDungeonMap.id);
      this.resetCrystalSwitch();
    }
  }

  canWarp():boolean {
    if (this.config.isFullMap) {
      if (this.currentDungeonMap.id === 'hc-sanctuary') {
        return false;
      }
      if (this.items.mirror) {
        this.warpButtonText = 'Mirror';
      } else {
        this.warpButtonText = 'Death Warp';
      }
      return this.nonDuns.indexOf(this.currentDungeonMap.id.split('-')[0]) === -1;
    }
    var hasMirror = this.items.mirror;
    if (this.currentMap === 'light-world' && hasMirror && this.hasUsedMirror) {
      this.warpButtonText = 'Go Back to DW';
    }
    if (this.currentDungeon !== null) {
      if (hasMirror) {
        this.warpButtonText = 'Mirror';
      } else {
        this.warpButtonText = 'Death Warp';
      }
    }
    if (this.currentMap === 'dark-world') {
      if (hasMirror) {
        this.warpButtonText = 'Mirror to LW';
      } else {
        this.warpButtonText = 'S&Q to LW';
      }
    }
    return this.currentDungeon !== null 
      || (this.currentMap === 'dark-world' && hasMirror) 
      || (this.currentMap === 'light-world' && hasMirror && this.hasUsedMirror);
  }

  canWarpToDW() {
    return this.currentMap === 'light-world'
    && (this.items.agahnim
      || (this.items.hammer && this.items.glove && this.items.moonPearl)
      || (this.items.glove === 2 && this.items.moonPearl)
      || (this.items.flute && this.items.glove === 2)
      || (this.items.canDarkEastDeathMountain(this.config.canGlitch)));
  }

  canFlute() {
    if (!this.config.isFullMap || !this.items.flute) {
      return false;
    }
    if (this.currentDungeonMap.id.split('-')[0] === 'lw' 
        && !this.currentDungeonMap.isIndoors
        && this.items.isFluteActivated) {
      return true;
    }
    return false;
  }

  onFluteClicked() {
    this.changeDungeon('lw-flute-map');
  }

  getAvailableDungeonMapIndexes():number[] {
    var maps = [];
    var start, end;

    if (this.currentMap === 'light-world' || this.currentMap.substr(0, 2) === 'lw') {
      start = 1;
      end = 3;
    } else {
      start = 5;
      end = 11;
    }
    for (var i = start; i <= end; i++) {      
      if (this.items.dungeonItemsArray[i].mapPrizeStatus === DungeonItems.UNKNOWN 
          && this.items.dungeonItemsArray[i].hasMap) {
        maps.push(i);
      }
    }
    return maps;
  }

  onCheckMap(mapName:string) {
    if (mapName === 'gp') {
      this.gameService.dungeonsData.forEach((dunData, i) => {
        if (this.itemNameService.getItemById(dunData.dungeonPrize).shortName === 'pendantCourage') {
          this.items.dungeonItemsArray[i+1].mapPrizeStatus = DungeonItems.GREEN_PENDANT;
        }
      });
    } else if (mapName === 'rc') {
      this.gameService.dungeonsData.forEach((dunData, i) => {
        var prize = this.itemNameService.getItemById(dunData.dungeonPrize).shortName;
        if (prize === 'crystal5' || prize === 'crystal6') {
          this.items.dungeonItemsArray[i+1].mapPrizeStatus = DungeonItems.RED_CRYSTAL;
        }
      });
    } else {
      if (this.config.variation !== 'key-sanity') {
        if (mapName === 'lw') {
          this.items.lwMapOpen = true;
          this.gameService.dungeonsData.forEach((dunData, i) => {
            if (i < 3) {
              this.items.dungeonItemsArray[i+1].checkThisMap();
            }
          });
        } else if (this.canViewMap('dark-world')) {
          this.items.dwMapOpen = true;
          this.gameService.dungeonsData.forEach((dunData, i) => {
            if (i >= 4 && i <= 10) {
              this.items.dungeonItemsArray[i+1].checkThisMap();
            }
          });
        } 
      } else {
        var mapsToCheck = this.getAvailableDungeonMapIndexes();
        mapsToCheck.forEach((dunIndex) => {
          this.items.dungeonItemsArray[dunIndex].checkThisMap();
        })
      }
    }
    this.checkMapsLeft();
  }

  checkMapsLeft() {
    var crystalsKnown = 0;
    var pendantsKnown = 0;
    var crystalsSeen = 0;
    var pendantsSeen = 0;
    var gpSeen = 0;
    var redsSeen = 0;
    var unknowns = 0;    

    for (var i = 1; i <= 11; i++) {
      if (i !== 4) {
        switch (this.items.dungeonItemsArray[i].mapPrizeStatus) {
          case DungeonItems.UNKNOWN:
            unknowns++;
            break;
          case DungeonItems.RED_CRYSTAL:
            redsSeen++;
          case DungeonItems.CRYSTAL:
            crystalsKnown++;
          case DungeonItems.SOME_CRYSTAL:
            crystalsSeen++;
            break;
          case DungeonItems.GREEN_PENDANT:
            gpSeen = 1;            
          case DungeonItems.PENDANT:
            pendantsKnown++;
          case DungeonItems.SOME_PENDANT:
            pendantsSeen++;
        }
      }
    }

    var markCrystals = pendantsSeen === 3;
    var markPendants = crystalsSeen === 7;
    var colorCrystals = redsSeen === 2 || crystalsKnown >= 6 
      || (crystalsKnown === 5 && redsSeen === 0);
    var colorPendants = gpSeen === 1 || pendantsKnown >= 2;

    for (var i = 1; i <= 11; i++) {
      if (i !== 4) {
        if (this.items.dungeonItemsArray[i].mapPrizeStatus === DungeonItems.UNKNOWN) {
          if (markCrystals) {
            this.items.dungeonItemsArray[i].mapPrizeStatus = DungeonItems.SOME_CRYSTAL;
          } else if (markPendants) {
            this.items.dungeonItemsArray[i].mapPrizeStatus = DungeonItems.SOME_PENDANT;
          }          
        }
        if (colorCrystals && this.items.dungeonItemsArray[i].mapPrizeStatus === DungeonItems.SOME_CRYSTAL) {
          this.items.dungeonItemsArray[i].mapPrizeStatus = DungeonItems.CRYSTAL;
        } else if (colorPendants && this.items.dungeonItemsArray[i].mapPrizeStatus === DungeonItems.SOME_PENDANT) {
          this.items.dungeonItemsArray[i].mapPrizeStatus = DungeonItems.PENDANT;
        }
      }
    }
  }

  canViewMap(world:string):boolean {
    if (this.config.isFullMap) {
      if (world === 'light-world') {
        return this.currentDungeonMap.id.split('-')[0] === 'lw'          
          && !this.currentDungeonMap.isIndoors && (this.getAvailableDungeonMapIndexes().length > 0 || this.config.variation !== 'key-sanity');
      } else if (world === 'dark-world') {
        return this.currentDungeonMap.id.split('-')[0] === 'dw' 
          && !this.currentDungeonMap.isIndoors  && (this.getAvailableDungeonMapIndexes().length > 0 || this.config.variation !== 'key-sanity');
      } else if (world === 'green-pendant') {
        var foundGreen = false;
        this.items.dungeonItemsArray.forEach((eachDunItems) => {
          if (eachDunItems.mapPrizeStatus === DungeonItems.GREEN_PENDANT) {
            foundGreen = true;
          }
        });
        return this.currentDungeonMap.id === 'lw-saha' && !foundGreen;
      } else {
        var foundReds = 0;
        this.items.dungeonItemsArray.forEach((eachDunItems) => {
          if (eachDunItems.mapPrizeStatus === DungeonItems.RED_CRYSTAL) {
            foundReds++;
          }
        });
        return this.currentDungeonMap.id === 'dw-bomb-shop' && foundReds < 2;        
      }
    }
    if (this.config.variation !== 'key-sanity') {
      return this.currentMap === world;
    } else {      
      if (this.currentMap === world) {
        return this.getAvailableDungeonMapIndexes().length > 0;
      }
      if (world === 'green-pendant') {
        var foundGreen = false;
        this.items.dungeonItemsArray.forEach((eachDunItems) => {
          if (eachDunItems.mapPrizeStatus === DungeonItems.GREEN_PENDANT) {
            foundGreen = true;
          }
        });
        return !foundGreen && this.currentMap === 'light-world';
      }
      if (world === 'red-crystals') {
        var foundReds = 0;
        this.items.dungeonItemsArray.forEach((eachDunItems) => {
          if (eachDunItems.mapPrizeStatus === DungeonItems.RED_CRYSTAL) {
            foundReds++;
          }
        });
        return foundReds < 2 && this.currentMap === 'dark-world' && this.items.canSouthDarkWorld(this.config.canGlitch) && this.currentRegion === 'ow';
      }
    }

    return false;
  }

  checkMedallion(dunName:string) {
    if (dunName === 'tr' && (this.canViewTRMedallion() || this.config.isFullMap)) {
      this.items.trMedallionChecked = true;
    }
    if (dunName === 'mm' && (this.canViewMMMedallion() || this.config.isFullMap)) {
      this.items.mmMedallionChecked = true;
    }
    this.gameService.updateData(this.items, this.currentMap, this.currentRegion);
  }

  canViewTRMedallion():boolean {
    if (this.config.isFullMap) {
      return false;
    }
    return this.items.canDarkEastDeathMountain(this.config.canGlitch) && this.currentMap === 'dark-world'
      && (this.currentRegion === 'dm' || this.currentRegion === 'all');    
  }
  canViewMMMedallion():boolean {
    if (this.config.isFullMap) {
      return false;
    }
    return this.items.canMire() && this.currentMap === 'dark-world' 
      && (this.currentRegion === 'mire' || this.currentRegion === 'all');
  }

  changeMap(newMap:string) {
    if (newMap === 'dw-desert') {
      this.checkMedallion('mm');
    } else if (newMap === 'dw-trportal') {
      this.checkMedallion('tr');
    }
    this.currentMap = newMap;
    this.gameService.updateData(this.items, this.currentMap, this.currentRegion);
    this.clearTooltip();
  }

  getMapBg():string {
    if (this.currentMap === 'light-world') {
      return 'url(assets/light-world.png)';
    } else if (this.currentMap === 'dark-world') {
      return 'url(assets/dark-world.png)';      
    } else {
      if (this.currentMap === 'ip-switch-room' && this.items.ipBlockPushed) {
        return 'url("assets/maps/Ice Palace/ip-switch-room-block.png")';              
      } else if (DungeonData.pegMaps.indexOf(this.currentMap) === -1) {
        return 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+'.png")';      
      } else {
        if (DungeonData.floodMaps.indexOf(this.currentMap) > -1 && this.items.spFlooded) {
          return 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+'-flooded'+(this.items.crystalSwitch ? '-flipped' : '') + '.png")';          
        } else {
          return 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+(this.items.crystalSwitch ? '-flipped' : '') + '.png")';
        }        
      }
      
    }
  }

  onMapClicked(event) {
    if (this.isDev) {
      console.log(event.offsetX/555*100, event.offsetY/555*100);
    }    
  }

  preloadMapsAndIcons() {
    var images = ['assets/node-icons/big_door.png', 'assets/node-icons/closed_big_chest.png',
      'assets/node-icons/closed_chest.png', 'assets/node-icons/key_door.png',
      'assets/node-icons/open_chest.png', 'assets/node-icons/open_big_chest.png',
      'assets/node-icons/small_key.png', 'assets/node-icons/warp.png',
      'assets/item-icons/compass.png', 'assets/item-icons/compassEmpty.png', 
      'assets/item-icons/bigKey.png', 'assets/item-icons/bigKeyEmpty.png', 
      'assets/item-icons/map.png', 'assets/item-icons/mapEmpty.png',
      'assets/node-icons/open_door.png'];
    if (!this.config.isFullMap) {
      images.push('assets/light-world.png');
      images.push('assets/dark-world.png');
    }
    this.preloadedImages = [];
    images.forEach((imageUrl, index) => {
      this.preloadedImages[index] = new Image();
      this.preloadedImages[index].src = imageUrl;
    });
  }

  getAll() {
    var list = [
      'sword', 'sword', 'glove', 'glove', 'bow', 'moonPearl','hookshot','fireRod',
      'iceRod', 'bombos','ether','quake', 'lamp','hammer', 'flute','somaria', 'book', 
      'cape', 'mirror', 'mushroom', 'boots', 'flippers','crystal1', 'crystal2', 
      'crystal3', 'crystal4', 'crystal5','crystal6','crystal7', 'pendantCourage',
      'pendantPower', 'pendantWisdom','agahnim2', 'smallKey-2','smallKey-3',
      'smallKey-4', 'smallKey-4',  'smallKey-5','smallKey-5','smallKey-5','smallKey-5',
      'smallKey-5','smallKey-5','smallKey-6','smallKey-7','smallKey-7','smallKey-7',
      'smallKey-8','smallKey-9','smallKey-9','smallKey-10','smallKey-10','smallKey-10',
      'smallKey-11','smallKey-11','smallKey-11','smallKey-11','smallKey-12',
      'smallKey-12','smallKey-12','smallKey-12', 'bigKey-1', 'bigKey-2', 'bigKey-3', 
      'bigKey-5', 'bigKey-6', 'bigKey-7', 'bigKey-8', 'bigKey-9', 'bigKey-10', 'bigKey-11', 
      'bigKey-12', 
    ]
    list.forEach((item) => {
      this.items.add(item, 'light-world');
    });
    this.items.isFluteActivated = true;
    this.items.gameState = 4;
    this.gameService.updateData(this.items, this.currentMap, this.currentRegion);
    
  }

  getBootsDw() {
    this.items.add('glove', 'light-world');
    this.items.add('glove', 'light-world');
    this.items.add('flute', 'light-world');
    this.items.isFluteActivated = true;    
    this.items.add('book', 'light-world');
    this.items.add('hookshot', 'light-world');
    this.items.add('mirror', 'light-world');
    
    //this.items.add('boots', 'light-world');
    this.items.add('moonPearl', 'light-world');
    
  }
}
