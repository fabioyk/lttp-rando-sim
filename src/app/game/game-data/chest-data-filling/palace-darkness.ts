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
        return items.canNorthEastDarkWorld() && items.moonPearl;
      }, 94, 40
    );

    var entrance = new DungeonMapData('pod-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-left'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork1'));
    entrance.nodes.push(new DungeonNode(
      'Bow Locked', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasBow();
    }, 'pod-right'));
    podData.dungeonMaps.push(entrance);

    var leftRoom = new DungeonMapData('pod-left', 'Shooter Room', '');
    leftRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    leftRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[124]));
    podData.dungeonMaps.push(leftRoom);

    var rightRoom = new DungeonMapData('pod-right', 'Map Room', '');
    rightRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    rightRoom.nodes.push(new DungeonNode(
      'Map Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[129]));
    rightRoom.nodes.push(new DungeonNode(
      'Jump Room Balcony Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[126]));
    rightRoom.nodes.push(new DungeonNode(
      'Statue Push Room. Requires Hammer', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'pod-statue'));
    podData.dungeonMaps.push(rightRoom);

    var fork1 = new DungeonMapData('pod-fork1', 'First Big Room', '');
    fork1.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    fork1.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork1.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork1.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-stalfos-drop'));
    fork1.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-bk'));
    podData.dungeonMaps.push(fork1);

    var bkRoom = new DungeonMapData('pod-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-stalfos-drop'));
    bkRoom.nodes.push(new DungeonNode(
      'Map Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[125]));
    podData.dungeonMaps.push(bkRoom);

    var dropRoom = new DungeonMapData('pod-stalfos-drop', 'Drop Room', '');
    dropRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    dropRoom.nodes.push(new DungeonNode(
      'Stalfos Drop Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[128]));
    podData.dungeonMaps.push(dropRoom);

    var jumpRoom = new DungeonMapData('pod-jump', 'Jump Room', '');
    jumpRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork1'));
    jumpRoom.nodes.push(new DungeonNode(
      'Jump Room Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[127]));
    jumpRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-statue'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork2'));
    podData.dungeonMaps.push(jumpRoom);

    var fork2 = new DungeonMapData('pod-fork2', 'Hammer Bridge', '');
    fork2.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork2.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    fork2.nodes.push(new DungeonNode(
      'Dark Maze. Requires Lamp', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'pod-maze'));
    podData.dungeonMaps.push(fork2);

    var maze = new DungeonMapData('pod-maze', 'Dark Maze', '');
    maze.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork2'));
    maze.nodes.push(new DungeonNode(
      'Maze Top Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[135]));
    maze.nodes.push(new DungeonNode(
      'Maze Bottom Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[136]));
    maze.nodes.push(new DungeonNode(
      'Big Chest', 0, 0, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[130]));
    podData.dungeonMaps.push(maze);

    var compass = new DungeonMapData('pod-compass', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork2'));
    compass.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'pod-basement'));
    compass.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-spike-statue'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[131]));
    podData.dungeonMaps.push(compass);

    var spikedStatue = new DungeonMapData('pod-spike-statue', 'Spiked Statue Push Room', '');
    spikedStatue.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    spikedStatue.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    spikedStatue.nodes.push(new DungeonNode(
      'Spike Statue Room Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[132]));
    podData.dungeonMaps.push(spikedStatue);

    var basement = new DungeonMapData('pod-basement', 'Dark Basement Room', '');
    basement.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Left Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[133]));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Right Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[134]));
    podData.dungeonMaps.push(basement);

    var statue = new DungeonMapData('pod-statue', 'Statue Push Room', '');
    statue.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    statue.nodes.push(new DungeonNode(
      'Path to Helmasaur. Requires Bow and Hammer', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hammer;
    }, 'pod-to-helma'));
    podData.dungeonMaps.push(statue);

    var pathHelma = new DungeonMapData('pod-to-helma', 'Path to Helmasaur', '');
    pathHelma.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-statue'));
    pathHelma.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-helma'));
    podData.dungeonMaps.push(pathHelma);

    var helmaRoom = new DungeonMapData('pod-helma', 'Helmasaur King Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[137]));
    podData.dungeonMaps.push(helmaRoom);

    podData.startingMap = entrance;

    return podData;
  }
}
