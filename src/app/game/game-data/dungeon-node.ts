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

  constructor(name:string, x:number, y:number, 
      status:DungeonNodeStatus, canOpen:Function, content:string, errorMessage:string = '') {
    this.name = name;
    this.x = x;
    this.y = y;
    this.canOpen = canOpen;
    this.content = content;
    this.errorMessage = errorMessage;
    this.mapNode = new MapNode();
    this.status = status;
  }

  get status() {
    return this._status;
  }
  set status(newStatus:DungeonNodeStatus) {
    this._status = newStatus;
    this.mapNode.status = newStatus.toString();
  }
}
