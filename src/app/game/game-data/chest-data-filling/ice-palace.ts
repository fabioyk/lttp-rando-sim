import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class IcePalace {
  static setup (l:string[], config:Config):DungeonData {
    var ipData = new DungeonData('Ice Palace', l[176],
      function(items:Items, config:Config) {
        return (items.flippers || config.canGlitch) && (items.moonPearl || config.canGlitch)
            && items.glove === 2;
      }, 79.6, 85.8
    );

    var entrance = new DungeonMapData('ip-entry', 'Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-lake-hylea' : 'exit', 'exit', [-1], 1));
    entrance.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hasMeltyPower() && items.moonPearl;
    }, 'ip-first-fork', 'left', [-1], 0,
    function(items:Items, config:Config) {
      return items.hasMeltyPower();
    }));
    ipData.dungeonMaps.push(entrance);
    

    var firstFork = new DungeonMapData('ip-first-fork', 'Push Block Cross');
    firstFork.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-entry', 'left'));
    firstFork.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-compass', 'down'));
    firstFork.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-conveyor-room', 'up'));
    ipData.dungeonMaps.push(firstFork);

    var compass = new DungeonMapData('ip-compass', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-first-fork', 'up'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 47, 66, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[169], 'c'));
    ipData.dungeonMaps.push(compass);

    var conveyor = new DungeonMapData('ip-conveyor-room', 'Conveyor Room');
    conveyor.nodes.push(new DungeonNode(
      'Small Key', 55, 53, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    conveyor.nodes.push(new DungeonNode(
      'Crystal Switch', 20, 42, DungeonNodeStatus.SWITCH,
      DungeonNode.noReqs, 'switch', 'switch'));
    conveyor.nodes.push(new DungeonNode(
      '', 25, 69, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-bj', 'down'));
    ipData.dungeonMaps.push(conveyor);

    var ipbj = new DungeonMapData('ip-bj', 'Bomb Jump Room');
    ipbj.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-conveyor-room', 'up'));
    ipbj.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return !items.crystalSwitch;
      }, 'ip-plus', 'right',
      [-1], 0, DungeonNode.noReqs));
    ipData.dungeonMaps.push(ipbj);

    var plus = new DungeonMapData('ip-plus', 'Plus Shaped Room');
    plus.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-bj', 'down'));
    plus.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-spike-room', 'right'));
    plus.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-tall-room', 'up'));
    plus.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-double-freezor', 'left'));
    ipData.dungeonMaps.push(plus);

    var doubFreez = new DungeonMapData('ip-double-freezor', 'Freezor Room');
    doubFreez.nodes.push(new DungeonNode(
      '', 28, 67, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-plus', 'up'));
    doubFreez.nodes.push(new DungeonNode(
      'Freezor Chest', 46.5, 53.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[172], 'c'));
    doubFreez.nodes.push(new DungeonNode(
      '', 27, 50, DungeonNodeStatus.HOLE,
      DungeonNode.noReqs, 'ip-bc', 'hole'));
    if (config.canGlitch) {
      doubFreez.nodes.push(new DungeonNode(
        '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
        DungeonNode.noReqs, 'ip-tall-room', 'right'));
    }
    ipData.dungeonMaps.push(doubFreez);

    var tallRoom = new DungeonMapData('ip-tall-room', 'Tall Icy Room');
    if (config.canGlitch) {
      tallRoom.nodes.push(new DungeonNode(
        '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
        DungeonNode.noReqs, 'ip-double-freezor', 'left'));
    } else {
      tallRoom.nodes.push(new DungeonNode(
        '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
        DungeonNode.noReqs, 'ip-bc', 'left'));
    }    
    tallRoom.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-spike-room', 'right',
    [-1], 0, DungeonNode.noReqs));
    tallRoom.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-double-jelly', 'down'));
    ipData.dungeonMaps.push(tallRoom);

    var spikeRoom = new DungeonMapData('ip-spike-room', 'Spike Room');
    spikeRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-plus', 'left'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest', 28.5, 72, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[171], 'c'));
    spikeRoom.nodes.push(new DungeonNode(
      '', 72, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-map', 'up'));
    ipData.dungeonMaps.push(spikeRoom);

    var mapRoom = new DungeonMapData('ip-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 72, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-spike-room', 'up'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 72, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[170], 'c'));
    mapRoom.nodes.push(new DungeonNode(
      'Small Key', 50, 50, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hammer;
    }, '', 'key'));
    mapRoom.nodes.push(new DungeonNode(
      'Big Key Room', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-bk', 'right'));
    ipData.dungeonMaps.push(mapRoom);

    var bkRoom = new DungeonMapData('ip-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 40.5, 34, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-map', 'up'));
    bkRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-first-fork', 'left'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 44, 72, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[168], 'c'));
    ipData.dungeonMaps.push(bkRoom);

    var bcRoom = new DungeonMapData('ip-bc', 'Big Chest Room');
    bcRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-push-block', 'right'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Chest', 25, 30, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[174], 'bc'));
    ipData.dungeonMaps.push(bcRoom);

    var djRoom = new DungeonMapData('ip-double-jelly', 'Iced T Room');
    djRoom.nodes.push(new DungeonNode(
      '', 31, 19, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-tall-room', 'up'));
    djRoom.nodes.push(new DungeonNode(
      'Iced T Chest', 28, 72, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[173], 'c'));
    djRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-icy-pot', 'right'));
    ipData.dungeonMaps.push(djRoom);

    var skullPot = new DungeonMapData('ip-icy-pot', 'Skull Pot Firebar Room');
    skullPot.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-push-block-right', 'left'));
    skullPot.nodes.push(new DungeonNode(
      'Small Key', 19, 38, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    skullPot.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-double-jelly', 'down'));
    ipData.dungeonMaps.push(skullPot);

    var pushBlock = new DungeonMapData('ip-push-block', 'Push Block Room');
    pushBlock.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-bc', 'left'));
    pushBlock.nodes.push(new DungeonNode(
      'Button Switch Room', 42, 52, DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'ip-switch-room', 'hole'));
    pushBlock.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.crystalSwitch;
    }, 'ip-icy-pot', 'right'));
    pushBlock.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return !items.crystalSwitch;
    }, 'ip-fairy-drop', 'up'));
    ipData.dungeonMaps.push(pushBlock);

    var pushBlockRight = new DungeonMapData('ip-push-block-right', 'Push Block Room');
    pushBlockRight.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot && !items.crystalSwitch;
    }, 'ip-bc', 'left'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 59, 47, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'ip-switch-room', 'hole'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-icy-pot', 'right'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'ip-fairy-drop', 'up'));
    ipData.dungeonMaps.push(pushBlockRight);

    var fairyDrop = new DungeonMapData('ip-fairy-drop', 'Fairy Drop Room');
    fairyDrop.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-push-block-right', 'down'));
    fairyDrop.nodes.push(new DungeonNode(
      '', 31, 46, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.crystalSwitch;
    }, 'ip-switch-room', 'hole'));
    fairyDrop.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-switch-room', 'up'));
    ipData.dungeonMaps.push(fairyDrop);

    var finalButton = new DungeonMapData('ip-switch-room', 'Button Switch Room');
    finalButton.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-fairy-drop', 'up'));    
    finalButton.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-final-switch', 'right'));
    finalButton.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria || items.ipBlockPushed;
    }, 'ip-pre-khold', 'down'));
    ipData.dungeonMaps.push(finalButton);

    var finalSwitch = new DungeonMapData('ip-final-switch', 'Crystal Switch Room');
    finalSwitch.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'ip-switch-room', 'left'));
    finalSwitch.nodes.push(new DungeonNode(
      'Crystal Switch', 72, 54, DungeonNodeStatus.SWITCH,
      DungeonNode.noReqs, 'switch', 'switch'));
    ipData.dungeonMaps.push(finalSwitch);

    var preKhold = new DungeonMapData('ip-pre-khold', 'Room Above Boss');
    preKhold.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'ip-switch-room', 'up'));
    preKhold.nodes.push(new DungeonNode(
      '', 25, 76.5, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-khold', 'hole'));
    ipData.dungeonMaps.push(preKhold);

    var kholdRoom = new DungeonMapData('ip-khold', 'Kholdstare Room');
    kholdRoom.nodes.push(new DungeonNode(
      'Kholdstare', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[175], 'boss'));
    ipData.dungeonMaps.push(kholdRoom);

    ipData.startingMap = entrance;

    return ipData;
  }
}
