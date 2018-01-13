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
        return items.canDarkEastDeathMountain(config)
            && items.crystal1 && items.crystal2 && items.crystal3
            && items.crystal4 && items.crystal5 && items.crystal6
            && items.crystal7;
      }, 55, 4.5
    );

    var entrance = new DungeonMapData('gt-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));    
    entrance.nodes.push(new DungeonNode(
      '', 25, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    entrance.nodes.push(new DungeonNode(
      'Upstairs', 50, 9.5, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hasFiresource();
    }, 'gt-upstairs', 'Bow, Fire Source and Big Key Required'));
    entrance.nodes.push(new DungeonNode(
      '', 75, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    gtData.dungeonMaps.push(entrance);

    var firstRight = new DungeonMapData('gt-first-right', 'First Room Right Side', '');
    firstRight.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    firstRight.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    firstRight.nodes.push(new DungeonNode(
      'Tile Room', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'gt-tile-room', 'Cane of Somaria Required'));
    firstRight.nodes.push(new DungeonNode(
      'Right Side First Chest', 22, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[211]));
    firstRight.nodes.push(new DungeonNode(
      'Right Side Second Chest', 78, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[212]));
    gtData.dungeonMaps.push(firstRight);

    var tileRoom = new DungeonMapData('gt-tile-room', 'Tile Room', '');
    tileRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    if (!config.canGlitch) {
      tileRoom.nodes.push(new DungeonNode(
        'Compass Room', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
          return items.fireRod;
      }, 'gt-right-side', 'Fire Rod Required'));
    } else {
      tileRoom.nodes.push(new DungeonNode(
        'Compass Room', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
      function(items:Items, config:Config) {
          return items.fireRod || items.lamp;
      }, 'gt-right-side', 'Fire Source Required'));
    }    
    tileRoom.nodes.push(new DungeonNode(
      'Tile Room Chest', 53, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[214]));
    gtData.dungeonMaps.push(tileRoom);

    var rightSide = new DungeonMapData('gt-right-side', 'Compass Room', '');
    rightSide.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-tile-room'));
    rightSide.nodes.push(new DungeonNode(
      '', 28, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-sk-corridor'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 1', 41, 41, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[215]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 2', 59.5, 41, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[216]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 3', 41, 66, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[217]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 4', 59.5, 66, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[218]));
    gtData.dungeonMaps.push(rightSide);

    var skCorridor = new DungeonMapData('gt-sk-corridor', 'Small Key Corridor', '');
    skCorridor.nodes.push(new DungeonNode(
      '', 93, 51.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    skCorridor.nodes.push(new DungeonNode(
      '', 50, 40, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(skCorridor);

    var invisibleMaze = new DungeonMapData('gt-invisible-maze', 'Invisible Maze', '');
    invisibleMaze.nodes.push(new DungeonNode(
      '', 25, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    invisibleMaze.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bobs-room'));
    gtData.dungeonMaps.push(invisibleMaze);

    var bigChest = new DungeonMapData('gt-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bigChest.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 52, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[210]));
    gtData.dungeonMaps.push(bigChest);

    var bobsRoom = new DungeonMapData('gt-bobs-room', 'Bob\'s Room', '');
    bobsRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bobsRoom.nodes.push(new DungeonNode(
      '', 68, 80, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bobsRoom.nodes.push(new DungeonNode(
      'Bob\'s Chest', 78, 72.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[213]));
    gtData.dungeonMaps.push(bobsRoom);

    var iceArmos = new DungeonMapData('gt-armos', 'Ice Armos Room', '');
    iceArmos.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    iceArmos.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bk'));
    gtData.dungeonMaps.push(iceArmos);

    var bkRoom = new DungeonMapData('gt-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 1', 50, 41, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[219]));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 2', 41, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[220]));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 3', 60, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[221]));
    gtData.dungeonMaps.push(bkRoom);

    var keyTorch = new DungeonMapData('gt-first-left', 'Key Torch Room', '');
    keyTorch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    keyTorch.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    keyTorch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    keyTorch.nodes.push(new DungeonNode(
      'Key Torch Item', 59.5, 47.5, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[199], 'Boots Required'));
    gtData.dungeonMaps.push(keyTorch);

    var hammerPegs = new DungeonMapData('gt-hammer-pegs', 'Hammer Pegs Room', '');
    hammerPegs.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    hammerPegs.nodes.push(new DungeonNode(
      'Hookshot Room', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'gt-hookshot-room', 'Hammer Required'));
    hammerPegs.nodes.push(new DungeonNode(
      '', 78.5, 79, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(hammerPegs);

    var hookshotRoom = new DungeonMapData('gt-hookshot-room', 'Hookshot Room', '');
    hookshotRoom.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Stalfos Room', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-stalfo', 'Hookshot Required'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Double Firebar Room', 68, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || items.boots || config.canGlitch;
    }, 'gt-double-firebar', 'Hookshot or Boots Required'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Firesnake Room', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-double-switch', 'Hookshot Required'));
    gtData.dungeonMaps.push(hookshotRoom);

    var stalfos = new DungeonMapData('gt-stalfo', 'Stalfos Room', '');
    stalfos.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 1', 22, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[200]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 2', 78.5, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[201]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 3', 22, 54, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[202]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 4', 78.5, 54, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[203]));
    gtData.dungeonMaps.push(stalfos);

    var stalfos = new DungeonMapData('gt-double-firebar', 'Double Firebar Room', '');
    stalfos.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    stalfos.nodes.push(new DungeonNode(
      'Map Chest', 53, 54, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[209]));
    gtData.dungeonMaps.push(stalfos);

    var doubleSwitch = new DungeonMapData('gt-double-switch', 'Double Switch Room', '');
    doubleSwitch.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 78, 78.5, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(doubleSwitch);

    var firesnake = new DungeonMapData('gt-firesnake', 'Firesnake Room', '');
    firesnake.nodes.push(new DungeonNode(
      'Teleport Room', 25, 69, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, 'gt-teleports', 'Hookshot Required'));
    firesnake.nodes.push(new DungeonNode(
      'Firesnake Chest', 23.5, 52, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot || config.canGlitch;
    }, l[208], 'Hookshot Required'));
    gtData.dungeonMaps.push(firesnake);

    var teleports = new DungeonMapData('gt-teleports', 'Teleport Room', '');
    teleports.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    teleports.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-rando-room'));
    teleports.nodes.push(new DungeonNode(
      '', 21.5, 78.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    gtData.dungeonMaps.push(teleports);

    var randoRoom = new DungeonMapData('gt-rando-room', 'Rando Room', '');
    randoRoom.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-teleports'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 1', 45, 26.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[204]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 2', 54.6, 26.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[205]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 3', 45, 36.3, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[206]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 4', 54.6, 36.3, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[207]));
    gtData.dungeonMaps.push(randoRoom);

    var helmaRoom = new DungeonMapData('gt-upstairs', 'Mini Helma Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-refill'));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 1', 22, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[222]));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 78.5, 28.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[223]));
    helmaRoom.nodes.push(new DungeonNode(
      '', 50, 47, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(helmaRoom);

    var helmaRoom = new DungeonMapData('gt-refill', 'Refill Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-upstairs'));
    helmaRoom.nodes.push(new DungeonNode(
      'Pre Moldorm 2 Chest', 47, 53.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[224]));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 50, 88, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-moldorm'));
    gtData.dungeonMaps.push(helmaRoom);

    var moldorm2 = new DungeonMapData('gt-moldorm', 'Moldorm 2 Room', '');
    moldorm2.nodes.push(new DungeonNode(
      'Moldorm 2 Chest', 56.5, 73.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot || (items.boots && config.canGlitch);
    }, l[225], 'Hookshot Required'));
    moldorm2.nodes.push(new DungeonNode(
      'Agahnim 2', 7, 77, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || (items.boots && config.canGlitch);
    }, 'gt-aga2', 'Hookshot Required'));
    gtData.dungeonMaps.push(moldorm2);

    var aga2 = new DungeonMapData('gt-aga2', 'Agahnim 2 Room', '');
    aga2.nodes.push(new DungeonNode(
      'Agahnim 2', 50, 56, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, 'Agahnim 2'));
    gtData.dungeonMaps.push(aga2);

    gtData.startingMap = entrance;

    return gtData;
  }
}
