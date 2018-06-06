import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class GanonsTower {
  static setup (l:string[], config:Config):DungeonData {
    var gtData = new DungeonData('Ganons Tower', 'Agahnim 2',
      function(items:Items, config:Config) {
        return items.canDarkEastDeathMountain(config.canGlitch)
            && items.crystal1 && items.crystal2 && items.crystal3
            && items.crystal4 && items.crystal5 && items.crystal6
            && items.crystal7;
      }, 55, 4.5
    );

    var entrance = new DungeonMapData('gt-entry', 'Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, config.isFullMap ? 'dw-hera' : 'exit'));    
    entrance.nodes.push(new DungeonNode(
      '', 25, 14, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-first-left', 'left'));
    entrance.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hasFiresource();
    }, 'gt-upstairs', 'up'));
    entrance.nodes.push(new DungeonNode(
      '', 75, 14, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-first-right', 'right'));
    gtData.dungeonMaps.push(entrance);

    var firstRight = new DungeonMapData('gt-first-right', 'Hope Room');
    firstRight.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-entry', 'up'));
    firstRight.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-first-left', 'left'));
    firstRight.nodes.push(new DungeonNode(
      'Tile Room', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'gt-tile-room', 'right'));
    firstRight.nodes.push(new DungeonNode(
      'Hope Room Left Chest', 22, 29, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[211], 'c1'));
    firstRight.nodes.push(new DungeonNode(
      'Hope Room Right Chest', 78, 29, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[212], 'c2'));
    gtData.dungeonMaps.push(firstRight);

    var tileRoom = new DungeonMapData('gt-tile-room', 'Tile Room');
    tileRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-first-right', 'left'));
    if (!config.canGlitch) {
      tileRoom.nodes.push(new DungeonNode(
        '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
          return items.fireRod;
      }, 'gt-right-side', 'right'));
    } else {
      tileRoom.nodes.push(new DungeonNode(
        '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
          return items.fireRod || items.lamp;
      }, 'gt-right-side', 'right'));
    }    
    tileRoom.nodes.push(new DungeonNode(
      'Tile Room Chest', 53, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[214], 'c'));
    gtData.dungeonMaps.push(tileRoom);

    var rightSide = new DungeonMapData('gt-right-side', 'Compass Room');
    rightSide.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-tile-room', 'right'));
    rightSide.nodes.push(new DungeonNode(
      '', 28, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-sk-corridor', 'left'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 1', 41, 41, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[215], 'c1'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 2', 59.5, 41, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[216], 'c2'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 3', 41, 66, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[217], 'c3'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 4', 59.5, 66, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[218], 'c4'));
    gtData.dungeonMaps.push(rightSide);

    var skCorridor = new DungeonMapData('gt-sk-corridor', 'Key Pot Corridor');
    skCorridor.nodes.push(new DungeonNode(
      '', 93, 51.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-invisible-maze', 'right'));
    skCorridor.nodes.push(new DungeonNode(
      'Small Key', 50, 40, DungeonNodeStatus.GROUND_KEY,
    DungeonNode.noReqs, 'key'));
    gtData.dungeonMaps.push(skCorridor);

    var invisibleMaze = new DungeonMapData('gt-invisible-maze', 'Invisible Maze');
    invisibleMaze.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-bc', 'up-left'));
    invisibleMaze.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-bobs-room', 'up-right'));
    gtData.dungeonMaps.push(invisibleMaze);

    var bigChest = new DungeonMapData('gt-bc', 'Big Chest Room');
    bigChest.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-invisible-maze', 'down'));
    bigChest.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-first-left', 'up'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 52, DungeonNodeStatus.BIG_CHEST,
    DungeonNode.noReqs, l[210], 'bc'));
    gtData.dungeonMaps.push(bigChest);

    var bobsRoom = new DungeonMapData('gt-bobs-room', 'Bob\'s Room');
    bobsRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-invisible-maze', 'down'));
    bobsRoom.nodes.push(new DungeonNode(
      '', 68, 80, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'gt-armos', 'hole'));
    bobsRoom.nodes.push(new DungeonNode(
      'Bob\'s Chest', 78, 72.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[213], 'c'));
    gtData.dungeonMaps.push(bobsRoom);

    var iceArmos = new DungeonMapData('gt-armos', 'Ice Armos Room');
    iceArmos.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-bc', 'left'));
    iceArmos.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-bk', 'up'));
    gtData.dungeonMaps.push(iceArmos);

    var bkRoom = new DungeonMapData('gt-bk', 'Big Key Room');
    bkRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-armos', 'down'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest 1', 50, 41, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[219], 'c1'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest 2', 41, 29, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[220], 'c2'));
    bkRoom.nodes.push(new DungeonNode(
      'Big Key Chest 3', 60, 29, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[221], 'c3'));
    gtData.dungeonMaps.push(bkRoom);

    var keyTorch = new DungeonMapData('gt-first-left', 'Bob\'s Torch Room');
    keyTorch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-entry', 'up'));
    keyTorch.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-hammer-pegs', 'left'));
    keyTorch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-first-right', 'right'));
    keyTorch.nodes.push(new DungeonNode(
      'Bob\'s Torch Item', 59.5, 47.5, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[199], 'c'));
    gtData.dungeonMaps.push(keyTorch);

    var hammerPegs = new DungeonMapData('gt-hammer-pegs', 'Hammer Pegs Room');
    hammerPegs.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-first-left', 'right'));
    hammerPegs.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'gt-hookshot-room', 'left'));
    hammerPegs.nodes.push(new DungeonNode(
      'Small Key', 78.5, 79, DungeonNodeStatus.GROUND_KEY,
    DungeonNode.noReqs, '', 'key'));
    gtData.dungeonMaps.push(hammerPegs);

    var hookshotRoom = new DungeonMapData('gt-hookshot-room', 'Hookshot Room');
    hookshotRoom.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-hammer-pegs', 'up-right'));
    hookshotRoom.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-stalfo', 'up'));
    hookshotRoom.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || items.boots || config.canGlitch;
    }, 'gt-double-firebar', 'down-right'));
    hookshotRoom.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-double-switch', 'down'));
    gtData.dungeonMaps.push(hookshotRoom);

    var stalfos = new DungeonMapData('gt-stalfo', 'Stalfos Room');
    stalfos.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-hookshot-room', 'down'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 1', 22, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[200], 'c1'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 2', 78.5, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[201], 'c2'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 3', 22, 54, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[202], 'c3'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 4', 78.5, 54, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[203], 'c4'));
    gtData.dungeonMaps.push(stalfos);

    var stalfos = new DungeonMapData('gt-double-firebar', 'Double Firebar Room');
    stalfos.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-hookshot-room', 'left'));
    stalfos.nodes.push(new DungeonNode(
      'Map Chest', 53, 54, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[209], 'c'));
    gtData.dungeonMaps.push(stalfos);

    var doubleSwitch = new DungeonMapData('gt-double-switch', 'Double Switch Room');
    doubleSwitch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-hookshot-room', 'up'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-firesnake', 'right'));
    doubleSwitch.nodes.push(new DungeonNode(
      'Small Key', 78, 78.5, DungeonNodeStatus.GROUND_KEY,
    DungeonNode.noReqs, '', 'key'));
    gtData.dungeonMaps.push(doubleSwitch);

    var firesnake = new DungeonMapData('gt-firesnake', 'Firesnake Room');
    firesnake.nodes.push(new DungeonNode(
      '', 25, 69, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-teleports', 'down'));
    firesnake.nodes.push(new DungeonNode(
      'Firesnake Chest', 23.5, 52, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, l[208], 'c'));
    gtData.dungeonMaps.push(firesnake);

    var teleports = new DungeonMapData('gt-teleports', 'Teleport Room');
    teleports.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-firesnake', 'up'));
    teleports.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-rando-room', 'left'));
    teleports.nodes.push(new DungeonNode(
      '', 21.5, 78.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-invisible-maze', 'right'));
    gtData.dungeonMaps.push(teleports);

    var randoRoom = new DungeonMapData('gt-rando-room', 'Randomizer Room');
    randoRoom.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'gt-teleports', 'right'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 1', 45, 26.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[204], 'c1'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 2', 54.6, 26.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[205], 'c2'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 3', 45, 36.3, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[206], 'c3'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 4', 54.6, 36.3, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[207], 'c4'));
    gtData.dungeonMaps.push(randoRoom);

    var helmaRoom = new DungeonMapData('gt-upstairs', 'Mini Helmasaur Room');
    helmaRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-refill', 'left'));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 1', 22, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[222], 'c1'));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 78.5, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[223], 'c2'));
    helmaRoom.nodes.push(new DungeonNode(
      'Small Key', 50, 47, DungeonNodeStatus.GROUND_KEY,
    DungeonNode.noReqs, '', 'key'));
    gtData.dungeonMaps.push(helmaRoom);

    var helmaRoom = new DungeonMapData('gt-refill', 'Pre-Moldorm Room');
    helmaRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-upstairs', 'right'));
    helmaRoom.nodes.push(new DungeonNode(
      'Pre-Moldorm Chest', 47, 53.5, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[224], 'c'));
    helmaRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.SK_LOCKED,
    DungeonNode.noReqs, 'gt-moldorm', 'down'));
    gtData.dungeonMaps.push(helmaRoom);

    var moldorm2 = new DungeonMapData('gt-moldorm', 'Moldorm Room');
    moldorm2.nodes.push(new DungeonNode(
      'Moldorm Chest', 56.5, 73.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, l[225], 'c1', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
    moldorm2.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-aga2', 'left', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
    gtData.dungeonMaps.push(moldorm2);

    var aga2 = new DungeonMapData('gt-aga2', 'Agahnim 2 Room');
    aga2.nodes.push(new DungeonNode(
      'Agahnim 2', 50, 56, DungeonNodeStatus.BOSS,
    DungeonNode.noReqs, 'Agahnim 2', 'boss'));
    gtData.dungeonMaps.push(aga2);

    gtData.startingMap = entrance;

    return gtData;
  }
}
