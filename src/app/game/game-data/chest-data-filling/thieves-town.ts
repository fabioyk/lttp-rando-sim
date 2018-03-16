import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class ThievesTown {
  static setup (l:string[], config:Config):DungeonData {
    var ttData = new DungeonData('Thieves Town', l[167],
      function(items:Items, config:Config) {
        return items.moonPearl && items.canNorthWestDarkWorld(config.canGlitch);
      }, 12.8, 47.9
    );

    var entrance = new DungeonMapData('tt-entry', 'Great Hall');
    entrance.nodes.push(new DungeonNode(
      '', 25, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'dw-kakariko' : 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 87.5, 6, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 13.5, 66.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[161]));
    entrance.nodes.push(new DungeonNode(
      'Ambush Chest', 19, 30.5, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[163]));
    entrance.nodes.push(new DungeonNode(
      'Compass Chest', 68.6, 80, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[162]));
    entrance.nodes.push(new DungeonNode(
      'Big Key Chest', 39, 85.3, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[160]));
    ttData.dungeonMaps.push(entrance);

    var stalfoCorridor = new DungeonMapData('tt-stalfo-corridor', 'Stalfo Corridor');
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-entry'));
    stalfoCorridor.nodes.push(new DungeonNode(
      'Blind', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ttBlindDelivered && items.ttBombableFloor
            && (items.sword || items.hammer || items.somaria || items.byrna);
    }, 'tt-blind', 'Floor Destroyed, Blind Rescued and a Weapon Required'));
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 33, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 54, 17, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    ttData.dungeonMaps.push(stalfoCorridor);

    var hellway = new DungeonMapData('tt-hellway', 'Hellway');
    hellway.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    hellway.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bombable-floor'));
    hellway.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork'));
    ttData.dungeonMaps.push(hellway);

    var fork = new DungeonMapData('tt-fork', 'Conveyor Belt Circle');
    fork.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    fork.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    fork.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    ttData.dungeonMaps.push(fork);

    var fork2 = new DungeonMapData('tt-fork2', 'Downstairs');
    fork2.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork'));
    fork2.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bc'));
    fork2.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-maiden'));
    ttData.dungeonMaps.push(fork2);

    var blindCell = new DungeonMapData('tt-maiden', 'Blind Cell');
    blindCell.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    blindCell.nodes.push(new DungeonNode(
      'Blind\'s Chest', 61, 19, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[165]));
    blindCell.nodes.push(new DungeonNode(
      '', 51, 22, DungeonNodeStatus.BLIND_RESCUE,
    function(items:Items, config:Config) {
        return true;
    }, 'blind'));
    ttData.dungeonMaps.push(blindCell);

    var bigChest = new DungeonMapData('tt-bc', 'Big Chest');
    bigChest.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 49, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[164], 'Hammer Required'));
    ttData.dungeonMaps.push(bigChest);

    var bombableFloor = new DungeonMapData('tt-bombable-floor', 'Attic');
    bombableFloor.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    bombableFloor.nodes.push(new DungeonNode(
      'Attic Chest', 22, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[159]));
    bombableFloor.nodes.push(new DungeonNode(
      'Bomb the Floor', 50, 38, DungeonNodeStatus.TT_BOMB_FLOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bomb'));
    ttData.dungeonMaps.push(bombableFloor);

    var blindRoom = new DungeonMapData('tt-blind', 'Blind Room');
    blindRoom.nodes.push(new DungeonNode(
      'Blind', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[166]));
    ttData.dungeonMaps.push(blindRoom);

    ttData.startingMap = entrance;

    return ttData;
  }
}
