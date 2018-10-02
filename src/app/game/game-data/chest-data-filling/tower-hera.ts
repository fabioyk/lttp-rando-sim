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
        if (config.mode === 'inverted') {
          return items.moonPearl && items.hammer && items.canInvertedEastDeathMountain(config.canGlitch);
        }
        return items.canWestDeathMountain(config.canGlitch) && (items.mirror || (items.hookshot && items.hammer));
      }, 62, 5.5
    );

    var entrance = new DungeonMapData('toh-entry', 'Tower of Hera Entrance');
    entrance.nodes.push(new DungeonNode(
      '', 50, 90, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, config.isFullMap ? 'lw-hera' : 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 28, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-sk'));
    entrance.nodes.push(new DungeonNode(
      'Map Chest', 50, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[90]));
    entrance.nodes.push(new DungeonNode(
      'Basement', 25, 14, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'toh-basement', 'Fire Source Required'));
    entrance.nodes.push(new DungeonNode(
      '', 72, 67, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-upstairs'));
    entrance.nodes.push(new DungeonNode(
      'Hint Tile', 50, 46, DungeonNodeStatus.HINT,
    function(items:Items, config:Config) {
        return true;
    }, '3'));
    tohData.dungeonMaps.push(entrance);

    var skRoom = new DungeonMapData('toh-sk', 'Left Room');
    skRoom.nodes.push(new DungeonNode(
      '', 56.5, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    skRoom.nodes.push(new DungeonNode(
      'Basement Cage Item', 53, 61, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[89]));
    tohData.dungeonMaps.push(skRoom);

    var basement = new DungeonMapData('toh-basement', 'Basement');
    basement.nodes.push(new DungeonNode(
      '', 50, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    basement.nodes.push(new DungeonNode(
      'Big Key Chest', 50, 66, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[88]));
    tohData.dungeonMaps.push(basement);

    var upstairs = new DungeonMapData('toh-upstairs', 'Big Chest Room');
    upstairs.nodes.push(new DungeonNode(
      '', 87, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    upstairs.nodes.push(new DungeonNode(
      'Compass Chest', 50, 58, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[91]));
    upstairs.nodes.push(new DungeonNode(
      'Big Chest', 50, 17, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[92]));
    upstairs.nodes.push(new DungeonNode(
      'Hint Tile', 50, 51, DungeonNodeStatus.HINT,
    function(items:Items, config:Config) {
        return true;
    }, '4'));
    upstairs.nodes.push(new DungeonNode(
      'Moldorm Room', 13, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword || items.hammer;
    }, 'toh-moldorm', 'Sword or Hammer Required'));
    tohData.dungeonMaps.push(upstairs);

    var moldormRoom = new DungeonMapData('toh-moldorm', 'Moldorm Room');
    moldormRoom.nodes.push(new DungeonNode(
      'Moldorm', 50, 50, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[93]));
    moldormRoom.nodes.push(new DungeonNode(
      '', 72, 67, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-upstairs'));
    tohData.dungeonMaps.push(moldormRoom);

    tohData.startingMap = entrance;

    return tohData;
  }
}
