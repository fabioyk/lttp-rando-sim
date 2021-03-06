import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";


export class HyruleCastle {
  static setup (l:string[], config:Config):DungeonData {
    var hcData = new DungeonData('Hyrule Castle', '',
      function(items:Items, config:Config) {
        return config.mode !== 'inverted' || (items.canInvertedLW() && (config.canGlitch || items.moonPearl));
      }, 0, 0
    );

    var entry = new DungeonMapData('hc-entry', 'Hyrule Castle Entrance');
    entry.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hyrule-castle', '', [-1], 2));
    entry.nodes.push(new DungeonNode(
      '', 11, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-left'));
    entry.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return (items.lamp && config.mode.indexOf('standard') === -1)
        || (items.fireRod && config.mode.indexOf('standard') === -1 && config.advancedItems)
        || ((config.mode.indexOf('standard') > -1) && items.gameState >= 2);
    }, 'hc-darkchest', (config.isFullMap && config.mode.indexOf('standard') > -1) ? 'Zelda must be accompanying you' : 'Lamp Required', [-1], 0,
    function(items:Items, config:Config) {
      return config.mode.indexOf('standard') === -1;
    }));
    hcData.dungeonMaps.push(entry);

    var m = new DungeonMapData('hc-left', 'Left Corridor');
    m.nodes.push(new DungeonNode(
      '', 63, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-entry'));
    m.nodes.push(new DungeonNode(
      '', 50, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-map'));
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.gameState === 4;
    }, 'lw-hyrule-castle', 'Zelda must be rescued first', [-1], 1));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-sanctuary', 'Sanctuary', true);
    m.nodes.push(new DungeonNode(
      '', 50, 89, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      'Sanctuary Chest', 45, 17, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[52]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-map', 'Keyguard Room');
    m.nodes.push(new DungeonNode(
      '', 50, 39, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-left'));
    m.nodes.push(new DungeonNode(
      '', 50, 68, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-boomerang'));
    m.nodes.push(new DungeonNode(
      '', 55, 47, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Map Chest', 48, 55, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[58]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-boomerang', 'Boomerang Room');
    m.nodes.push(new DungeonNode(
      '', 25, 64.5, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-map'));
    m.nodes.push(new DungeonNode(
      '', 25, 34, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-zelda'));
    m.nodes.push(new DungeonNode(
      '', 84, 54, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Boomerang Chest', 75, 52, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[57]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-zelda', 'Zelda\'s Cell');
    m.nodes.push(new DungeonNode(
      '', 17, 34, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-boomerang'));
    m.nodes.push(new DungeonNode(
      'Zelda\'s Chest', 65, 39, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[59]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-darkchest', 'Dark Sewers Room');
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-entry'));
    m.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-keyrat'));
    m.nodes.push(new DungeonNode(
      'Dark Sewers Chest', 76, 42, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[56]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-keyrat', 'Key Rat');
    m.nodes.push(new DungeonNode(
      '', 49, 69, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-darkchest'));
    m.nodes.push(new DungeonNode(
      '', 75, 34, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-bombablewall'));
    m.nodes.push(new DungeonNode(
      'Boomerang Chest', 17, 45, DungeonNodeStatus.GROUND_KEY,
    function(items:Items, config:Config) {
        return true;
    }, l[56]));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-bombablewall', 'Sewers Bombable Wall');
    m.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.SK_LOCKED,
    function(items:Items, config:Config) {
        return (items.lamp && config.mode.indexOf('standard') === -1)
        || (items.fireRod && config.mode.indexOf('standard') === -1 && config.advancedItems)
        || (config.mode.indexOf('standard') > -1);
    }, 'hc-keyrat', 'Lamp Required', [-1], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 75, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-sanctuary'));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 1', 14, 56, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[53]));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 2', 20, 56, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[54]));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 3', 26, 56, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[55]));
    hcData.dungeonMaps.push(m);

    hcData.startingMap = entry;

    return hcData;
  }
}
