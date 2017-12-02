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
        return (items.flippers || config.canGlitch) && items.moonPearl
            && items.glove === 2 && items.hasMeltyPower();
      }, 79.6, 85.8
    );

    var entrance = new DungeonMapData('ip-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 126, 226, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 30, 142, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasMeltyPower();
    }, 'ip-first-fork'));
    ipData.dungeonMaps.push(entrance);
    

    var firstFork = new DungeonMapData('ip-first-fork', 'First Fork', '');
    firstFork.nodes.push(new DungeonNode(
      '', 30, 142, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-entry'));
    firstFork.nodes.push(new DungeonNode(
      '', 126, 226, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-compass'));
    firstFork.nodes.push(new DungeonNode(
      '', 126, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-conveyor-room'));
    ipData.dungeonMaps.push(firstFork);

    var compass = new DungeonMapData('ip-compass', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 126, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-first-fork'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 122, 169, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[169]));
    ipData.dungeonMaps.push(compass);

    var conveyor = new DungeonMapData('ip-conveyor-room', 'Conveyor Room', '');
    conveyor.nodes.push(new DungeonNode(
      '', 142, 117, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    conveyor.nodes.push(new DungeonNode(
      '', 53, 106, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    conveyor.nodes.push(new DungeonNode(
      '', 66, 174, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bj'));
    ipData.dungeonMaps.push(conveyor);

    //TODO adjust numbers
    var ipbj = new DungeonMapData('ip-bj', 'Bomb Jump Room', '');
    ipbj.nodes.push(new DungeonNode(
      '', 124, 49, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-conveyor-room'));
    ipbj.nodes.push(new DungeonNode(
      'Switch on Red or Bomb Jump', 220, 138, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.ipSwitch || config.canGlitch;
    }, 'ip-plus'));
    ipData.dungeonMaps.push(ipbj);

    var plus = new DungeonMapData('ip-plus', 'Plus Shaped Room', '');
    plus.nodes.push(new DungeonNode(
      '', 126, 229, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bj'));
    plus.nodes.push(new DungeonNode(
      '', 220, 140, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    plus.nodes.push(new DungeonNode(
      '', 126, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    plus.nodes.push(new DungeonNode(
      '', 29, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-freezor'));
    ipData.dungeonMaps.push(plus);

    var doubFreez = new DungeonMapData('ip-double-freezor', 'Double Freezor Room', '');
    doubFreez.nodes.push(new DungeonNode(
      '', 69, 176, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    doubFreez.nodes.push(new DungeonNode(
      'Double Freezor Chest', 124, 136, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[172]));
    doubFreez.nodes.push(new DungeonNode(
      '', 61, 131, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bc'));
    if (config.canGlitch) {
      doubFreez.nodes.push(new DungeonNode(
        '', 220, 140, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-tall-room'));
    }
    ipData.dungeonMaps.push(doubFreez);

    var tallRoom = new DungeonMapData('ip-tall-room', 'Tall Icy Room', '');
    if (config.canGlitch) {
      tallRoom.nodes.push(new DungeonNode(
        '', 80, 196, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-double-freezor'));
    } else {
      tallRoom.nodes.push(new DungeonNode(
        '', 80, 196, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return true;
      }, 'ip-bc'));
    }    
    tallRoom.nodes.push(new DungeonNode(
      'Spike Room. Requires Hookshot', 170, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'ip-spike-room'));
    tallRoom.nodes.push(new DungeonNode(
      '', 126, 240, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(tallRoom);

    var spikeRoom = new DungeonMapData('ip-spike-room', 'Spike Room', '');
    spikeRoom.nodes.push(new DungeonNode(
      '', 34, 140, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest. Requires Hookshot/Invulnerability Item', 73, 182, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config) || items.hookshot;
    }, l[171]));
    spikeRoom.nodes.push(new DungeonNode(
      'Map Room. Requires Hookshot/Invulnerability Item', 184, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config) || items.hookshot;
    }, 'ip-map'));
    ipData.dungeonMaps.push(spikeRoom);

    var mapRoom = new DungeonMapData('ip-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 184, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest. Requires Hammer', 188, 184, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[170]));
    mapRoom.nodes.push(new DungeonNode(
      'Freestanding Key. Requires Hammer', 120, 118, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hammer;
    }, ''));
    mapRoom.nodes.push(new DungeonNode(
      'Big Key Room. Requires Hammer', 225, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-bk'));
    ipData.dungeonMaps.push(mapRoom);

    var bkRoom = new DungeonMapData('ip-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 103, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-map'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 116, 184, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[168]));
    ipData.dungeonMaps.push(bkRoom);

    var bcRoom = new DungeonMapData('ip-bc', 'Big Chest Room', '');
    bcRoom.nodes.push(new DungeonNode(
      '', 220, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Chest', 62, 80, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[174]));
    ipData.dungeonMaps.push(bcRoom);

    var djRoom = new DungeonMapData('ip-double-jelly', 'Double Jelly Room', '');
    djRoom.nodes.push(new DungeonNode(
      '', 78, 52, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    djRoom.nodes.push(new DungeonNode(
      'Double Jelly Chest', 72, 185, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[173]));
    djRoom.nodes.push(new DungeonNode(
      '', 220, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    ipData.dungeonMaps.push(djRoom);

    var skullPot = new DungeonMapData('ip-icy-pot', 'Icy Skull Pot Room', '');
    skullPot.nodes.push(new DungeonNode(
      '', 33, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block-right'));
    skullPot.nodes.push(new DungeonNode(
      '', 49, 94, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    skullPot.nodes.push(new DungeonNode(
      '', 127, 226, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(skullPot);

    //TODO adjust numbers
    var pushBlock = new DungeonMapData('ip-push-block', 'Push Block Room', '');
    pushBlock.nodes.push(new DungeonNode(
      'Big Chest Room. Requires Hookshot', 32, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-bc'));
    pushBlock.nodes.push(new DungeonNode(
      '', 106, 135, DungeonNodeStatus.OPEN_DOOR_PUSH_BLOCK,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room'));
    pushBlock.nodes.push(new DungeonNode(
      'Icy Pot Room. Requires Switch on Red', 224, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return !items.ipSwitch;
    }, 'ip-icy-pot'));
    pushBlock.nodes.push(new DungeonNode(
      'Fairy Drop Room. Requires Switch on Red', 124, 54, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return !items.ipSwitch;
    }, 'ip-fairy-drop'));
    ipData.dungeonMaps.push(pushBlock);

    //TODO adjust numbers
    var pushBlockRight = new DungeonMapData('ip-push-block-right', 'Push Block Room', '');
    pushBlockRight.nodes.push(new DungeonNode(
      'Big Chest Room. Requires Hookshot and Switch on Red', 32, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot && !items.ipSwitch;
    }, 'ip-bc'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 126, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 224, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    pushBlockRight.nodes.push(new DungeonNode(
      '', 124, 54, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-fairy-drop'));
    ipData.dungeonMaps.push(pushBlockRight);

    var fairyDrop = new DungeonMapData('ip-fairy-drop', 'Fairy Drop Room', '');
    fairyDrop.nodes.push(new DungeonNode(
      '', 124, 225, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-push-block-right'));
    fairyDrop.nodes.push(new DungeonNode(
      'Drop down. Requires Switch on Blue', 78, 118, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ipSwitch;
    }, 'ip-switch-room'));
    fairyDrop.nodes.push(new DungeonNode(
      '', 124, 53, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-switch-room'));
    ipData.dungeonMaps.push(fairyDrop);

    var finalButton = new DungeonMapData('ip-switch-room', 'Button Switch Room', '');
    finalButton.nodes.push(new DungeonNode(
      '', 124, 53, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-fairy-drop'));    
    finalButton.nodes.push(new DungeonNode(
      '', 224, 140, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-final-switch'));
    finalButton.nodes.push(new DungeonNode(
      'Requires Cane of Somaria or Block Pushed from above', 124, 225, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria || items.ipBlockPushed;
    }, 'ip-pre-khold'));
    ipData.dungeonMaps.push(finalButton);

    var finalSwitch = new DungeonMapData('ip-final-switch', 'Crystal Switch Room', '');
    finalSwitch.nodes.push(new DungeonNode(
      '', 33, 140, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-switch-room'));    
    finalSwitch.nodes.push(new DungeonNode(
      '', 184, 133, DungeonNodeStatus.SWITCH,
    function(items:Items, config:Config) {
        return true;
    }, 'switch'));
    ipData.dungeonMaps.push(finalSwitch);

    var preKhold = new DungeonMapData('ip-pre-khold', 'Room Above Boss', '');
    preKhold.nodes.push(new DungeonNode(
      '', 127, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-switch-room'));
    preKhold.nodes.push(new DungeonNode(
      'Kholdstare Room. Requires Hammer', 62, 206, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-khold'));
    ipData.dungeonMaps.push(preKhold);

    var kholdRoom = new DungeonMapData('ip-khold', 'Kholdstare Room', '');
    kholdRoom.nodes.push(new DungeonNode(
      'Kholdstare', 128, 136, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[175]));
    ipData.dungeonMaps.push(kholdRoom);

    ipData.startingMap = entrance;

    return ipData;
  }
}
