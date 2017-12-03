import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class DesertPalace {
  static setup (l:string[], config:Config):DungeonData {
    var dpData = new DungeonData('Desert Palace', l[73],
      function(items:Items, config:Config) {
        return items.book || (items.canMire() && items.mirror);
      }, 7.6, 78.4
    );

    var entrance = new DungeonMapData('dp-entry', 'Big Hall', '');
    entrance.nodes.push(new DungeonNode(
      '', 126, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 16, 66, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 31, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-torch'));
    entrance.nodes.push(new DungeonNode(
      '', 96, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-map'));
    entrance.nodes.push(new DungeonNode(
      '', 160, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-map'));
    entrance.nodes.push(new DungeonNode(
      '', 240, 128, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-right'));
    entrance.nodes.push(new DungeonNode(
      'Power Glove Required', 16, 194, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dp-first-tile'));
    dpData.dungeonMaps.push(entrance);

    var torch = new DungeonMapData('dp-torch', 'Torch Room', '');
    torch.nodes.push(new DungeonNode(
      '', 127, 210, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    torch.nodes.push(new DungeonNode(
      'Torch Item (Boots Required)', 74, 91, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[69]));
    dpData.dungeonMaps.push(torch);

    var map = new DungeonMapData('dp-map', 'Map Room', '');
    map.nodes.push(new DungeonNode(
      '', 62, 176, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    map.nodes.push(new DungeonNode(
      '', 194, 176, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    map.nodes.push(new DungeonNode(
      'Map Chest', 129, 123, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[68]));
    dpData.dungeonMaps.push(map);

    var right = new DungeonMapData('dp-right', 'Right Side', '');
    right.nodes.push(new DungeonNode(
      '', 94, 218, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    right.nodes.push(new DungeonNode(
      'Compass Chest', 129, 200, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[71]));
    right.nodes.push(new DungeonNode(
      'Big Key Chest', 129, 22, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[70]));
    dpData.dungeonMaps.push(right);

    var bcRoom = new DungeonMapData('dp-bc', 'Big Chest Room', '');
    bcRoom.nodes.push(new DungeonNode(
      '', 126, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 126, 120, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[67]));
    dpData.dungeonMaps.push(bcRoom);

    var firstTile = new DungeonMapData('dp-first-tile', 'First Tile Room', '');
    firstTile.nodes.push(new DungeonNode(
      '', 126, 219, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    firstTile.nodes.push(new DungeonNode(
      '', 126, 44, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-big-door'));
    firstTile.nodes.push(new DungeonNode(
      '', 58, 190, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    dpData.dungeonMaps.push(firstTile);

    var bigDoor = new DungeonMapData('dp-big-door', 'Big Door', '');
    bigDoor.nodes.push(new DungeonNode(
      '', 220, 194, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-first-tile'));
    bigDoor.nodes.push(new DungeonNode(
      'Lanmolas Room. Fire Source and Weapon Required', 36, 70, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource()
          && (items.sword || items.hammer || items.hasBow() || items.fireRod || items.iceRod
            || items.byrna || items.somaria || config.canGlitch);
    }, 'dp-lanmo'));
    dpData.dungeonMaps.push(bigDoor);

    var lanmoRoom = new DungeonMapData('dp-lanmo', 'Lanmolas Room', '');
    lanmoRoom.nodes.push(new DungeonNode(
      'Lanmolas', 128, 128, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[72]));
    dpData.dungeonMaps.push(lanmoRoom);

    dpData.startingMap = entrance;

    return dpData;
  }
}
