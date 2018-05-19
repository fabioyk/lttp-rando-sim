import { DungeonData } from "../dungeon-data";
import { Config } from "../config";
import { Items } from "../items";
import { DungeonMapData } from "../dungeon-map-data";
import { DungeonNode } from "../dungeon-node";
import { DungeonNodeStatus } from "../dungeon-node-status.enum";

export class LightWorldMap {
  static setup (l:string[], config:Config):DungeonData {
    var lwData = new DungeonData('Light World', '',
      function(items:Items, config:Config) {
        return true;
      }, 0, 0
    );

    var entry = new DungeonMapData('lw-sq', 'Select where to start from', true);
    entry.nodes.push(new DungeonNode(
      'Link\'s House', 50, 35, DungeonNodeStatus.SQ_OPTION,
    DungeonNode.noReqs, 'lw-linkshouse'));
    entry.nodes.push(new DungeonNode(
      'Sanctuary', 50, 51, DungeonNodeStatus.SQ_OPTION,
    DungeonNode.noReqs, 'hc-sanctuary'));
    entry.nodes.push(new DungeonNode(
      'Mountain Cave', 50, 66, DungeonNodeStatus.SQ_OPTION,
    function(items:Items, config:Config) {
        return items.oldManRescued;
    }, 'lw-flute1')); 
    lwData.dungeonMaps.push(entry);

    var m = new DungeonMapData('lw-linkshouse', 'Link\'s House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      'Link\'s House Chest', 78, 72, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[5]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute-map', 'Select your Destination', true);
    m.nodes.push(new DungeonNode(
      '', 43, 25, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 72, 34, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      '', 20, 43, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 53, 58, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 87, 59, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 6, 81, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-desert', '', [-1], 3));
    m.nodes.push(new DungeonNode(
      '', 47, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 89, 80, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute8'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute4', 'Front of Link\'s House');
    m.nodes.push(new DungeonNode(
      '', 69, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-linkshouse'));
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4; 
    }, 'lw-octorok-field', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 72, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4; 
    }, 'lw-south-house-portal', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 16, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4; 
    }, 'lw-south-grove', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 76, 27, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hyrule-castle'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-octorok-field', 'Octorok Field');
    m.nodes.push(new DungeonNode(
      '', 6, 89, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 6, 15, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-hyrule-castle', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 19, 4, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 25, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-small-shop'));
    m.nodes.push(new DungeonNode(
      '', 63, 54, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 89, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-south-house-portal', 'South of Link\'s House');
    m.nodes.push(new DungeonNode(
      '', 32, 33, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.hammer && items.glove;
    }, 'dw-south-house-portal', '', [0], 1));
    m.nodes.push(new DungeonNode(
      '', 72, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 84, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-minimoldorm-entrance', ''));
    m.nodes.push(new DungeonNode(
      '', 35, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 10, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-south-grove', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 36, 54, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-east-sanctuary', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return true;
    }));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-south-grove', 'South of Grove');
    m.nodes.push(new DungeonNode(
      '', 87, 21, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 95, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-south-house-portal', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 86, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-flute7', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 31, 21, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-grove'));
    m.nodes.push(new DungeonNode(
      '', 10, 21, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 8, 56, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-grove-cave', '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hyrule-castle', 'Hyrule Castle'); 
    // 1: top of castle, 2: front of castle when locked in
    m.nodes.push(new DungeonNode(
      '', 82, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4 || items.currentRegionInMap !== 2; 
    }, 'lw-flute4', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 94, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove && items.gameState === 4;
    }, 'lw-octorok-field', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 6, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4; 
    }, 'lw-sanctuary-entrance', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 50, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4 || items.currentRegionInMap === 2; 
    }, 'hc-entry', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 88, 16, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
      return items.gameState === 4 || items.currentRegionInMap !== 2; 
    }, 'lw-uncle', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 70, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState === 4 || items.currentRegionInMap === 2; 
    }, 'lw-uncle', 'Zelda must be rescued first'));
    m.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword >= 2 || items.cape;
    }, 'ct-entry', 'Master Sword or Cape Required', [1]));
    m.nodes.push(new DungeonNode(
      '', 29, 5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'hc-left', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 50, 61, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.agahnim;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-east-sanctuary', 'Zora\'s River Bridge');
    m.nodes.push(new DungeonNode(
      '', 51, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 30, 38, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 70, 38, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      '', 52, 14, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-south-house-portal', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return true;
    }));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-small-shop', 'Northwest of Lake Hylea'); 
    // 3: mirror on top of island, 2 swimmin
    m.nodes.push(new DungeonNode(
      '', 45, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.flippers || items.currentRegionInMap !== 3; 
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 91, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers || (items.currentRegionInMap !== 3 && items.currentRegionInMap !== 0);
    }, 'lw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      'Lake Hylea Island', 79, 60, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 3;
    }, l[46]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-eastern-palace', 'Eastern Palace Courtyard');
    m.nodes.push(new DungeonNode(
      '', 13, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 87, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 83.5, 8, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'ep-entry'));
    m.nodes.push(new DungeonNode(
      '', 24, 31, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-saha'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lake-hylea', 'Lake Hylea');
    m.nodes.push(new DungeonNode(
      '', 87, 16, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 38, 55, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-small-shop', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      '', 68, 48, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, '', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 64, 67, DungeonNodeStatus.WATER_WARP,
    DungeonNode.noReqs, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      '', 94, 80, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      '', 82, 4, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hobo-entrance'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-minimoldorm-entrance', 'Minimoldorm Cave Entrance');
    m.nodes.push(new DungeonNode(
      '', 22, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 5, 54, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 94, 68, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      '', 61, 51, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-minimoldorm'));
    m.nodes.push(new DungeonNode(
      '', 86, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute7', 'Dam Entrance');
    m.nodes.push(new DungeonNode(
      '', 6, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-desert'));
    m.nodes.push(new DungeonNode(
      '', 90, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-dam'));
    m.nodes.push(new DungeonNode(
      '', 81, 34, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 93, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      'Deliver Purple Chest', 48, 36, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasPurpleChest;
    }, l[114], 'Requires Purple Chest with you'));
    m.nodes.push(new DungeonNode(
      'Sunken Chest', 81, 53, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[47], ''));
    m.nodes.push(new DungeonNode(
      'Bombos Tablet', 11, 45, DungeonNodeStatus.BOOK_CHECKABLE_ITEM,
    function(items:Items, config:Config) {
        return items.sword >= 2;
    }, l[33], '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-grove', 'Haunted Grove');
    m.nodes.push(new DungeonNode(
      '', 46, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-grove'));
    m.nodes.push(new DungeonNode(
      'Shovel Item', 29, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.shovel;
    }, l[49], 'Shovel Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-race-game', 'Race Game');
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 62, 38, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-library'));
    m.nodes.push(new DungeonNode(
      '', 86, 28, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Race Game Prize', 11, 55, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[44]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-sanctuary-entrance', 'Front of Sanctuary');
    m.nodes.push(new DungeonNode(
      '', 94, 63, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 84.5, 32, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'hc-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 29, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 29, 72, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      '', 6, 64, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 23, 50, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
      return items.flippers;
    }, 'lw-flute8', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 56, 42, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.boots;
    }, 'lw-bonkrocks', 'Boots Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-uncle', 'Hyrule Castle Secret Passage', true);
    m.nodes.push(new DungeonNode(
      '', 25, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.gameState >= 1;
    }, 'lw-hyrule-castle', 'Talk to Uncle First', [-1], 2));
    m.nodes.push(new DungeonNode(
      'Link\'s Uncle', 50, 22, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[1]));
    m.nodes.push(new DungeonNode(
      'Secret Passage Chest', 76.5, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.gameState >= 1;
    }, l[2], 'Talk to Uncle First'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-graveyard', 'Graveyard');
    // 1: gy ledge, 2: warp to kings tomb
    m.nodes.push(new DungeonNode(
      '', 5, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 94, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 15.5, 34.5, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'hc-bombablewall'));
    m.nodes.push(new DungeonNode(
      '', 56, 20, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-gy-ledge', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 81, 37.5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.boots && (items.glove === 2 || items.currentRegionInMap === 2);
    }, 'lw-kingstomb', 'Boots and Titan Mitts Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute2', 'Potion Witch');
    m.nodes.push(new DungeonNode(
      '', 6, 75, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 94, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-zora-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 40, 67, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-potion-shop'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute5', 'Eastern Portal');
    m.nodes.push(new DungeonNode(
      '', 75, 5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 80, 73, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.hammer && items.glove;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-saha', 'Sahasrahla\'s Hut', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Left Chest', 43, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[9]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Middle Chest', 49.5, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[10]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Right Chest', 56, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[11]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala', 48, 73, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.pendantCourage;
    }, l[29], 'Green Pendant Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-zora-entrance', 'Zora Entrance');
    m.nodes.push(new DungeonNode(
      '', 76, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-flute2', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 20, 8, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-waterfall', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return items.moonPearl || items.boots;
    }));
    m.nodes.push(new DungeonNode(
      '', 26, 61, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return true;
    }));
    m.nodes.push(new DungeonNode(
      '', 65, 5, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-zora-domain'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute8', 'Ice Cave Entrance');
    m.nodes.push(new DungeonNode(
      '', 6, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      '', 58, 8, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-icerod'));
    m.nodes.push(new DungeonNode(
      '', 34, 74, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required', [-1], 0, 
    DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 61, 69, DungeonNodeStatus.WATER_WARP,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-sanctuary-entrance', 'Flippers Required', [-1], 0, 
    DungeonNode.noReqs));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hobo-entrance', 'Hobo Entrance');
    m.nodes.push(new DungeonNode(
      '', 34, 54, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hobo'));
    m.nodes.push(new DungeonNode(
      '', 82, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lake-hylea'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-minimoldorm', 'Mini Moldorm Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 92, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Far Left Chest', 35, 16, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[23]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Left Chest', 42, 14, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[24]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Right Chest', 57, 14, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[25]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Far Right Chest', 64, 16, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[26]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave NPC', 49.5, 15, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[40]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-desert', 'Desert Area');
    // 1: checkerboard, 2: desert left side, 3: fluted into it
    m.nodes.push(new DungeonNode(
      '', 16, 92, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, '', '', [3]));
    m.nodes.push(new DungeonNode(
      '', 94, 90, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 80, 30, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-aginah'));
    m.nodes.push(new DungeonNode(
      '', 29.5, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.book;
    }, 'dp-entry', 'Book Required'));
    m.nodes.push(new DungeonNode(
      '', 9, 65, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 2;
    }, l[45]));
    m.nodes.push(new DungeonNode(
      '', 70, 11, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-checkerboard', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 14, 18, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'dp-entry', '', [2]));
    m.nodes.push(new DungeonNode(
      '', 30, 7, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dp-first-tile', '', [2]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-dam', 'Dam', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      'Dam Chest', 50, 73, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[4]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-library', 'Library', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      'Library Item', 22, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[41], 'Requires Boots'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-kakariko', 'Kakariko');
    m.nodes.push(new DungeonNode(
      '', 13, 3, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 33, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, 'lw-kak-portal'));
    m.nodes.push(new DungeonNode(
      '', 78, 3, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 94, 81, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      '', 87, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 10, 20, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'lw-well'));
    m.nodes.push(new DungeonNode(
      '', 51.5, 18, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-blindshut'));
    m.nodes.push(new DungeonNode(
      '', 39, 66, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-chicken'));
    m.nodes.push(new DungeonNode(
      '', 64, 77, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-bar'));
    m.nodes.push(new DungeonNode(
      '', 62.5, 64, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-sickkid'));
    m.nodes.push(new DungeonNode(
      'Bottle Vendor', 38, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[28]));
    m.nodes.push(new DungeonNode(
      'Activate Flute', 50.5, 40, DungeonNodeStatus.DUCK,
    function(items:Items, config:Config) {
        return items.flute;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lumberjack', 'Lumberjack Tree');
    m.nodes.push(new DungeonNode(
      '', 67, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.glove && items.lamp;
    }, 'lw-flute1', '', [-1], 0, 
    function(items:Items, config:Config) {
      return items.glove;
    }));
    m.nodes.push(new DungeonNode(
      '', 29, 19, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 54, 96, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 58, 13, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lumberjack-item'));
    m.nodes.push(new DungeonNode(
      '', 45, 30, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.agahnim && items.boots;
    }, 'lw-lumberjack-item', '', [-1], 1));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-fortune-teller', 'Fortune Teller');
    m.nodes.push(new DungeonNode(
      '', 56, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 93, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 78, 7, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lostwoods'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bonkrocks', 'Cave below Bonk Rocks', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      'Bonk Rocks', 50, 34, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[22]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-kingstomb', 'King\'s Tomb', true);
    m.nodes.push(new DungeonNode(
      '', 50, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-graveyard', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      'King\'s Tomb Chest', 50, 18, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[3]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-potion-shop', 'Potion Shop', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      'Potion Shop Item', 59, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.mushroom;
    }, l[43]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-waterfall', 'Waterfall Fairy Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      'Waterfall Fairy Left Chest', 43, 57, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[50]));
    m.nodes.push(new DungeonNode(
      'Waterfall Fairy Right Chest', 57, 57, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[51]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-zora-domain', 'Zora\'s Domain', true);
    m.nodes.push(new DungeonNode(
      '', 15, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      'King Zora', 93, 7, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[34]));
    m.nodes.push(new DungeonNode(
      'Zora River Ledge', 43, 60, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.flippers;
    }, l[48], 'Flippers Required', [-1], 0, 
    function(items:Items, config:Config) {
      return items.boots;
    }));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-icerod', 'Ice Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      'Ice Rod Chest', 45, 16, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[27]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hobo', 'Hobo Under the Bridge', true);
    m.nodes.push(new DungeonNode(
      '', 92, 64, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hobo-entrance'));
    m.nodes.push(new DungeonNode(
      'Hobo', 40, 25, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[32]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-aginah', 'Aginah\'s Cave', true);
    m.nodes.push(new DungeonNode(
      '', 25, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-desert'));
    m.nodes.push(new DungeonNode(
      'Aginah', 70, 70, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[8]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-well', 'Kakariko Well', true);
    m.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 1', 24, 76, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[12]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 2', 32, 62, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[13]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 3', 38.5, 62, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[14]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 4', 45, 62, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[15]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 5', 25, 15, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[16]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blindshut', 'Blind\'s Hut', true);
    m.nodes.push(new DungeonNode(
      '', 41, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 1', 45, 80, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[17]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 2', 39, 86, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[18]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 3', 61, 86, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[19]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 4', 55, 80, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[20]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 5', 50, 14, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[21]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bar', 'Kakariko Tavern', true);
    m.nodes.push(new DungeonNode(
      '', 50, 10, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Tavern Chest', 36, 28, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[6]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-chicken', 'Chicken House', true);
    m.nodes.push(new DungeonNode(
      '', 25, 68, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Chicken House Chest', 75, 44, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[7]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-south-grove-cave', 'Cave South of Grove', true);
    m.nodes.push(new DungeonNode(
      '', 50, 78, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-south-grove', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'South Grove Chest', 32, 40, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[37]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-sickkid', 'Sick Kid\'s House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Sick Kid', 22, 55, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.bottle;
    }, l[31]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blacksmiths-entrance', 'Blacksmiths Entrance');
    // 1: mirrored after the hammer peg
    m.nodes.push(new DungeonNode(
      '', 5, 62, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 59, 50, DungeonNodeStatus.HOLE,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'lw-bat'));
    m.nodes.push(new DungeonNode(
      '', 44, 26, DungeonNodeStatus.OPEN_DOOR,
      function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 0;
    }, 'lw-blacksmiths'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bat', 'Magic Bat Cave', true);
    m.nodes.push(new DungeonNode(
      '', 25, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      'Magic Bat', 75, 24, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.powder;
    }, l[30], 'Magic Powder Required', [-1], 0,
    function(items:Items, config:Config) {
      return items.somaria && items.mushroom;
    }));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blacksmiths', 'Blacksmiths', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      'Blacksmiths Item', 50, 47, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasBlacksmiths;
    }, l[113]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-kak-portal', 'Kakariko Dark World Portal');
    m.nodes.push(new DungeonNode(
      '', 65, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2 || items.currentRegionInMap === 0;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 73, 70, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 75, 7, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'lw-lostwoods'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lostwoods', 'Lost Woods');
    m.nodes.push(new DungeonNode(
      '', 11, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 38, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'lw-kak-portal', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 88, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 92, 14, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 16, 20, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-pedestal'));
    m.nodes.push(new DungeonNode(
      '', 75, 52, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'lw-thief-hideout'));
    m.nodes.push(new DungeonNode(
      'Mushroom Item', 47, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[42]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lumberjack-item', 'Lumberjack Cave', true);
    m.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      'Lumberjack Item', 60, 50, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1;
    }, l[36]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-thief-hideout', 'Lost Woods Hideout', true);
    m.nodes.push(new DungeonNode(
      '', 25, 90, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      'Lost Woods Hideout Chest', 73, 41, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[35]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-pedestal', 'Master Sword Pedestal', true);
    m.nodes.push(new DungeonNode(
      '', 51, 94, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      'Pedestal', 48.5, 29, DungeonNodeStatus.PEDESTAL,
    function(items:Items, config:Config) {
        return items.pendantCourage && items.pendantPower && items.pendantWisdom;
    }, l[0]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-checkerboard', 'Checkerboard Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 85, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-desert', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'Checkerboard Item', 78, 27, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[39]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-gy-ledge', 'Graveyard Ledge Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-graveyard', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'Graveyard Ledge Chest', 51, 29, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    DungeonNode.noReqs, l[38]));
    lwData.dungeonMaps.push(m);

    // Death Mountain

    m = new DungeonMapData('lw-flute1', 'Death Mountain Entrance');
    m.nodes.push(new DungeonNode(
      '', 10, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 94, 57, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'lw-east'));
    m.nodes.push(new DungeonNode(
      'Old Man', 29, 68, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.lamp;
    }, l[74], 'Lamp Required', [-1], 0, 
    DungeonNode.noReqs));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spectacle-rock', 'Spectacle Rock');
    m.nodes.push(new DungeonNode(
      '', 11, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 78, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 45, 41, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-spectacle-cave'));
    m.nodes.push(new DungeonNode(
      '', 45, 58, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-spectacle-cave', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 75, 36, DungeonNodeStatus.PORTAL,
    DungeonNode.noReqs, ''));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Item', 53, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, l[77]));
    m.nodes.push(new DungeonNode(
      '', 45, 29, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-hera', '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spectacle-cave', 'Spectacle Rock Cave', true);
    m.nodes.push(new DungeonNode(
      '', 25, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0;
    }, 'lw-spectacle-rock', '', [-1], 0,
    DungeonNode.noReqs));
    m.nodes.push(new DungeonNode(
      '', 28, 53, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Cave Item', 35, 36, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, l[75]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hera', 'Tower of Hera Entrance');
    m.nodes.push(new DungeonNode(
      '', 74, 38, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'toh-entry'));
    m.nodes.push(new DungeonNode(
      '', 94, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'lw-trportal'));
    m.nodes.push(new DungeonNode(
      '', 75, 53, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      'Ether Tablet', 18, 31, DungeonNodeStatus.BOOK_CHECKABLE_ITEM,
    function(items:Items, config:Config) {
      return items.sword >= 2;
    }, l[76]));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Item', 53, 60, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return false;
    }, l[77]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-trportal', 'Turtle Rock Portal');
    m.nodes.push(new DungeonNode(
      '', 6, 47, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'lw-hera'));
    m.nodes.push(new DungeonNode(
      '', 19, 61, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-spiral'));
    m.nodes.push(new DungeonNode(
      '', 43, 70, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east'));
    m.nodes.push(new DungeonNode(
      '', 43, 50, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 76, 48, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove === 2 && items.hammer && items.moonPearl;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Floating Island', 23, 30, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, l[87]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-east', 'East Death Mountain');
    m.nodes.push(new DungeonNode(
      '', 13, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'lw-flute1', 'Hookshot Required'));
    m.nodes.push(new DungeonNode(
      '', 90, 27, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-paradox2', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 93, 65, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 44, 71, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove === 2;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spiral', 'Spiral Cave', true);
    m.nodes.push(new DungeonNode(
      'Spiral Cave Chest', 70, 38, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[78]));
    m.nodes.push(new DungeonNode(
      '', 74, 88, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-paradox2', 'Paradox Cave 2 Chests', true);
    // 1: from dm east, 0: from paradox 5
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Left Chest', 72, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.mirror;
    }, l[85]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Right Chest', 78, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.mirror;
    }, l[86]));
    m.nodes.push(new DungeonNode(
      '', 75, 93, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east'));
    m.nodes.push(new DungeonNode(
      '', 87, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 0 || items.mirror;
    }, 'lw-paradox5', '', [-1], 1));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-paradox5', 'Paradox Cave 5 Chests', true);
    // 0: from dm east, 1: from paradox 2
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 1', 61, 13, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[80], '', [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 2', 70, 13, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[81], '', [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 3', 73, 19, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[82], '', [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 4', 79, 13, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[83], '', [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 5', 88, 13, DungeonNodeStatus.CLOSED_CHEST,
    DungeonNode.noReqs, l[84], '', [1]));
    m.nodes.push(new DungeonNode(
      '', 67, 70, DungeonNodeStatus.HOLE,
    DungeonNode.noReqs, 'lw-paradox2', '', [-1]));
    m.nodes.push(new DungeonNode(
      '', 87, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-paradox2', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 50, 92, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-east', '', config.canGlitch ? [-1] : [0]));
    m.nodes.push(new DungeonNode(
      '', 25, 60, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-trportal', '', config.canGlitch ? [-1] : [0]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-tr-ledge', 'Mimic Cave Entrance');
    m.nodes.push(new DungeonNode(
      '', 75, 48, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-mimic'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-mimic', 'Mimic Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 95, DungeonNodeStatus.OPEN_DOOR,
    DungeonNode.noReqs, 'lw-tr-ledge'));
    m.nodes.push(new DungeonNode(
      'Mimic Cave Chest', 50, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hammer;
    }, l[79], 'Hammer Required'));
    lwData.dungeonMaps.push(m);

    lwData.startingMap = entry;

    return lwData;
  }
}
