import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class SkullWoods {
  static setup (l:string[], config:Config):DungeonData {
    var swData = new DungeonData('Skull Woods', l[158],
      function(items:Items, config:Config) {
        return items.moonPearl && items.canNorthWestDarkWorld(config.canGlitch);
      }, 6.6, 5.4
    );

    var entrance = new DungeonMapData('sw-entry', 'Skull Woods Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 57.5, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 27.5, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 90, 74.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 80, 15.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 71, 46, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 8.5, 40, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part21'));
    swData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('sw-left-drop', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 76.5, 45, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[152]));
    compass.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    swData.dungeonMaps.push(compass);

    var gibdoStalfo = new DungeonMapData('sw-gibdo-stalfo', 'Pot Prison Room');
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    gibdoStalfo.nodes.push(new DungeonNode(
      'Pot Prison Chest', 22, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[155]));
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(gibdoStalfo);

    var bigChest = new DungeonMapData('sw-bc', 'Big Chest Room');
    bigChest.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    bigChest.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-lostwoods' : 'sw-entry'));
    bigChest.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 39.4, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[150]));
    swData.dungeonMaps.push(bigChest);

    var rightFall = new DungeonMapData('sw-right-drop', 'Pinball Room');
    rightFall.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    rightFall.nodes.push(new DungeonNode(
      'Pinball Chest', 51.5, 45, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[156]));
    swData.dungeonMaps.push(rightFall);

    var mapRoom = new DungeonMapData('sw-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    mapRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 79, 28, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[153]));
    swData.dungeonMaps.push(mapRoom);

    var northeastBc = new DungeonMapData('sw-northeast-bc', 'Circle of Pots Room');
    northeastBc.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    northeastBc.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(northeastBc);

    var part2 = new DungeonMapData('sw-part21', 'Big Key Room');
    part2.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-lostwoods' : 'sw-entry'));
    part2.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part22'));
    part2.nodes.push(new DungeonNode(
      'Big Key Chest', 51.5, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[151]));
    swData.dungeonMaps.push(part2);

    var part22 = new DungeonMapData('sw-part22', 'Key Pot Room');
    part22.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part21'));
    if (!config.isFullMap) {
      part22.nodes.push(new DungeonNode(
        '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return items.fireRod;
      }, 'sw-final', 'Fire Rod Required'));
    } else {
      part22.nodes.push(new DungeonNode(
        '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'dw-lostwoods', '', [-1], 1));
    }
    part22.nodes.push(new DungeonNode(
      '', 21, 28, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    swData.dungeonMaps.push(part22);

    var final = new DungeonMapData('sw-final', 'Final Section');
    if (!config.isFullMap) {
      final.nodes.push(new DungeonNode(
        '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'sw-part22'));
    } else {
      final.nodes.push(new DungeonNode(
        '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'dw-lostwoods', '', [-1], 1));
    }
    final.nodes.push(new DungeonNode(
      'Mothula Room', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.sword;
    }, 'sw-mothula', 'Sword Required'));
    final.nodes.push(new DungeonNode(
      'Bridge Room Chest', 33, 74, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[154]));
    swData.dungeonMaps.push(final);

    var mothulaRoom = new DungeonMapData('sw-mothula', 'Mothula Room');
    mothulaRoom.nodes.push(new DungeonNode(
      'Mothula', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[157]));
    swData.dungeonMaps.push(mothulaRoom);
    
    swData.startingMap = entrance;

    return swData;
  }
}
