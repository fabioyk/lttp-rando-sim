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
      '', 33, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Dark Maze', 128, 50, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'ct-maze', 'Lamp Required'));
    entrance.nodes.push(new DungeonNode(
      'Aga Tower First Chest', 185, 181, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[95]));
    ctData.dungeonMaps.push(entrance);

    var maze = new DungeonMapData('ct-maze', 'Dark Maze', '');
    maze.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-entry'));
    maze.nodes.push(new DungeonNode(
      '', 111, 196, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-top'));
    maze.nodes.push(new DungeonNode(
      'Aga Tower Dark Chest', 28, 107, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[96]));
    ctData.dungeonMaps.push(maze);

    var top = new DungeonMapData('ct-top', 'Top of Tower', '');
    top.nodes.push(new DungeonNode(
      '', 128, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ct-maze'));
    top.nodes.push(new DungeonNode(
      'Agahnim\'s Fight', 128, 40, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword;
    }, 'ct-aga', 'Sword Required'));
    ctData.dungeonMaps.push(top);

    var aga = new DungeonMapData('ct-aga', 'Aganim\'s Fight Room', '');
    aga.nodes.push(new DungeonNode(
      'Agahnim', 128, 98, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, 'Agahnim'));
    ctData.dungeonMaps.push(aga);

    ctData.startingMap = entrance;

    return ctData;
  }
}
