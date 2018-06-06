import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";


export class EasternPalace {
  static setup (l:string[], config:Config):DungeonData {
    var epData = new DungeonData('Eastern Palace', l[66],
      DungeonNode.noReqs, 93.6, 38.8
    );

    var entrance = new DungeonMapData('ep-entry', 'Big Ball Room');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, config.isFullMap ? 'lw-eastern-palace' : 'exit', 'exit'));    
    entrance.nodes.push(new DungeonNode(
      'Cannonball Chest', 79.6, 58, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[62], 'c'));
    entrance.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-fork', 'up'));
    epData.dungeonMaps.push(entrance);    

    var fork = new DungeonMapData('ep-fork', 'First Fork');
    fork.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-entry', 'down'));    
    fork.nodes.push(new DungeonNode(
      '', 93, 51.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-map', 'right'));
    fork.nodes.push(new DungeonNode(
      '', 7, 51.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-compass', 'left'));
    epData.dungeonMaps.push(fork);

    var mapRoom = new DungeonMapData('ep-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 7, 51.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-fork', 'left'));    
    mapRoom.nodes.push(new DungeonNode(
      'Map Room Chest', 86, 73.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[64], 'c'));
    epData.dungeonMaps.push(mapRoom);

    var compassRoom = new DungeonMapData('ep-compass', 'Compass Room');
    compassRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-fork', 'back'));    
    compassRoom.nodes.push(new DungeonNode(
      'Compass Room Chest', 44.5, 31.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[60], 'c'));
    compassRoom.nodes.push(new DungeonNode(
      '', 79, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-bc', 'forward'));
    epData.dungeonMaps.push(compassRoom);

    var bigChestRoom = new DungeonMapData('ep-bc', 'Big Chest Room');
    bigChestRoom.nodes.push(new DungeonNode(
      '', 9, 27, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-compass', 'left'));    
    bigChestRoom.nodes.push(new DungeonNode(
      'Big Chest', 50, 44, DungeonNodeStatus.BIG_CHEST,
    DungeonNode.noReqs, l[61], 'bc'));
    bigChestRoom.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.lamp;
    }, 'ep-armos', 'up', [-1], 0, 
    function(items:Items, config:Config) {
      return items.hasBow();
    }));
    bigChestRoom.nodes.push(new DungeonNode(
      '', 91, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'ep-bk', 'right', [-1], 0, 
    DungeonNode.noReqs));
    epData.dungeonMaps.push(bigChestRoom);

    var bigKeyRoom = new DungeonMapData('ep-bk', 'Big Key Room');
    bigKeyRoom.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-bc', 'back'));    
    bigKeyRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 51.5, 27, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[63], 'c'));
    bigKeyRoom.nodes.push(new DungeonNode(
      '', 68, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'ep-bc', 'back', [-1], 0, 
    DungeonNode.noReqs));
    epData.dungeonMaps.push(bigKeyRoom);

    var armosRoom = new DungeonMapData('ep-armos', 'Armos Room');
    armosRoom.nodes.push(new DungeonNode(
      'Armos Knights', 50, 50, DungeonNodeStatus.BOSS,
    DungeonNode.noReqs, l[65], 'boss'));
    epData.dungeonMaps.push(armosRoom);    

    epData.startingMap = entrance;

    return epData;
  }
}
