import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class CastleTower {
  static setup (l:string[], config:Config):DungeonData {
    var ctData = new DungeonData('Aga Tower', 'Agahnim',
      function(items:Items, config:Config) {
        return items.cape || items.sword >= 2;
      }, 49.6, 39
    );

    var entrance = new DungeonMapData('ct-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Dark Maze', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'ct-maze', 'Lamp Required'));
    entrance.nodes.push(new DungeonNode(
      'Aga Tower First Chest', 72, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[95]));
    ctData.dungeonMaps.push(entrance);

    var maze = new DungeonMapData('ct-maze', 'Dark Maze', '');
    maze.nodes.push(new DungeonNode(
      '', 75, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-entry'));
    maze.nodes.push(new DungeonNode(
      '', 43, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-top'));
    maze.nodes.push(new DungeonNode(
      'Aga Tower Dark Chest', 11, 43, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[96]));
    ctData.dungeonMaps.push(maze);

    var top = new DungeonMapData('ct-top', 'Top of Tower', '');
    top.nodes.push(new DungeonNode(
      '', 50, 84, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-maze'));
    top.nodes.push(new DungeonNode(
      'Agahnim\'s Fight', 50, 16, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword;
    }, 'ct-aga', 'Sword Required'));
    ctData.dungeonMaps.push(top);

    var aga = new DungeonMapData('ct-aga', 'Aganim\'s Fight Room', '');
    aga.nodes.push(new DungeonNode(
      'Agahnim', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, 'Agahnim'));
    ctData.dungeonMaps.push(aga);

    ctData.startingMap = entrance;

    return ctData;
  }
}
