import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class PalaceDarkness {
  static setup (l:string[], config:Config):DungeonData {
    var podData = new DungeonData('Palace of Darkness', l[138],
      function(items:Items, config:Config) {
        return items.canNorthEastDarkWorld(config.canGlitch) && items.moonPearl;
      }, 94, 40
    );

    var entrance = new DungeonMapData('pod-entry', 'Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-eastern-palace' : 'exit', 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-left', 'left'));
    entrance.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'pod-fork1', 'up'));
    entrance.nodes.push(new DungeonNode(
      'Right Side', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasBow();
    }, 'pod-right', 'right'));
    podData.dungeonMaps.push(entrance);

    var leftRoom = new DungeonMapData('pod-left', 'Shooter Room');
    leftRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-entry', 'up'));
    leftRoom.nodes.push(new DungeonNode(
      'Shooter Room Chest', 78, 72, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[124], 'c'));
    podData.dungeonMaps.push(leftRoom);

    var rightRoom = new DungeonMapData('pod-right', 'Map Room');
    rightRoom.nodes.push(new DungeonNode(
      '', 63, 78, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-entry', 'down'));
    rightRoom.nodes.push(new DungeonNode(
      'Map Chest', 63, 57.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[129], 'c1'));
    rightRoom.nodes.push(new DungeonNode(
      'Arena Ledge Chest', 10, 46, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[126], 'c2'));
    rightRoom.nodes.push(new DungeonNode(
      '', 63, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'pod-statue', 'up'));
    podData.dungeonMaps.push(rightRoom);

    var fork1 = new DungeonMapData('pod-fork1', 'First Fork');
    fork1.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-entry', 'down'));
    fork1.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-jump', 'up'));
    fork1.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-jump', 'up'));
    fork1.nodes.push(new DungeonNode(
      '', 67, 54, DungeonNodeStatus.HOLE,
      DungeonNode.noReqs, 'pod-stalfos-drop', 'hole'));
    fork1.nodes.push(new DungeonNode(
      '', 25, 38, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'pod-bk', 'left'));
    podData.dungeonMaps.push(fork1);

    var bkRoom = new DungeonMapData('pod-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 73, 56, DungeonNodeStatus.HOLE,
      DungeonNode.noReqs, 'pod-stalfos-drop', 'hole'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 60, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[125], 'c'));
    podData.dungeonMaps.push(bkRoom);

    var dropRoom = new DungeonMapData('pod-stalfos-drop', 'Stalfos Basement Room');
    dropRoom.nodes.push(new DungeonNode(
      '', 80, 42, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-entry', 'right'));
    dropRoom.nodes.push(new DungeonNode(
      'Stalfos Basement Chest', 48.5, 53, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[128], 'c'));
    podData.dungeonMaps.push(dropRoom);

    var jumpRoom = new DungeonMapData('pod-jump', 'The Arena');
    jumpRoom.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-fork1', 'down'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-fork1', 'down'));
    jumpRoom.nodes.push(new DungeonNode(
      'Arena Bridge Chest', 73, 71, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[127], 'c'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 90, 51.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-statue', 'right'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'pod-fork2', 'up'));
    podData.dungeonMaps.push(jumpRoom);

    var fork2 = new DungeonMapData('pod-fork2', 'Hammer Bridge');
    fork2.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-jump', 'down'));
    fork2.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-compass', 'right'));
    fork2.nodes.push(new DungeonNode(
      '', 32, 26, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'pod-maze', 'left', [-1], 0, 
    DungeonNode.noReqs));
    if (config.canGlitch) {
      fork2.nodes.push(new DungeonNode(
        '', 42, 61, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return false;
      }, 'pod-maze', 'hammeryump', [-1], 0, 
      DungeonNode.noReqs));
    }
    podData.dungeonMaps.push(fork2);

    var maze = new DungeonMapData('pod-maze', 'Dark Maze');
    maze.nodes.push(new DungeonNode(
      '', 67, 27, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'pod-fork2', 'right'));
    maze.nodes.push(new DungeonNode(
      'Dark Maze Top Chest', 29, 15, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[135], 'c1'));
    maze.nodes.push(new DungeonNode(
      'Dark Maze Bottom Chest', 64, 84, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[136], 'c2'));
    maze.nodes.push(new DungeonNode(
      'Big Chest', 89, 51, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[130], 'bc'));
    podData.dungeonMaps.push(maze);

    var compass = new DungeonMapData('pod-compass', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-fork2', 'left'));
    compass.nodes.push(new DungeonNode(
      '', 31, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'pod-basement', 'up', [-1], 0, 
    DungeonNode.noReqs));
    compass.nodes.push(new DungeonNode(
      '', 69, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'pod-basement', 'up', [-1], 0, 
    DungeonNode.noReqs));
    compass.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'pod-spike-statue', 'down'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 50, 53.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[131], 'c'));
    podData.dungeonMaps.push(compass);

    var spikedStatue = new DungeonMapData('pod-spike-statue', 'Harmless Hellway');
    spikedStatue.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-compass', 'up'));
    spikedStatue.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-jump', 'down'));
    spikedStatue.nodes.push(new DungeonNode(
      'Harmless Hellway Chest', 25, 50, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[132], 'c'));
    podData.dungeonMaps.push(spikedStatue);

    var basement = new DungeonMapData('pod-basement', 'Dark Basement Room');
    basement.nodes.push(new DungeonNode(
      '', 39, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-compass', 'up'));
    basement.nodes.push(new DungeonNode(
      '', 61, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-compass', 'up'));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Left Chest', 36, 73, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[133], 'c1'));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Right Chest', 63, 73, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[134], 'c2'));
    podData.dungeonMaps.push(basement);

    var statue = new DungeonMapData('pod-statue', 'Statue Push Room');
    statue.nodes.push(new DungeonNode(
      '', 29, 79, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-jump', 'left'));
    statue.nodes.push(new DungeonNode(
      '', 50, 15, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hammer && items.lamp;
    }, 'pod-to-helma', 'up', [-1], 0, 
    function(items:Items, config:Config) {
      return items.hasBow() && items.hammer;
    }));
    podData.dungeonMaps.push(statue);

    var pathHelma = new DungeonMapData('pod-to-helma', 'Path to Helmasaur');
    pathHelma.nodes.push(new DungeonNode(
      '', 49, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'pod-statue', 'down'));
    pathHelma.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'pod-helma', 'up'));
    podData.dungeonMaps.push(pathHelma);

    var helmaRoom = new DungeonMapData('pod-helma', 'Helmasaur King Room');
    helmaRoom.nodes.push(new DungeonNode(
      'Helmasaur King', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[137], 'boss'));
    podData.dungeonMaps.push(helmaRoom);

    podData.startingMap = entrance;

    return podData;
  }
}
