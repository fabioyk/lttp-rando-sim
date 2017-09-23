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
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-bc'));
    entrance.nodes.push(new DungeonNode(
      'Torch Item (Boots Required)', 0, 0, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[69]));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[68]));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-right'));
    entrance.nodes.push(new DungeonNode(
      'Power Glove Required', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dp-first-tile'));
    dpData.dungeonMaps.push(entrance);

    var right = new DungeonMapData('dp-right', 'Right Side', '');
    right.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    right.nodes.push(new DungeonNode(
      'Compass Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[71]));
    right.nodes.push(new DungeonNode(
      'Big Key Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[70]));
    dpData.dungeonMaps.push(right);

    var bcRoom = new DungeonMapData('dp-bc', 'Big Chest Room', '');
    bcRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 0, 0, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[67]));
    dpData.dungeonMaps.push(bcRoom);

    var firstTile = new DungeonMapData('dp-first-tile', 'First Tile Room', '');
    firstTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    firstTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-second-tile'));
    firstTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    dpData.dungeonMaps.push(firstTile);

    var secondTile = new DungeonMapData('dp-second-tile', 'Second Tile Room', '');
    secondTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-first-tile'));
    secondTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-big-door'));
    secondTile.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    dpData.dungeonMaps.push(secondTile);

    var bigDoor = new DungeonMapData('dp-big-door', 'Big Door', '');
    bigDoor.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-first-tile'));
    bigDoor.nodes.push(new DungeonNode(
      'Lanmolas Room. Fire Source and Weapon Required', 0, 0, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource()
          && (items.sword || items.hammer || items.hasBow() || items.fireRod || items.iceRod
            || items.byrna || items.somaria);
    }, 'dp-lanmo'));
    dpData.dungeonMaps.push(bigDoor);

    var lanmoRoom = new DungeonMapData('dp-lanmo', 'Lanmolas Room', '');
    lanmoRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[72]));
    dpData.dungeonMaps.push(lanmoRoom);

    dpData.startingMap = entrance;

    return dpData;
  }
}
