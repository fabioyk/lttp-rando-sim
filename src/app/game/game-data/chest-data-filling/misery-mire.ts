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

    var entrance = new DungeonMapData('mm-entry', 'Hub Room', '');
    entrance.nodes.push(new DungeonNode(
      '', 192, 242, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 17, 197, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-switch-room'));
    entrance.nodes.push(new DungeonNode(
      '', 16, 68, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));
    entrance.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-west-spike'));
    entrance.nodes.push(new DungeonNode(
      '', 241, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-bc'));
    entrance.nodes.push(new DungeonNode(
      'Map Room. Requires Switch on Blue', 241, 68, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-map'));
    entrance.nodes.push(new DungeonNode(
      'Hub Room Chest. Requires Switch on Blue', 148, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, l[178]));
    mmData.dungeonMaps.push(entrance);

    var westSpike = new DungeonMapData('mm-west-spike', 'West of Spike Room', '');
    westSpike.nodes.push(new DungeonNode(
      '', 130, 222, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    westSpike.nodes.push(new DungeonNode(
      '', 130, 46, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-bridge'));
    westSpike.nodes.push(new DungeonNode(
      '', 228, 134, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-spike-room'));
    mmData.dungeonMaps.push(westSpike);

    var bridge = new DungeonMapData('mm-bridge', 'Bridge Chest', '');
    bridge.nodes.push(new DungeonNode(
      '', 120, 236, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-west-spike'));
    bridge.nodes.push(new DungeonNode(
      'Bridge Chest', 120, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[181]));
    mmData.dungeonMaps.push(bridge);

    var spikeRoom = new DungeonMapData('mm-spike-room', 'Spike Room', '');
    spikeRoom.nodes.push(new DungeonNode(
      '', 31, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-west-spike'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest. Requires Invulnerability Item', 152, 132, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config);
    }, l[183]));
    spikeRoom.nodes.push(new DungeonNode(
      '', 56, 64, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    spikeRoom.nodes.push(new DungeonNode(
      '', 128, 49, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-big-door'));
    spikeRoom.nodes.push(new DungeonNode(
      'Map Room. Requires Switch on Blue', 128, 224, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-map'));
    mmData.dungeonMaps.push(spikeRoom);

    var mapRoom = new DungeonMapData('mm-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 81, 68, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    mapRoom.nodes.push(new DungeonNode(
      '', 128, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-spike-room'));
    mapRoom.nodes.push(new DungeonNode(
      '', 80, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-entry'));
    mapRoom.nodes.push(new DungeonNode(
      '', 176, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-bc'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 100, 64, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, l[182]));
    mmData.dungeonMaps.push(mapRoom);

    var switchRoom = new DungeonMapData('mm-switch-room', 'Switch Room', '');
    switchRoom.nodes.push(new DungeonNode(
      '', 224, 126, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    switchRoom.nodes.push(new DungeonNode(
      '', 32, 126, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-four-torch'));
    switchRoom.nodes.push(new DungeonNode(
      '', 89, 108, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    switchRoom.nodes.push(new DungeonNode(
      '', 57, 150, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    mmData.dungeonMaps.push(switchRoom);

    var fourTorch = new DungeonMapData('mm-four-torch', 'Four Torch Room', '');
    fourTorch.nodes.push(new DungeonNode(
      '', 220, 130, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-switch-room'));
    fourTorch.nodes.push(new DungeonNode(
      'Compass Room. Requires Lamp or Fire Rod', 126, 40, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-compass'));
    fourTorch.nodes.push(new DungeonNode(
      'Big Key Room. Requires Lamp or Fire Rod', 126, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-bk'));
    mmData.dungeonMaps.push(fourTorch);

    var compassRoom = new DungeonMapData('mm-compass', 'Compass Room', '');
    compassRoom.nodes.push(new DungeonNode(
      '', 128, 218, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-four-torch'));
    compassRoom.nodes.push(new DungeonNode(
      '', 225, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));    
    compassRoom.nodes.push(new DungeonNode(
      'Compass Chest. Requires Switch on Blue', 128, 112, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, l[180]));
    mmData.dungeonMaps.push(compassRoom);

    var bkRoom = new DungeonMapData('mm-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 32, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 128, 124, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[179]));
    mmData.dungeonMaps.push(bkRoom);

    var loneStalfo = new DungeonMapData('mm-lone-stalfo', 'Northwest of Hub Room', '');
    loneStalfo.nodes.push(new DungeonNode(
      '', 224, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    loneStalfo.nodes.push(new DungeonNode(
      '', 128, 41, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-big-door'));
    mmData.dungeonMaps.push(loneStalfo);

    var bigDoor = new DungeonMapData('mm-big-door', 'Big Door Room', '');
    bigDoor.nodes.push(new DungeonNode(
      '', 228, 126, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-spike-room'));
    bigDoor.nodes.push(new DungeonNode(
      'Room before Vitreous. Requires Lamp and Cane of Somaria', 128, 83, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasLightsource(config) && items.somaria;
    }, 'mm-pre-vitty'));
    mmData.dungeonMaps.push(bigDoor);

    var bigChest = new DungeonMapData('mm-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 80, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    bigChest.nodes.push(new DungeonNode(
      'Map Room. Requires Switch on Blue', 80, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mmSwitch;
    }, 'mm-map'));
    bigChest.nodes.push(new DungeonNode(
      'Misery Mire Big Chest', 128, 31, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[177]));
    mmData.dungeonMaps.push(bigChest);

    var beforeVit = new DungeonMapData('mm-pre-vitty', 'Room before Vitreous', '');
    beforeVit.nodes.push(new DungeonNode(
      '', 192, 152, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-big-door'));
    beforeVit.nodes.push(new DungeonNode(
      'Vitreous Room. Requires one of Sword/Hammer/Bow', 64, 88, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.sword || items.hammer || items.hasBow();
    }, 'mm-vitty'));
    mmData.dungeonMaps.push(beforeVit);

    var vittyRoom = new DungeonMapData('mm-vitty', 'Vitreous Room', '');
    vittyRoom.nodes.push(new DungeonNode(
      '', 128, 128, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[184]));
    mmData.dungeonMaps.push(vittyRoom);

    mmData.startingMap = entrance;

    return mmData;
  }
}
