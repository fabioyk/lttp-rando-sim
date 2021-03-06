import { DungeonMapData } from "./dungeon-map-data";
import { MapNode } from "./map-node";

export class DungeonData {
  static dungeonNames = ['light-world', 'Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower',
    'Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace',
    'Misery Mire', 'Turtle Rock', 'Ganons Tower'];
  static dungeonDataNames = ['Eastern Palace', 'Desert Palace', 'Tower of Hera', 'Aga Tower',
    'Palace of Darkness', 'Swamp Palace', 'Skull Woods', 'Thieves Town', 'Ice Palace',
    'Misery Mire', 'Turtle Rock', 'Ganons Tower', 'Light World', 'Dark World', 'Hyrule Castle'];
  static allDungeonNames = ['Hyrule Castle', 'Eastern Palace', 'Desert Palace',
    'Tower of Hera', 'Aga Tower', 'Palace of Darkness', 'Swamp Palace', 'Skull Woods',
    'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower', 'Light World', 'Dark World'];
  static crystalDungeonNames = ['Eastern Palace', 'Desert Palace',
    'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 'Skull Woods',
    'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock'];
  static lwDungeons = ['Eastern Palace', 'Desert Palace', 'Tower of Hera'];
  static pegMaps = ['ip-bj', 'ip-fairy-drop', 'ip-final-switch', 'ip-push-block', 'ip-push-block-right',
    'mm-compass', 'mm-entry', 'mm-fish-spine', 'mm-map',
    'sp-left', 'sp-south-switch', 'sp-switch'];
  static floodMaps = ['sp-south-switch', 'sp-switch'];
  static nonDungeon = ['light-world', 'dark-world', 'Light World', 'Dark World', 'Death Mountain', 'Hyrule Castle'];
  static dungeonsWithDunItemsCount = ['Eastern Palace', 'Desert Palace',
  'Tower of Hera', 'Aga Tower', 'Palace of Darkness', 'Swamp Palace', 'Skull Woods',
  'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower'];

  name: string;
  itemsLeft: number;
  startingMap: DungeonMapData;
  dungeonMaps: DungeonMapData[];
  canEnter: Function;
  dungeonPrize: string;
  x: number;
  y: number;
  mapNode: MapNode;

  constructor(name:string, dungeonPrize:string, canEnter:Function, x:number, y:number) {
    this.name = name;
    this.dungeonPrize = dungeonPrize;
    this.canEnter = canEnter;
    this.dungeonMaps = [];
    this.x = x;
    this.y = y;
  }
}
