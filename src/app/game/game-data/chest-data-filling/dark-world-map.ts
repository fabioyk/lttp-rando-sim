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
      '', 69, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-bomb-shop'));
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 72, 71, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 16, 71, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 84, 50, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-octorok-field', 'Hammer Pegs Bridge');
    // 0 below, 1 top
    m.nodes.push(new DungeonNode(
      '', 6, 89, DungeonNodeStatus.OPEN_DOOR,
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
    }, 'dw-small-shop', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 63, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'dw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 89, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers && (items.hammer || items.currentRegionInMap === 1);
    }, 'dw-lake-hylea', 'Flippers Required', [-1], 0, 
      function(items:Items, config:Config) { return items.canAncillaFF() && (items.hammer || items.currentRegionInMap === 1); }));
    m.nodes.push(new DungeonNode(
      'Mirror', 17, 90, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, '', 'No Hammer', [-1], 0));
    m.nodes.push(new DungeonNode(
      'Mirror', 26, 49, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, '', 'No Hammer', [-1], 0));
    m.nodes.push(new DungeonNode(
      '', 40, 72, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers && (items.hammer || items.currentRegionInMap === 1);
    }, 'dw-hobo-entrance', 'Flippers Required', [-1], 1, 
      function(items:Items, config:Config) { return items.canAncillaFF() && (items.hammer || items.currentRegionInMap === 1); }));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hobo-entrance', 'Hobo Portal');
    m.nodes.push(new DungeonNode(
      '', 43, 55, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      '', 40, 45, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 82, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-lake-hylea'));
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
      return items.moonPearl;
    }, 'dw-minimoldorm-entrance'));
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
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-south-grove', 'South of Grove');
    m.nodes.push(new DungeonNode(
      '', 87, 21, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-flute4'));
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
    DungeonNode.noReqs, 'dw-grove'));
    m.nodes.push(new DungeonNode(
      '', 10, 21, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 13, 66, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 1, null, [1]));
    m.nodes.push(new DungeonNode(
      '', 23, 42, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hyrule-castle', 'Pyramid');
    m.nodes.push(new DungeonNode(
      '', 94, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.moonPearl
    }, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 49, 12, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.agahnim2 || config.goal === 'fast_ganon';
    }, 'dw-ganon'));
    m.nodes.push(new DungeonNode(
      'Ganon\'s Vulnerability', 36.75, 21, DungeonNodeStatus.SIGNPOST,
    function(items:Items, config:Config) {
      return items.moonPearl;
    }, 'ganon-requirement'));
    m.nodes.push(new DungeonNode(
      '', 37, 44, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hasBigBomb;
    }, 'dw-fat-fairy'));
    m.nodes.push(new DungeonNode(
      'Pyramid Item', 81, 28, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[105]));
    m.nodes.push(new DungeonNode(
      '', 59, 13, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 1, null, [1]));
    m.nodes.push(new DungeonNode(
      '', 50, 46, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-east-sanctuary', 'Broken Bridge');
    // 0: east, 1: west
    m.nodes.push(new DungeonNode(
      '', 51, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 0 || items.flippers;
    }, 'dw-octorok-field', '', [-1], 1, 
    DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 30, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1 
          || (items.hookshot && (items.flippers || items.glove || items.hammer));
    }, 'dw-graveyard', '', [-1], 1,function(items:Items, config:Config) { return items.hookshot && items.canAncillaFF(); }));
    m.nodes.push(new DungeonNode(
      '', 70, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return (items.currentRegionInMap === 0 && (items.flippers || items.glove || items.hammer)) || items.flippers;
    }, 'dw-flute2', '', [-1], 0, 
    function(items:Items, config:Config) {
      return (items.currentRegionInMap === 0 && items.canAncillaFF()) || items.currentRegionInMap === 1;
    }));
    m.nodes.push(new DungeonNode(
      '', 52, 14, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-flute8', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return (items.currentRegionInMap === 0 && (items.flippers || items.glove || items.hammer || items.canAncillaFF())) || (items.currentRegionInMap === 1);
    }));
    m.nodes.push(new DungeonNode(
      'Mirror Right Side', 65, 74, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 0 || items.flippers;
    }, '', '', [-1], 0, 
    DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      'Mirror Left Side', 39, 48, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1 
        || (items.hookshot && (items.flippers || items.glove || items.hammer));
    }, '', '', [-1], 1, function(items:Items, config:Config) { return items.hookshot && items.canAncillaFF(); }));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-small-shop', 'Northwest of Ice Lake');
    // 1: from land, 0: from water
    m.nodes.push(new DungeonNode(
      '', 45, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, 'dw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 91, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-lake-hylea', 'Flippers Required', [-1], 0,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.canAncillaFF();
    }));
    m.nodes.push(new DungeonNode(
      'Mirror Top Side', 29, 25, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, '', '', [-1], 0));
    m.nodes.push(new DungeonNode(
      'Island Mirror Portal', 78, 73, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.flippers || items.currentRegionInMap === 0;
    }, '', 'Flippers Required to Mirror Back', [-1], 3, 
    function(items:Items, config:Config) { return items.canAncillaFF(); }, [3], 0));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-eastern-palace', 'Palace of Darkness Courtyard');
    m.nodes.push(new DungeonNode(
      '', 13, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-octorok-field', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 87, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 83.5, 8, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'pod-entry'));
    m.nodes.push(new DungeonNode(
      '', 59, 25, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lake-hylea', 'Ice Lake');
    // 0: normal, 1: IP entrance
    m.nodes.push(new DungeonNode(
      '', 87, 16, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.flippers      
      }, 'dw-octorok-field', '', [0], 1, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 38, 55, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.flippers      
      }, 'dw-small-shop', '', [0], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 94, 80, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.flippers      
      }, 'dw-flute8', '', [0], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 68, 44, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.flippers      
      }, 'ip-entry', '', [1], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 61, 50, DungeonNodeStatus.MIRROR,
      DungeonNode.noReqs, '', '', [1], 0, null, [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 44, 74, DungeonNodeStatus.MIRROR,
      function(items:Items, config:Config) {
        return items.flippers      
      }, '', '', [0], -1, function(items:Items, config:Config) { return items.canAncillaFF(); }));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-minimoldorm-entrance', 'Southwest Ice Lake Shore');
    m.nodes.push(new DungeonNode(
      '', 22, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 5, 54, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 86, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'dw-lake-hylea', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) { return items.canAncillaFF(); }));
    m.nodes.push(new DungeonNode(
      '', 32, 62, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute7', 'Swamp Palace Entrance');
    m.nodes.push(new DungeonNode(
      '', 90, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'sp-entry'));
    m.nodes.push(new DungeonNode(
      '', 81, 34, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 93, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      '', 65, 52, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      '', 24, 50, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 1, null, [1]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-grove', 'Haunted Grove');
    m.nodes.push(new DungeonNode(
      '', 46, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-grove'));
    m.nodes.push(new DungeonNode(
      'Ol\' Stumpy', 47, 44, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[119]));
    m.nodes.push(new DungeonNode(
      '', 28, 52, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-race-game', 'Digging Game');
    // 0 bottom, 1 top
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-south-grove'));
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
      'Digging Game Prize', 28, 44, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[121]));
    m.nodes.push(new DungeonNode(
      '', 68, 68, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      '', 75, 33, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.glove === 2 || items.currentRegionInMap === 1;
    }, '', 'Mitts Required'));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-sanctuary-entrance', 'Front of Sanctuary');
    m.nodes.push(new DungeonNode(
      '', 94, 63, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-graveyard', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 29, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 6, 64, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 50, 62, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-graveyard', 'Ghostly Garden');
    m.nodes.push(new DungeonNode(
      '', 5, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 94, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-east-sanctuary', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 47, 78, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 0, null, [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 60, 28, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 3, null, [3], 1));
    m.nodes.push(new DungeonNode(
      '', 85, 29, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.currentRegionInMap === 2 || items.glove === 2;
    }, '', '', [-1], 2, null, [2], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute2', 'Potion Shop');
    m.nodes.push(new DungeonNode(
      '', 6, 75, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-east-sanctuary', '', [-1], 0));
    m.nodes.push(new DungeonNode(
      '', 94, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-zora-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 41, 81, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute5', 'Palace of Darkness Portal');
    m.nodes.push(new DungeonNode(
      '', 75, 5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 50, 63, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-zora-entrance', 'Lake of Ill Omen');
    m.nodes.push(new DungeonNode(
      '', 76, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dw-flute2', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      'Catfish', 15, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[104]));
    m.nodes.push(new DungeonNode(
      '', 47, 54, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-flute8', 'East of Ice Lake');
    m.nodes.push(new DungeonNode(
      '', 34, 74, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.flippers;
      }, 'dw-lake-hylea', '', [-1], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 57, 78, DungeonNodeStatus.WATER_WARP,
      function(items:Items, config:Config) {
        return items.flippers;
      }, 'dw-east-sanctuary', '', [-1], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 80, 55, DungeonNodeStatus.MIRROR,
      function(items:Items, config:Config) {
        return items.flippers;
      }, '', '', [-1], 0, DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 60, 14, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.glove;
      }, 'dw-hint-cave'));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-desert', 'Misery Mire Area');
    m.nodes.push(new DungeonNode(
      '', 15.5, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-mire-shed', '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.mirror;
    }));
    m.nodes.push(new DungeonNode(
      '', 30, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl && items[config.mmMedallion] && (items.sword || config.weapons === 'swordless')
          && (items.boots || items.hookshot);
    }, 'mm-entry'));
    m.nodes.push(new DungeonNode(
      '', 10, 30, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 2, null, [2]));
    m.nodes.push(new DungeonNode(
      '', 61, 10, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 1, null, [1]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-kakariko', 'Village of Outcasts');
    m.nodes.push(new DungeonNode(
      '', 33, 3, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-kak-portal'));
    m.nodes.push(new DungeonNode(
      '', 78, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 94, 81, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, 'dw-blacksmiths-entrance', 'Titan Mitts Required', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 87, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-race-game', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 44, 84, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-bombable-hut'));
    m.nodes.push(new DungeonNode(
      '', 83, 43, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-chouse'));
    m.nodes.push(new DungeonNode(
      '', 20.5, 37, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-chest-game'));
    m.nodes.push(new DungeonNode(
      '', 50, 44.5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'tt-entry'));
    m.nodes.push(new DungeonNode(
      '', 33, 47, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lumberjack', 'Bumper Cave Entrance');
    m.nodes.push(new DungeonNode(
      'Bumper Cave Item', 63, 62, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.cape && items.glove;
    }, l[112]));
    m.nodes.push(new DungeonNode(
      '', 52, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 39, 57, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-fortune-teller', 'Fortune Teller');
    m.nodes.push(new DungeonNode(
      '', 56, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 93, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 78, 7, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 74, 61, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-blacksmiths-entrance', 'Hammer Pegs');
    m.nodes.push(new DungeonNode(
      '', 5, 62, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 53, 84, DungeonNodeStatus.OPEN_DOOR,
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
    DungeonNode.noReqs, 'Mirror', '', [-1], 0, null, [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 63, 34, DungeonNodeStatus.MIRROR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.hammer;
    }, 'Magic Bat Mirror', 'Hammer Required', [-1], 1, null, [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-kak-portal', 'Kakariko Dark World Portal');
    m.nodes.push(new DungeonNode(
      '', 65, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl && items.glove === 2;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 28, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 75, 7, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 63, 72, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 2, null, [2]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-lostwoods', 'Skeleton Forest');
    m.nodes.push(new DungeonNode(
      '', 63, 70, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'sw-left-drop', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 78, 67, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'sw-right-drop', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 76, 52, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'sw-northeast-bc', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 73.5, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'sw-bc', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 58, 58, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'sw-part21', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 38, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kak-portal', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 88, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-fortune-teller', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 23, 52, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'sw-part22', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 16, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.fireRod;
    }, 'sw-final', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 62, 81, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [0]));
    m.nodes.push(new DungeonNode(
      '', 13, 36, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [1], 0, null, [-1], 1));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-bombable-hut', 'Bombable Hut', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Bombable Hut Chest', 46, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[108]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-chouse', 'C-Shaped House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'C-House Chest', 59.5, 25, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[109]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-chest-game', 'Chest Game', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Chest Game Prize', 37, 56, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[110]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hammer-pegs', 'Hammer Pegs Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-blacksmiths-entrance', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'Hammer Pegs Item', 50, 45, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[111]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-fat-fairy', 'Pyramid Fairy', true);
    m.nodes.push(new DungeonNode(
      '', 50, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      'Pyramid Fairy Chest 1', 44, 57, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[106]));
    m.nodes.push(new DungeonNode(
      'Pyramid Fairy Chest 1', 56, 57, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[107]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hype-cave', 'Hype Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.moonPearl;
    }, 'dw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 1', 52, 70, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[115]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 2', 51, 32, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[116]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 3', 48, 26, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[117]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 4', 51, 20, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[118]));
    m.nodes.push(new DungeonNode(
      'Hype Cave Chest 5', 48, 14, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[120]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-mire-shed', 'Mire Shed', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-desert'));
    m.nodes.push(new DungeonNode(
      'Mire Shed Chest 1', 46, 26, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[122]));
    m.nodes.push(new DungeonNode(
      'Mire Shed Chest 2', 53, 26, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[123]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-ganon', 'Ganon', true);
    m.nodes.push(new DungeonNode(
      'Triforce Room', 50, 12, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.canDamageGanon(config)
        && (items.sword >= 2 || (config.weapons === 'swordless' && items.hammer && items.hasSilvers() && items.hasBow())) 
        && items.hasFiresource();
    }, 'Ganon', 
    (config.goal === 'pedestal' || config.goal === 'triforce') ? 'Ganon is unbeatable in this goal'
    : (config.goal === 'dungeons' ? 'Fire, MS and All Dungeons Required' :
     (config.weapons !== 'swordless' ? 'Fire and Master Sword Required' : 'Hammer and Silvers Required'))));
    m.nodes.push(new DungeonNode(
      '', 49, 87, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-hyrule-castle'));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-bomb-shop', 'Bomb Shop', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 37, 50, DungeonNodeStatus.BIG_BOMB,
    function(items:Items, config:Config) {
      return items.crystal5 && items.crystal6;
    }, '', 'Crystals 5 and 6 required'));
    dwData.dungeonMaps.push(m);

    // DM

    m = new DungeonMapData('dw-flute1', 'Death Mountain Entrance');
    m.nodes.push(new DungeonNode(
      '', 10, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 33, 46, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-spectacle-rock', 'Spectacle Rock');
    m.nodes.push(new DungeonNode(
      '', 11, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 79, 58, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-spikecave'));
    m.nodes.push(new DungeonNode(
      '', 67, 42, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      '', 37, 34, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [-1], 1, null, [1]));    
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hera', 'Ganons Tower Entrance');
    m.nodes.push(new DungeonNode(
      '', 75, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.canEnterGT(config);
    }, 'gt-entry'));
    m.nodes.push(new DungeonNode(
      'Ganon\'s Tower Accessibility', 67.5, 44.5, DungeonNodeStatus.SIGNPOST,
    function(items:Items, config:Config) {
      return items.moonPearl;
    }, 'gt-requirement'));
    m.nodes.push(new DungeonNode(
      '', 94, 37, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-trportal', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 75, 53, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 60, 44, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-trportal', 'Turtle Rock Entrance');
    // 0: TR portal, 1: land, 2: floating island
    m.nodes.push(new DungeonNode(
      '', 6, 47, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-hera'));
    m.nodes.push(new DungeonNode(
      '', 43, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-east'));
    m.nodes.push(new DungeonNode(
      '', 43, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-superbunny'));
    m.nodes.push(new DungeonNode(
      '', 32, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.moonPearl && items.glove;
    }, 'dw-hookshotcave'));
    m.nodes.push(new DungeonNode(
      '', 76.5, 57, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.moonPearl && items.isTROpened;
    }, 'tr-entry'));
    m.nodes.push(new DungeonNode(
      '', 46, 37, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      '', 25, 38, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, '', '', [2], 1, null, [1], 2));
    m.nodes.push(new DungeonNode(
      '', 19, 31, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-hookshotcave', '', [2]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-east', 'Dark World East Death Mountain');
    m.nodes.push(new DungeonNode(
      '', 83, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.moonPearl;
    }, 'dw-superbunny', '', [-1], 0, 
    DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 75, 40, DungeonNodeStatus.MIRROR,
    DungeonNode.noReqs, ''));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-spikecave', 'Spike Cave', true);
    m.nodes.push(new DungeonNode(
      '', 75, 92, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      'Spike Cave Chest', 21, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.moonPearl && items.glove && items.hammer 
        && (items.byrna || (items.cape && items.hasMagicExtension(config)));
    }, l[103], '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.moonPearl && items.glove && items.hammer;
    }));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-superbunny', 'Superbunny Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 32, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-trportal'));
    m.nodes.push(new DungeonNode(
      'Superbunny Chest 1', 91, 32, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[97]));
    m.nodes.push(new DungeonNode(
      'Superbunny Chest 2', 91, 39, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[98]));
    dwData.dungeonMaps.push(m);

    m = new DungeonMapData('dw-hookshotcave', 'Hookshot Cave', true);
    m.nodes.push(new DungeonNode(
      '', 74, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-trportal'));
    m.nodes.push(new DungeonNode(
      '', 75, 10, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dw-trportal', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Bottom Chest', 42, 80, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return (items.boots && config.advancedItems) || items.hookshot;
    }, l[102], '', [-1], 0,
    function(items:Items, config:Config) {
      return items.boots || items.hookshot;
    }));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 1', 54, 26, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, l[100], '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 2', 32, 42, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, l[101], '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
    m.nodes.push(new DungeonNode(
      'Hookshot Cave Top Chest 3', 35, 58, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, l[99], '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
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

    m = new DungeonMapData('dw-hint-cave', 'South East Dark World');
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dw-flute8'));
    if (config.hintsEnabled) {
      m.nodes.push(new DungeonNode(
        '', 50, 19, DungeonNodeStatus.HINT,
      function(items:Items, config:Config) {
          return true;
      }, '14'));
    }
    dwData.dungeonMaps.push(m);

    dwData.startingMap = m;

    return dwData;
  }
}
