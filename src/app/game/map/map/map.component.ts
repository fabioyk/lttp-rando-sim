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
  @Output() finishedDungeon = new EventEmitter<[string, string]>();
  @Output() onGameFinished = new EventEmitter<string>();
  tooltip:string;
  isDev = false;

  currentDungeonMap: DungeonMapData;
  currentDungeon: DungeonData;
  currentDungeonItems: DungeonItems;

  currentBackgroundImage:string = 'assets/map.png';

  constructor(private gameService:GameService,
              private itemNameService:ItemNamesService) { }

  ngOnInit() {    
    this.isDev = isDevMode();
    
    this.currentBackgroundImage = 'url(assets/light-world.png)';
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
/*
  onMouseMove(event:MouseEvent) {
    console.log(document.elementFromPoint(event.offsetX, event.offsetY));
  }

  onNodeMouseEnter(mapNode:MapNode) {
    this.tooltip = mapNode.tooltip;
  }

  onNodeMouseLeave(mapNode:MapNode) {
    console.log('left');
    this.tooltip = mapNode.tooltip;
  }
  */
  onNodeClick(nodeClicked:MapNode) {
    //this.onNodeMouseEnter(nodeClicked);
    switch (nodeClicked.status) {
      case 'getable':
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
        break;
      case 'viewable':
        this.viewItem.emit([nodeClicked, this.currentMap]);
        break;      
    }
    
    // console.log(nodeClicked.originalNode);
    //nodeClicked.originalNode.isOpened = true;
  }

  addPrizes(node:MapNode, region:string) {    
    this.addedItem.emit([node, region]);
  }

  onDungeonClick(dungeonClicked:MapNode) {
    //this.onNodeMouseEnter(dungeonClicked);
    if (!dungeonClicked.originalNode.canEnter || 
      dungeonClicked.originalNode.canEnter(this.items, this.config)) {
        console.log('Can I enter ' + dungeonClicked.id);
        console.log(dungeonClicked.originalNode);
        this.currentDungeon = dungeonClicked.originalNode;
        this.currentDungeonMap = this.currentDungeon.startingMap;
        this.changeMap(this.currentDungeonMap.id);
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
          }
          console.log('Need a key for '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.BK_LOCKED:
          if (this.currentDungeonItems.hasBigKey) {
            this.changeMapInDungeon(dungeonNode.prize[0]);
          }
          console.log('Need BK for '+dungeonNode.prize);
          break;
        case DungeonNodeStatus.BIG_CHEST:
          if (this.currentDungeonItems.hasBigKey) {
            this.addPrizes(dungeonNode, this.currentDungeon.name);
            this.items.stats.bigChests++;
            dungeonNode.originalNode.status = DungeonNodeStatus.OPEN_BIG_CHEST.toString();
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
    }
    // TODO check if viewable but not obtainable
    console.log(dungeonNode);
  }

  leaveDungeon(isDefeatAga = false) {
    const lwDuns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower'];
    if (lwDuns.indexOf(this.currentDungeon.name) > -1 && !isDefeatAga) {
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

  /*
  onMouseLeave(node:MapNode) {
    if (node.tooltip && (node.status === 'getable' || node.status === 'viewable')) {
      this.tooltip = node.tooltip;
    } else {
      if (node.id === 'exit') {
        this.tooltip = 'Leave Dungeon';
      } else if (node.status === DungeonNodeStatus.OPEN_DOOR.toString() && node.originalNode.canOpen(this.items, this.config)) {
        this.currentDungeon.dungeonMaps.forEach((eachDunMap) => {
          if (eachDunMap.id === node.id) {
            this.tooltip = eachDunMap.name;
          }
        })
      } else {
        this.tooltip = node.tooltip;
      }
    }
    
  }
*/
  onWarpClicked() {
    if (this.currentMap === 'light-world'
      && (this.items.agahnim
        || (this.items.hammer && this.items.glove && this.items.moonPearl)
        || (this.items.glove === 2 && this.items.moonPearl))) {
      console.log('warp to dw');
      this.changeMap('dark-world');
    } else if (this.currentMap === 'dark-world') {
      console.log('warp to lw');
      this.changeMap('light-world');
    } else if (this.currentDungeon) {
      console.log('warp to dungeon entrance');
      this.currentDungeonMap = this.currentDungeon.startingMap;
      this.changeMap(this.currentDungeonMap.id);      
    }    
  }

  canWarp():boolean {
    if (this.currentMap === 'light-world'
    && (this.items.agahnim
      || (this.items.hammer && this.items.glove && this.items.moonPearl)
      || (this.items.glove === 2 && this.items.moonPearl))) {
        return true;
    } else {
      return this.currentDungeon !== null || this.currentMap === 'dark-world';
    }
  }

  onCheckMap(mapName:string) {
    if (mapName === 'lw') {
      this.items.lwMapOpen = true;
    } else if (this.canViewDarkWorldMap()) {
      this.items.dwMapOpen = true;
    }
  }

  canViewDarkWorldMap():boolean {
    return this.items.canWestDeathMountain(this.config) 
        || (this.items.glove && this.items.hammer) || this.items.glove === 2
        || this.items.agahnim > 0;
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
    return this.items.canDarkEastDeathMountain(this.config);
  }
  canViewMMMedallion():boolean {
    return this.items.canMire();
  }

  changeMap(newMap:string) {
    this.currentMap = newMap;
    if (this.currentMap === 'light-world') {
      this.currentBackgroundImage = 'url(assets/light-world.png)';
    } else if (this.currentMap === 'dark-world') {
      this.currentBackgroundImage = 'url(assets/dark-world.png)';      
    } else {
      this.currentBackgroundImage = 'url("assets/maps/'+this.currentDungeon.name+'/'+this.currentMap+'.png")';      
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
}
