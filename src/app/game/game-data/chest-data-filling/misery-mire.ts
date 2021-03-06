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
        return (items.moonPearl || config.mode === 'inverted') && items.canMire(config) 
          && items.hasMedallion('mm', config) && (items.sword || config.weapons === 'swordless')
          && ((items.boots && config.advancedItems) || items.hookshot);
      }, 11.6, 82.9
    );

    // TODO add a entry map?

    var entrance = new DungeonMapData('mm-entry', 'Misery Mire Main Lobby');
    entrance.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-desert' : 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-switch-room'));
    entrance.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));
    entrance.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-west-spike'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-bc'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'Switch on Blue Required'));
    entrance.nodes.push(new DungeonNode(
      'Main Lobby Chest', 57, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[178], 'Switch on Blue Required'));
    mmData.dungeonMaps.push(entrance);

    var westSpike = new DungeonMapData('mm-west-spike', 'Push Block Room');
    westSpike.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    westSpike.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-two-bridges'));
    westSpike.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-spike-room'));
    mmData.dungeonMaps.push(westSpike);

    var spikeRoom = new DungeonMapData('mm-spike-room', 'Spike Room');
    spikeRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-west-spike'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest', 59.5, 54, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[183]));
    spikeRoom.nodes.push(new DungeonNode(
      '', 22.5, 29, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    spikeRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-north-spike'));
    spikeRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'Switch on Blue Required'));
    mmData.dungeonMaps.push(spikeRoom);

    var northSpikeRoom = new DungeonMapData('mm-north-spike', 'North of Spike Room');
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 50, 85, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-spike-room'));
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 22, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-big-door'));
    northSpikeRoom.nodes.push(new DungeonNode(
      '', 50, 16, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-fish-spine'));
    mmData.dungeonMaps.push(northSpikeRoom);

    var fishSpine = new DungeonMapData('mm-fish-spine', 'Fish Spine');
    fishSpine.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-lone-stalfo', 'Switch on Blue Required'));
    fishSpine.nodes.push(new DungeonNode(
      '', 93, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-north-spike'));
    fishSpine.nodes.push(new DungeonNode(
      '', 19, 22, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    fishSpine.nodes.push(new DungeonNode(
      '', 33, 26, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch')); 
    mmData.dungeonMaps.push(fishSpine);

    var mapRoom = new DungeonMapData('mm-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 32, 26, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-spike-room', 'Switch on Blue Required'));
    mapRoom.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-entry', 'Switch on Blue Required'));
    mapRoom.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-bc', 'Switch on Blue Required'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 41, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[182]));
    mmData.dungeonMaps.push(mapRoom);

    var switchRoom = new DungeonMapData('mm-switch-room', 'Switch Room');
    switchRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    switchRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-four-torch'));
    switchRoom.nodes.push(new DungeonNode(
      '', 34.5, 47, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    switchRoom.nodes.push(new DungeonNode(
      '', 22, 72, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    mmData.dungeonMaps.push(switchRoom);

    var fourTorch = new DungeonMapData('mm-four-torch', 'Four Torch Room');
    fourTorch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-switch-room'));
    fourTorch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-compass', 'Fire Source Required'));
    fourTorch.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'mm-tile', 'Fire Source Required'));
    mmData.dungeonMaps.push(fourTorch);

    var compassRoom = new DungeonMapData('mm-compass', 'Compass Room');
    compassRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-four-torch'));
    compassRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));    
    compassRoom.nodes.push(new DungeonNode(
      'Compass Chest', 50, 47, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, l[180], 'Switch on Blue Required'));
    mmData.dungeonMaps.push(compassRoom);

    var tileRoom = new DungeonMapData('mm-tile', 'Moving Wall Room');
    tileRoom.nodes.push(new DungeonNode(
      '', 32, 76.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-four-torch'));
    tileRoom.nodes.push(new DungeonNode(
      '', 56.5, 76.5, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-bk'));
    if (config.hintsEnabled) {
      tileRoom.nodes.push(new DungeonNode(
        'Hint Tile', 36, 33, DungeonNodeStatus.HINT,
      function(items:Items, config:Config) {
          return true;
      }, '11'));
    }
    mmData.dungeonMaps.push(tileRoom);

    var bkRoom = new DungeonMapData('mm-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-lone-stalfo'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 50, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[179]));
    mmData.dungeonMaps.push(bkRoom);

    var loneStalfo = new DungeonMapData('mm-lone-stalfo', 'Lonely Stalfo Room');
    loneStalfo.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    loneStalfo.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-big-door'));
    mmData.dungeonMaps.push(loneStalfo);

    var bigDoor = new DungeonMapData('mm-big-door', 'Big Door Room');
    bigDoor.nodes.push(new DungeonNode(
      '', 90, 51.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-north-spike'));
    bigDoor.nodes.push(new DungeonNode(
      '', 50, 34, DungeonNodeStatus.BK_LOCKED,
    DungeonNode.noReqs, 'mm-two-bridges', '', [-1], 1));
    mmData.dungeonMaps.push(bigDoor);

    var bigChest = new DungeonMapData('mm-bc', 'Big Chest Room');
    bigChest.nodes.push(new DungeonNode(
      '', 32, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-entry'));
    bigChest.nodes.push(new DungeonNode(
      '', 32, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'mm-map', 'Switch on Blue Required'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 15, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[177]));
    mmData.dungeonMaps.push(bigChest);

    var beforeVit = new DungeonMapData('mm-pre-vitty', 'Room before Vitreous');
    beforeVit.nodes.push(new DungeonNode(
      '', 75, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-two-bridges', '', [-1], 1));
    beforeVit.nodes.push(new DungeonNode(
      '', 25, 35, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'mm-vitty'));
    mmData.dungeonMaps.push(beforeVit);   

    var bridgeRoom = new DungeonMapData('mm-two-bridges', 'Bridge Room');
    // 1 left side, 0 right side
    bridgeRoom.nodes.push(new DungeonNode(
      '', 50, 13, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.lamp && items.somaria && items.currentRegionInMap === 1;
    }, 'mm-pre-vitty', 
      ('Somaria ' +(config.canGlitch ? 'and Boots if hovering ' : 'and Lamp ') + 'required'), 
      [0, 1], 0,
    function(items:Items, config:Config) {
      return items.somaria && (items.currentRegionInMap === 1 || items.boots);
    }));
    bridgeRoom.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'mm-big-door', '', [1]));
    bridgeRoom.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.hookshot;
    }, 'mm-west-spike', 'Hookshot Required'));
    bridgeRoom.nodes.push(new DungeonNode(
      'Map Chest', 75, 30, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.hookshot;
    }, l[181], 'Hookshot Required', [0, 1]));
    mmData.dungeonMaps.push(bridgeRoom);

    var vittyRoom = new DungeonMapData('mm-vitty', 'Vitreous Room');
    vittyRoom.nodes.push(new DungeonNode(
      'Vitreous', 50, 52, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
      return items.hammer || items.sword || items.hasBow();
    }, l[184]));
    mmData.dungeonMaps.push(vittyRoom);

    mmData.startingMap = entrance;

    return mmData;
  }
}
