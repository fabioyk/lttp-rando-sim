export class DungeonItems {
  hasBigKey:boolean;
  smallKeys:number;
  hasCompass:boolean;
  hasMap:boolean;
  itemsLeft:number;
  isBossDefeated: boolean;

  constructor(itemCount:number) {
    this.hasBigKey = false;
    this.smallKeys = 0;
    this.hasCompass = false;
    this.hasMap = false;
    this.itemsLeft = itemCount;
    this.isBossDefeated = false;
  }

  dunCount() {
    return this.hasCompass ? (this.hasMap ? 2 : 1) : (this.hasMap ? 1 : 0);
  }
}
