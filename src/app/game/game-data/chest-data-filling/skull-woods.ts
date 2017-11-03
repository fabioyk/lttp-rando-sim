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
        return items.moonPearl && items.canNorthWestDarkWorld();
      }, 6.6, 5.4
    );

    var entrance = new DungeonMapData('sw-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 162, 233, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Left Drop', 70, 222, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 230, 190, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    entrance.nodes.push(new DungeonNode(
      '', 206, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 182, 117, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 22, 102, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part2'));
    swData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('sw-left-drop', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 196, 115, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[152]));
    compass.nodes.push(new DungeonNode(
      '', 241, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    swData.dungeonMaps.push(compass);

    var gibdoStalfo = new DungeonMapData('sw-gibdo-stalfo', 'Gibdo Stalfo Room', '');
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 129, 222, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-left-drop'));
    gibdoStalfo.nodes.push(new DungeonNode(
      'Gibdo Stalfo Chest', 56, 67, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[155]));
    gibdoStalfo.nodes.push(new DungeonNode(
      '', 224, 134, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(gibdoStalfo);

    var bigChest = new DungeonMapData('sw-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 36, 126, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-gibdo-stalfo'));
    bigChest.nodes.push(new DungeonNode(
      '', 130, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-entry'));
    bigChest.nodes.push(new DungeonNode(
      '', 228, 126, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 130, 86, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[150]));
    swData.dungeonMaps.push(bigChest);

    var rightFall = new DungeonMapData('sw-right-drop', 'Right Fall Room', '');
    rightFall.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    rightFall.nodes.push(new DungeonNode(
      'Right Fall Chest', 132, 114, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[156]));
    swData.dungeonMaps.push(rightFall);

    var mapRoom = new DungeonMapData('sw-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 128, 218, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-right-drop'));
    mapRoom.nodes.push(new DungeonNode(
      '', 30, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    mapRoom.nodes.push(new DungeonNode(
      '', 128, 22, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-northeast-bc'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 201, 64, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[153]));
    swData.dungeonMaps.push(mapRoom);

    var northeastBc = new DungeonMapData('sw-northeast-bc', 'Top Right Fall', '');
    northeastBc.nodes.push(new DungeonNode(
      '', 129, 237, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-map'));
    northeastBc.nodes.push(new DungeonNode(
      '', 32, 135, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    swData.dungeonMaps.push(northeastBc);

    var part2 = new DungeonMapData('sw-part2', 'Second Section', '');
    part2.nodes.push(new DungeonNode(
      '', 213, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-entry'));
    part2.nodes.push(new DungeonNode(
      'Final Section. Requires Fire Rod', 43, 202, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'sw-final'));
    part2.nodes.push(new DungeonNode(
      '', 19, 148, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-bc'));
    part2.nodes.push(new DungeonNode(
      'Big Key Chest', 215, 80, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[151]));
    swData.dungeonMaps.push(part2);

    var final = new DungeonMapData('sw-final', 'Final Section', '');
    final.nodes.push(new DungeonNode(
      '', 64, 242, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sw-part2'));
    final.nodes.push(new DungeonNode(
      'Mothula Room. Requires Sword.', 64, 25, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.sword;
    }, 'sw-mothula'));
    final.nodes.push(new DungeonNode(
      'Final Section Chest', 84, 186, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[154]));
    swData.dungeonMaps.push(final);

    var mothulaRoom = new DungeonMapData('sw-mothula', 'Mothula Room', '');
    mothulaRoom.nodes.push(new DungeonNode(
      '', 128, 141, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[157]));
    swData.dungeonMaps.push(mothulaRoom);
    
    swData.startingMap = entrance;

    return swData;
  }
}
