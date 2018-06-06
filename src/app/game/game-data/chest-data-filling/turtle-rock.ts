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
        return items.moonPearl && items.canDarkEastDeathMountain(config.canGlitch) && items.sword
          && items.hasMedallion('tr', config) && items.somaria && items.hammer;
      }, 93.8, 7
    );

    var entrance = new DungeonMapData('tr-entry', 'Main Lobby');
    entrance.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-trportal' : 'exit', 'exit', [-1], 1));
    entrance.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-compass', 'left'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.fireRod;
      }, 'tr-map', 'right'));
    entrance.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tr-chain-chomp', 'up'));
    trData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('tr-compass', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-entry', 'up'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 50, 58, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[187], 'c'));
    trData.dungeonMaps.push(compass);

    var mapRoom = new DungeonMapData('tr-map', 'Roller Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-entry', 'down'));
    mapRoom.nodes.push(new DungeonNode(
      'Roller Room Left Chest', 44, 17.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[188], 'c1'));
    mapRoom.nodes.push(new DungeonNode(
      'Roller Room Right Chest', 56, 17.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[189], 'c2'));
    trData.dungeonMaps.push(mapRoom);

    var chainChomp = new DungeonMapData('tr-chain-chomp', 'Chain Chomp Room');
    chainChomp.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tr-entry', 'down'));
    chainChomp.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tr-pipe-room', 'up'));
    chainChomp.nodes.push(new DungeonNode(
      'Chain Chomps Chest', 50, 35, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[186], 'c'));
    trData.dungeonMaps.push(chainChomp);

    var pipeRoom = new DungeonMapData('tr-pipe-room', 'Pipe Room');
    pipeRoom.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-chain-chomp', 'right'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-pokey-key', 'left'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-double-pokey', 'down'));
    trData.dungeonMaps.push(pipeRoom);

    var pokeyKey = new DungeonMapData('tr-pokey-key', 'Pokey Key Room');
    pokeyKey.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-pipe-room', 'up'));
    pokeyKey.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tr-bk', 'down'));
    pokeyKey.nodes.push(new DungeonNode(
      'Pokey Key', 45, 74, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    trData.dungeonMaps.push(pokeyKey);

    var bk = new DungeonMapData('tr-bk', 'Big Key Room');
    bk.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-pokey-key', 'left'));
    bk.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-pipe-room', 'right'));
    bk.nodes.push(new DungeonNode(
      'Big Key Chest', 42, 39, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[191], 'c'));
    trData.dungeonMaps.push(bk);

    var doubPokey = new DungeonMapData('tr-double-pokey', 'Double Pokey Room');
    doubPokey.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-pipe-room', 'up'));
    doubPokey.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-big-door', 'right'));
    doubPokey.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-tr-ledge' : 'tr-outside', 'down'));
    trData.dungeonMaps.push(doubPokey);

    var outside = new DungeonMapData('tr-outside', 'Corridor Outside');
    outside.nodes.push(new DungeonNode(
      '', 12, 52, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-double-pokey'));
    outside.nodes.push(new DungeonNode(
      '', 87, 52, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'tr-bc'));
    outside.nodes.push(new DungeonNode(
      '', 87, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mirror;
    }, 'tr-mimic', 'Mirror Required'));
    trData.dungeonMaps.push(outside);

    var mimic = new DungeonMapData('tr-mimic', 'Mimic Cave');
    mimic.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-outside'));
    mimic.nodes.push(new DungeonNode(
      'Mimic Cave Chest', 50, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[79], 'Hammer Required'));
    trData.dungeonMaps.push(mimic);

    var bc = new DungeonMapData('tr-bc', 'Big Chest Room');
    bc.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'dw-tr-ledge' : 'tr-outside', 'down'));
    bc.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-big-door', 'up'));
    bc.nodes.push(new DungeonNode(
      'Big Chest', 50, 39.5, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[190], 'bc'));
    trData.dungeonMaps.push(bc);

    var bigDoor = new DungeonMapData('tr-big-door', 'Big Door Room');
    bigDoor.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-double-pokey', 'left'));
    bigDoor.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'tr-roller-switch', 'up'));
    trData.dungeonMaps.push(bigDoor);

    var rollerSwitch = new DungeonMapData('tr-roller-switch', 'Crystaroller Room');
    rollerSwitch.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-big-door', 'down'));
    rollerSwitch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
        return items.lamp;
      }, 'tr-helma-bridge', 'up', [-1], 0, 
      DungeonNode.noReqs));
    rollerSwitch.nodes.push(new DungeonNode(
      'Crystaroller Chest', 21.6, 54, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[192], 'c'));
    trData.dungeonMaps.push(rollerSwitch);

    var helmaBridge = new DungeonMapData('tr-helma-bridge', 'Mini Helma Bridge');
    helmaBridge.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.lamp;
      }, 'tr-roller-switch', 'up', [-1], 0, 
      DungeonNode.noReqs));
    helmaBridge.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tr-before-tri', 'left'));
    helmaBridge.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-laser-bridge', 'down'));
    trData.dungeonMaps.push(helmaBridge);

    var laserBridge = new DungeonMapData('tr-laser-bridge', 'Laser Bridge');
    laserBridge.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-helma-bridge', 'up'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 1', 64, 24, DungeonNodeStatus.CLOSED_CHEST,
      function(items:Items, config:Config) {
        return items.hasBeamReflection(config);
      }, l[196], 'c1'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 2', 36, 36, DungeonNodeStatus.CLOSED_CHEST,
      function(items:Items, config:Config) {
        return items.hasBeamReflection(config);
      }, l[195], 'c2'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 3', 64, 48, DungeonNodeStatus.CLOSED_CHEST,
      function(items:Items, config:Config) {
        return items.hasBeamReflection(config);
      }, l[194], 'c3'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 4', 36, 60, DungeonNodeStatus.CLOSED_CHEST,
      function(items:Items, config:Config) {
        return items.hasBeamReflection(config);
      }, l[193], 'c4'));
    trData.dungeonMaps.push(laserBridge);

    var beforeTri = new DungeonMapData('tr-before-tri', 'Final Somaria Ride');
    beforeTri.nodes.push(new DungeonNode(
      '', 65, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tr-helma-bridge', 'down'));
    beforeTri.nodes.push(new DungeonNode(
      '', 38.2, 9.5, DungeonNodeStatus.BK_LOCKED,
      function(items:Items, config:Config) {
        return items.fireRod && items.iceRod;
      }, 'tr-trinexx', 'up'));
    trData.dungeonMaps.push(beforeTri);

    var trinexx = new DungeonMapData('tr-trinexx', 'Trinexx Room');
    trinexx.nodes.push(new DungeonNode(
      'Trinexx', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[197], 'boss'));
    trData.dungeonMaps.push(trinexx);

    trData.startingMap = entrance;

    return trData;
  }
}
