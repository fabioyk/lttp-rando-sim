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
        return items.canWestDeathMountain(config) && (items.mirror || (items.hookshot && items.hammer));
      }, 62, 5.5
    );

    var entrance = new DungeonMapData('toh-entry', 'Entrance', '');
    entrance.nodes.push(new DungeonNode(
      '', 128, 228, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'exit'));
    entrance.nodes.push(new DungeonNode(
      '', 72, 172, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-sk'));
    entrance.nodes.push(new DungeonNode(
      'Entrance Chest', 128, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[90]));
    entrance.nodes.push(new DungeonNode(
      'Basement. Requires Lamp or Fire Rod', 64, 36, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return items.hasFiresource();
    }, 'toh-basement'));
    entrance.nodes.push(new DungeonNode(
      '', 184, 172, DungeonNodeStatus.BK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-upstairs'));
    tohData.dungeonMaps.push(entrance);

    var skRoom = new DungeonMapData('toh-sk', 'Small Key Room', '');
    skRoom.nodes.push(new DungeonNode(
      '', 144, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    skRoom.nodes.push(new DungeonNode(
      'Freestanding Item', 136, 169, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[89]));
    tohData.dungeonMaps.push(skRoom);

    var basement = new DungeonMapData('toh-basement', 'Basement', '');
    basement.nodes.push(new DungeonNode(
      '', 128, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    basement.nodes.push(new DungeonNode(
      'Basement Chest', 128, 165, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[88]));
    tohData.dungeonMaps.push(basement);

    var upstairs = new DungeonMapData('toh-upstairs', 'Big Room', '');
    upstairs.nodes.push(new DungeonNode(
      '', 224, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'toh-entry'));
    upstairs.nodes.push(new DungeonNode(
      'Center Chest', 128, 146, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[91]));
    upstairs.nodes.push(new DungeonNode(
      'Big Chest', 128, 40, DungeonNodeStatus.BIG_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[92]));
    upstairs.nodes.push(new DungeonNode(
      'Moldorm Room. Requires either Sword or Hammer', 32, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword || items.hammer;
    }, 'toh-moldorm'));
    tohData.dungeonMaps.push(upstairs);

    var moldormRoom = new DungeonMapData('toh-moldorm', 'Moldorm Room', '');
    moldormRoom.nodes.push(new DungeonNode(
      '', 132, 132, DungeonNodeStatus.BOSS,
    function(items:Items, config:Config) {
        return true;
    }, l[93]));
    tohData.dungeonMaps.push(moldormRoom);

    tohData.startingMap = entrance;

    return tohData;
  }
}
