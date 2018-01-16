export class DungeonItems {
  dungeonName:string;
  hasBigKey:boolean;
  smallKeys:number;
  hasCompass:boolean;
  hasMap:boolean;
  mapPrizeStatus:number;
  itemsLeft:number;
  isBossDefeated: boolean;
  dungeonPrize:string;

  static UNKNOWN = 0;
  static CRYSTAL = 1;
  static RED_CRYSTAL = 2;
  static PENDANT = 3;
  static GREEN_PENDANT = 4;
  static SOME_CRYSTAL = 5;
  static SOME_PENDANT = 6;

  constructor(dungeonName:string, itemCount:number, dungeonPrize:string) {
    this.dungeonName = dungeonName;
    this.hasBigKey = false;
    this.smallKeys = 0;
    this.hasCompass = false;
    this.hasMap = false;
    this.itemsLeft = itemCount;
    this.isBossDefeated = false;
    this.mapPrizeStatus = DungeonItems.UNKNOWN;
    this.dungeonPrize = dungeonPrize;
  }

  dunCount() {
    return this.hasCompass ? (this.hasMap ? 2 : 1) : (this.hasMap ? 1 : 0);
  }

  checkThisMap() {
    switch (this.dungeonPrize) {
      case '111':
      case '112':
        this.mapPrizeStatus = DungeonItems.RED_CRYSTAL;
        break;
      case '129':
        this.mapPrizeStatus = DungeonItems.GREEN_PENDANT;
        break;
      case '130':
      case '131':
        this.mapPrizeStatus = DungeonItems.PENDANT;
        break;
      default:
        this.mapPrizeStatus = DungeonItems.CRYSTAL;
        break;
    }
  }

  listenThisMap() {
    if (this.mapPrizeStatus === DungeonItems.UNKNOWN) {
      if (+this.dungeonPrize >= 129) {
        this.mapPrizeStatus = DungeonItems.SOME_PENDANT;
      } else {
        this.mapPrizeStatus = DungeonItems.SOME_CRYSTAL;
      }
    }    
  }
}