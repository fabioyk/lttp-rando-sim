import { DungeonNode } from "./dungeon-node";

export class DungeonMapData {
  id: string;
  name: string;
  nodes: DungeonNode[];

  constructor(id:string, name:string) {
    this.id = id;
    this.name = name;
    this.nodes = [];
  }
}
