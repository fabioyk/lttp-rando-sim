import { DungeonNode } from "./dungeon-node";

export class DungeonMapData {
  id: string;
  name: string;
  mapImage: string;
  nodes: DungeonNode[];

  constructor(id:string, name:string, mapImage:string) {
    this.id = id;
    this.name = name;
    this.mapImage = mapImage;
    this.nodes = [];
  }
}
