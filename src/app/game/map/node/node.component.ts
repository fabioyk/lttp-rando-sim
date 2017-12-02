import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemLocation } from '../../game-data/item-location';
import { DungeonNode } from '../../game-data/dungeon-node';
import { MapNode } from '../../game-data/map-node';
import { DungeonNodeStatus } from '../../game-data/dungeon-node-status.enum';
import { DungeonItems } from '../../game-data/dungeon-items';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() nodeType: string;
  @Input() nodeInfo: MapNode;
  @Input() dungeonItems: DungeonItems;
  @Output() clickedNode = new EventEmitter<MapNode>();
  @Output() nodeMouseEnter = new EventEmitter<string>();
  @Output() nodeMouseLeave = new EventEmitter<string>();


  nodeX: string;
  nodeY: string;
  locationType: string;
  locationName: string;
  color: string;
  type: string;

  constructor() { }

  ngOnInit() {
    this.nodeX = this.nodeInfo.x + '%';
    this.nodeY = this.nodeInfo.y + '%';
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
        default:
          console.log(this.nodeInfo.status);
          return '';
      }
    } else if (this.nodeInfo.originalNode.isOpened) {
      return 'opened-state';
    } else if (this.nodeType !== 'overworld') {
      if (this.dungeonItems.isBossDefeated && this.dungeonItems.itemsLeft === 0) {
        return 'dungeon-cleared';
      } else if (this.dungeonItems.isBossDefeated) {
        return 'dungeon-defeated';
      } else if (this.nodeInfo.status === 'unavailable') {
        return 'dungeon-unavailable';
      } else {
        return 'dungeon-state';
      }      
    } else if (this.nodeInfo.status === 'viewable') {
      return 'view-state';
    } else if (this.nodeInfo.status === 'unavailable') {
      return 'unavailable-state';
    } else {
      return 'open-state';
    }
  }
}
