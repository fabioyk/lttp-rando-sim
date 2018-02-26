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
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-lake-hylea' : 'exit', '', [-1], 1));
    entrance.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasMeltyPower();
    }, 'ip-first-fork', 'Fire Rod or Bombos Required'));
    ipData.dungeonMaps.push(entrance);
    

    var firstFork = new DungeonMapData('ip-first-fork', 'Push Block Cross');
    firstFork.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-entry'));
    firstFork.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-compass'));
    firstFork.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-conveyor-room'));
    ipData.dungeonMaps.push(firstFork);

    var compass = new DungeonMapData('ip-compass', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-first-fork'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 47, 66, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[169]));
    ipData.dungeonMaps.push(compass);

    var conveyor = new DungeonMapData('ip-conveyor-room', 'Conveyor Room');
    conveyor.nodes.push(new DungeonNode(
      '', 55, 53, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    conveyor.nodes.push(new DungeonNode(
      '', 20, 42, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    conveyor.nodes.push(new DungeonNode(
      '', 25, 69, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bj'));
    ipData.dungeonMaps.push(conveyor);

    //TODO adjust numbers
    var ipbj = new DungeonMapData('ip-bj', 'Bomb Jump Room');
    ipbj.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-conveyor-room'));
    ipbj.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.ipSwitch || config.canGlitch;
    }, 'ip-plus', 'Switch on Red Required'));
    ipData.dungeonMaps.push(ipbj);

    var plus = new DungeonMapData('ip-plus', 'Plus Shaped Room');
    plus.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bj'));
    plus.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    plus.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    plus.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-freezor'));
    ipData.dungeonMaps.push(plus);

    var doubFreez = new DungeonMapData('ip-double-freezor', 'Freezor Room');
    doubFreez.nodes.push(new DungeonNode(
      '', 28, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    doubFreez.nodes.push(new DungeonNode(
      'Freezor Chest', 46.5, 53.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[172]));
    doubFreez.nodes.push(new DungeonNode(
      '', 27, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bc'));
    if (config.canGlitch) {
      doubFreez.nodes.push(new DungeonNode(
        '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-tall-room'));
    }
    ipData.dungeonMaps.push(doubFreez);

    var tallRoom = new DungeonMapData('ip-tall-room', 'Tall Icy Room');
    if (config.canGlitch) {
      tallRoom.nodes.push(new DungeonNode(
        '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-double-freezor'));
    } else {
      tallRoom.nodes.push(new DungeonNode(
        '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-bc'));
    }    
    tallRoom.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'ip-spike-room', 'Hookshot Required'));
    tallRoom.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(tallRoom);

    var spikeRoom = new DungeonMapData('ip-spike-room', 'Spike Room');
    spikeRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest', 28.5, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[171]));
    spikeRoom.nodes.push(new DungeonNode(
      '', 72, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-map'));
    ipData.dungeonMaps.push(spikeRoom);

    var mapRoom = new DungeonMapData('ip-map', 'Map Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 72, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest', 72, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[170], 'Hammer Required'));
    mapRoom.nodes.push(new DungeonNode(
      'Small Key', 50, 50, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hammer;
    }, '', 'Hammer Required'));
    mapRoom.nodes.push(new DungeonNode(
      'Big Key Room', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-bk', 'Hammer Required'));
    ipData.dungeonMaps.push(mapRoom);

    var bkRoom = new DungeonMapData('ip-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 40.5, 34, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-map'));
    bkRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-first-fork'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 44, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[168]));
    ipData.dungeonMaps.push(bkRoom);

    var bcRoom = new DungeonMapData('ip-bc', 'Big Chest Room');
    bcRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Chest', 25, 30, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[174]));
    ipData.dungeonMaps.push(bcRoom);

    var djRoom = new DungeonMapData('ip-double-jelly', 'Iced T Room');
    djRoom.nodes.push(new DungeonNode(
      '', 31, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    djRoom.nodes.push(new DungeonNode(
      'Iced T Chest', 28, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[173]));
    djRoom.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    ipData.dungeonMaps.push(djRoom);

    var skullPot = new DungeonMapData('ip-icy-pot', 'Skull Pot Firebar Room');
    skullPot.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block-right'));
    skullPot.nodes.push(new DungeonNode(
      '', 19, 38, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    skullPot.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(skullPot);

    //TODO adjust numbers
    var pushBlock = new DungeonMapData('ip-push-block', 'Push Block Room');
    pushBlock.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-bc', 'Hookshot Required'));
    pushBlock.nodes.push(new DungeonNode(
      '', 42, 52, DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room', 'Switch on Blue Required'));
    pushBlock.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.ipSwitch;
    }, 'ip-icy-pot', 'Switch on Red Required'));
    pushBlock.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return !items.ipSwitch;
    }, 'ip-fairy-drop', 'Switch on Red Required'));
    ipData.dungeonMaps.push(pushBlock);

    //TODO adjust numbers
    var pushBlockRight = new DungeonMapData('ip-push-block-right', 'Push Block Room');
    pushBlockRight.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot && !items.ipSwitch;
    }, 'ip-bc', 'Hookshot and Switch on Red Required'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 59, 47, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room', 'Switch on Blue Required'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-fairy-drop'));
    ipData.dungeonMaps.push(pushBlockRight);

    var fairyDrop = new DungeonMapData('ip-fairy-drop', 'Fairy Drop Room');
    fairyDrop.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block-right'));
    fairyDrop.nodes.push(new DungeonNode(
      '', 31, 46, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room', 'Switch on Blue Required'));
    fairyDrop.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-switch-room'));
    ipData.dungeonMaps.push(fairyDrop);

    var finalButton = new DungeonMapData('ip-switch-room', 'Button Switch Room');
    finalButton.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-fairy-drop'));    
    finalButton.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-final-switch'));
    finalButton.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria || items.ipBlockPushed;
    }, 'ip-pre-khold', 'Somaria or Block Pushed from Above Required'));
    ipData.dungeonMaps.push(finalButton);

    var finalSwitch = new DungeonMapData('ip-final-switch', 'Crystal Switch Room');
    finalSwitch.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-switch-room'));
    finalSwitch.nodes.push(new DungeonNode(
      '', 72, 54, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    ipData.dungeonMaps.push(finalSwitch);

    var preKhold = new DungeonMapData('ip-pre-khold', 'Room Above Boss');
    preKhold.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-switch-room'));
    preKhold.nodes.push(new DungeonNode(
      '', 25, 76.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-khold', 'Hammer Required'));
    ipData.dungeonMaps.push(preKhold);

    var kholdRoom = new DungeonMapData('ip-khold', 'Kholdstare Room');
    kholdRoom.nodes.push(new DungeonNode(
      'Kholdstare', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[175]));
    ipData.dungeonMaps.push(kholdRoom);

    ipData.startingMap = entrance;

    return ipData;
  }
}
