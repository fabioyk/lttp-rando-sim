import { ItemLocation } from "../item-location";
import { Items } from "../items";
import { Config } from "../config";

export class LightWorld {
  static setup(l:string[], config:Config):ItemLocation[] {
    var itemLocations:ItemLocation[] = [];

    itemLocations.push(new ItemLocation(
      'Pedestal', 2.5, 3.2,
      function(items:Items, config:Config) {
        return items.pendantCourage && items.pendantPower && items.pendantWisdom;
      },
      function(items:Items, config:Config) {
        return items.book;
      },
      [l[0]]
    ));

    itemLocations.push(new ItemLocation(
      'Hyrule Secret Entrance', 29.8, 41.8,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[1], l[2]]
    ));

    itemLocations.push(new ItemLocation(
      'King\'s Tomb', 30.8, 29.6,
      function(items:Items, config:Config) {
        return items.boots && (items.glove === 2 || (items.mirror && items.canNorthWestDarkWorld()));
      },
      null,
      [l[3]]
    ));

    itemLocations.push(new ItemLocation(
      'Dam', 23.4, 93.4,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[4], l[47]]
    ));    

    itemLocations.push(new ItemLocation(
      'Link\'s House', 27.4, 67.9,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[5]]
    ));

    itemLocations.push(new ItemLocation(
      'Kakariko', 4.5, 46.8,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[6], l[7], l[12], l[13], l[14], l[15], l[16], 
      l[17], l[18], l[19], l[20], l[21], l[28]]
    ));

    itemLocations.push(new ItemLocation(
      'Aginah\'s Cave', 10, 82.6,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[8]]
    ));

    itemLocations.push(new ItemLocation(
      'Sahasrahla Hut', 40.7, 41.4,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[9], l[10], l[11]]
    ));

    itemLocations.push(new ItemLocation(
      'Bonk Rocks', 19.5, 29.3,
      function(items:Items, config:Config) {
        return items.boots;
      },
      null,
      [l[22]]
    ));

    itemLocations.push(new ItemLocation(
      'Minimoldorm Cave', 32.6, 93.4,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[23], l[24], l[25], l[26], l[40]]
    ));

    itemLocations.push(new ItemLocation(
      'Ice Rod Cave', 44.7, 76.9,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[27]]
    ));

    itemLocations.push(new ItemLocation(
      'Sahasrahla Green Pendant', 40.7, 46.7,
      function(items:Items, config:Config) {
        return items.pendantCourage;
      },
      null,
      [l[29]]
    ));

    itemLocations.push(new ItemLocation(
      'Magic Bat', 16, 58,
      function(items:Items, config:Config) {
        return items.powder && (items.hammer || (items.moonPearl && items.mirror && items.glove === 2));
      },
      null,
      [l[30]]
    ));

    itemLocations.push(new ItemLocation(
      'Sick Kid', 7.8, 52.1,
      function(items:Items, config:Config) {
        return items.bottle;
      },
      null,
      [l[31]]
    ));

    itemLocations.push(new ItemLocation(
      'Hobo', 35.4, 69.7,
      function(items:Items, config:Config) {
        return items.flippers || config.canGlitch;
      },
      null,
      [l[32]]
    ));

    itemLocations.push(new ItemLocation(
      'King Zora', 47.7, 12.1,
      function(items:Items, config:Config) {
        return items.flippers || items.glove || config.canGlitch;
      },
      null,
      [l[34]]
    ));

    itemLocations.push(new ItemLocation(
      'Lumberjack Tree', 15.1, 7.6,
      function(items:Items, config:Config) {
        return items.agahnim && items.boots;
      },
      function(items:Items, config:Config) {
        return true;
      },
      [l[36]]
    ));    

    itemLocations.push(new ItemLocation(
      'Library', 7.7, 65.9,
      function(items:Items, config:Config) {
        return items.boots;
      },
      function(items:Items, config:Config) {
        return true;
      },
      [l[41]]
    ));

    itemLocations.push(new ItemLocation(
      'Lost Woods', 7.2, 9.6,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[42], l[35]]
    ));

    itemLocations.push(new ItemLocation(
      'Witch', 40.8, 32.5,
      function(items:Items, config:Config) {
        return items.mushroom;
      },
      null,
      [l[43]]
    ));

    itemLocations.push(new ItemLocation(
      'Race Game', 1.8, 69.8,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[44]]
    ));

    itemLocations.push(new ItemLocation(
      'Desert West Ledge', 1.5, 91,
      function(items:Items, config:Config) {
        return items.book || (items.canMire() && items.mirror);
      },
      function(items:Items, config:Config) {
        return true;
      },
      [l[45]]
    ));

    itemLocations.push(new ItemLocation(
      'Lake Hylia Island', 36.1, 82.9,
      function(items:Items, config:Config) {
        return items.flippers && items.moonPearl && items.mirror 
          && (items.canSouthDarkWorld() || items.canNorthEastDarkWorld());
      },
      function(items:Items, config:Config) {
        return true;
      },
      [l[46]]
    ));

    itemLocations.push(new ItemLocation(
      'Zora River Ledge', 47.7, 17.3,
      function(items:Items, config:Config) {
        return items.flippers || (config.canGlitch && items.boots);
      },
      function(items:Items, config:Config) {
        return items.glove || config.canGlitch;
      },
      [l[48]]
    ));

    itemLocations.push(new ItemLocation(
      'Shovel Item', 14.4, 66.2,
      function(items:Items, config:Config) {
        return items.shovel;
      },
      null,
      [l[49]]
    ));

    itemLocations.push(new ItemLocation(
      'Waterfall Fairy', 45, 19.3,
      function(items:Items, config:Config) {
        return items.flippers || (config.canGlitch && items.moonPearl) || (config.canGlitch && items.boots);
      },
      null,
      [l[50], l[51]]
    ));

    itemLocations.push(new ItemLocation(
      'Sanctuary', 23, 28,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[52]]
    ));

    itemLocations.push(new ItemLocation(
      'Bombable Wall in Escape', 26.8, 32.4,
      function(items:Items, config:Config) {
        return config.mode === 'standard' ? true : (items.glove || ((items.lamp || config.canGlitch) && items.hcItems.smallKeys > 0));
      },
      null,
      [l[53], l[54], l[55]]
    ));

    itemLocations.push(new ItemLocation(
      'Escape Front Half', 24.9, 51,
      function(items:Items, config:Config) {
        return true;
      },
      null,
      [l[57], l[58], l[59]]
    ));

    itemLocations.push(new ItemLocation(
      'Escape Dark Room Chest', 24.9, 45.8,
      function(items:Items, config:Config) {
        return config.mode === 'standard' ? true : (items.lamp || config.canGlitch);
      },
      null,
      [l[56]]
    ));

    itemLocations.push(new ItemLocation(
      'Lost Old Man', 20.8, 20.4,
      function(items:Items, config:Config) {
        return items.canWestDeathMountain(config) && items.hasLightsource(config);
      },
      null,
      [l[74]]
    ));

    itemLocations.push(new ItemLocation(
      'Spectacle Rock Cave', 24.3, 14.8,
      function(items:Items, config:Config) {
        return items.canWestDeathMountain(config);
      },
      null,
      [l[75]]
    ));

    itemLocations.push(new ItemLocation(
      'Ether Tablet', 21, 3,
      function(items:Items, config:Config) {
        return items.book && items.canWestDeathMountain(config) && (items.mirror || (items.hammer && items.hookshot)) 
          && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
      },
      function(items:Items, config:Config) {
        return items.book && items.canWestDeathMountain(config) && (items.mirror || (items.hammer && items.hookshot));
      },
      [l[76]]
    ));

    itemLocations.push(new ItemLocation(
      'Top of Spectacle Rock', 25.4, 8.5,
      function(items:Items, config:Config) {
        return items.canWestDeathMountain(config) && items.mirror;
      },
      function(items:Items, config:Config) {
        return items.canWestDeathMountain(config);
      },
      [l[77]]
    ));

    itemLocations.push(new ItemLocation(
      'Paradox Cave', 41.4, 17.1,
      function(items:Items, config:Config) {
        return items.canEastDeathMountain(config);
      },
      null,
      [l[80], l[81], l[82], l[83], l[84], l[85], l[86]]
    ));

    itemLocations.push(new ItemLocation(
      'Spiral Cave', 39.9, 9.3,
      function(items:Items, config:Config) {
        return items.canEastDeathMountain(config);
      },
      null,
      [l[78]]
    ));

    itemLocations.push(new ItemLocation(
      'Floating Island', 40.2, 3,
      function(items:Items, config:Config) {
        return items.canEastDeathMountain(config) 
            && items.mirror && items.moonPearl && items.glove === 2;        
      },
      function(items:Items, config:Config) {
        return items.canEastDeathMountain(config);
      },
      [l[87]]
    ));

    

    // itemLocations.push(new ItemLocation(
    //   'King\'s Tomb', 0, 0,
    //   function(items:Items, config:Config) {
    //     return true;
    //   },
    //   null,
    //   [l[3]]
    // ));    

    return itemLocations;
  }
}
