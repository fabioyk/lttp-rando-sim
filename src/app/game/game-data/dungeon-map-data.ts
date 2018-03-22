import { DungeonNode } from "./dungeon-node";
import { DungeonNodeStatus } from "./dungeon-node-status.enum";
import { DungeonData } from "./dungeon-data";
import { GameService } from "./game-service.service";

export class DungeonMapData {
  id: string;
  name: string;
  nodes: DungeonNode[];
  preloadedImages: HTMLImageElement[];
  isIndoors:boolean;

  dungeonAbbrevs = ['ep', 'dp', 'toh', 'ct', 'pod', 'sp', 'sw', 'tt',
  'ip', 'mm', 'tr', 'gt', 'lw', 'dw', 'hc'];

  constructor(id:string, name:string, isIndoors:boolean = false) {
    this.id = id;
    this.name = name;
    this.nodes = [];
    this.isIndoors = isIndoors;
  }

  preloadImages(dunName:string) {
    var mapNames = [];
    this.preloadedImages = [];
    this.nodes.forEach((eachNode) => {
      if (eachNode.content !== 'exit' && (eachNode.status === DungeonNodeStatus.BK_LOCKED
          || eachNode.status === DungeonNodeStatus.SK_LOCKED
          || eachNode.status === DungeonNodeStatus.OPEN_DOOR
          || eachNode.status === DungeonNodeStatus.HOLE
          || eachNode.status === DungeonNodeStatus.WATER_WARP
          || eachNode.status === DungeonNodeStatus.SQ_OPTION)) {
        mapNames.push(eachNode.content);
      }
    });
    if (this.id.substr(0, 2) === 'dw' && !this.isIndoors) {
      mapNames.push('lw-' + this.id.substr(3));
    }
    if (this.id.substr(0, 2) === 'lw' && !this.isIndoors) {
      mapNames.push('dw-' + this.id.substr(3));
    }
    if (DungeonData.pegMaps.indexOf(this.id) > -1) {
      mapNames.push(this.id + '-flipped');
    }
    if (DungeonData.floodMaps.indexOf(this.id) > -1) {
      mapNames.push(this.id + '-flooded');
      mapNames.push(this.id + '-flooded-flipped');
    }
    
    for (var i = 0; i < mapNames.length; i++) {
      this.preloadedImages[i] = new Image();
      var dunIndex = this.dungeonAbbrevs.indexOf(mapNames[i].split('-')[0]);      
      this.preloadedImages[i].src = 'assets/maps/' + DungeonData.dungeonDataNames[dunIndex] + '/' + mapNames[i] + '.png';
    }
  }

  cleanPreload() {
    this.preloadedImages = null;
  }
}
