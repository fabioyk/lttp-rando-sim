import { DungeonNodeStatus } from "./dungeon-node-status.enum";

export class DungeonNode {
  x: number;
  y: number;
  location: string;
  status: DungeonNodeStatus;
  canOpen: Function;
  content: string;
  errorMessage: string;

  constructor(name:string, x:number, y:number, 
      status:DungeonNodeStatus, canOpen:Function, content:string, errorMessage:string = '') {
    this.location = name;
    this.x = x;
    this.y = y;
    this.status = status;
    this.canOpen = canOpen;
    this.content = content;
    this.errorMessage = errorMessage;

  }
}
