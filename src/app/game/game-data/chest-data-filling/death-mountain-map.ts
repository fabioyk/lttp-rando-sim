import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class DeathMountain {
  static setup (l:string[], config:Config):DungeonData {
    var dmData = new DungeonData('Death Mountain', '',
      function(items:Items, config:Config) {
        return true;
      }, 0, 0
    );

    var m = new DungeonMapData('dm-flute1', 'Death Mountain Entrance');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'dm-east'));
    m.nodes.push(new DungeonNode(
      'Old Man', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hasLightsource(config);
    }, l[74]));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-spectacle-rock', 'Spectacle Rock');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-flute1'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spectacle-cave'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spectacle-cave', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Item', 0, 0, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[77], '', [1]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-hera', '', [1]));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-spectacle-cave', 'Spectacle Rock Cave');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spectacle-rock', '', config.canGlitch ? [-1] : [0]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'dm-flute1'));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Cave Item', 0, 0, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[75], '', [1]));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-hera', 'Tower of Hera Entrance');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'toh-entry'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'dm-trportal'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.BOOK_CHECKABLE_ITEM,
    function(items:Items, config:Config) {
      return true;
    }, l[76]));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Item', 0, 0, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return false;
    }, l[77]));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-trportal', 'Turtle Rock Portal');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'dm-hera'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-spiral'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-east'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove === 2 && items.hammer && items.moonPearl;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Floating Island', 0, 0, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[87], '', [1]));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-east', 'East Death Mountain');
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'dm-flute1'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-paradox2'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove === 2;
    }, ''));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-spiral', 'Spiral Cave');
    m.nodes.push(new DungeonNode(
      'Spiral Cave Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, l[78]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-east'));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-paradox2', 'Paradox Cave 2 Chests');
    // 0: from dm east, 1: from paradox 5
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Left Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, l[85]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Right Chest', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, l[85]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-east'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, 'dm-paradox5'));
    dmData.dungeonMaps.push(m);

    m = new DungeonMapData('dm-paradox5', 'Paradox Cave 5 Chests');
    // 0: from dm east, 1: from paradox 2
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 1', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[80], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 2', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[81], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 3', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[82], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 4', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[83], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 5', 0, 0, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[84], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-paradox2'));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-paradox2', '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-east', '', config.canGlitch ? [-1] : [0]));
    m.nodes.push(new DungeonNode(
      '', 0, 0, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dm-trportal', '', config.canGlitch ? [-1] : [0]));
    dmData.dungeonMaps.push(m);

    dmData.startingMap = m;

    return dmData;
  }
}
