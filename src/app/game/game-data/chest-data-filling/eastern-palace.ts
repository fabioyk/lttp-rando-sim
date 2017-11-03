import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";


export class EasternPalace {
  static setup (l:string[], config:Config):DungeonData {
    var epData = new DungeonData('Eastern Palace', l[66],
      function(items:Items, config:Config) {
        return true;
      }, 93.6, 38.8
    );

    var entrance = new DungeonMapData('ep-entry', 'Big Ball Room', '');
    entrance.nodes.push(new DungeonNode(
      '', 128, 238, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));    
    entrance.nodes.push(new DungeonNode(
      'Ball Room Chest', 207, 147, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[62]));
    entrance.nodes.push(new DungeonNode(
      '', 128, 13, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-fork'));
    epData.dungeonMaps.push(entrance);    

    var fork = new DungeonMapData('ep-fork', 'First Fork', '');
    fork.nodes.push(new DungeonNode(
      '', 128, 234, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-entry'));    
    fork.nodes.push(new DungeonNode(
      '', 243, 124, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-map'));
    fork.nodes.push(new DungeonNode(
      '', 15, 124, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-compass'));
    epData.dungeonMaps.push(fork);

    var mapRoom = new DungeonMapData('ep-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 10, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-fork'));    
    mapRoom.nodes.push(new DungeonNode(
      'Map Room Chest', 222, 188, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[64]));
    epData.dungeonMaps.push(mapRoom);

    var compassRoom = new DungeonMapData('ep-compass', 'Compass Room', '');
    compassRoom.nodes.push(new DungeonNode(
      '', 128, 227, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-fork'));    
    compassRoom.nodes.push(new DungeonNode(
      'Compass Room Chest', 111, 71, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[60]));
    compassRoom.nodes.push(new DungeonNode(
      '', 206, 135, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-bc'));
    epData.dungeonMaps.push(compassRoom);

    var bigChestRoom = new DungeonMapData('ep-bc', 'Big Chest Room', '');
    bigChestRoom.nodes.push(new DungeonNode(
      '', 26, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-compass'));    
    bigChestRoom.nodes.push(new DungeonNode(
      'Big Chest', 128, 99, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[61]));
    bigChestRoom.nodes.push(new DungeonNode(
      'Armos Room. Bow and Lamp Required', 128, 14, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hasLightsource(config);
    }, 'ep-armos'));
    bigChestRoom.nodes.push(new DungeonNode(
      'Big Key Room. Lamp Required', 232, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'ep-bk'));
    epData.dungeonMaps.push(bigChestRoom);

    var bigKeyRoom = new DungeonMapData('ep-bk', 'Big Key Room', '');
    bigKeyRoom.nodes.push(new DungeonNode(
      'Lamp Required', 225, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hasLightsource(config);
    }, 'ep-bc'));    
    bigKeyRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 128, 124, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[63]));
    bigKeyRoom.nodes.push(new DungeonNode(
      '', 118, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-bc'));
    epData.dungeonMaps.push(bigKeyRoom);

    var armosRoom = new DungeonMapData('ep-armos', 'Armos Room', '');
    armosRoom.nodes.push(new DungeonNode(
      '', 128, 152, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[65]));
    epData.dungeonMaps.push(armosRoom);    

    epData.startingMap = entrance;

    return epData;
  }
}
