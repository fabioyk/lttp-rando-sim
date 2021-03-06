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
        if (config.mode === 'inverted') {
          return items.isTROpened || (items.canInvertedEastDarkDeathMountain(config.canGlitch) && (items.sword || config.weapons === 'swordless') && items.hasMedallion('tr', config));
        }
        return (items.moonPearl && items.canDarkEastDeathMountain(config.canGlitch)) && (items.sword || config.weapons === 'swordless')
            && items.hasMedallion('tr', config) && items.hammer;
      }, 93.8, 10
    );

    var newEntrance = new DungeonMapData('tr-entry', 'Turtle Rock Entrance');
    newEntrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-trportal' : 'exit', '', [-1], 1));
    newEntrance.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'tr-hall'));
    if (config.hintsEnabled) {
      newEntrance.nodes.push(new DungeonNode(
        'Hint Tile', 36, 78.5, DungeonNodeStatus.HINT,
      function(items:Items, config:Config) {
          return true;
      }, '12'));
    }
    trData.dungeonMaps.push(newEntrance);

    var entrance = new DungeonMapData('tr-hall', 'Main Lobby');
    entrance.nodes.push(new DungeonNode(
      '', 75, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-entry'));
    entrance.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-compass'));
    entrance.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'tr-map', 'Fire Rod Required'));
    entrance.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-chain-chomp'));
    trData.dungeonMaps.push(entrance);

    var compass = new DungeonMapData('tr-compass', 'Compass Room');
    compass.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-hall'));
    compass.nodes.push(new DungeonNode(
      'Compass Chest', 50, 58, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[187]));
    trData.dungeonMaps.push(compass);

    var mapRoom = new DungeonMapData('tr-map', 'Roller Room');
    mapRoom.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-hall'));
    mapRoom.nodes.push(new DungeonNode(
      'Roller Room Left Chest', 44, 17.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[188]));
    mapRoom.nodes.push(new DungeonNode(
      'Roller Room Right Chest', 56, 17.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[189]));
    trData.dungeonMaps.push(mapRoom);

    var chainChomp = new DungeonMapData('tr-chain-chomp', 'Chain Chomp Room');
    chainChomp.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'tr-hall'));
    chainChomp.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    chainChomp.nodes.push(new DungeonNode(
      'Chain Chomps Chest', 50, 35, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[186]));
    trData.dungeonMaps.push(chainChomp);

    var pipeRoom = new DungeonMapData('tr-pipe-room', 'Pipe Room');
    pipeRoom.nodes.push(new DungeonNode(
      '', 93, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-chain-chomp'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 7, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pokey-key'));
    pipeRoom.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    trData.dungeonMaps.push(pipeRoom);

    var pokeyKey = new DungeonMapData('tr-pokey-key', 'Pokey Key Room');
    pokeyKey.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    pokeyKey.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-bk'));
    pokeyKey.nodes.push(new DungeonNode(
      'Pokey Key', 45, 74, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    trData.dungeonMaps.push(pokeyKey);

    var bk = new DungeonMapData('tr-bk', 'Big Key Room');
    bk.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pokey-key'));
    bk.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    bk.nodes.push(new DungeonNode(
      'Big Key Chest', 42, 39, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[191]));
    trData.dungeonMaps.push(bk);

    var doubPokey = new DungeonMapData('tr-double-pokey', 'Double Pokey Room');
    doubPokey.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-pipe-room'));
    doubPokey.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-big-door'));
    doubPokey.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.mode === 'inverted' ? 'tr-bc' : (config.isFullMap ? 'dw-tr-ledge' : 'tr-outside')));
    trData.dungeonMaps.push(doubPokey);

    var outside = new DungeonMapData('tr-outside', 'Corridor Outside');
    outside.nodes.push(new DungeonNode(
      '', 12, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    outside.nodes.push(new DungeonNode(
      '', 87, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-bc'));
    outside.nodes.push(new DungeonNode(
      '', 87, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mirror;
    }, 'tr-mimic', 'Mirror Required'));
    trData.dungeonMaps.push(outside);

    var mimic = new DungeonMapData('tr-mimic', 'Mimic Cave');
    mimic.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.mode === 'inverted' ? 'tr-inverted-ledge' : 'tr-outside'));
    mimic.nodes.push(new DungeonNode(
      'Mimic Cave Chest', 50, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer && items.moonPearl;
    }, l[79], 'Hammer and Pearl Required'));
    trData.dungeonMaps.push(mimic);

    var bc = new DungeonMapData('tr-bc', 'Big Chest Room');
    bc.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      if (config.mode === 'inverted') {
        return items.mirror;
      } else {
        return true;
      }
    }, config.mode === 'inverted' ? 'tr-inverted-ledge' : (config.isFullMap ? 'dw-tr-ledge' : 'tr-outside')));
    bc.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria || items.hookshot;
    }, 'tr-big-door', 'Somaria or Hookshot Required', [-1], 0,
      DungeonNode.noReqs));
    bc.nodes.push(new DungeonNode(
      'Big Chest', 50, 39.5, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return items.somaria || items.hookshot;
    }, l[190], 'Somaria or Hookshot Required', [-1], 0, 
      DungeonNode.noReqs ));
    trData.dungeonMaps.push(bc);

    var bigDoor = new DungeonMapData('tr-big-door', 'Big Door Room');
    bigDoor.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    bigDoor.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-roller-switch'));
    trData.dungeonMaps.push(bigDoor);

    var rollerSwitch = new DungeonMapData('tr-roller-switch', 'Crystaroller Room');
    rollerSwitch.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-big-door'));
    rollerSwitch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.lamp;
    }, 'tr-helma-bridge', 'Lamp Required', [-1], 0, 
    DungeonNode.noReqs));
    rollerSwitch.nodes.push(new DungeonNode(
      'Crystaroller Chest', 21.6, 54, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[192]));
    trData.dungeonMaps.push(rollerSwitch);

    var helmaBridge = new DungeonMapData('tr-helma-bridge', 'Mini Helma Bridge');
    helmaBridge.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.lamp && items.somaria;
    }, 'tr-roller-switch', '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.somaria;
    }));
    helmaBridge.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-before-tri'));
    helmaBridge.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-laser-bridge'));
    trData.dungeonMaps.push(helmaBridge);

    var laserBridge = new DungeonMapData('tr-laser-bridge', 'Laser Bridge');
    laserBridge.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-helma-bridge'));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 1', 64, 24, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasBeamReflection(config) || config.advancedItems;
    }, l[196], 'Invincibility Item Required', [-1], 0, DungeonNode.noReqs));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 2', 36, 36, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasBeamReflection(config) || config.advancedItems;
    }, l[195], 'Invincibility Item Required', [-1], 0, DungeonNode.noReqs));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 3', 64, 48, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasBeamReflection(config) || config.advancedItems;
    }, l[194], 'Invincibility Item Required', [-1], 0, DungeonNode.noReqs));
    laserBridge.nodes.push(new DungeonNode(
      'Laser Bridge Chest 4', 36, 60, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasBeamReflection(config) || config.advancedItems;
    }, l[193], 'Invincibility Item Required', [-1], 0, DungeonNode.noReqs));
    if (config.mode === 'inverted') {
      laserBridge.nodes.push(new DungeonNode(
        '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
          return items.mirror;
      }, 'tr-inverted-ledge'));
    }
    trData.dungeonMaps.push(laserBridge);

    var beforeTri = new DungeonMapData('tr-before-tri', 'Final Somaria Ride');
    beforeTri.nodes.push(new DungeonNode(
      '', 65, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-helma-bridge'));
    beforeTri.nodes.push(new DungeonNode(
      '', 38.2, 9.5, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'tr-trinexx', 'Cane of Somaria Required'));
    trData.dungeonMaps.push(beforeTri);

    var invertedLedge = new DungeonMapData('tr-inverted-ledge', 'Turtle Rock Other Entrances');
    invertedLedge.nodes.push(new DungeonNode(
      '', 75, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-mimic'));
    invertedLedge.nodes.push(new DungeonNode(
      '', 75, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.mirror;
    }, 'tr-bc', 'Mirror Required'));
    invertedLedge.nodes.push(new DungeonNode(
      '', 38, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.mirror;
    }, 'tr-double-pokey', 'Mirror Required'));
    invertedLedge.nodes.push(new DungeonNode(
      '', 56, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mirror;
    }, 'tr-laser-bridge', 'Mirror Required', [-1], 0,
    function(items:Items, config:Config) {
      return items.mirror
    }));
    invertedLedge.nodes.push(new DungeonNode(
      '', 48.5, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'exit'));
    trData.dungeonMaps.push(invertedLedge);

    var trinexx = new DungeonMapData('tr-trinexx', 'Trinexx Room');
    trinexx.nodes.push(new DungeonNode(
      'Trinexx', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.bossReqs[9], l[197], 'Ice Rod and Fire Rod Required', [-1], 0, 
      DungeonNode.glitchedBossReqs[9]));
    trData.dungeonMaps.push(trinexx);

    trData.startingMap = newEntrance;

    return trData;
  }
}
