import { DungeonNodeStatus } from "./dungeon-node-status.enum";
import { MapNode } from "./map-node";
import { Items } from "./items";
import { Config } from "./config";

export class DungeonNode {
  x: number;
  y: number;
  name: string;
  canOpen: Function;
  canGlitch: Function;
  content: string;
  errorMessage: string;
  mapNode:MapNode;
  _status:DungeonNodeStatus;
  accessibleSectionArray: number[];
  destinationSection: number;

  constructor(name:string, x:number, y:number, 
      status:DungeonNodeStatus, canOpen:Function, content:string, 
      errorMessage:string = '', accessibleSectionArray:number[] = [-1], 
      destinationSection:number = 0, canGlitch:Function = null, 
      public mirrorAccessibleSectionArray:number[] = [-1], public mirrorDestinationSection:number = 0) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.canOpen = canOpen;
    this.content = content;
    this.errorMessage = errorMessage;
    this.mapNode = new MapNode();
    this.status = status;
    this.accessibleSectionArray = accessibleSectionArray;
    this.destinationSection = destinationSection;
    this.canGlitch = canGlitch;
  }

  get status() {
    return this._status;
  }
  set status(newStatus:DungeonNodeStatus) {
    this._status = newStatus;
    this.mapNode.status = newStatus.toString();
  }

  static noReqs(items:Items, config:Config) {
    return true;
  }

  isDoable(items:Items, config:Config):number {
    if (this.canOpen && this.canOpen(items, config)) {
      return 2;
    } else if (this.canGlitch && this.canGlitch(items, config)) {
      return 1;
    } else {
      return 0;
    }
  }
}
