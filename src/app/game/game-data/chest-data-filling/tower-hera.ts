import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class TowerHera {
  static setup (l:string[], config:Config):DungeonData {
    var tohData = new DungeonData('Tower of Hera', l[94],
      function(items:Items, config:Config) {
        return items.canWestDeathMountain(config.canGlitch) && (items.mirror || (items.hookshot && items.hammer));
      }, 62, 5.5
    );

    var entrance = new DungeonMapData('toh-entry', 'Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 90, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, config.isFullMap ? 'lw-hera' : 'exit', 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 28, 67, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'toh-sk', 'left'));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 50, 25, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[90], 'c'));
    entrance.nodes.push(new DungeonNode(
      'Basement', 25, 14, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'toh-basement', 'up'));
    entrance.nodes.push(new DungeonNode(
      '', 72, 67, DungeonNodeStatus.BK_LOCKED,
      DungeonNode.noReqs, 'toh-upstairs', 'right'));
    tohData.dungeonMaps.push(entrance);

    var skRoom = new DungeonMapData('toh-sk', 'Left Room');
    skRoom.nodes.push(new DungeonNode(
      '', 56.5, 26, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'toh-entry', 'up'));
    skRoom.nodes.push(new DungeonNode(
      'Basement Cage Item', 53, 61, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
      DungeonNode.noReqs, l[89], 'c'));
    tohData.dungeonMaps.push(skRoom);

    var basement = new DungeonMapData('toh-basement', 'Basement');
    basement.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'toh-entry', 'up'));
    basement.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 66, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[88], 'c'));
    tohData.dungeonMaps.push(basement);

    var upstairs = new DungeonMapData('toh-upstairs', 'Big Chest Room');
    upstairs.nodes.push(new DungeonNode(
      '', 87, 25, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'toh-entry', 'right'));
    upstairs.nodes.push(new DungeonNode(
      'Compass Chest', 50, 58, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[91], 'c'));
    upstairs.nodes.push(new DungeonNode(
      'Big Chest', 50, 17, DungeonNodeStatus.BIG_CHEST,
      DungeonNode.noReqs, l[92], 'bc'));
    upstairs.nodes.push(new DungeonNode(
      'Moldorm Room', 13, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword || items.hammer;
    }, 'toh-moldorm', 'left'));
    tohData.dungeonMaps.push(upstairs);

    var moldormRoom = new DungeonMapData('toh-moldorm', 'Moldorm Room');
    moldormRoom.nodes.push(new DungeonNode(
      'Moldorm', 50, 50, DungeonNodeStatus.BOSS,
      DungeonNode.noReqs, l[93], 'boss'));
    tohData.dungeonMaps.push(moldormRoom);

    tohData.startingMap = entrance;

    return tohData;
  }
}
