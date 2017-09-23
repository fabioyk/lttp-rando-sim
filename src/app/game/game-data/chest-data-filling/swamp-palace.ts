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
          && items.canSouthDarkWorld();
      }, 47, 91
    );

    var entrance = new DungeonMapData('sp-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[139]));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-tall-room'));
    spData.dungeonMaps.push(entrance);

    var tallRoom = new DungeonMapData('sp-tall-room', 'Tall Room', '');
    tallRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-entry'));
    tallRoom.nodes.push(new DungeonNode(
      'Map Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[142]));
    tallRoom.nodes.push(new DungeonNode(
      'Main Hub. Requires Hammer', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'sp-main-hub'));
    spData.dungeonMaps.push(tallRoom);

    var mainHub = new DungeonMapData('sp-main-hub', 'Main Hub', '');
    mainHub.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-tall-room'));
    mainHub.nodes.push(new DungeonNode(
      'Big Chest', 0, 0, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[140]));
    mainHub.nodes.push(new DungeonNode(
      'Freestanding Key. Requires Hookshot', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, ''));
    mainHub.nodes.push(new DungeonNode(
      'Downstairs. Requires Hookshot', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'sp-downstairs'));
    mainHub.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-switch'));
    mainHub.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    mainHub.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south'));
    spData.dungeonMaps.push(mainHub);

    var southRoom = new DungeonMapData('sp-south', 'South of Hub', '');
    southRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    southRoom.nodes.push(new DungeonNode(
      'Compass Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[144]));
    spData.dungeonMaps.push(southRoom);

    var switchRoom = new DungeonMapData('sp-switch', 'Switch Room', '');
    switchRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    switchRoom.nodes.push(new DungeonNode(
      'Switch', 0, 0, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    switchRoom.nodes.push(new DungeonNode(
      'Water Switch', 0, 0, DungeonNodeStatus.WATER_SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    switchRoom.nodes.push(new DungeonNode(
      'South of Switch Room. Requires Switch on Blue', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spSwitch;
    }, 'sp-south-switch'));
    spData.dungeonMaps.push(switchRoom);

    var southSwitch = new DungeonMapData('sp-south-switch', 'South of Switch Room', '');
    southSwitch.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    southSwitch.nodes.push(new DungeonNode(
      'Switch Room. Requires Switch on Blue', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spSwitch;
    }, 'sp-switch'));
    southSwitch.nodes.push(new DungeonNode(
      'Left Side. Requires Flooded Swamp', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spFlooded;
    }, 'sp-left'));
    southSwitch.nodes.push(new DungeonNode(
      'Key Pot Room. Requires non Flooded Swamp (leave dungeon to reset)', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.spFlooded;
    }, 'sp-left-key'));
    spData.dungeonMaps.push(southSwitch);

    var leftKey = new DungeonMapData('sp-left-key', 'Key Pot Room', '');
    leftKey.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    leftKey.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    spData.dungeonMaps.push(leftKey);

    var leftSide = new DungeonMapData('sp-left', 'Left Side', '');
    leftSide.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    leftSide.nodes.push(new DungeonNode(
      'Left Side Rupee Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[143]));
    leftSide.nodes.push(new DungeonNode(
      'Big Key Chest. Requires Switch on Red', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return !items.spSwitch;
    }, l[141]));
    spData.dungeonMaps.push(leftSide);

    var downstairs = new DungeonMapData('sp-downstairs', 'Downstairs', '');
    downstairs.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Left Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[145]));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Right Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[146]));
    downstairs.nodes.push(new DungeonNode(
      'Hidden Waterfall Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[147]));
    downstairs.nodes.push(new DungeonNode(
      'Arrghus Room', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-arrghus'));
    spData.dungeonMaps.push(downstairs);

    var arrghusRoom = new DungeonMapData('sp-arrghus', 'Arrghus Room', '');
    arrghusRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[148]));
    spData.dungeonMaps.push(arrghusRoom);

    spData.startingMap = entrance;

    return spData;
  }
}
