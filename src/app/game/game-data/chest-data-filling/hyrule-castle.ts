import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";


export class HyruleCastle {
  static setup (l:string[], config:Config):DungeonData {
    var hcData = new DungeonData('Hyrule Castle', '',
      DungeonNode.noReqs, 0, 0
    );

    var entry = new DungeonMapData('hc-entry', 'Hyrule Castle Entrance');
    entry.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'lw-hyrule-castle', 'exit'));
    entry.nodes.push(new DungeonNode(
      '', 11, 52, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-left', 'left'));
    entry.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return (items.lamp && config.mode.indexOf('standard') === -1)
        || ((config.mode.indexOf('standard') > -1) && items.gameState >= 2);
    }, 'hc-darkchest', 'up', [-1], 0,
    function(items:Items, config:Config) {
      return config.mode.indexOf('standard') === -1;
    }));
    hcData.dungeonMaps.push(entry);

    var m = new DungeonMapData('hc-left', 'Left Corridor');
    m.nodes.push(new DungeonNode(
      '', 63, 51, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-entry', 'right'));
    m.nodes.push(new DungeonNode(
      '', 50, 14, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-map', 'up'));
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.gameState === 4;
    }, 'lw-hyrule-castle', 'down', [-1], 1));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-sanctuary', 'Sanctuary', true);
    m.nodes.push(new DungeonNode(
      '', 50, 89, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'lw-sanctuary-entrance', 'down'));
    m.nodes.push(new DungeonNode(
      'Sanctuary Chest', 45, 17, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[52], 'c'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-map', 'Keyguard Room');
    m.nodes.push(new DungeonNode(
      '', 50, 39, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-left', 'back'));
    m.nodes.push(new DungeonNode(
      '', 50, 68, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-boomerang', 'forward'));
    m.nodes.push(new DungeonNode(
      'Small Key', 55, 47, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    m.nodes.push(new DungeonNode(
      'Map Chest', 48, 55, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[58], 'c1'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-boomerang', 'Boomerang Room');
    m.nodes.push(new DungeonNode(
      '', 25, 64.5, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-map', 'back'));
    m.nodes.push(new DungeonNode(
      '', 25, 34, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-zelda', 'forward'));
    m.nodes.push(new DungeonNode(
      'Small Key', 84, 54, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    m.nodes.push(new DungeonNode(
      'Boomerang Chest', 75, 52, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[57], 'c'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-zelda', 'Zelda\'s Cell');
    m.nodes.push(new DungeonNode(
      '', 17, 34, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-boomerang', 'back'));
    m.nodes.push(new DungeonNode(
      'Zelda\'s Chest', 65, 39, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[59], 'c'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-darkchest', 'Dark Sewers Room');
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-entry', 'down'));
    m.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-keyrat', 'up'));
    m.nodes.push(new DungeonNode(
      'Dark Sewers Chest', 76, 42, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[56], 'c'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-keyrat', 'Key Rat');
    m.nodes.push(new DungeonNode(
      '', 49, 69, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-darkchest', 'down'));
    m.nodes.push(new DungeonNode(
      '', 75, 34, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-bombablewall', 'up'));
    m.nodes.push(new DungeonNode(
      'Small Key', 17, 45, DungeonNodeStatus.GROUND_KEY,
      DungeonNode.noReqs, '', 'key'));
    hcData.dungeonMaps.push(m);

    m = new DungeonMapData('hc-bombablewall', 'Sewers Bombable Wall');
    m.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.SK_LOCKED,
      DungeonNode.noReqs, 'hc-keyrat', 'down'));
    m.nodes.push(new DungeonNode(
      '', 75, 10, DungeonNodeStatus.OPEN_DOOR,
      DungeonNode.noReqs, 'hc-sanctuary', 'up'));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 1', 14, 56, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[53], 'c1'));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 2', 20, 56, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[54], 'c2'));
    m.nodes.push(new DungeonNode(
      'Bombable Wall Chest 3', 26, 56, DungeonNodeStatus.CLOSED_CHEST,
      DungeonNode.noReqs, l[55], 'c3'));
    hcData.dungeonMaps.push(m);

    hcData.startingMap = entry;

    return hcData;
  }
}
