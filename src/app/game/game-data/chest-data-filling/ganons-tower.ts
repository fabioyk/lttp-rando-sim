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
      }, 62, 5.5
    );

    var entrance = new DungeonMapData('gt-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 128, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));    
    entrance.nodes.push(new DungeonNode(
      '', 64, 35, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    entrance.nodes.push(new DungeonNode(
      'Upstairs. Requires Bow, Firesource and Big Key', 128, 22, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hasFiresource();
    }, 'gt-upstairs'));
    entrance.nodes.push(new DungeonNode(
      '', 192, 35, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    gtData.dungeonMaps.push(entrance);

    var firstRight = new DungeonMapData('gt-first-right', 'First Room Right Side', '');
    firstRight.nodes.push(new DungeonNode(
      '', 128, 40, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    firstRight.nodes.push(new DungeonNode(
      '', 35, 128, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    firstRight.nodes.push(new DungeonNode(
      'Tile Room. Requires Cane of Somaria', 225, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.somaria;
    }, 'gt-tile-room'));
    firstRight.nodes.push(new DungeonNode(
      'Right Side First Chest', 57, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[211]));
    firstRight.nodes.push(new DungeonNode(
      'Right Side Second Chest', 200, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[212]));
    gtData.dungeonMaps.push(firstRight);

    var tileRoom = new DungeonMapData('gt-tile-room', 'Tile Room', '');
    tileRoom.nodes.push(new DungeonNode(
      '', 32, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    tileRoom.nodes.push(new DungeonNode(
      'Compass Room. Requires Fire Rod', 223, 128, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'gt-right-side'));
    tileRoom.nodes.push(new DungeonNode(
      'Tile Room Chest', 137, 63, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[214]));
    gtData.dungeonMaps.push(tileRoom);

    var rightSide = new DungeonMapData('gt-right-side', 'Compass Room', '');
    rightSide.nodes.push(new DungeonNode(
      '', 225, 128, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-tile-room'));
    rightSide.nodes.push(new DungeonNode(
      '', 73, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'gt-sk-corridor'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 1', 105, 94, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[215]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 2', 153, 94, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[216]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 3', 105, 159, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[217]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 4', 153, 159, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[218]));
    gtData.dungeonMaps.push(rightSide);

    var skCorridor = new DungeonMapData('gt-sk-corridor', 'Small Key Corridor', '');
    skCorridor.nodes.push(new DungeonNode(
      '', 239, 132, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    skCorridor.nodes.push(new DungeonNode(
      '', 132, 96, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(skCorridor);

    var invisibleMaze = new DungeonMapData('gt-invisible-maze', 'Invisible Maze', '');
    invisibleMaze.nodes.push(new DungeonNode(
      '', 63, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    invisibleMaze.nodes.push(new DungeonNode(
      '', 192, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bobs-room'));
    gtData.dungeonMaps.push(invisibleMaze);

    var bigChest = new DungeonMapData('gt-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 128, 216, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bigChest.nodes.push(new DungeonNode(
      '', 128, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 128, 120, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[210]));
    gtData.dungeonMaps.push(bigChest);

    var bobsRoom = new DungeonMapData('gt-bobs-room', 'Bob\'s Room', '');
    bobsRoom.nodes.push(new DungeonNode(
      '', 128, 215, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bobsRoom.nodes.push(new DungeonNode(
      '', 174, 183, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bobsRoom.nodes.push(new DungeonNode(
      'Bob\'s Chest', 200, 172, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[213]));
    gtData.dungeonMaps.push(bobsRoom);

    var iceArmos = new DungeonMapData('gt-armos', 'Ice Armos Room', '');
    iceArmos.nodes.push(new DungeonNode(
      '', 31, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    iceArmos.nodes.push(new DungeonNode(
      '', 128, 49, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bk'));
    gtData.dungeonMaps.push(iceArmos);

    var bkRoom = new DungeonMapData('gt-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 128, 224, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 1', 128, 102, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[219]));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 2', 104, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[220]));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 3', 152, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[221]));
    gtData.dungeonMaps.push(bkRoom);

    var keyTorch = new DungeonMapData('gt-first-left', 'Key Torch Room', '');
    keyTorch.nodes.push(new DungeonNode(
      '', 128, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    keyTorch.nodes.push(new DungeonNode(
      '', 32, 129, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    keyTorch.nodes.push(new DungeonNode(
      '', 224, 129, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    keyTorch.nodes.push(new DungeonNode(
      'Key Torch Item', 153, 113, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[199]));
    gtData.dungeonMaps.push(keyTorch);

    var hammerPegs = new DungeonMapData('gt-hammer-pegs', 'Hammer Pegs Room', '');
    hammerPegs.nodes.push(new DungeonNode(
      '', 223, 126, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    hammerPegs.nodes.push(new DungeonNode(
      'Hookshot Room. Requires Hammer', 31, 126, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'gt-hookshot-room'));
    hammerPegs.nodes.push(new DungeonNode(
      '', 199, 182, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(hammerPegs);

    var hookshotRoom = new DungeonMapData('gt-hookshot-room', 'Hookshot Room', '');
    hookshotRoom.nodes.push(new DungeonNode(
      '', 174, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Stalfos Room. Requires Hookshot', 126, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-stalfo'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Double Firebar Room. Requires Hookshot or Boots', 174, 193, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || items.boots;
    }, 'gt-double-firebar'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Firesnake Room. Requires Hookshot', 126, 237, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-double-switch'));
    gtData.dungeonMaps.push(hookshotRoom);

    var stalfos = new DungeonMapData('gt-stalfo', 'Stalfos Room', '');
    stalfos.nodes.push(new DungeonNode(
      '', 127, 217, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 1', 55, 64, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[200]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 2', 199, 64, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[201]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 3', 55, 128, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[202]));
    stalfos.nodes.push(new DungeonNode(
      'Stalfos Room Chest 4', 199, 128, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[203]));
    gtData.dungeonMaps.push(stalfos);

    var stalfos = new DungeonMapData('gt-double-firebar', 'Double Firebar Room', '');
    stalfos.nodes.push(new DungeonNode(
      '', 32, 128, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    stalfos.nodes.push(new DungeonNode(
      'Map Chest', 135, 125, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[209]));
    gtData.dungeonMaps.push(stalfos);

    var doubleSwitch = new DungeonMapData('gt-double-switch', 'Double Switch Room', '');
    doubleSwitch.nodes.push(new DungeonNode(
      '', 126, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 220, 129, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 198, 185, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(doubleSwitch);

    var firesnake = new DungeonMapData('gt-firesnake', 'Firesnake Room', '');
    firesnake.nodes.push(new DungeonNode(
      '', 37, 169, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-teleports'));
    firesnake.nodes.push(new DungeonNode(
      'Firesnake Chest', 32, 116, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, l[208]));
    gtData.dungeonMaps.push(firesnake);

    var teleports = new DungeonMapData('gt-teleports', 'Teleport Room', '');
    teleports.nodes.push(new DungeonNode(
      '', 128, 40, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    teleports.nodes.push(new DungeonNode(
      '', 30, 128, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-rando-room'));
    teleports.nodes.push(new DungeonNode(
      '', 56, 191, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    gtData.dungeonMaps.push(teleports);

    var randoRoom = new DungeonMapData('gt-rando-room', 'Rando Room', '');
    randoRoom.nodes.push(new DungeonNode(
      '', 176, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-teleports'));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 1', 116, 67, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[204]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 2', 141, 67, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[205]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 3', 116, 91, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[206]));
    randoRoom.nodes.push(new DungeonNode(
      'Rando Room Chest 4', 141, 91, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[207]));
    gtData.dungeonMaps.push(randoRoom);

    var helmaRoom = new DungeonMapData('gt-upstairs', 'Mini Helma Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 34, 136, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-refill'));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 1', 57, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[222]));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 201, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[223]));
    helmaRoom.nodes.push(new DungeonNode(
      '', 121, 102, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(helmaRoom);

    var helmaRoom = new DungeonMapData('gt-refill', 'Refill Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      '', 127, 47, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-upstairs'));
    helmaRoom.nodes.push(new DungeonNode(
      'Pre Moldorm 2 Chest', 119, 133, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[224]));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 127, 222, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-moldorm'));
    gtData.dungeonMaps.push(helmaRoom);

    var helmaRoom = new DungeonMapData('gt-moldorm', 'Moldorm 2 Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      'Moldorm 2 Chest. Requires Hookshot', 145, 187, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, l[225]));
    helmaRoom.nodes.push(new DungeonNode(
      'Agahnim 2. Requires Hookshot', 16, 196, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-aga2'));
    gtData.dungeonMaps.push(helmaRoom);

    var aga2 = new DungeonMapData('gt-aga2', 'Agahnim 2 Room', '');
    aga2.nodes.push(new DungeonNode(
      'Agahnim 2', 129, 113, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'Agahnim 2'));
    gtData.dungeonMaps.push(aga2);

    gtData.startingMap = entrance;

    return gtData;
  }
}
