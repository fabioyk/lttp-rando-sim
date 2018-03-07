import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class DarkWorldMap {
  static setup (l:string[], config:Config):DungeonData {
    var dwData = new DungeonData('Dark World', '',
      function(items:Items, config:Config) {
      return true;
      }, 0, 0
    );

    var m = new DungeonMapData('dw-flute4', 'Front of Bomb Shop');
    m.nodes.push(new DungeonNode(
      '', 68, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-bomb-shop'));
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 72, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 16, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 84, 50, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-octorok-field', 'Hammer Pegs Bridge');
    // 0 below, 1 top
    m.nodes.push(new DungeonNode(
      '', 4, 89, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, 'dw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 6, 15, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'dw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      '', 19, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'dw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 25, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, 'dw-small-shop'));
    m.nodes.push(new DungeonNode(
      '', 63, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'dw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 89, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers && (items.hammer || items.currentRegionInMap === 1);
    }, 'dw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 17, 90, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 26, 49, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 42, 80, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.flippers && (items.hammer || items.currentRegionInMap === 1);
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-south-house-portal', 'South of Bomb Shop');    
    m.nodes.push(new DungeonNode(
      '', 88, 36, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-hype-cave'));
    m.nodes.push(new DungeonNode(
      '', 72, 29, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 84, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove && items.moonPearl;
    }, 'dw-minimoldorm-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 35, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 10, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove && items.moonPearl;
    }, 'dw-south-grove', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 43, 38, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-south-grove', 'South of Grove');
    m.nodes.push(new DungeonNode(
      '', 87, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 95, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-south-house-portal', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 86, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-flute7', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 31, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-grove'));
    m.nodes.push(new DungeonNode(
      '', 10, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 13, 66, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 23, 42, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hyrule-castle', 'Pyramid');
    m.nodes.push(new DungeonNode(
      '', 94, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 49, 12, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.agahnim2;
    }, 'dw-ganon'));
    m.nodes.push(new DungeonNode(
      '', 37, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasBigBomb;
    }, 'dw-fat-fairy'));
    m.nodes.push(new DungeonNode(
      'Pyramid Item', 81, 28, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[105]));
    m.nodes.push(new DungeonNode(
      '', 59, 13, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 50, 46, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-east-sanctuary', 'Broken Bridge');
    // 0: east, 1: west
    m.nodes.push(new DungeonNode(
      '', 51, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 0 || (items.flippers || (items.boots && config.canGlitch));
    }, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 30, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1 
          || (items.hookshot && (items.flippers || items.glove || items.hammer));
    }, 'dw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 70, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || (items.flippers || (items.boots && config.canGlitch));
    }, 'dw-flute2'));
    m.nodes.push(new DungeonNode(
      '', 52, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-flute8', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 65, 74, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 0 || (items.flippers || (items.boots && config.canGlitch));
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 39, 48, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1 
        || (items.hookshot && (items.flippers || items.glove || items.hammer));
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-small-shop', 'Northwest of Ice Lake');
    // 0: from land, 1: from water
    m.nodes.push(new DungeonNode(
      '', 45, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-octorok-field', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 91, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 29, 25, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 78, 73, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, '', '', [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-eastern-palace', 'Palace of Darkness Courtyard');
    m.nodes.push(new DungeonNode(
      '', 13, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 87, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 83, 6, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'pod-entry'));
    m.nodes.push(new DungeonNode(
      '', 59, 25, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lake-hylea', 'Ice Lake');
    // 0: normal, 1: IP entrance
    m.nodes.push(new DungeonNode(
      '', 87, 16, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-octorok-field', '', [0], 1));
    m.nodes.push(new DungeonNode(
      '', 40, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-small-shop', '', [0], 1));
    m.nodes.push(new DungeonNode(
      '', 94, 80, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute8', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 68, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'ip-entry', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 61, 50, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 44, 74, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [0]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-minimoldorm-entrance', 'Southwest Ice Lake Shore');
    m.nodes.push(new DungeonNode(
      '', 22, 29, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 5, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 81, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-lake-hylea'));
    m.nodes.push(new DungeonNode(
      '', 32, 62, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute7', 'Swamp Palace Entrance');
    m.nodes.push(new DungeonNode(
      '', 89, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.mirror && items.flippers;
    }, 'sp-entry'));
    m.nodes.push(new DungeonNode(
      '', 81, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 95, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      '', 65, 52, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 24, 50, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-grove', 'Haunted Grove');
    m.nodes.push(new DungeonNode(
      '', 46, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-grove'));
    m.nodes.push(new DungeonNode(
      'Ol\' Stumpy', 46, 44, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[119]));
    m.nodes.push(new DungeonNode(
      '', 28, 52, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-race-game', 'Digging Game');
    // 0 bottom, 1 top
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 86, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2 || items.currentRegionInMap === 1;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 60, 40, DungeonNodeStatus.FROG,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Digging Game Prize', 28, 44, DungeonNodeStatus.CLOSED_CHEST, // TODO change region when got
    function(items:Items, config:Config) {
      return true;
    }, l[121]));
    m.nodes.push(new DungeonNode(
      '', 68, 68, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 75, 33, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.glove === 2 || items.currentRegionInMap === 1;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-sanctuary-entrance', 'Front of Sanctuary');
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 29, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 4, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 50, 62, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-graveyard', 'Ghostly Garden');
    m.nodes.push(new DungeonNode(
      '', 5, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 94, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 47, 78, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 60, 28, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 85, 29, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 2));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute2', 'Potion Shop');
    m.nodes.push(new DungeonNode(
      '', 6, 75, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-east-sanctuary', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 94, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-zora-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 41, 81, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute5', 'Palace of Darkness Portal');
    m.nodes.push(new DungeonNode(
      '', 75, 5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 50, 63, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-zora-entrance', 'Lake of Ill Omen');
    m.nodes.push(new DungeonNode(
      '', 76, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-flute2', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      'Catfish', 15, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[104]));
    m.nodes.push(new DungeonNode(
      '', 47, 54, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute8', 'East of Ice Lake');
    m.nodes.push(new DungeonNode(
      '', 17, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 50, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-east-sanctuary', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 72, 43, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-desert', 'Misery Mire Area');
    m.nodes.push(new DungeonNode(
      '', 15, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl || (items.mirror && config.canGlitch);
    }, 'dw-mire-shed'));
    m.nodes.push(new DungeonNode(
      '', 30, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl && items[config.mmMedallion] && items.sword
          && (items.boots || items.hookshot);
    }, 'mm-entry'));
    m.nodes.push(new DungeonNode(
      '', 10, 30, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      '', 61, 10, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-kakariko', 'Village of Outcasts');
    m.nodes.push(new DungeonNode(
      '', 32, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-kak-portal'));
    m.nodes.push(new DungeonNode(
      '', 77, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 94, 81, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, 'dw-blacksmiths-entrance', 'Titan Mitts Required'));
    m.nodes.push(new DungeonNode(
      '', 87, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-race-game', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 44, 83, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-bombable-hut'));
    m.nodes.push(new DungeonNode(
      '', 82, 43, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-chouse'));
    m.nodes.push(new DungeonNode(
      '', 20, 36, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-chest-game'));
    m.nodes.push(new DungeonNode(
      '', 49, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'tt-entry'));
    m.nodes.push(new DungeonNode(
      '', 33, 47, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lumberjack', 'Bumper Cave Entrance');
    m.nodes.push(new DungeonNode(
      'Bumper Cave Item', 63, 62, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.cape && items.glove;
    }, l[112]));
    m.nodes.push(new DungeonNode(
      '', 52, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 39, 57, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-fortune-teller', 'Fortune Teller');
    m.nodes.push(new DungeonNode(
      '', 55, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 77, 7, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 67, 61, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-blacksmiths-entrance', 'Hammer Pegs');
    m.nodes.push(new DungeonNode(
      '', 4, 61, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 53, 83, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'dw-hammer-pegs'));
    m.nodes.push(new DungeonNode(
      '', 41, 17, DungeonNodeStatus.PURPLE_CHEST,
    function(items:Items, config:Config) {
      return items.blacksmithsRescued;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 43, 54, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 63, 34, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      if (items.currentRegionInMap === 1) {
        return items.hammer;
      } else {
        return true; // TODO region swap
      }
    }, '', '', [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-kak-portal', 'Kakariko Dark World Portal');
    m.nodes.push(new DungeonNode(
      '', 47, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 74, 5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 63, 72, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 2));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lostwoods', 'Skeleton Forest');
    m.nodes.push(new DungeonNode(
      '', 63, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-left-drop', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 78, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-right-drop', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 76, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-northeast-bc', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 73, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-bc', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 57, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-part21', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 38, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kak-portal', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 89, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-fortune-teller', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 23, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'sw-part22', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 15, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.fireRod;
    }, 'sw-final', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 62, 81, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 13, 36, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [1]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-bombable-hut', 'Bombable Hut', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Bombable Hut Chest', 46, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[108]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-chouse', 'C-Shaped House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'C-House Chest', 59, 23, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[109]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-chest-game', 'Chest Game', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Chest Game Prize', 37, 56, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[110]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hammer-pegs', 'Hammer Pegs Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      'Hammer Pegs Item', 50, 45, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[111]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-fat-fairy', 'Pyramid Fairy', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      'Pyramid Fairy Chest 1', 44, 58, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[106]));
    m.nodes.push(new DungeonNode(
      'Pyramid Fairy Chest 1', 56, 57, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[107]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hype-cave', 'Hype Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 1', 52, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[115]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 2', 51, 32, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[116]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 3', 48, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[117]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 4', 51, 20, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[118]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 5', 48, 13, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[120]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-mire-shed', 'Mire Shed', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-desert'));
    m.nodes.push(new DungeonNode(
      'Mire Shed Chest 1', 46, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[122]));
    m.nodes.push(new DungeonNode(
      'Mire Shed Chest 2', 53, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[123]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-ganon', 'Ganon', true);
    m.nodes.push(new DungeonNode(
      'Triforce Room', 50, 12, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword >= 2 && items.hasFiresource();
    }, 'ganon'));
    m.nodes.push(new DungeonNode(
      '', 49, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-hyrule-castle'));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-bomb-shop', 'Bomb Shop', true);
    m.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 25, 25, DungeonNodeStatus.BIG_BOMB,
    function(items:Items, config:Config) {
      return items.crystal5 && items.crystal6;
    }, ''));
    dwData.dungeonMaps.push(m);

    // DM

    m = new DungeonMapData('dw-flute1', 'Death Mountain Entrance');
    m.nodes.push(new DungeonNode(
      '', 10, 29, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 33, 46, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-spectacle-rock', 'Spectacle Rock');
    m.nodes.push(new DungeonNode(
      '', 10, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 79, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-spikecave'));
    m.nodes.push(new DungeonNode(
      '', 67, 42, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 43, 34, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [-1], 1));    
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hera', 'Ganons Tower Entrance');
    m.nodes.push(new DungeonNode(
      '', 74, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.crystal1 && items.crystal2 && items.crystal3
        && items.crystal4 && items.crystal5 && items.crystal6
        && items.crystal7;
    }, 'gt-entry'));
    m.nodes.push(new DungeonNode(
      '', 95, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-trportal', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 74, 53, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 60, 44, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-trportal', 'Turtle Rock Entrance');
    // 0: TR portal, 1: land, 2: floating island
    m.nodes.push(new DungeonNode(
      '', 3, 45, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-hera'));
    m.nodes.push(new DungeonNode(
      '', 43, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-east'));
    m.nodes.push(new DungeonNode(
      '', 43, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-superbunny'));
    m.nodes.push(new DungeonNode(
      '', 32, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-hookshotcave'));
    m.nodes.push(new DungeonNode(
      '', 76, 57, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.somaria && items.moonPearl && items[config.trMedallion];
    }, 'tr-entry'));
    m.nodes.push(new DungeonNode(
      '', 46, 37, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 24, 36, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, '', '', [2], 1));
    m.nodes.push(new DungeonNode(
      '', 19, 31, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-hookshotcave', '', [2]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-east', 'Dark World East Death Mountain');
    m.nodes.push(new DungeonNode(
      '', 83, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-superbunny'));
    m.nodes.push(new DungeonNode(
      '', 75, 40, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-spikecave', 'Spike Cave', true);
    m.nodes.push(new DungeonNode(
      '', 74, 91, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-superbunny'));
    m.nodes.push(new DungeonNode(
      'Spike Cave Chest', 20, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.moonPearl && items.glove && items.hammer && (config.canGlitch 
          || (items.byrna || (items.cape && items.hasMagicExtension(config))));
    }, l[103]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-superbunny', 'Superbunny Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-trportal'));
    m.nodes.push(new DungeonNode(
      'Superbunny Chest 1', 90, 30, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[97]));
    m.nodes.push(new DungeonNode(
      'Superbunny Chest 2', 90, 37, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[98]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hookshotcave', 'Hookshot Cave', true);
    m.nodes.push(new DungeonNode(
      '', 62, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-trportal'));
    m.nodes.push(new DungeonNode(
      '', 37, 47, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'dw-trportal', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Bottom Chest', 46, 89, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.boots || items.hookshot;
    }, l[102]));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 1', 52, 63, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot || (config.canGlitch && items.boots);
    }, l[100]));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 2', 41, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot || (config.canGlitch && items.boots);
    }, l[101]));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 3', 43, 79, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot || (config.canGlitch && items.boots);
    }, l[99]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-tr-ledge', 'Turtle Rock Outside Corridor');
    m.nodes.push(new DungeonNode(
      '', 37, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-double-pokey'));
    m.nodes.push(new DungeonNode(
      '', 75, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'tr-bc'));
    m.nodes.push(new DungeonNode(
      '', 74, 58, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return true;
    }, ''));
    dwData.dungeonMaps.push(m);

    dwData.startingMap = m;

    return dwData;
  }
}
