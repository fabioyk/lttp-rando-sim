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
    function(items:Items, config:Config) {
        return true;
    }, 'lw-linkshouse'));
    entry.nodes.push(new DungeonNode(
      'Sanctuary', 50, 51, DungeonNodeStatus.SQ_OPTION,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-sanctuary'));
    entry.nodes.push(new DungeonNode(
      'Mountain Cave', 50, 66, DungeonNodeStatus.SQ_OPTION,
    function(items:Items, config:Config) {
        return items.oldManRescued;
    }, 'lw-flute1')); 
    lwData.dungeonMaps.push(entry);

    var m = new DungeonMapData('lw-linkshouse', 'Link\'s House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      'Link\'s House Chest', 78, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[5]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute-map', 'Select your Destination', true);
    m.nodes.push(new DungeonNode(
      '', 43, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 72, 34, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      '', 20, 43, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 53, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 87, 59, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 6, 81, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-desert', '', [-1], 3));
    m.nodes.push(new DungeonNode(
      '', 47, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 89, 80, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute8'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute4', 'Front of Link\'s House');
    m.nodes.push(new DungeonNode(
      '', 69, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-linkshouse'));
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 72, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 16, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 76, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hyrule-castle'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-octorok-field', 'Octorok Field');
    m.nodes.push(new DungeonNode(
      '', 3, 89, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 3, 15, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-hyrule-castle', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 21, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 27, 97, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-small-shop'));
    m.nodes.push(new DungeonNode(
      '', 63, 53, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-eastern-palace'));
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
      '', 72, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 87, 72, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-minimoldorm-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 38, 72, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 3, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-south-grove', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 36, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-east-sanctuary', 'Flippers Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-south-grove', 'South of Grove');
    m.nodes.push(new DungeonNode(
      '', 87, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 95, 72, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-south-house-portal', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 87, 79, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-flute7', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 31, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-grove'));
    m.nodes.push(new DungeonNode(
      '', 10, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 8, 56, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-grove-cave', '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hyrule-castle', 'Hyrule Castle'); // 1: top of castle
    m.nodes.push(new DungeonNode(
      '', 82, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute4'));
    m.nodes.push(new DungeonNode(
      '', 95, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-octorok-field', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 4, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 50, 25, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-entry'));
    m.nodes.push(new DungeonNode(
      '', 88, 16, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-uncle'));
    m.nodes.push(new DungeonNode(
      '', 70, 21, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-uncle'));
    m.nodes.push(new DungeonNode(
      '', 49, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.sword >= 2 || items.cape;
    }, 'ct-entry', 'Master Sword or Cape Required', [1]));
    m.nodes.push(new DungeonNode(
      '', 29, 5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-left', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 50, 61, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.agahnim;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-east-sanctuary', 'Zora\'s River Bridge');
    m.nodes.push(new DungeonNode(
      '', 43, 97, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 28, 33, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 72, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      '', 52, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-south-house-portal', 'Flippers Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-small-shop', 'Northwest of Lake Hylea'); 
    // 1: mirror on top of island
    m.nodes.push(new DungeonNode(
      '', 46, 2, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 91, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      'Lake Hylea Island', 79, 60, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1;
    }, l[46]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-eastern-palace', 'Eastern Palace Courtyard');
    m.nodes.push(new DungeonNode(
      '', 13, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 87, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute5'));
    m.nodes.push(new DungeonNode(
      '', 83, 6, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'ep-entry'));
    m.nodes.push(new DungeonNode(
      '', 24, 31, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-saha'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lake-hylea', 'Lake Hylea'); // TODO deal with hylean island
    m.nodes.push(new DungeonNode(
      '', 90, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-octorok-field'));
    m.nodes.push(new DungeonNode(
      '', 36, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-small-shop'));
    m.nodes.push(new DungeonNode(
      '', 67, 47, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, '', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 64, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      '', 96, 80, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      '', 82, 4, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hobo-entrance'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-minimoldorm-entrance', 'Minimoldorm Cave Entrance');
    m.nodes.push(new DungeonNode(
      '', 17, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 3, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 96, 68, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      '', 60, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-minimoldorm'));
    m.nodes.push(new DungeonNode(
      '', 91, 46, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute7', 'Dam Entrance');
    m.nodes.push(new DungeonNode(
      '', 6, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-desert'));
    m.nodes.push(new DungeonNode(
      '', 89, 48, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-dam'));
    m.nodes.push(new DungeonNode(
      '', 81, 34, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-house-portal'));
    m.nodes.push(new DungeonNode(
      '', 93, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      'Deliver Purple Chest', 48, 36, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.hasPurpleChest; // TODO this
    }, l[114], 'Requires Purple Chest with you'));
    m.nodes.push(new DungeonNode(
      'Sunken Chest', 81, 53, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[47], 'Requires Dam Flooded'));
    m.nodes.push(new DungeonNode(
      'Bombos Tablet', 10, 45, DungeonNodeStatus.BOOK_CHECKABLE_ITEM,
    function(items:Items, config:Config) {
        return items.sword >= 2;
    }, l[33], '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-grove', 'Haunted Grove');
    m.nodes.push(new DungeonNode(
      '', 46, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-grove'));
    m.nodes.push(new DungeonNode(
      'Shovel Item', 29, 29, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.shovel;
    }, l[49], 'Shovel Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-race-game', 'Race Game');
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-grove'));
    m.nodes.push(new DungeonNode(
      '', 62, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-library'));
    m.nodes.push(new DungeonNode(
      '', 86, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Race Game Prize', 11, 55, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[44]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-sanctuary-entrance', 'Front of Sanctuary');
    m.nodes.push(new DungeonNode(
      '', 95, 63, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-graveyard'));
    m.nodes.push(new DungeonNode(
      '', 83, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'hc-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 30, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 29, 72, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      '', 2, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 23, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-flute8', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 56, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.boots;
    }, 'lw-bonkrocks', 'Boots Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-uncle', 'Hyrule Castle Secret Passage', true);
    m.nodes.push(new DungeonNode(
      '', 24, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hyrule-castle'));
    m.nodes.push(new DungeonNode(
      'Link\'s Uncle', 45, 22, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[1]));
    m.nodes.push(new DungeonNode(
      'Secret Passage Chest', 76, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[2]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-graveyard', 'Graveyard');
    // 1: gy ledge, 2: warp to kings tomb
    m.nodes.push(new DungeonNode(
      '', 5, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 96, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 15, 34, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'hc-bombablewall'));
    m.nodes.push(new DungeonNode(
      '', 56, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-gy-ledge', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 81, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.boots && (items.glove === 2 || items.currentRegionInMap === 2);
    }, 'lw-kingstomb', 'Boots and Titan Mitts Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute2', 'Potion Witch');
    m.nodes.push(new DungeonNode(
      '', 5, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-east-sanctuary'));
    m.nodes.push(new DungeonNode(
      '', 94, 32, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-zora-entrance', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 40, 67, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-potion-shop'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute5', 'Eastern Portal');
    m.nodes.push(new DungeonNode(
      '', 74, 6, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      '', 79, 73, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.hammer && items.glove;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-saha', 'Sahasrahla\'s Hut', true);
    m.nodes.push(new DungeonNode(
      '', 49, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-eastern-palace'));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Left Chest', 43, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[9]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Middle Chest', 49, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[10]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala\'s Hut Right Chest', 56, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[11]));
    m.nodes.push(new DungeonNode(
      'Sahasrahala', 48, 73, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.pendantCourage;
    }, l[29], 'Green Pendant Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-zora-entrance', 'Zora Entrance');
    m.nodes.push(new DungeonNode(
      '', 76, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'lw-flute2', 'Power Glove Required'));
    m.nodes.push(new DungeonNode(
      '', 20, 8, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-waterfall', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 26, 61, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 65, 5, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-zora-domain'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-flute8', 'Ice Cave Entrance');
    m.nodes.push(new DungeonNode(
      '', 5, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      '', 58, 8, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-icerod'));
    m.nodes.push(new DungeonNode(
      '', 34, 74, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-lake-hylea', 'Flippers Required'));
    m.nodes.push(new DungeonNode(
      '', 61, 69, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.flippers;
    }, 'lw-sanctuary-entrance', 'Flippers Required'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hobo-entrance', 'Hobo Entrance');
    m.nodes.push(new DungeonNode(
      '', 34, 54, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hobo'));
    m.nodes.push(new DungeonNode(
      '', 82, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lake-hylea'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-minimoldorm', 'Mini Moldorm Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 90, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-minimoldorm-entrance'));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Far Left Chest', 35, 16, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[23]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Left Chest', 42, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[24]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Right Chest', 57, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[25]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave Far Right Chest', 64, 16, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[26]));
    m.nodes.push(new DungeonNode(
      'Mini Moldorm Cave NPC', 49.5, 15, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[40]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-desert', 'Desert Area');
    // 1: checkerboard, 2: desert left side, 3: fluted into it
    m.nodes.push(new DungeonNode(
      '', 16, 92, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, '', '', [3]));
    m.nodes.push(new DungeonNode(
      '', 95, 90, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      '', 79, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-aginah'));
    m.nodes.push(new DungeonNode(
      '', 29, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.book;
    }, 'dp-entry', 'Book Required'));
    m.nodes.push(new DungeonNode(
      '', 9, 65, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 2;
    }, l[45]));
    m.nodes.push(new DungeonNode(
      '', 70, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-checkerboard', '', [1]));
    m.nodes.push(new DungeonNode(
      '', 14, 17, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'dp-entry', '', [2]));
    m.nodes.push(new DungeonNode(
      '', 29, 6, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove;
    }, 'dp-first-tile', '', [2]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-dam', 'Dam', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute7'));
    m.nodes.push(new DungeonNode(
      'Dam Chest', 50, 73, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[4]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-library', 'Library', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      'Library Item', 22, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.boots;
    }, l[41], 'Requires Boots'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-kakariko', 'Kakariko');
    m.nodes.push(new DungeonNode(
      '', 13, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 33, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.glove === 2;
    }, 'lw-kak-portal'));
    m.nodes.push(new DungeonNode(
      '', 78, 3, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 94, 81, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      '', 87, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-race-game'));
    m.nodes.push(new DungeonNode(
      '', 9, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-well'));m.nodes.push(new DungeonNode(
      '', 51, 18, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-blindshut'));m.nodes.push(new DungeonNode(
      '', 38, 66, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-chicken'));m.nodes.push(new DungeonNode(
      '', 64, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-bar'));m.nodes.push(new DungeonNode(
      '', 62, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sickkid'));
    m.nodes.push(new DungeonNode(
      'Bottle Vendor', 38, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[28]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lumberjack', 'Lumberjack Tree');
    m.nodes.push(new DungeonNode(
      '', 67, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.glove && items.hasLightsource(config);
    }, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 29, 19, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      '', 54, 96, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 58, 10, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lumberjack-item'));
    m.nodes.push(new DungeonNode(
      '', 45, 30, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.agahnim && items.boots;
    }, 'lw-lumberjack-item', '', [-1], 1));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-fortune-teller', 'Fortune Teller');
    m.nodes.push(new DungeonNode(
      '', 56, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 93, 77, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      '', 78, 7, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lostwoods'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bonkrocks', 'Cave below Bonk Rocks', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-sanctuary-entrance'));
    m.nodes.push(new DungeonNode(
      'Bonk Rocks', 50, 34, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[22]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-kingstomb', 'King\'s Tomb', true);
    m.nodes.push(new DungeonNode(
      '', 50, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-graveyard', '', [-1], 2));
    m.nodes.push(new DungeonNode(
      'King\'s Tomb Chest', 50, 18, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[3]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-potion-shop', 'Potion Shop', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute2'));
    m.nodes.push(new DungeonNode(
      'Potion Shop Item', 60, 72, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.mushroom;
    }, l[43]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-waterfall', 'Waterfall Fairy Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      'Waterfall Fairy Left Chest', 41, 57, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[50]));
    m.nodes.push(new DungeonNode(
      'Waterfall Fairy Right Chest', 57, 57, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[51]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-zora-domain', 'Zora\'s Domain', true);
    m.nodes.push(new DungeonNode(
      '', 15, 95, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-zora-entrance'));
    m.nodes.push(new DungeonNode(
      'King Zora', 92, 6, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[34]));
    m.nodes.push(new DungeonNode(
      'Zora River Ledge', 43, 60, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST, // TODO waterwalk
    function(items:Items, config:Config) {
        return items.flippers;
    }, l[48]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-icerod', 'Ice Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-flute8'));
    m.nodes.push(new DungeonNode(
      'Ice Rod Chest', 45, 16, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[27]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hobo', 'Hobo Under the Bridge', true);
    m.nodes.push(new DungeonNode(
      '', 92, 64, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-hobo-entrance'));
    m.nodes.push(new DungeonNode(
      'Hobo', 40, 25, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[32]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-aginah', 'Aginah\'s Cave', true);
    m.nodes.push(new DungeonNode(
      '', 24, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-desert'));
    m.nodes.push(new DungeonNode(
      'Aginah', 70, 70, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[8]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-well', 'Kakariko Well', true);
    m.nodes.push(new DungeonNode(
      '', 74, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 1', 24, 76, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[12]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 2', 32, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[13]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 3', 39, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[14]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 4', 45, 62, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[15]));
    m.nodes.push(new DungeonNode(
      'Kakariko Well Chest 5', 24, 9, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[16]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blindshut', 'Blind\'s Hut', true);
    m.nodes.push(new DungeonNode(
      '', 40, 60, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 1', 45, 80, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[17]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 2', 38, 85, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[18]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 3', 60, 85, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[19]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 4', 54, 79, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[20]));
    m.nodes.push(new DungeonNode(
      'Blind\' Hut Chest 5', 49, 13, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[21]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bar', 'Kakariko Tavern', true);
    m.nodes.push(new DungeonNode(
      '', 50, 9, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Tavern Chest', 35, 27, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[6]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-chicken', 'Chicken House', true);
    m.nodes.push(new DungeonNode(
      '', 25, 68, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Chicken House Chest', 74, 43, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[7]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-south-grove-cave', 'Cave South of Grove', true);
    m.nodes.push(new DungeonNode(
      '', 50, 78, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-south-grove', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'South Grove Chest', 32, 40, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[37]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-sickkid', 'Sick Kid\'s House', true);
    m.nodes.push(new DungeonNode(
      '', 50, 87, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      'Sick Kid', 21, 56, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.bottle;
    }, l[31]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blacksmiths-entrance', 'Blacksmiths Entrance');
    // 1: mirrored after the hammer peg
    m.nodes.push(new DungeonNode(
      '', 5, 62, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 59, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'lw-bat'));
    m.nodes.push(new DungeonNode(
      '', 43, 26, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-blacksmiths'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-bat', 'Magic Bat Cave', true);
    m.nodes.push(new DungeonNode(
      '', 25, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-blacksmiths-entrance'));
    m.nodes.push(new DungeonNode(
      'Magic Bat', 75, 17, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.powder;
    }, l[30]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-blacksmiths', 'Blacksmiths', true);
    m.nodes.push(new DungeonNode(
      '', 50, 86, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-blacksmiths-entrance'));
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
        return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      '', 74, 9, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer || items.currentRegionInMap === 1;
    }, 'lw-lostwoods'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lostwoods', 'Lost Woods');
    m.nodes.push(new DungeonNode(
      '', 11, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-kakariko'));
    m.nodes.push(new DungeonNode(
      '', 37, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return items.hammer;
    }, 'lw-kak-portal', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 88, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-fortune-teller'));
    m.nodes.push(new DungeonNode(
      '', 92, 14, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      '', 16, 20, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-pedestal'));
    m.nodes.push(new DungeonNode(
      '', 75, 52, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-thief-hideout'));
    m.nodes.push(new DungeonNode(
      'Mushroom Item', 47, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[42]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-lumberjack-item', 'Lumberjack Cave', true);
    m.nodes.push(new DungeonNode(
      '', 74, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lumberjack'));
    m.nodes.push(new DungeonNode(
      'Lumberjack Item', 60, 50, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return items.currentRegionInMap === 1;
    }, l[36]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-thief-hideout', 'Lost Woods Hideout', true);
    m.nodes.push(new DungeonNode(
      '', 25, 90, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      'Lost Woods Hideout Chest', 73, 41, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[35]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-pedestal', 'Master Sword Pedestal', true);
    m.nodes.push(new DungeonNode(
      '', 50, 94, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-lostwoods'));
    m.nodes.push(new DungeonNode(
      'Pedestal', 48, 28, DungeonNodeStatus.BOOK_CHECKABLE_ITEM,
    function(items:Items, config:Config) {
        return items.pendantCourage && items.pendantPower && items.pendantWisdom;
    }, l[0]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-checkerboard', 'Checkerboard Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 85, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-desert', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'Checkerboard Item', 78, 27, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[39]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-gy-ledge', 'Graveyard Ledge Cave', true);
    m.nodes.push(new DungeonNode(
      '', 50, 93, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
        return true;
    }, 'lw-graveyard', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      'Graveyard Ledge Chest', 51, 29, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
        return true;
    }, l[38]));
    lwData.dungeonMaps.push(m);

    // Death Mountain

    m = new DungeonMapData('lw-flute1', 'Death Mountain Entrance');
    m.nodes.push(new DungeonNode(
      '', 10, 28, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spectacle-rock'));
    m.nodes.push(new DungeonNode(
      '', 94, 57, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'lw-east'));
    m.nodes.push(new DungeonNode(
      'Old Man', 29, 68, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.hasLightsource(config);
    }, l[74]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spectacle-rock', 'Spectacle Rock');
    m.nodes.push(new DungeonNode(
      '', 10, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 45, 41, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spectacle-cave'));
    m.nodes.push(new DungeonNode(
      '', 45, 58, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spectacle-cave', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 75, 36, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return true;
    }, ''));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Item', 53, 34, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, l[77]));
    m.nodes.push(new DungeonNode(
      '', 45, 29, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-hera', '', [1]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spectacle-cave', 'Spectacle Rock Cave', true);
    m.nodes.push(new DungeonNode(
      '', 62, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spectacle-rock', '', config.canGlitch ? [-1] : [0]));
    m.nodes.push(new DungeonNode(
      '', 64, 51, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      'Spectacle Rock Cave Item', 68, 42, DungeonNodeStatus.VIEWABLE_CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1;
    }, l[75]));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-hera', 'Tower of Hera Entrance');
    m.nodes.push(new DungeonNode(
      '', 74, 38, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'toh-entry'));
    m.nodes.push(new DungeonNode(
      '', 94, 37, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'lw-trportal'));
    m.nodes.push(new DungeonNode(
      '', 75, 53, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spectacle-rock'));
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
      '', 3, 45, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hammer;
    }, 'lw-hera'));
    m.nodes.push(new DungeonNode(
      '', 18, 61, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-spiral'));
    m.nodes.push(new DungeonNode(
      '', 42, 71, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-east'));
    m.nodes.push(new DungeonNode(
      '', 43, 50, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 75, 47, DungeonNodeStatus.PORTAL,
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
      '', 9, 47, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.hookshot;
    }, 'lw-flute1'));
    m.nodes.push(new DungeonNode(
      '', 89, 27, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-paradox2'));
    m.nodes.push(new DungeonNode(
      '', 93, 65, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-paradox5'));
    m.nodes.push(new DungeonNode(
      '', 44, 71, DungeonNodeStatus.PORTAL,
    function(items:Items, config:Config) {
      return items.glove === 2;
    }, ''));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-spiral', 'Spiral Cave', true);
    m.nodes.push(new DungeonNode(
      'Spiral Cave Chest', 70, 38, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[78]));
    m.nodes.push(new DungeonNode(
      '', 74, 88, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-east'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-paradox2', 'Paradox Cave 2 Chests', true);
    // 0: from dm east, 1: from paradox 5
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Left Chest', 71, 13, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, l[85]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Upper - Right Chest', 77, 14, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, l[86]));
    m.nodes.push(new DungeonNode(
      '', 75, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-east'));
    m.nodes.push(new DungeonNode(
      '', 87, 59, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return items.currentRegionInMap === 1 || items.mirror;
    }, 'lw-paradox5'));
    lwData.dungeonMaps.push(m);

    m = new DungeonMapData('lw-paradox5', 'Paradox Cave 5 Chests', true);
    // 0: from dm east, 1: from paradox 2
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 1', 60, 10, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[80], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 2', 70, 10, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[81], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 3', 79, 10, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[82], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 4', 89, 10, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[83], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      'Paradox Cave Lower - Chest 5', 80, 20, DungeonNodeStatus.CLOSED_CHEST,
    function(items:Items, config:Config) {
      return true;
    }, l[84], '', config.canGlitch ? [-1] : [1]));
    m.nodes.push(new DungeonNode(
      '', 67, 70, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-paradox2', '', [-1], 1));
    m.nodes.push(new DungeonNode(
      '', 87, 59, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-paradox2', '', config.canGlitch ? [-1] : [1], 1));
    m.nodes.push(new DungeonNode(
      '', 50, 92, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-east', '', config.canGlitch ? [-1] : [0]));
    m.nodes.push(new DungeonNode(
      '', 24, 59, DungeonNodeStatus.OPEN_DOOR,
    function(items:Items, config:Config) {
      return true;
    }, 'lw-trportal', '', config.canGlitch ? [-1] : [0]));
    lwData.dungeonMaps.push(m);

    lwData.startingMap = entry;

    return lwData;
  }
}
