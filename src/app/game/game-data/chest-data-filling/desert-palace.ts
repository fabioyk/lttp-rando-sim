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

    var entrance = new DungeonMapData('dp-entry', 'Big Hall');
    entrance.nodes.push(new DungeonNode(
      '', 50, 83, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'lw-desert' : 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 7, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 12.5, 16.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-torch'));
    entrance.nodes.push(new DungeonNode(
      '', 37.5, 16.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-map'));
    entrance.nodes.push(new DungeonNode(
      '', 62.5, 16.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-map'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 50.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-right'));
    if (!config.isFullMap) {
      entrance.nodes.push(new DungeonNode(
        'Desert Final Section', 7, 76, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return items.glove;
      }, 'dp-first-tile', 'Power Gloves Required'));
    } else {
      entrance.nodes.push(new DungeonNode(
        'Desert Ledge', 7, 76, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'lw-desert', '', [-1], 2));
    }
    
    dpData.dungeonMaps.push(entrance);

    var torch = new DungeonMapData('dp-torch', 'Torch Room');
    torch.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    torch.nodes.push(new DungeonNode(
      'Torch Item', 28.3, 41, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[69], 'Boots Required'));
    dpData.dungeonMaps.push(torch);

    var map = new DungeonMapData('dp-map', 'Map Room');
    map.nodes.push(new DungeonNode(
      '', 25, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    map.nodes.push(new DungeonNode(
      '', 75, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    map.nodes.push(new DungeonNode(
      'Map Chest', 50, 50, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[68]));
    dpData.dungeonMaps.push(map);

    var right = new DungeonMapData('dp-right', 'Right Side');
    right.nodes.push(new DungeonNode(
      '', 39, 85, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    right.nodes.push(new DungeonNode(
      'Compass Chest', 50, 79, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[71]));
    right.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 12, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[70]));
    dpData.dungeonMaps.push(right);

    var bcRoom = new DungeonMapData('dp-bc', 'Big Chest Room');
    bcRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 49, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[67]));
    dpData.dungeonMaps.push(bcRoom);

    var firstTile = new DungeonMapData('dp-first-tile', 'Tile Room');
    firstTile.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'lw-desert' : 'dp-entry', '', [-1], 2));
    firstTile.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-big-door'));
    firstTile.nodes.push(new DungeonNode(
      '', 21.5, 79, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    dpData.dungeonMaps.push(firstTile);

    var bigDoor = new DungeonMapData('dp-big-door', 'Big Door');
    bigDoor.nodes.push(new DungeonNode(
      '', 75, 69, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-first-tile'));
    bigDoor.nodes.push(new DungeonNode(
      'Lanmolas Room', 26, 35, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource()
          && (items.sword || items.hammer || items.hasBow() || items.fireRod || items.iceRod
            || items.byrna || items.somaria);
    }, 'dp-lanmo', 'Fire Source and Weapon Required',
      [-1], 0, function(items:Items, config:Config) {
        return items.hasFiresource()
      }));
    dpData.dungeonMaps.push(bigDoor);

    var lanmoRoom = new DungeonMapData('dp-lanmo', 'Lanmolas Room');
    lanmoRoom.nodes.push(new DungeonNode(
      'Lanmolas', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[72]));
    dpData.dungeonMaps.push(lanmoRoom);

    dpData.startingMap = entrance;

    return dpData;
  }
}
