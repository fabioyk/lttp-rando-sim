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
        return (items.flippers || config.canFakeFlipper) && items.moonPearl
            && items.glove === 2 && items.hasMeltyPower();
      }, 79.6, 85.8
    );

    var entrance = new DungeonMapData('ip-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-compass'));
    entrance.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    ipData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('ip-compass', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-entry'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[169]));
    ipData.dungeonMaps.push(compass);

    var plus = new DungeonMapData('ip-plus', 'Plus Shaped Room', '');
    plus.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-entry'));
    plus.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    plus.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    plus.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-freezor'));
    ipData.dungeonMaps.push(plus);

    var doubFreez = new DungeonMapData('ip-double-freezor', 'Double Freezor Room', '');
    doubFreez.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    doubFreez.nodes.push(new DungeonNode(
      'Double Freezor Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[172]));
    doubFreez.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bc'));
    ipData.dungeonMaps.push(doubFreez);

    var doubFreez = new DungeonMapData('ip-tall-room', 'Tall Icy Room', '');
    doubFreez.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-bc'));
    doubFreez.nodes.push(new DungeonNode(
      'Spike Room. Requires Hookshot', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-spike-room'));
    doubFreez.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(doubFreez);

    var spikeRoom = new DungeonMapData('ip-spike-room', 'Spike Room', '');
    spikeRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-plus'));
    spikeRoom.nodes.push(new DungeonNode(
      'Spike Room Chest. Requires Hookshot/Invulnerability Item', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config) || items.hookshot;
    }, l[171]));
    spikeRoom.nodes.push(new DungeonNode(
      'Map Room. Requires Hookshot/Invulnerability Item', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config) || items.hookshot;
    }, 'ip-map'));
    ipData.dungeonMaps.push(spikeRoom);

    var mapRoom = new DungeonMapData('ip-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-spike-room'));
    mapRoom.nodes.push(new DungeonNode(
      'Map Chest. Requires Hammer', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[170]));
    mapRoom.nodes.push(new DungeonNode(
      'Freestanding Key. Requires Hammer', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return items.hammer;
    }, ''));
    mapRoom.nodes.push(new DungeonNode(
      'Big Key Room. Requires Hammer', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-bk'));
    ipData.dungeonMaps.push(mapRoom);

    var bkRoom = new DungeonMapData('ip-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-map'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[168]));
    ipData.dungeonMaps.push(bkRoom);

    var bcRoom = new DungeonMapData('ip-bc', 'Big Chest Room', '');
    bcRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block'));
    bcRoom.nodes.push(new DungeonNode(
      'Big Chest', 0, 0, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[174]));
    ipData.dungeonMaps.push(bcRoom);

    var djRoom = new DungeonMapData('ip-double-jelly', 'Double Jelly Room', '');
    djRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-tall-room'));
    djRoom.nodes.push(new DungeonNode(
      'Double Jelly Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[173]));
    djRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    ipData.dungeonMaps.push(djRoom);

    var skullPot = new DungeonMapData('ip-icy-pot', 'Icy Skull Pot Room', '');
    skullPot.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-push-block'));
    skullPot.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    skullPot.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-double-jelly'));
    ipData.dungeonMaps.push(skullPot);

    var pushBlock = new DungeonMapData('ip-push-block', 'Push Block Room', '');
    pushBlock.nodes.push(new DungeonNode(
      'Big Chest Room. Requires Hookshot', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-bc'));
    pushBlock.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-pre-khold'));
    pushBlock.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ip-icy-pot'));
    ipData.dungeonMaps.push(pushBlock);

    var preKhold = new DungeonMapData('ip-pre-khold', 'Room Above Boss', '');
    preKhold.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'ip-push-block'));
    preKhold.nodes.push(new DungeonNode(
      'Kholdstare Room. Requires Hammer', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'ip-khold'));
    ipData.dungeonMaps.push(preKhold);

    var kholdRoom = new DungeonMapData('ip-khold', 'Kholdstare Room', '');
    kholdRoom.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[175]));
    ipData.dungeonMaps.push(kholdRoom);

    ipData.startingMap = entrance;

    return ipData;
  }
}
