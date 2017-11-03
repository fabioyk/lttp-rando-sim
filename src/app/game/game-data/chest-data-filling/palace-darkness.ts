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
      '', 128, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 64, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-left'));
    entrance.nodes.push(new DungeonNode(
      '', 128, 24, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork1'));
    entrance.nodes.push(new DungeonNode(
      'Bow Locked', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasBow();
    }, 'pod-right'));
    podData.dungeonMaps.push(entrance);

    var leftRoom = new DungeonMapData('pod-left', 'Shooter Room', '');
    leftRoom.nodes.push(new DungeonNode(
      '', 129, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    leftRoom.nodes.push(new DungeonNode(
      '', 201, 181, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[124]));
    podData.dungeonMaps.push(leftRoom);

    var rightRoom = new DungeonMapData('pod-right', 'Map Room', '');
    rightRoom.nodes.push(new DungeonNode(
      '', 166, 189, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    rightRoom.nodes.push(new DungeonNode(
      'Map Chest', 166, 129, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[129]));
    rightRoom.nodes.push(new DungeonNode(
      'Jump Room Balcony Chest', 26, 100, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[126]));
    rightRoom.nodes.push(new DungeonNode(
      'Statue Push Room. Requires Hammer', 167, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'pod-statue'));
    podData.dungeonMaps.push(rightRoom);

    var fork1 = new DungeonMapData('pod-fork1', 'First Big Room', '');
    fork1.nodes.push(new DungeonNode(
      '', 128, 238, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    fork1.nodes.push(new DungeonNode(
      '', 64, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork1.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork1.nodes.push(new DungeonNode(
      '', 172, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-stalfos-drop'));
    fork1.nodes.push(new DungeonNode(
      '', 64, 96, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-bk'));
    podData.dungeonMaps.push(fork1);

    var bkRoom = new DungeonMapData('pod-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 196, 151, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-stalfos-drop'));
    bkRoom.nodes.push(new DungeonNode(
      'Map Chest', 128, 153, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[125]));
    podData.dungeonMaps.push(bkRoom);

    var dropRoom = new DungeonMapData('pod-stalfos-drop', 'Drop Room', '');
    dropRoom.nodes.push(new DungeonNode(
      '', 197, 104, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-entry'));
    dropRoom.nodes.push(new DungeonNode(
      'Stalfos Drop Chest', 101, 136, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[128]));
    podData.dungeonMaps.push(dropRoom);

    var jumpRoom = new DungeonMapData('pod-jump', 'Jump Room', '');
    jumpRoom.nodes.push(new DungeonNode(
      '', 192, 241, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork1'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 64, 241, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork1'));
    jumpRoom.nodes.push(new DungeonNode(
      'Jump Room Chest', 188, 179, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[127]));
    jumpRoom.nodes.push(new DungeonNode(
      '', 228, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-statue'));
    jumpRoom.nodes.push(new DungeonNode(
      '', 64, 24, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork2'));
    podData.dungeonMaps.push(jumpRoom);

    var fork2 = new DungeonMapData('pod-fork2', 'Hammer Bridge', '');
    fork2.nodes.push(new DungeonNode(
      '', 128, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    fork2.nodes.push(new DungeonNode(
      '', 177, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    fork2.nodes.push(new DungeonNode(
      'Dark Maze. Requires Lamp', 82, 67, DungeonNodeStatus.SK_LOCKED,
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
      '', 32, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-fork2'));
    compass.nodes.push(new DungeonNode(
      '', 80, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'pod-basement'));
    compass.nodes.push(new DungeonNode(
      '', 178, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'pod-basement'));
    compass.nodes.push(new DungeonNode(
      '', 129, 223, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-spike-statue'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 129, 132, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[131]));
    podData.dungeonMaps.push(compass);

    var spikedStatue = new DungeonMapData('pod-spike-statue', 'Spiked Statue Push Room', '');
    spikedStatue.nodes.push(new DungeonNode(
      '', 128, 46, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    spikedStatue.nodes.push(new DungeonNode(
      '', 128, 221, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    spikedStatue.nodes.push(new DungeonNode(
      'Spike Statue Room Chest', 64, 122, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[132]));
    podData.dungeonMaps.push(spikedStatue);

    var basement = new DungeonMapData('pod-basement', 'Dark Basement Room', '');
    basement.nodes.push(new DungeonNode(
      '', 104, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    basement.nodes.push(new DungeonNode(
      '', 152, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-compass'));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Left Chest', 92, 186, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[133]));
    basement.nodes.push(new DungeonNode(
      'Dark Basement Right Chest', 164, 186, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[134]));
    podData.dungeonMaps.push(basement);

    var statue = new DungeonMapData('pod-statue', 'Statue Push Room', '');
    statue.nodes.push(new DungeonNode(
      '', 54, 230, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-jump'));
    statue.nodes.push(new DungeonNode(
      'Path to Helmasaur. Requires Bow and Hammer', 128, 15, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hammer;
    }, 'pod-to-helma'));
    podData.dungeonMaps.push(statue);

    var pathHelma = new DungeonMapData('pod-to-helma', 'Path to Helmasaur', '');
    pathHelma.nodes.push(new DungeonNode(
      '', 124, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-statue'));
    pathHelma.nodes.push(new DungeonNode(
      '', 128, 24, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'pod-helma'));
    podData.dungeonMaps.push(pathHelma);

    var helmaRoom = new DungeonMapData('pod-helma', 'Helmasaur King Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 128, 153, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[137]));
    podData.dungeonMaps.push(helmaRoom);

    podData.startingMap = entrance;

    return podData;
  }
}
