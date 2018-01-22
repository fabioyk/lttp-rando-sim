import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemLocation } from '../../game-data/item-location';
import { DungeonNode } from '../../game-data/dungeon-node';
import { MapNode } from '../../game-data/map-node';
import { DungeonNodeStatus } from '../../game-data/dungeon-node-status.enum';
import { DungeonItems } from '../../game-data/dungeon-items';
import { Items } from '../../game-data/items';
import { Config } from '../../game-data/config';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() nodeType: string;
  @Input() nodeInfo: MapNode;
  @Input() dungeonItems: DungeonItems;
  @Input() items: Items;
  @Input() config: Config;
  @Output() clickedNode = new EventEmitter<MapNode>();
  @Output() nodeMouseEnter = new EventEmitter<string>();
  @Output() nodeMouseLeave = new EventEmitter<string>();

  nodeX: string;
  nodeY: string;
  locationType: string;
  locationName: string;
  color: string;
  type: string;
  chestCountNum: string;
  isLookable: boolean;
  isFaded: boolean;

  constructor() { }

  ngOnInit() {
    this.nodeX = this.nodeInfo.x + '%';
    this.nodeY = this.nodeInfo.y + '%';
    this.isLookable = false;

    if (this.nodeType && this.nodeType === 'overworld' && this.nodeInfo.prize.length > 1) {
      this.chestCountNum = 'x' + this.nodeInfo.prize.length;
    }
  }

  getNodeType() {
    if (this.nodeType === 'overworld') {
      return 'overworld-type';
    } else if (this.nodeType === 'dungeon') {
      return 'dungeon-type';
    } else {
      return 'in-dungeon-type';
    }
  }

  getDungeonBg() {
    if (this.nodeType === 'dungeon') {
      var duns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 
      'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Aga Tower', 'Ganons Tower'];
  
      return 'url("./assets/dungeon-tracker-icons/boss' + duns.indexOf(this.nodeInfo.tooltip) + '2.png")';
    }
  }

  getNodeBgClass() {
    this.isLookable = false;
    if (this.nodeType === 'inside-dungeon') {
      this.isLookable = +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST;
      if (!this.nodeInfo.originalNode.canOpen(this.items, this.config) 
          && +this.nodeInfo.status !== DungeonNodeStatus.VIEWABLE_CLOSED_CHEST) {
        return 'dungeon-unavailable';
      }
      if (!this.nodeInfo.originalNode.canOpen(this.items, this.config)
          && +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST) {        
        return 'view-state';
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.BK_LOCKED
        || +this.nodeInfo.status === DungeonNodeStatus.BIG_CHEST) {
        return this.dungeonItems.hasBigKey ? 'dun-open-state' : 'dungeon-unavailable';
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.SK_LOCKED) {
        return this.dungeonItems.smallKeys > 0 ? 'dun-open-state' : 'dungeon-unavailable';
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.WATER_SWITCH_FLIPPED
        || +this.nodeInfo.status === DungeonNodeStatus.BLIND_RESCUED
        || +this.nodeInfo.status === DungeonNodeStatus.COLLECTED_GROUND_KEY
        || +this.nodeInfo.status === DungeonNodeStatus.OPEN_CHEST
        || +this.nodeInfo.status === DungeonNodeStatus.OPEN_BIG_CHEST
        || +this.nodeInfo.status === DungeonNodeStatus.TT_BOMB_FLOOR_DONE) {
        return 'opened-state';
      }
      return 'dun-open-state';
    } else if (this.nodeType !== 'overworld') {
      var res = '';
      if (this.nodeInfo.status.indexOf('unavailable') > -1) {
        res += 'unavailable';
      }
      if (this.nodeInfo.status.indexOf('getable') > -1) {
        res += ' dungeon';
      } else {
        res += ' unavailable';
      }
      if (this.dungeonItems.isBossDefeated && this.dungeonItems.itemsLeft === 0) {
        res += ' cleared';
      } else if (this.dungeonItems.isBossDefeated) {
        res += ' dun-defeated';
      }
      return res;
    } else {
      var res = '';
      if (this.nodeInfo.status.indexOf('unreachable') > -1) {
        res += 'unavailable';
      }
      if (this.nodeInfo.originalNode.isOpened) {
        res += ' opened';
      } else if (this.nodeInfo.status.indexOf('now-getable') > -1) {
        res += ' open';
      } else if (this.nodeInfo.status.indexOf('viewable') > -1) {
        res += ' view';
      } else if (this.nodeInfo.status.indexOf('warp') > -1) {
        res += ' warp';
      } else if (this.nodeInfo.status.indexOf('invisible') > -1) {
        res += ' invisible';
      } else if (this.nodeInfo.status.indexOf('unavailable') > -1) {
        res += ' unavailable';
      } else {
        res += ' open';
      }
      this.isLookable = (this.nodeInfo.status.indexOf('now-getable') > -1 
        || this.nodeInfo.status.indexOf('viewable') > -1);
      return res;
    } 
  }

  getNodeState() {
    if (this.nodeType === 'inside-dungeon') {
      switch(+this.nodeInfo.status) {
        case DungeonNodeStatus.OPEN_DOOR:
          return 'open-door';
        case DungeonNodeStatus.SK_LOCKED:
          return 'sk-door';
        case DungeonNodeStatus.BK_LOCKED:
          return 'bk-door';
        case DungeonNodeStatus.BIG_CHEST:
          return 'big-chest';
        case DungeonNodeStatus.VIEWABLE_CLOSED_CHEST:
        case DungeonNodeStatus.VIEWABLE_GETABLE_CLOSED_CHEST:
          return 'closed-chest';
        case DungeonNodeStatus.CLOSED_CHEST:
          return 'closed-chest';
        case DungeonNodeStatus.OPEN_CHEST:
          return 'open-chest';
        case DungeonNodeStatus.OPEN_BIG_CHEST:
          return 'open-big-chest';
        case DungeonNodeStatus.BOSS:
          return 'closed-chest';
        case DungeonNodeStatus.GROUND_KEY:
          return 'spare-key';
        case DungeonNodeStatus.COLLECTED_GROUND_KEY:
          return 'empty';
        case DungeonNodeStatus.SWITCH:
          return 'switch-red';
        case DungeonNodeStatus.SWITCH_FLIPPED:
          return 'switch-blue';
        case DungeonNodeStatus.WATER_SWITCH:
          return 'water-switch-off';
        case DungeonNodeStatus.WATER_SWITCH_FLIPPED:
          return 'water-switch-on';
        case DungeonNodeStatus.BLIND_RESCUE:
          return 'blind';
        case DungeonNodeStatus.BLIND_RESCUED:
          return 'empty';
        case DungeonNodeStatus.TT_BOMB_FLOOR:
          return 'tt-floor';
        case DungeonNodeStatus.TT_BOMB_FLOOR_DONE:
          return 'tt-floor-open';
        case DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK:
          return 'push-block';
        default:
          console.log(this.nodeInfo.status);
          return '';
      }
    } else {
      return '';
    }
  }

  onNodeClick() {
    if (this.isLookable && !this.nodeInfo.isFaded) {
      if (this.nodeInfo.status.indexOf('viewable') > -1 || (this.nodeInfo.originalNode.canOpen && !this.nodeInfo.originalNode.canOpen(this.items, this.config)
      && +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST)) {
        this.nodeInfo.isFaded = true;
      }
    }
  }
}
