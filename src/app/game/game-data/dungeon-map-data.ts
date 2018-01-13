import { DungeonNode } from "./dungeon-node";
import { DungeonNodeStatus } from "./dungeon-node-status.enum";
import { DungeonData } from "./dungeon-data";

export class DungeonMapData {
  id: string;
  name: string;
  nodes: DungeonNode[];
  preloadedImages: HTMLImageElement[];

  constructor(id:string, name:string) {
    this.id = id;
    this.name = name;
    this.nodes = [];
  }

  preloadImages(dunName:string) {
    var mapNames = [];
    this.preloadedImages = [];
    this.nodes.forEach((eachNode) => {
      if (eachNode.content !== 'exit' && (eachNode.status === DungeonNodeStatus.BK_LOCKED
          || eachNode.status === DungeonNodeStatus.SK_LOCKED
          || eachNode.status === DungeonNodeStatus.OPEN_DOOR)) {
        mapNames.push(eachNode.content);
      }
    });
    if (DungeonData.pegMaps.indexOf(this.id) > -1) {
      mapNames.push(this.id + '-flipped');
    }
    if (DungeonData.floodMaps.indexOf(this.id) > -1) {
      mapNames.push(this.id + '-flooded');
      mapNames.push(this.id + '-flooded-flipped');
    }
    for (var i = 0; i < mapNames.length; i++) {
      this.preloadedImages[i] = new Image();
      this.preloadedImages[i].src = 'assets/maps/' + dunName + '/' + mapNames[i] + '.png';
    }
  }

  cleanPreload() {
    this.preloadedImages = null;
  }
}
