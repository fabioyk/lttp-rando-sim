export class ItemLocation {
  x: number;
  y: number;
  location: string;
  isOpened: boolean;
  canGet: Function;
  canView: Function;
  item: string[];
  constructor(location:string, x:number, y:number, canGet:Function, canView:Function, item:string[]) {
    this.location = location;
    this.x = x;
    this.y = y;
    if (canGet) {
      this.canGet = canGet;
    }
    if (canView) {
      this.canView = canView;
    }
    this.item = item;

    this.isOpened = false;
  }
}
