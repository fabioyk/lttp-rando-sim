import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class MiseryMire {
  static setup (l:string[], config:Config):DungeonData {
    var mmData = new DungeonData('Misery Mire', l[185],
      function(items:Items, config:Config) {
        return items.moonPearl && items.canMire() && items.hasMedallion('mm', config) && items.sword
            && (items.boots || items.hookshot);
      }, 11.6, 82.9
    );

    var entrance = new DungeonMapData('mm-entry', 'Main Lobby');
    entrance.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-desert' : 'exit', 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-switch-room', 'down-left'));
    entrance.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-lone-stalfo', 'up-left'));
    entrance.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-west-spike', 'up'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-bc', 'down-right'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'up-right'));
    entrance.nodes.push(new DungeonNode(
      'Main Lobby Chest', 57, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[178], 'c'));
    mmData.dungeonMaps.push(entrance);

    var westSpike = new DungeonMapData('mm-west-spike', 'Push Block Room');
    westSpike.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-entry', 'down'));
    westSpike.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-two-bridges', 'up'));
    westSpike.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-spike-room', 'right'));
    mmData.dungeonMaps.push(westSpike);

    var spikeRoom = new DungeonMapData('mm-spike-room', 'Spike Room');
    spikeRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-west-spike', 'left'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest', 59.5, 54, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[183], 'c'));
    spikeRoom.nodes.push(new DungeonNode(
      'Small Key', 22.5, 29, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    spikeRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-north-spike', 'up'));
    spikeRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'down'));
    mmData.dungeonMaps.push(spikeRoom);

    var northSpikeRoom = new DungeonMapData('mm-north-spike', 'North of Spike Room');
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 50, 85, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-spike-room', 'down'));
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 22, 50, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-big-door', 'left'));
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 50, 16, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-fish-spine', 'up'));
    mmData.dungeonMaps.push(northSpikeRoom);

    var fishSpine = new DungeonMapData('mm-fish-spine', 'Fish Spine');
    fishSpine.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-lone-stalfo', 'down'));
    fishSpine.nodes.push(new DungeonNode(
      '', 93, 50, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-north-spike', 'right'));
    fishSpine.nodes.push(new DungeonNode(
      'Small Key', 19, 22, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    fishSpine.nodes.push(new DungeonNode(
      'Crystal Switch', 33, 26, DungeonNodeStatus.SWITCH,
      DungeonNode.noReqs, 'switch', 'switch')); 
    mmData.dungeonMaps.push(fishSpine);

    var mapRoom = new DungeonMapData('mm-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 32, 26, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-entry', 'up-left'));
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-spike-room', 'up'));
    mapRoom.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-entry', 'down-left'));
    mapRoom.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-bc', 'right'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 41, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[182], 'c'));
    mmData.dungeonMaps.push(mapRoom);

    var switchRoom = new DungeonMapData('mm-switch-room', 'Switch Room');
    switchRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-entry', 'right'));
    switchRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-four-torch', 'left'));
    switchRoom.nodes.push(new DungeonNode(
      'Crystal Switch', 34.5, 47, DungeonNodeStatus.SWITCH,
      DungeonNode.noReqs, 'switch', 'switch'));
    switchRoom.nodes.push(new DungeonNode(
      'Small Key', 22, 72, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    mmData.dungeonMaps.push(switchRoom);

    var fourTorch = new DungeonMapData('mm-four-torch', 'Four Torch Room');
    fourTorch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'mm-switch-room', 'right'));
    fourTorch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-compass', 'up'));
    fourTorch.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-bk', 'down'));
    mmData.dungeonMaps.push(fourTorch);

    var compassRoom = new DungeonMapData('mm-compass', 'Compass Room');
    compassRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-four-torch', 'down'));
    compassRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-lone-stalfo', 'right'));    
    compassRoom.nodes.push(new DungeonNode(
      'Compass Chest', 50, 47, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[180], 'c'));
    mmData.dungeonMaps.push(compassRoom);

    var bkRoom = new DungeonMapData('mm-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-lone-stalfo', 'left'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 50, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[179], 'c'));
    mmData.dungeonMaps.push(bkRoom);

    var loneStalfo = new DungeonMapData('mm-lone-stalfo', 'Lonely Stalfo Room');
    loneStalfo.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-entry', 'right'));
    loneStalfo.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'mm-big-door', 'up'));
    mmData.dungeonMaps.push(loneStalfo);

    var bigDoor = new DungeonMapData('mm-big-door', 'Big Door Room');
    bigDoor.nodes.push(new DungeonNode(
      '', 90, 51.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-north-spike', 'right'));
    bigDoor.nodes.push(new DungeonNode(
      '', 50, 34, DungeonNodeStatus.BK_LOCKED,
    DungeonNode.noReqs, 'mm-two-bridges', 'up', [-1], 1));
    mmData.dungeonMaps.push(bigDoor);

    var bigChest = new DungeonMapData('mm-bc', 'Big Chest Room');
    bigChest.nodes.push(new DungeonNode(
      '', 32, 50, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-entry', 'down-left'));
    bigChest.nodes.push(new DungeonNode(
      '', 32, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'up-left'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 15, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[177], 'bc'));
    mmData.dungeonMaps.push(bigChest);

    var beforeVit = new DungeonMapData('mm-pre-vitty', 'Room before Vitreous');
    beforeVit.nodes.push(new DungeonNode(
      '', 75, 60, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'mm-two-bridges', 'right', [-1], 1));
    beforeVit.nodes.push(new DungeonNode(
      '', 25, 35, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'mm-vitty', 'left'));
    mmData.dungeonMaps.push(beforeVit);

    var vittyRoom = new DungeonMapData('mm-vitty', 'Vitreous Room');
    vittyRoom.nodes.push(new DungeonNode(
      'Vitreous', 50, 52, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[184], 'boss'));
    mmData.dungeonMaps.push(vittyRoom);

    var bridgeRoom = new DungeonMapData('mm-two-bridges', 'Bridge Room');
    // 1 left side, 0 right side
    bridgeRoom.nodes.push(new DungeonNode(
      '', 50, 13, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.lamp && items.somaria;
    }, 'mm-pre-vitty', 'up', [1], 0,
    function(items:Items, config:Config) {
      return items.somaria;
    }));
    bridgeRoom.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'mm-big-door', 'down-left', [1]));
    bridgeRoom.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.hookshot;
    }, 'mm-west-spike', 'down-right'));
    bridgeRoom.nodes.push(new DungeonNode(
      'Map Chest', 75, 30, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.hookshot;
    }, l[181], 'c', [0, 1]));
    mmData.dungeonMaps.push(bridgeRoom);

    mmData.startingMap = entrance;

    return mmData;
  }
}
