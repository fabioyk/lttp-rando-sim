import { DungeonNodeStatus } from "./dungeon-node-status.enum";
import { MapNode } from "./map-node";

export class DungeonNode {
  x: number;
  y: number;
  name: string;
  canOpen: Function;
  content: string;
  errorMessage: string;
  mapNode:MapNode;
  _status:DungeonNodeStatus;
  accessibleSectionArray: number[];
  destinationSection: number;

  constructor(name:string, x:number, y:number, 
      status:DungeonNodeStatus, canOpen:Function, content:string, 
      errorMessage:string = '', accessibleSectionArray:number[] = [-1], destinationSection:number = 0) {
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
  }

  get status() {
    return this._status;
  }
  set status(newStatus:DungeonNodeStatus) {
    this._status = newStatus;
    this.mapNode.status = newStatus.toString();
  }
}
