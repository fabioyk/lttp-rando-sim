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
      DungeonNode.noReqs, config.isFullMap ? 'dw-kakariko' : 'exit', 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 87.5, 6, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'tt-stalfo-corridor', 'up'));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 13.5, 66.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[161], 'c1'));
    entrance.nodes.push(new DungeonNode(
      'Ambush Chest', 19, 30.5, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[163], 'c2'));
    entrance.nodes.push(new DungeonNode(
      'Compass Chest', 68.6, 80, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[162], 'c3'));
    entrance.nodes.push(new DungeonNode(
      'Big Key Chest', 39, 85.3, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[160], 'c4'));
    ttData.dungeonMaps.push(entrance);

    var stalfoCorridor = new DungeonMapData('tt-stalfo-corridor', 'Stalfo Corridor');
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-entry', 'down'));
    stalfoCorridor.nodes.push(new DungeonNode(
      'Blind', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.ttBlindDelivered && items.ttBombableFloor
            && (items.sword || items.hammer || items.somaria || items.byrna);
    }, 'tt-blind', 'up'));
    stalfoCorridor.nodes.push(new DungeonNode(
      '', 33, 77, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tt-hellway', 'left'));
    stalfoCorridor.nodes.push(new DungeonNode(
      'Small Key', 54, 17, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    ttData.dungeonMaps.push(stalfoCorridor);

    var hellway = new DungeonMapData('tt-hellway', 'Hellway');
    hellway.nodes.push(new DungeonNode(
      '', 68, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-stalfo-corridor', 'back'));
    hellway.nodes.push(new DungeonNode(
      '', 50, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-bombable-floor', 'up'));
    hellway.nodes.push(new DungeonNode(
      '', 68, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-fork', 'right'));
    ttData.dungeonMaps.push(hellway);

    var fork = new DungeonMapData('tt-fork', 'Conveyor Belt Circle');
    fork.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-hellway', 'left'));
    fork.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-fork2', 'up'));
    fork.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-stalfo-corridor', 'right'));
    ttData.dungeonMaps.push(fork);

    var fork2 = new DungeonMapData('tt-fork2', 'Downstairs');
    fork2.nodes.push(new DungeonNode(
      '', 75, 9.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-fork', 'up'));
    fork2.nodes.push(new DungeonNode(
      '', 7, 77, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'tt-bc', 'left'));
    fork2.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-maiden', 'right'));
    ttData.dungeonMaps.push(fork2);

    var blindCell = new DungeonMapData('tt-maiden', 'Blind Cell');
    blindCell.nodes.push(new DungeonNode(
      '', 32, 77, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-fork2', 'left'));
    blindCell.nodes.push(new DungeonNode(
      'Blind\'s Chest', 61, 19, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[165], 'c'));
    blindCell.nodes.push(new DungeonNode(
      'Blind', 51, 22, DungeonNodeStatus.BLIND_RESCUE,
      DungeonNode.noReqs, 'blind', 'blind'));
    ttData.dungeonMaps.push(blindCell);

    var bigChest = new DungeonMapData('tt-bc', 'Big Chest');
    bigChest.nodes.push(new DungeonNode(
      '', 88, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-fork2', 'right'));
    bigChest.nodes.push(new DungeonNode(
      'Big Chest', 50, 49, DungeonNodeStatus.BIG_CHEST,
      function(items:Items, config:Config) {
        return items.hammer;
      }, l[164], 'bc'));
    ttData.dungeonMaps.push(bigChest);

    var bombableFloor = new DungeonMapData('tt-bombable-floor', 'Attic');
    bombableFloor.nodes.push(new DungeonNode(
      '', 13, 53.5, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'tt-hellway', 'left'));
    bombableFloor.nodes.push(new DungeonNode(
      'Attic Chest', 22, 29, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[159], 'c'));
    bombableFloor.nodes.push(new DungeonNode(
      'Bomb the Floor', 50, 38, DungeonNodeStatus.TT_BOMB_FLOOR,
      DungeonNode.noReqs, 'tt-bomb', 'bomb'));
    ttData.dungeonMaps.push(bombableFloor);

    var blindRoom = new DungeonMapData('tt-blind', 'Blind Room');
    blindRoom.nodes.push(new DungeonNode(
      'Blind', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[166], 'boss'));
    ttData.dungeonMaps.push(blindRoom);

    ttData.startingMap = entrance;

    return ttData;
  }
}
