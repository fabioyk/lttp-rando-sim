import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemLocation } from '../../game-data/item-location';
import { DungeonNode } from '../../game-data/dungeon-node';
import { MapNode } from '../../game-data/map-node';
import { DungeonNodeStatus } from '../../game-data/dungeon-node-status.enum';
import { DungeonItems } from '../../game-data/dungeon-items';
import { Items } from '../../game-data/items';
import { Config } from '../../game-data/config';
import { ItemNamesService } from '../../../log-parse/item-names.service';

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

  constructor(private itemNamesService:ItemNamesService) { }

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
      if (this.isIconShown()) {
        return 'in-dungeon-type icon-shown';
      } else {
        return 'in-dungeon-type';
      }      
    }
  }

  getDungeonBg() {
    if (this.nodeType === 'dungeon') {
      var duns = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 
      'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Aga Tower', 'Ganons Tower'];
  
      return 'url("./assets/dungeon-tracker-icons/boss' + duns.indexOf(this.nodeInfo.tooltip) + '2.png")';
    } else if (this.isIconShown()) {
      var itemId = this.nodeInfo.prize[0];
      var newShortName = this.itemNamesService.convertItemName(itemId, 'view', this.items)[0];
      return 'url("./assets/item-icons/' + newShortName.split('-')[0] + '.png")';      
    }
  }

  isIconShown() {    
    return !this.nodeInfo.originalNode.isOpened 
      && (this.nodeInfo.isFaded 
        || (this.nodeInfo.originalNode.canView 
          && this.nodeInfo.tooltip.indexOf('Tablet') === -1 
          && this.nodeInfo.status.indexOf('getable') > -1 
          && this.nodeInfo.status.indexOf('now') === -1 )
        || (+this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST)
        || (this.nodeInfo.tooltip === 'Ganon' && this.nodeInfo.status.indexOf('getable') > -1));
  }

  getNodeBgClass() {
    this.isLookable = false;
    if (this.nodeType === 'inside-dungeon') {
      //this.isLookable = +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST;
      var viewable = +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST
        || ((+this.nodeInfo.status === DungeonNodeStatus.PEDESTAL
          || +this.nodeInfo.status === DungeonNodeStatus.BOOK_CHECKABLE_ITEM) 
          && this.items.book);
      var oneOfViewable = +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST
        || +this.nodeInfo.status === DungeonNodeStatus.PEDESTAL
        || +this.nodeInfo.status === DungeonNodeStatus.BOOK_CHECKABLE_ITEM;
      if ((!this.nodeInfo.originalNode.canOpen(this.items, this.config) || oneOfViewable) 
          && +this.nodeInfo.status !== DungeonNodeStatus.VIEWABLE_CLOSED_CHEST
            && (!this.items.book || (this.items.book && +this.nodeInfo.status !== DungeonNodeStatus.PEDESTAL
              && +this.nodeInfo.status !== DungeonNodeStatus.BOOK_CHECKABLE_ITEM))
          && (!this.config.canGlitch || !this.nodeInfo.originalNode.canGlitch 
              || !this.nodeInfo.originalNode.canGlitch(this.items, this.config))) {
        return 'dungeon-unavailable';
      }
      if (viewable && !this.nodeInfo.originalNode.canOpen(this.items, this.config)
        && (!this.config.canGlitch || !this.nodeInfo.originalNode.canGlitch 
          || !this.nodeInfo.originalNode.canGlitch(this.items, this.config))) {
        return 'view-state';
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.BK_LOCKED
        || +this.nodeInfo.status === DungeonNodeStatus.BIG_CHEST) {
        if (this.dungeonItems.hasBigKey) {
          if (!this.nodeInfo.originalNode.canOpen(this.items, this.config) 
                && this.config.canGlitch && this.nodeInfo.originalNode.canGlitch && this.nodeInfo.originalNode.canGlitch(this.items, this.config)) {
            return 'glitched-state';
          } else {
            return 'dun-open-state';
          }
        } else {
          return 'dungeon-unavailable';
        }
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.SK_LOCKED) {
        if (this.dungeonItems.smallKeys > 0) {
          if (!this.nodeInfo.originalNode.canOpen(this.items, this.config) 
                && this.config.canGlitch && this.nodeInfo.originalNode.canGlitch && this.nodeInfo.originalNode.canGlitch(this.items, this.config)) {
            return 'glitched-state';
          } else {
            return 'dun-open-state';
          }
        } else {
          return 'dungeon-unavailable';
        }        
      }
      if (+this.nodeInfo.status === DungeonNodeStatus.WATER_SWITCH_FLIPPED
        || +this.nodeInfo.status === DungeonNodeStatus.BLIND_RESCUED
        || +this.nodeInfo.status === DungeonNodeStatus.EMPTY
        || +this.nodeInfo.status === DungeonNodeStatus.OPEN_CHEST
        || +this.nodeInfo.status === DungeonNodeStatus.OPEN_BIG_CHEST
        || +this.nodeInfo.status === DungeonNodeStatus.TT_BOMB_FLOOR_DONE) {
        return 'opened-state';
      }
      if (!this.nodeInfo.originalNode.canOpen(this.items, this.config) 
        && this.config.canGlitch && this.nodeInfo.originalNode.canGlitch && this.nodeInfo.originalNode.canGlitch(this.items, this.config)) {
        return 'glitched-state';
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
      } else if (this.nodeInfo.status.indexOf('g-getable') > -1) {
        res += ' glitched-open';
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
        || this.nodeInfo.status.indexOf('now-g-getable') > -1
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
        case DungeonNodeStatus.EMPTY:
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
        case DungeonNodeStatus.PORTAL:
          if (!this.nodeInfo.originalNode.canOpen(this.items, this.config)) {
            return 'invisible';
          } else {
            return 'portal';
          }          
        case DungeonNodeStatus.MIRROR:
          return 'mirror';
        case DungeonNodeStatus.FROG:
          return 'frog';
        case DungeonNodeStatus.PURPLE_CHEST:
          return 'purple-chest';
        case DungeonNodeStatus.BIG_BOMB:
          return 'big-bomb';
        case DungeonNodeStatus.BOOK_CHECKABLE_ITEM:
          return 'tablet';
        case DungeonNodeStatus.PEDESTAL:
          return 'pedestal';
        case DungeonNodeStatus.DUCK:
          return 'duck';
        case DungeonNodeStatus.HOLE:
          return 'hole';
        case DungeonNodeStatus.WATER_WARP:
          return 'water-warp';
        case DungeonNodeStatus.SQ_OPTION:
          var res = 'sq-item ' + this.nodeInfo.prize[0];
          if (this.nodeInfo.prize[0] === 'lw-flute1' && !this.nodeInfo.originalNode.canOpen(this.items, this.config)) {
            res += ' invisible';
          }
          return res;          
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
      if (this.nodeInfo.status.indexOf('viewable') > -1 
      || (this.nodeInfo.originalNode.canOpen && !this.nodeInfo.originalNode.canOpen(this.items, this.config)
      && +this.nodeInfo.status === DungeonNodeStatus.VIEWABLE_CLOSED_CHEST)) {
        this.nodeInfo.isFaded = true;
      }
    }
  }
}
