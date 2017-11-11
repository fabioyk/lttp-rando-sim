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
        return items.moonPearl && items.canNorthWestDarkWorld();
      }, 12.8, 47.9
    );

    var entrance = new DungeonMapData('tt-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 64, 248, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 224, 12, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 34, 170, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[161]));
    entrance.nodes.push(new DungeonNode(
      'Big Room Top Left Chest', 48, 75, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[163]));
    entrance.nodes.push(new DungeonNode(
      'Compass Chest', 176, 204, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[162]));
    entrance.nodes.push(new DungeonNode(
      'Big Key Chest', 100, 218, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[160]));
    ttData.dungeonMaps.push(entrance);

    var stalfoCorridor = new DungeonMapData('tt-stalfo-corridor', 'Stalfo Corridor', '');
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 128, 238, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-entry'));
    stalfoCorridor.nodes.push(new DungeonNode(
      'Blind. Requires Blind to be Rescued and a Weapon', 128, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ttBlindDelivered && items.ttBombableFloor
            && (items.sword || items.hammer || items.somaria || items.byrna);
    }, 'tt-blind'));
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 80, 194, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 144, 34, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    ttData.dungeonMaps.push(stalfoCorridor);

    var hellway = new DungeonMapData('tt-hellway', 'Hellway', '');
    hellway.nodes.push(new DungeonNode(
      '', 176, 195, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    hellway.nodes.push(new DungeonNode(
      '', 128, 22, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bombable-floor'));
    hellway.nodes.push(new DungeonNode(
      '', 178, 66, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork'));
    ttData.dungeonMaps.push(hellway);

    var fork = new DungeonMapData('tt-fork', 'Conveyor Belt Fork', '');
    fork.nodes.push(new DungeonNode(
      '', 31, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    fork.nodes.push(new DungeonNode(
      '', 129, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    fork.nodes.push(new DungeonNode(
      '', 226, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-stalfo-corridor'));
    ttData.dungeonMaps.push(fork);

    var fork2 = new DungeonMapData('tt-fork2', 'Fork Downstairs', '');
    fork2.nodes.push(new DungeonNode(
      '', 193, 24, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork'));
    fork2.nodes.push(new DungeonNode(
      '', 18, 196, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bc'));
    fork2.nodes.push(new DungeonNode(
      'Rescue Blind', 242, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-maiden'));
    ttData.dungeonMaps.push(fork2);

    var blindCell = new DungeonMapData('tt-maiden', 'Blind Cell', '');
    blindCell.nodes.push(new DungeonNode(
      '', 80, 196, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    blindCell.nodes.push(new DungeonNode(
      'Blind Cell Chest', 156, 48, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[165]));
    blindCell.nodes.push(new DungeonNode(
      '', 140, 50, DungeonNodeStatus.BLIND_RESCUE,
    function(items:Items, config:Config) {
        return true;
    }, 'blind'));
    ttData.dungeonMaps.push(blindCell);

    var bigChest = new DungeonMapData('tt-bc', 'Big Chest', '');
    bigChest.nodes.push(new DungeonNode(
      '', 224, 137, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-fork2'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest. Requires Hammer', 127, 122, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[164]));
    ttData.dungeonMaps.push(bigChest);

    var bombableFloor = new DungeonMapData('tt-bombable-floor', 'Bombable Floor', '');
    bombableFloor.nodes.push(new DungeonNode(
      '', 34, 136, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-hellway'));
    bombableFloor.nodes.push(new DungeonNode(
      'Bombable Floor Chest', 58, 69, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[159]));
    bombableFloor.nodes.push(new DungeonNode(
      'Bomb the Floor', 129, 96, DungeonNodeStatus.TT_BOMB_FLOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tt-bomb'));
    ttData.dungeonMaps.push(bombableFloor);

    var blindRoom = new DungeonMapData('tt-blind', 'Blind Room', '');
    blindRoom.nodes.push(new DungeonNode(
      '', 129, 136, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[166]));
    ttData.dungeonMaps.push(blindRoom);

    ttData.startingMap = entrance;

    return ttData;
  }
}