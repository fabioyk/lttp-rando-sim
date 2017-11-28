import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
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

  currentDungeonMap: DungeonMapData;
  currentDungeon: DungeonData;
  currentDungeonItems: DungeonItems;

  currentBackgroundImage:string = 'assets/map.png';

  constructor(private gameService:GameService,
              private itemNameService:ItemNamesService) { }

  ngOnInit() {    
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
  onNodeClick(nodeClicked:MapNode) {    
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
    if (dungeonNode.originalNode.canOpen(this.items, this.config)) {
      switch(+dungeonNode.status) {
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
        case DungeonNodeStatus.SWITCH:
          this.addPrizes(dungeonNode, this.currentDungeon.name);
          console.log('Switch');
          break;
        case DungeonNodeStatus.WATER_SWITCH:
        this.addPrizes(dungeonNode, this.currentDungeon.name);
          console.log('Water Switch');
          break;
        case DungeonNodeStatus.BLIND_RESCUE:
        this.addPrizes(dungeonNode, this.currentDungeon.name);
          console.log('Blind');
          break;
        case DungeonNodeStatus.TT_BOMB_FLOOR:
        this.addPrizes(dungeonNode, this.currentDungeon.name);
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

    this.currentDungeon = null;
    this.currentDungeonMap = null;
    this.currentDungeonItems = null;
  }

  defeatDungeon(isDefeatAga = false) {
    this.finishedDungeon.emit([this.currentDungeon.dungeonPrize, this.currentDungeon.name]);    
    this.currentDungeonItems.isBossDefeated = true;
    this.leaveDungeon(isDefeatAga);
  }

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
      console.log(this.currentBackgroundImage);
    }
  }

  getAll() {
    this.items.add('Progressive Sword', 'light-world');
    this.items.add('Progressive Sword', 'light-world');
    this.items.add('Progressive Glove', 'light-world');
    this.items.add('Progressive Glove', 'light-world');
    this.items.add('Bow', 'light-world');
    this.items.add('Moon Pearl', 'light-world');
    this.items.add('Hookshot', 'light-world');
    this.items.add('Fire Rod', 'light-world');
    this.items.add('Ice Rod', 'light-world');
    this.items.add('Bombos', 'light-world');
    this.items.add('Ether', 'light-world');
    this.items.add('Quake', 'light-world');
    this.items.add('Lamp', 'light-world');
    this.items.add('Hammer', 'light-world');
    this.items.add('Flute', 'light-world');
    this.items.add('Cane Of Somaria', 'light-world');
    this.items.add('Book Of Mudora', 'light-world');
    this.items.add('Magic Cape', 'light-world');
    this.items.add('Magic Mirror', 'light-world');
    this.items.add('Pegasus Boots', 'light-world');
    this.items.add('Flippers', 'light-world');
    this.items.add('Crystal 1', 'light-world');
    this.items.add('Crystal 2', 'light-world');
    this.items.add('Crystal 3', 'light-world');
    this.items.add('Crystal 4', 'light-world');
    this.items.add('Crystal 5', 'light-world');
    this.items.add('Crystal 6', 'light-world');
    this.items.add('Crystal 7', 'light-world');
    this.items.add('Pendant Of Courage', 'light-world');
    this.items.add('Pendant Of Power', 'light-world');
    this.items.add('Pendant Of Wisdom', 'light-world');
    this.items.add('Agahnim 2', 'light-world');
  }
}
