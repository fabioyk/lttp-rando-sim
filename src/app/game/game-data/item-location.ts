import { MapNode } from "./map-node";

export class ItemLocation {
  x: number;
  y: number;
  location: string;
  isOpened: boolean;
  canGet: Function;
  canView: Function;
  item: string[];
  region: string;
  mapNode: MapNode;
  constructor(location:string, x:number, y:number, canGet:Function, canView:Function, item:string[], region:string='') {
    this.location = location;
    this.x = x;
    this.y = y;
    if (canGet) {
      this.canGet = canGet;
    }
    if (canView) {
      this.canView = canView;
    }
    this.region = region;
    this.item = item;

    this.isOpened = false;
    
  }
}
