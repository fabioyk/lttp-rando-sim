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
          && items.canSouthDarkWorld(config);
      }, 47, 91
    );

    var entrance = new DungeonMapData('sp-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      'Swamp Palace First Chest', 36, 21, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[139]));
    entrance.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-tall-room'));
    spData.dungeonMaps.push(entrance);

    var tallRoom = new DungeonMapData('sp-tall-room', 'Tall Room', '');
    tallRoom.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-entry'));
    tallRoom.nodes.push(new DungeonNode(
      'Map Chest', 12.5, 26.8, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[142]));
    tallRoom.nodes.push(new DungeonNode(
      'Main Hub', 58, 76.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'sp-main-hub', 'Hammer Required'));
    spData.dungeonMaps.push(tallRoom);

    var mainHub = new DungeonMapData('sp-main-hub', 'Main Hub', '');
    mainHub.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-tall-room'));
    mainHub.nodes.push(new DungeonNode(
      'Big Chest', 48.5, 44.5, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[140]));
    mainHub.nodes.push(new DungeonNode(
      'Freestanding Key', 91, 51.5, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, '', 'Hookshot Required'));
    mainHub.nodes.push(new DungeonNode(
      'Downstairs', 50, 9.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'sp-downstairs1', 'Hookshot Required'));
    mainHub.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-switch'));
    mainHub.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    mainHub.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south'));
    spData.dungeonMaps.push(mainHub);

    var southRoom = new DungeonMapData('sp-south', 'South of Hub', '');
    southRoom.nodes.push(new DungeonNode(
      '', 50, 15, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    southRoom.nodes.push(new DungeonNode(
      'Compass Chest', 23.5, 17.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[144]));
    spData.dungeonMaps.push(southRoom);

    var switchRoom = new DungeonMapData('sp-switch', 'Switch Room', '');
    switchRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    switchRoom.nodes.push(new DungeonNode(
      'Switch', 40, 41, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    switchRoom.nodes.push(new DungeonNode(
      'Water Switch', 27, 39, DungeonNodeStatus.WATER_SWITCH,
    function(items:Items, config:Config) {
        return items.spSwitch;
    }, 'flood'));
    switchRoom.nodes.push(new DungeonNode(
      'South of Switch Room', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spSwitch;
    }, 'sp-south-switch', 'Switch on Blue Required'));
    spData.dungeonMaps.push(switchRoom);

    var southSwitch = new DungeonMapData('sp-south-switch', 'South of Switch Room', '');
    southSwitch.nodes.push(new DungeonNode(
      '', 93, 51.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    southSwitch.nodes.push(new DungeonNode(
      'Switch Room', 75, 35, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spSwitch;
    }, 'sp-switch', 'Switch on Blue Required'));
    southSwitch.nodes.push(new DungeonNode(
      'Left Side', 7, 51.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.spFlooded;
    }, 'sp-left', 'Flooded Swamp Required'));
    southSwitch.nodes.push(new DungeonNode(
      'Key Pot Room', 50, 39, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.spFlooded;
    }, 'sp-left-key', 'Non Flooded Swamp Required (leave dungeon to reset)'));
    spData.dungeonMaps.push(southSwitch);

    var leftKey = new DungeonMapData('sp-left-key', 'Key Pot Room', '');
    leftKey.nodes.push(new DungeonNode(
      '', 50, 79, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    leftKey.nodes.push(new DungeonNode(
      '', 47, 41, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    spData.dungeonMaps.push(leftKey);

    var leftSide = new DungeonMapData('sp-left', 'Left Side', '');
    leftSide.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-south-switch'));
    leftSide.nodes.push(new DungeonNode(
      'Left Side Rupee Chest', 38, 26.7, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[143]));
    leftSide.nodes.push(new DungeonNode(
      'Big Key Chest', 92, 26.7, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return !items.spSwitch;
    }, l[141], 'Switch on Red Required'));
    spData.dungeonMaps.push(leftSide);

    var downstairs = new DungeonMapData('sp-downstairs1', 'Downstairs', '');
    downstairs.nodes.push(new DungeonNode(
      '', 84, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-main-hub'));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Left Chest', 67, 68, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[145]));
    downstairs.nodes.push(new DungeonNode(
      'Flooded Room Right Chest', 76.5, 68, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[146]));
    downstairs.nodes.push(new DungeonNode(
      '', 25, 13.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-downstairs2'));
    spData.dungeonMaps.push(downstairs);

    var downstairs2 = new DungeonMapData('sp-downstairs2', 'Downstairs', '');
    downstairs2.nodes.push(new DungeonNode(
      '', 25, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-downstairs'));
    downstairs2.nodes.push(new DungeonNode(
      'Hidden Waterfall Chest', 54.7, 76.7, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[147]));
    downstairs2.nodes.push(new DungeonNode(
      'Arrghus Room', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-arrghus'));
    spData.dungeonMaps.push(downstairs2);

    var arrghusRoom = new DungeonMapData('sp-arrghus', 'Arrghus Room', '');
    arrghusRoom.nodes.push(new DungeonNode(
      'Arrghus', 50, 60, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[148]));
    spData.dungeonMaps.push(arrghusRoom);

    spData.startingMap = entrance;

    return spData;
  }
}
