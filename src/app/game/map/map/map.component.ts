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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() items: Items;
  @Input() currentMap: string;
  @Input() config: Config;
  @Output() addedItem = new EventEmitter<[MapNode, string]>();
  @Output() viewItem = new EventEmitter<[MapNode, string]>();
  @Output() cantItem = new EventEmitter<[MapNode, string, boolean]>();
  @Output() finishedDungeon = new EventEmitter<[string, string]>();
  @Output() onGameFinished = new EventEmitter<string>();
  tooltip:string;
  isDev = false;
  hasUsedMirror = false;
  currentRegion = 'ow';

  warpButtonText:string;

  currentDungeonMap: DungeonMapData;
  currentDungeon: DungeonData;
  currentDungeonItems: DungeonItems;

  constructor(private gameService:GameService,
              private itemNameService:ItemNamesService) { }

  ngOnInit() {    
    this.isDev = isDevMode();
    
    this.currentMap = 'light-world';
    this.tooltip = '';
  }

  ngOnChanges() {
    if (this.currentMap === 'light-world' || this.currentMap === 'dark-world') {
      this.currentDungeon = null;
      this.currentDungeonMap = null;
      this.currentDungeonItems = null;
    }
  }

  loadMap():MapNode[] {
    var nodes:MapNode[] = [];

    this.currentDungeonMap.nodes.forEach((eachNode, index) => {
      var tempX = eachNode.x, tempY = 20;
      if (tempX === 0) {
        tempX = 10 + index*10;
      } else {
        tempX = Math.floor(eachNode.x / 256 * 100);
        tempY = Math.floor(eachNode.y / 256 * 100);
      }
      nodes.push({
        x: tempX,
        y: tempY,
        tooltip: eachNode.location,
        id: eachNode.content,
        status: eachNode.status.toString(),
        prize: [eachNode.content],
        originalNode: eachNode
      })
    });

    return nodes;
  }

  onNodeClick(nodeClicked:MapNode) {
    if (nodeClicked.status.indexOf('getable') > -1) {
      if (!nodeClicked.originalNode.isOpened) {
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
      this.viewItem.emit([nodeClicked, this.currentMap]);
    } else if (nodeClicked.status === 'warp') {
      this.currentRegion = nodeClicked.id;
      this.changeMap('dark-world');
    }
  }

  addPrizes(node:MapNode, region:string) {    
    this.addedItem.emit([node, region]);
  }

  onDungeonClick(dungeonClicked:MapNode) {
    //this.onNodeMouseEnter(dungeonClicked);
    if (!dungeonClicked.originalNode.canEnter || 
      dungeonClicked.originalNode.canEnter(this.items, this.config)) {
        this.currentDungeon = dungeonClicked.originalNode;
        this.currentDungeonMap = this.currentDungeon.startingMap;
        this.changeMap(this.currentDungeonMap.id);
        this.items.visitDungeon(dungeonClicked.tooltip);
        this.currentDungeonItems = this.items.getDungeonItems(dungeonClicked.tooltip);
      }
    
  }

  changeMapInDungeon(destination:string) {
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
        this.changeMap(nextPlace.id);
      }
    }    
  }

  onDungeonNodeClick(dungeonNode:MapNode) {
    //this.onNodeMouseEnter(dungeonNode);
    if (dungeonNode.originalNode.canOpen(this.items, this.config)) {
      switch(+dungeonNode.status) {
        case DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_DOOR.toString();          
        case DungeonNodeStatus.OPEN_DOOR:
          this.changeMapInDungeon(dungeonNode.prize[0]);
          console.log('Change map to '+dungeonNode.prize);
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
          console.log('Need a key for '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.BK_LOCKED:
          if (this.currentDungeonItems.hasBigKey) {
            this.changeMapInDungeon(dungeonNode.prize[0]);
          } else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, false]);
          }
          console.log('Need BK for '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.BIG_CHEST:
          if (this.currentDungeonItems.hasBigKey) {
            this.addPrizes(dungeonNode, this.currentDungeon.name);
            this.items.stats.bigChests++;
            dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_BIG_CHEST.toString();
          } else {
            this.cantItem.emit([dungeonNode, this.currentDungeon.name, false]);
          }
          console.log('Big Chest! Need BK for '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.VIEWABLE_CLOSED_CHEST:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_CHEST.toString();
          console.log('I can see this, its a chest with '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.CLOSED_CHEST:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_CHEST.toString();
          console.log('Closed chest with '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.OPEN_CHEST:
          console.log('Already opened chest with '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.OPEN_BIG_CHEST:
          console.log('Already opened big chest with '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.BOSS:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_CHEST.toString();          
          this.defeatDungeon(this.currentDungeon.name === 'Aga Tower');
          console.log('Boss fight with '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.GROUND_KEY:
          this.items.add('smallKey', this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.COLLECTED_GROUND_KEY.toString();
          console.log('Small Key on the ground');
          break;
        case DungeonNodeStatus.COLLECTED_GROUND_KEY:
          console.log('Already got this small key');
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
          console.log('Switch');
          break;
        case DungeonNodeStatus.WATER_SWITCH:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.WATER_SWITCH_FLIPPED.toString();
          console.log('Water Switch');
          break;
        case DungeonNodeStatus.BLIND_RESCUE:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.BLIND_RESCUED.toString();          
          console.log('Blind');
          break;
        case DungeonNodeStatus.TT_BOMB_FLOOR:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          dungeonNode.originalNode.status = DungeonNodeStatus.TT_BOMB_FLOOR_DONE.toString();          
          console.log('Bomb floor on TT');
          break;
      }
    } else if (dungeonNode.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST.toString()) {
      this.viewItem.emit([dungeonNode, this.currentMap]);
    } else {
      this.cantItem.emit([dungeonNode, this.currentDungeon.name, true]);
    }
  }

  leaveDungeon(isDefeatAga = false) {
    if (this.gameService.lwDuns.indexOf(this.currentDungeon.name) > -1 && !isDefeatAga) {
      this.changeMap('light-world');
    } else {
      this.changeMap('dark-world');
    }

    if (this.currentDungeon.name === 'Swamp Palace') {
      this.currentDungeon.dungeonMaps.forEach(map => {
        map.nodes.forEach(node => {
          if (node.status == DungeonNodeStatus.WATER_SWITCH_FLIPPED) {
            node.status = DungeonNodeStatus.WATER_SWITCH;
            this.items.remove('flood', 'Swamp Palace');
          }
        });
      });
      this.items.spSwitch = false;
    } else if (this.currentDungeon.name === 'Misery Mire') {
      this.items.mmSwitch = false;
    } else if (this.currentDungeon.name === 'Ice Palace') {
      this.currentDungeon.dungeonMaps.forEach(map => {
        if (map.id === 'ip-push-block') {
          map.nodes.forEach(node => {
            if (node.content == 'ip-switch-room') {
              node.status = DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK;
              this.items.ipBlockPushed = false;
            }
          });
        }
      });
      this.items.ipSwitch = false;
    } else if (this.currentDungeon.name === 'Ganons Tower') {
      this.currentRegion = 'ow';
    }
    
    this.currentDungeon = null;
    this.currentDungeonMap = null;
    this.currentDungeonItems = null;
  }

  defeatDungeon(isDefeatAga = false) {    
    this.finishedDungeon.emit([this.currentDungeon.dungeonPrize, this.currentDungeon.name]);    
    this.currentDungeonItems.isBossDefeated = true;
    this.leaveDungeon(isDefeatAga);
  }

  onSaveAndQuit() {
    this.currentRegion = 'ow';
    if (this.currentDungeon) {
      var isLwDun = this.gameService.lwDuns.indexOf(this.currentDungeon.name) > -1;
      this.leaveDungeon(false);
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
  }

  onWarpClicked() {
    if (this.canWarpToDW()) {
      this.changeMap('dark-world');
    } else if (this.currentMap === 'dark-world') {
      if (this.items.mirror) {
        this.hasUsedMirror = true;
      }
      this.changeMap('light-world');
    } else if (this.currentDungeon) {
      console.log('warp to dungeon entrance');
      this.currentDungeonMap = this.currentDungeon.startingMap;
      this.changeMap(this.currentDungeonMap.id);      
    }
  }

  canWarp():boolean {
    var hasMirror = this.items.mirror;
    if (this.currentMap === 'light-world' && hasMirror && this.hasUsedMirror) {
      this.warpButtonText = 'Mirror Portal Back to DW';
      //this.currentRegion = 'all';
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
      || (this.items.canDarkEastDeathMountain(this.config) && this.config.canGlitch));
  }

  onCheckMap(mapName:string) {
    if (mapName === 'lw') {
      this.items.lwMapOpen = true;
    } else if (this.canViewDarkWorldMap()) {
      this.items.dwMapOpen = true;
    }
  }

  canViewLightWorldMap():boolean {
    return this.currentMap === 'light-world';
  }

  canViewDarkWorldMap():boolean {
    return this.currentMap === 'dark-world';
  }

  checkMedallion(dunName:string) {
    if (dunName === 'tr' && this.canViewTRMedallion()) {
      this.items.trMedallionChecked = true;
    }
    if (dunName === 'mm' && this.canViewMMMedallion()) {
      this.items.mmMedallionChecked = true;
    }
  }

  canViewTRMedallion():boolean {
    return this.items.canDarkEastDeathMountain(this.config) && this.currentMap === 'dark-world'
      && (this.currentRegion === 'dm' || this.currentRegion === 'all');    
  }
  canViewMMMedallion():boolean {
    return this.items.canMire() && this.currentMap === 'dark-world' 
      && (this.currentRegion === 'mire' || this.currentRegion === 'all');
  }

  changeMap(newMap:string) {
    this.currentMap = newMap;    
  }


  pegMaps = ['ip-bj', 'ip-fairy-drop', 'ip-final-switch', 'ip-push-block', 'ip-push-block-right',
    'mm-compass', 'mm-entry', 'mm-fish-spine', 'mm-map',
    'sp-left', 'sp-south-switch', 'sp-switch'];
  getMapBg():string {
    if (this.currentMap === 'light-world') {
      return 'url(assets/light-world.png)';
    } else if (this.currentMap === 'dark-world') {
      return 'url(assets/dark-world.png)';      
    } else {
      if (this.pegMaps.indexOf(this.currentMap) === -1) {
        return 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+'.png")';      
      } else {
        var shouldFlip = false;
        if (this.currentDungeon.name === 'Swamp Palace') {
          shouldFlip = this.items.spSwitch;
        } else if (this.currentDungeon.name === 'Ice Palace') {
          shouldFlip = this.items.ipSwitch;
        } else if (this.currentDungeon.name === 'Misery Mire') {
          shouldFlip = this.items.mmSwitch;
        }

        return 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+(shouldFlip ? '-flipped' : '') + '.png")';
      }
      
    }
  }

  getAll() {
    this.items.add('sword', 'light-world');
    this.items.add('sword', 'light-world');
    this.items.add('glove', 'light-world');
    this.items.add('glove', 'light-world');
    this.items.add('bow', 'light-world');
    this.items.add('moonPearl', 'light-world');
    this.items.add('hookshot', 'light-world');
    this.items.add('fireRod', 'light-world');
    this.items.add('iceRod', 'light-world');
    this.items.add('bombos', 'light-world');
    this.items.add('ether', 'light-world');
    this.items.add('quake', 'light-world');
    this.items.add('lamp', 'light-world');
    this.items.add('hammer', 'light-world');
    this.items.add('flute', 'light-world');
    this.items.add('somaria', 'light-world');
    this.items.add('book', 'light-world');
    this.items.add('cape', 'light-world');
    this.items.add('mirror', 'light-world');
    this.items.add('boots', 'light-world');
    this.items.add('flippers', 'light-world');
    this.items.add('crystal1', 'light-world');
    this.items.add('crystal2', 'light-world');
    this.items.add('crystal3', 'light-world');
    this.items.add('crystal4', 'light-world');
    this.items.add('crystal5', 'light-world');
    this.items.add('crystal6', 'light-world');
    this.items.add('crystal7', 'light-world');
    this.items.add('pendantCourage', 'light-world');
    this.items.add('pendantPower', 'light-world');
    this.items.add('pendantWisdom', 'light-world');
    this.items.add('agahnim2', 'light-world');
  }

  getBootsDw() {
    this.items.add('glove', 'light-world');
    this.items.add('glove', 'light-world');
    this.items.add('boots', 'light-world');
    this.items.add('moonPearl', 'light-world');
    
  }
}
