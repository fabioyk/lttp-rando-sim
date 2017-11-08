import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class TurtleRock {
  static setup (l:string[], config:Config):DungeonData {
    var trData = new DungeonData('Turtle Rock', l[198],
      function(items:Items, config:Config) {
        return items.moonPearl && items.canDarkEastDeathMountain(config) && items.sword
            && items.hasMedallion('tr', config) && items.somaria && items.hammer;
      }, 93.8, 7
    );

    var entrance = new DungeonMapData('tr-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 192, 239, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 65, 239, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-compass'));
    entrance.nodes.push(new DungeonNode(
      'Map Room. Requires Fire Rod', 241, 68, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'tr-map'));
    entrance.nodes.push(new DungeonNode(
      '', 65, 25, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'tr-chain-chomp'));
    trData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('tr-compass', 'Compass Room', '');
    compass.nodes.push(new DungeonNode(
      '', 128, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-entry'));
    compass.nodes.push(new DungeonNode(
      '', 128, 178, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[187]));
    trData.dungeonMaps.push(compass);

    var mapRoom = new DungeonMapData('tr-map', 'Map Room', '');
    mapRoom.nodes.push(new DungeonNode(
      '', 128, 241, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-entry'));
    mapRoom.nodes.push(new DungeonNode(
      '', 117, 44, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[188]));
    mapRoom.nodes.push(new DungeonNode(
      '', 140, 44, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[189]));
    trData.dungeonMaps.push(mapRoom);

    var chainChomp = new DungeonMapData('tr-chain-chomp', 'Chain Chomp Room', '');
    chainChomp.nodes.push(new DungeonNode(
      '', 128, 222, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-entry'));
    chainChomp.nodes.push(new DungeonNode(
      '', 128, 49, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    chainChomp.nodes.push(new DungeonNode(
      '', 128, 86, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[186]));
    trData.dungeonMaps.push(chainChomp);

    var pipeRoom = new DungeonMapData('tr-pipe-room', 'Pipe Room', '');
    pipeRoom.nodes.push(new DungeonNode(
      '', 240, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-chain-chomp'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 16, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pokey-key'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 63, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    trData.dungeonMaps.push(pipeRoom);

    var pokeyKey = new DungeonMapData('tr-pokey-key', 'Pokey Key Room', '');
    pokeyKey.nodes.push(new DungeonNode(
      '', 176, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    pokeyKey.nodes.push(new DungeonNode(
      '', 176, 196, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-bk'));
    pokeyKey.nodes.push(new DungeonNode(
      '', 116, 175, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    trData.dungeonMaps.push(pokeyKey);

    var bk = new DungeonMapData('tr-bk', 'Big Key Room', '');
    bk.nodes.push(new DungeonNode(
      '', 17, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pokey-key'));
    bk.nodes.push(new DungeonNode(
      '', 241, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    bk.nodes.push(new DungeonNode(
      '', 108, 97, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[191]));
    trData.dungeonMaps.push(bk);

    var doubPokey = new DungeonMapData('tr-double-pokey', 'Double Pokey Room', '');
    doubPokey.nodes.push(new DungeonNode(
      '', 129, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    doubPokey.nodes.push(new DungeonNode(
      '', 225, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-big-door'));
    doubPokey.nodes.push(new DungeonNode(
      '', 130, 223, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-outside'));
    trData.dungeonMaps.push(doubPokey);

    var outside = new DungeonMapData('tr-outside', 'Ledge Outside', '');
    outside.nodes.push(new DungeonNode(
      '', 30, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    outside.nodes.push(new DungeonNode(
      '', 222, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-bc'));
    outside.nodes.push(new DungeonNode(
      'Mimic Cave. Requires Mirror', 222, 177, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mirror;
    }, 'tr-mimic'));
    trData.dungeonMaps.push(outside);

    var mimic = new DungeonMapData('tr-mimic', 'Mimic Cave', '');
    mimic.nodes.push(new DungeonNode(
      '', 128, 239, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-outside'));
    mimic.nodes.push(new DungeonNode(
      'Mimic Cave Chest', 128, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[79]));
    trData.dungeonMaps.push(mimic);

    var bc = new DungeonMapData('tr-bc', 'Big Chest Room', '');
    bc.nodes.push(new DungeonNode(
      '', 128, 224, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-outside'));
    bc.nodes.push(new DungeonNode(
      '', 128, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-big-door'));
    bc.nodes.push(new DungeonNode(
      'Big Chest', 128, 97, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[190]));
    trData.dungeonMaps.push(bc);

    var bigDoor = new DungeonMapData('tr-big-door', 'Big Door Room', '');
    bigDoor.nodes.push(new DungeonNode(
      '', 31, 135, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    bigDoor.nodes.push(new DungeonNode(
      '', 128, 48, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-roller-switch'));
    trData.dungeonMaps.push(bigDoor);

    var rollerSwitch = new DungeonMapData('tr-roller-switch', 'Roller Switch Room', '');
    rollerSwitch.nodes.push(new DungeonNode(
      '', 128, 225, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-big-door'));
    rollerSwitch.nodes.push(new DungeonNode(
      'Mini Helma Bridge. Requires Lamp', 128, 50, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasLightsource(config);
    }, 'tr-helma-bridge'));
    rollerSwitch.nodes.push(new DungeonNode(
      'Roller Switch Chest', 57, 134, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[192]));
    trData.dungeonMaps.push(rollerSwitch);

    var helmaBridge = new DungeonMapData('tr-helma-bridge', 'Mini Helma Bridge', '');
    helmaBridge.nodes.push(new DungeonNode(
      '', 128, 23, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-roller-switch'));
    helmaBridge.nodes.push(new DungeonNode(
      '', 81, 195, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-before-tri'));
    helmaBridge.nodes.push(new DungeonNode(
      '', 128, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-laser-bridge'));
    trData.dungeonMaps.push(helmaBridge);

    var laserBridge = new DungeonMapData('tr-laser-bridge', 'Laser Bridge', '');
    laserBridge.nodes.push(new DungeonNode(
      '', 128, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-helma-bridge'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 1', 164, 59, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config);
    }, l[196]));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 2', 92, 91, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config);
    }, l[195]));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 3', 164, 124, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config);
    }, l[194]));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 4', 92, 156, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasInvincibilityItem(config);
    }, l[193]));
    trData.dungeonMaps.push(laserBridge);

    var beforeTri = new DungeonMapData('tr-before-tri', 'Room Before Trinexx', '');
    beforeTri.nodes.push(new DungeonNode(
      '', 186, 246, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-helma-bridge'));
    beforeTri.nodes.push(new DungeonNode(
      'Trinexx Room. Requires Fire Rod and Ice Rod', 117, 10, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.fireRod && items.iceRod;
    }, 'tr-trinexx'));
    trData.dungeonMaps.push(beforeTri);

    var trinexx = new DungeonMapData('tr-trinexx', 'Trinexx Room', '');
    trinexx.nodes.push(new DungeonNode(
      '', 129, 129, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[197]));
    trData.dungeonMaps.push(trinexx);

    trData.startingMap = entrance;

    return trData;
  }
}
