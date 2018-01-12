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
        return items.moonPearl && items.canNorthWestDarkWorld(config);
      }, 6.6, 5.4
    );

    var entrance = new DungeonMapData('sw-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 162, 233, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Left Drop', 68, 224, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 228, 194, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 204, 42, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 180, 119, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 20, 104, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part21'));
    swData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('sw-left-drop', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 190, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 196, 115, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[152]));
    compass.nodes.push(new DungeonNode(
      '', 235, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    swData.dungeonMaps.push(compass);

    var gibdoStalfo = new DungeonMapData('sw-gibdo-stalfo', 'Gibdo Stalfo Room', '');
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 127, 224, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    gibdoStalfo.nodes.push(new DungeonNode(
      'Gibdo Stalfo Chest', 58, 71, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[155]));
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 222, 138, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(gibdoStalfo);

    var bigChest = new DungeonMapData('sw-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 34, 130, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    bigChest.nodes.push(new DungeonNode(
      '', 128, 218, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-entry'));
    bigChest.nodes.push(new DungeonNode(
      '', 226, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 130, 92, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[150]));
    swData.dungeonMaps.push(bigChest);

    var rightFall = new DungeonMapData('sw-right-drop', 'Right Fall Room', '');
    rightFall.nodes.push(new DungeonNode(
      '', 190, 30, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    rightFall.nodes.push(new DungeonNode(
      'Right Fall Chest', 134, 116, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[156]));
    swData.dungeonMaps.push(rightFall);

    var mapRoom = new DungeonMapData('sw-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 127, 218, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    mapRoom.nodes.push(new DungeonNode(
      '', 30, 134, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    mapRoom.nodes.push(new DungeonNode(
      '', 129, 34, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 202, 66, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[153]));
    swData.dungeonMaps.push(mapRoom);

    var northeastBc = new DungeonMapData('sw-northeast-bc', 'Top Right Fall', '');
    northeastBc.nodes.push(new DungeonNode(
      '', 127, 237, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    northeastBc.nodes.push(new DungeonNode(
      '', 32, 138, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(northeastBc);

    var part2 = new DungeonMapData('sw-part21', 'Big Key Room', '');
    part2.nodes.push(new DungeonNode(
      '', 211, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-entry'));
    part2.nodes.push(new DungeonNode(
      'Final Section', 41, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part22'));
    part2.nodes.push(new DungeonNode(
      'Big Key Chest', 217, 82, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[151]));
    swData.dungeonMaps.push(part2);

    var part22 = new DungeonMapData('sw-part22', 'Before Final Section', '');
    part22.nodes.push(new DungeonNode(
      '', 211, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part21'));
    part22.nodes.push(new DungeonNode(
      'Final Section', 41, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'sw-final', 'Fire Rod Required'));
    part22.nodes.push(new DungeonNode(
      '', 21, 150, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    swData.dungeonMaps.push(part22);

    var final = new DungeonMapData('sw-final', 'Final Section', '');
    final.nodes.push(new DungeonNode(
      '', 62, 242, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part22'));
    final.nodes.push(new DungeonNode(
      'Mothula Room', 62, 32, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.sword;
    }, 'sw-mothula', 'Sword Required'));
    final.nodes.push(new DungeonNode(
      'Final Section Chest', 84, 186, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[154]));
    swData.dungeonMaps.push(final);

    var mothulaRoom = new DungeonMapData('sw-mothula', 'Mothula Room', '');
    mothulaRoom.nodes.push(new DungeonNode(
      'Mothula', 128, 141, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[157]));
    swData.dungeonMaps.push(mothulaRoom);
    
    swData.startingMap = entrance;

    return swData;
  }
}
