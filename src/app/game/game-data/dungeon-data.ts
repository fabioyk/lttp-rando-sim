import { DungeonMapData } from "./dungeon-map-data";

export class DungeonData {
  static dungeonNames = ['light-world', 'Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower',
    'Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace',
    'Misery Mire', 'Turtle Rock', 'Ganons Tower'];
  static lwDungeons = ['Eastern Palace', 'Desert Palace', 'Tower of Hera'];

  name: string;
  itemsLeft: number;
  startingMap: DungeonMapData;
  dungeonMaps: DungeonMapData[];
  canEnter: Function;
  dungeonPrize: string;
  x: number;
  y: number;

  constructor(name:string, dungeonPrize:string, canEnter:Function, x:number, y:number) {
    this.name = name;
    this.dungeonPrize = dungeonPrize;
    this.canEnter = canEnter;
    this.dungeonMaps = [];
    this.x = x;
    this.y = y;
  }
}
