import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class SwampPalace {
  static setup (l:string[], config:Config):DungeonData {
    var spData = new DungeonData('Swamp Palace', l[149],
      function(items:Items, config:Config) {
        return items.moonPearl && items.mirror && items.flippers
          && items.canSouthDarkWorld(config.canGlitch);
      }, 47, 91
    );

    var entrance = new DungeonMapData('sp-entry', 'Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-flute7' : 'exit', 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Entrance Chest', 36, 21, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[139], 'c'));
    entrance.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'sp-tall-room', 'up'));
    spData.dungeonMaps.push(entrance);

    var tallRoom = new DungeonMapData('sp-tall-room', 'Key Pot Corridor');
    tallRoom.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-entry', 'up'));
    tallRoom.nodes.push(new DungeonNode(
      'Map Chest', 12.5, 26.8, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[142], 'c'));
    tallRoom.nodes.push(new DungeonNode(
      '', 58, 76.5, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.hammer;
      }, 'sp-main-hub', 'left'));
    spData.dungeonMaps.push(tallRoom);

    var mainHub = new DungeonMapData('sp-main-hub', 'Main Hub');
    mainHub.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-tall-room', 'right'));
    mainHub.nodes.push(new DungeonNode(
      'Big Chest', 48.5, 44.5, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[140], 'bc'));
    mainHub.nodes.push(new DungeonNode(
      'Small Key', 91, 51.5, DungeonNodeStatus.GROUND_KEY,
      function(items:Items, config:Config) {
        return items.hookshot;
      }, '', 'key'));
    mainHub.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
        return items.hookshot;
      }, 'sp-downstairs1', 'up'));
    mainHub.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'sp-switch', 'up-left'));
    mainHub.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-south-switch', 'down-left'));
    mainHub.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-south', 'down'));
    spData.dungeonMaps.push(mainHub);

    var southRoom = new DungeonMapData('sp-south', 'Compass Room');
    southRoom.nodes.push(new DungeonNode(
      '', 50, 15, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-main-hub', 'up'));
    southRoom.nodes.push(new DungeonNode(
      'Compass Chest', 23.5, 17.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[144], 'c'));
    spData.dungeonMaps.push(southRoom);

    var switchRoom = new DungeonMapData('sp-switch', 'Switch Room');
    switchRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-main-hub', 'right'));
    switchRoom.nodes.push(new DungeonNode(
      'Crystal Switch', 40, 41, DungeonNodeStatus.SWITCH,
      DungeonNode.noReqs, 'switch', 'switch'));
    switchRoom.nodes.push(new DungeonNode(
      'Water Switch', 27, 39, DungeonNodeStatus.WATER_SWITCH,
      function(items:Items, config:Config) {
        return items.crystalSwitch;
      }, 'flood', 'flood'));
    switchRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.crystalSwitch;
      }, 'sp-south-switch', 'down'));
    spData.dungeonMaps.push(switchRoom);

    var southSwitch = new DungeonMapData('sp-south-switch', 'South of Switch Room');
    southSwitch.nodes.push(new DungeonNode(
      '', 93, 51.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-main-hub', 'right'));
    southSwitch.nodes.push(new DungeonNode(
      '', 75, 35, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.crystalSwitch;
      }, 'sp-switch', 'up'));
    southSwitch.nodes.push(new DungeonNode(
      '', 7, 51.5, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.spFlooded;
      }, 'sp-left', 'left'));
    southSwitch.nodes.push(new DungeonNode(
      '', 50, 39, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return !items.spFlooded;
      }, 'sp-left-key', 'up-left'));
    spData.dungeonMaps.push(southSwitch);

    var leftKey = new DungeonMapData('sp-left-key', 'Key Pot Room');
    leftKey.nodes.push(new DungeonNode(
      '', 50, 79, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-south-switch', 'down'));
    leftKey.nodes.push(new DungeonNode(
      'Small Key', 47, 41, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    spData.dungeonMaps.push(leftKey);

    var leftSide = new DungeonMapData('sp-left', 'Left Side');
    leftSide.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-south-switch', 'right'));
    leftSide.nodes.push(new DungeonNode(
      'Left Side Chest', 38, 26.7, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[143], 'c1'));
    leftSide.nodes.push(new DungeonNode(
      'Big Key Chest', 92, 26.7, DungeonNodeStatus.CLOSED_CHEST,
      function(items:Items, config:Config) {
        return !items.crystalSwitch;
      }, l[141], 'c2'));
    spData.dungeonMaps.push(leftSide);

    var downstairs = new DungeonMapData('sp-downstairs1', 'Flooded Room');
    downstairs.nodes.push(new DungeonNode(
      '', 84, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-main-hub', 'back'));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Left Chest', 67, 68, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[145], 'c1'));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Right Chest', 76.5, 68, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[146], 'c2'));
    downstairs.nodes.push(new DungeonNode(
      '', 25, 13.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-downstairs2', 'up'));
    spData.dungeonMaps.push(downstairs);

    var downstairs2 = new DungeonMapData('sp-downstairs2', 'Waterfall Room');
    downstairs2.nodes.push(new DungeonNode(
      '', 25, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-downstairs1', 'down'));
    downstairs2.nodes.push(new DungeonNode(
      'Hidden Waterfall Chest', 54.7, 76.7, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[147], 'c'));
    downstairs2.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'sp-arrghus', 'up'));
    spData.dungeonMaps.push(downstairs2);

    var arrghusRoom = new DungeonMapData('sp-arrghus', 'Arrghus Room');
    arrghusRoom.nodes.push(new DungeonNode(
      'Arrghus', 50, 60, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[148], 'boss'));
    spData.dungeonMaps.push(arrghusRoom);

    spData.startingMap = entrance;

    return spData;
  }
}
