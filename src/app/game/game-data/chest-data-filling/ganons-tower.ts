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
      '', 126, 240, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));    
    entrance.nodes.push(new DungeonNode(
      '', 62, 35, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    entrance.nodes.push(new DungeonNode(
      'Upstairs. Requires Bow, Firesource and Big Key', 126, 22, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasBow() && items.hasFiresource();
    }, 'gt-upstairs'));
    entrance.nodes.push(new DungeonNode(
      '', 190, 35, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    gtData.dungeonMaps.push(entrance);

    var firstRight = new DungeonMapData('gt-first-right', 'First Room Right Side', '');
    firstRight.nodes.push(new DungeonNode(
      '', 126, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    firstRight.nodes.push(new DungeonNode(
      '', 33, 132, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    firstRight.nodes.push(new DungeonNode(
      'Tile Room. Requires Cane of Somaria', 223, 132, DungeonNodeStatus.OPEN_DOOR,
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
      '', 30, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    tileRoom.nodes.push(new DungeonNode(
      'Compass Room. Requires Fire Rod', 221, 132, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'gt-right-side'));
    tileRoom.nodes.push(new DungeonNode(
      'Tile Room Chest', 139, 65, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[214]));
    gtData.dungeonMaps.push(tileRoom);

    var rightSide = new DungeonMapData('gt-right-side', 'Compass Room', '');
    rightSide.nodes.push(new DungeonNode(
      '', 225, 132, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-tile-room'));
    rightSide.nodes.push(new DungeonNode(
      '', 71, 132, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.fireRod;
    }, 'gt-sk-corridor'));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 1', 105, 98, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[215]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 2', 155, 98, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[216]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 3', 105, 159, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[217]));
    rightSide.nodes.push(new DungeonNode(
      'Compass Room Chest 4', 155, 159, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[218]));
    gtData.dungeonMaps.push(rightSide);

    var skCorridor = new DungeonMapData('gt-sk-corridor', 'Small Key Corridor', '');
    skCorridor.nodes.push(new DungeonNode(
      '', 237, 132, DungeonNodeStatus.SK_LOCKED,
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
      '', 65, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    invisibleMaze.nodes.push(new DungeonNode(
      '', 188, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bobs-room'));
    gtData.dungeonMaps.push(invisibleMaze);

    var bigChest = new DungeonMapData('gt-bc', 'Big Chest Room', '');
    bigChest.nodes.push(new DungeonNode(
      '', 126, 218, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bigChest.nodes.push(new DungeonNode(
      '', 126, 42, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 129, 129, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[210]));
    gtData.dungeonMaps.push(bigChest);

    var bobsRoom = new DungeonMapData('gt-bobs-room', 'Bob\'s Room', '');
    bobsRoom.nodes.push(new DungeonNode(
      '', 126, 219, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    bobsRoom.nodes.push(new DungeonNode(
      '', 173, 190, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bobsRoom.nodes.push(new DungeonNode(
      'Bob\'s Chest', 200, 174, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[213]));
    gtData.dungeonMaps.push(bobsRoom);

    var iceArmos = new DungeonMapData('gt-armos', 'Ice Armos Room', '');
    iceArmos.nodes.push(new DungeonNode(
      '', 31, 140, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bc'));
    iceArmos.nodes.push(new DungeonNode(
      '', 126, 53, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-bk'));
    gtData.dungeonMaps.push(iceArmos);

    var bkRoom = new DungeonMapData('gt-bk', 'Big Key Room', '');
    bkRoom.nodes.push(new DungeonNode(
      '', 126, 228, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-armos'));
    bkRoom.nodes.push(new DungeonNode(
      'Ice Armos Chest 1', 128, 106, DungeonNodeStatus.CLOSED_CHEST,
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
      '', 126, 45, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-entry'));
    keyTorch.nodes.push(new DungeonNode(
      '', 30, 134, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    keyTorch.nodes.push(new DungeonNode(
      '', 222, 134, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-right'));
    keyTorch.nodes.push(new DungeonNode(
      'Key Torch Item', 155, 113, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[199]));
    gtData.dungeonMaps.push(keyTorch);

    var hammerPegs = new DungeonMapData('gt-hammer-pegs', 'Hammer Pegs Room', '');
    hammerPegs.nodes.push(new DungeonNode(
      '', 221, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-first-left'));
    hammerPegs.nodes.push(new DungeonNode(
      'Hookshot Room. Requires Hammer', 29, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'gt-hookshot-room'));
    hammerPegs.nodes.push(new DungeonNode(
      '', 204, 190, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    gtData.dungeonMaps.push(hammerPegs);

    var hookshotRoom = new DungeonMapData('gt-hookshot-room', 'Hookshot Room', '');
    hookshotRoom.nodes.push(new DungeonNode(
      '', 170, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hammer-pegs'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Stalfos Room. Requires Hookshot', 126, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-stalfo'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Double Firebar Room. Requires Hookshot or Boots', 170, 195, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || items.boots;
    }, 'gt-double-firebar'));
    hookshotRoom.nodes.push(new DungeonNode(
      'Firesnake Room. Requires Hookshot', 126, 239, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hookshot;
    }, 'gt-double-switch'));
    gtData.dungeonMaps.push(hookshotRoom);

    var stalfos = new DungeonMapData('gt-stalfo', 'Stalfos Room', '');
    stalfos.nodes.push(new DungeonNode(
      '', 126, 221, DungeonNodeStatus.OPEN_DOOR,
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
      '', 32, 132, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    stalfos.nodes.push(new DungeonNode(
      'Map Chest', 138, 135, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[209]));
    gtData.dungeonMaps.push(stalfos);

    var doubleSwitch = new DungeonMapData('gt-double-switch', 'Double Switch Room', '');
    doubleSwitch.nodes.push(new DungeonNode(
      '', 124, 45, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-hookshot-room'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 220, 135, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    doubleSwitch.nodes.push(new DungeonNode(
      '', 200, 191, DungeonNodeStatus.GROUND_KEY,
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
      '', 126, 44, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-firesnake'));
    teleports.nodes.push(new DungeonNode(
      '', 30, 130, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-rando-room'));
    teleports.nodes.push(new DungeonNode(
      '', 56, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-invisible-maze'));
    gtData.dungeonMaps.push(teleports);

    var randoRoom = new DungeonMapData('gt-rando-room', 'Rando Room', '');
    randoRoom.nodes.push(new DungeonNode(
      '', 172, 196, DungeonNodeStatus.OPEN_DOOR,
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
      '', 32, 140, DungeonNodeStatus.SK_LOCKED,
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
      '', 124, 51, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-upstairs'));
    helmaRoom.nodes.push(new DungeonNode(
      'Pre Moldorm 2 Chest', 121, 137, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[224]));
    helmaRoom.nodes.push(new DungeonNode(
      'Mini Helma Chest 2', 124, 226, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'gt-moldorm'));
    gtData.dungeonMaps.push(helmaRoom);

    var helmaRoom = new DungeonMapData('gt-moldorm', 'Moldorm 2 Room', '');
    helmaRoom.nodes.push(new DungeonNode(
      'Moldorm 2 Chest. Requires Hookshot', 145, 187, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hookshot || (items.boots && config.canGlitch);
    }, l[225]));
    helmaRoom.nodes.push(new DungeonNode(
      'Agahnim 2. Requires Hookshot', 16, 198, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return items.hookshot || (items.boots && config.canGlitch);
    }, 'gt-aga2'));
    gtData.dungeonMaps.push(helmaRoom);

    var aga2 = new DungeonMapData('gt-aga2', 'Agahnim 2 Room', '');
    aga2.nodes.push(new DungeonNode(
      'Agahnim 2', 129, 113, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, 'Agahnim 2'));
    gtData.dungeonMaps.push(aga2);

    gtData.startingMap = entrance;

    return gtData;
  }
}
