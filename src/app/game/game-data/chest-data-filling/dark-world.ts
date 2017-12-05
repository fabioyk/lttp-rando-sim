import { Config } from "../config";
import { ItemLocation } from "../item-location";
import { Items } from "../items";

export class DarkWorld {
  static setup(l:string[], config:Config):ItemLocation[] {
    var itemLocations:ItemLocation[] = [];

    itemLocations.push(new ItemLocation(
      'Super Bunny Cave', 92.8, 14.7,
      function(items:Items, config:Config) {
        return items.canDarkEastDeathMountain(config) && (items.moonPearl || config.canGlitch);
      },
      null,
      [l[97], l[98]]
    ));

    itemLocations.push(new ItemLocation(
      'Hookshot Cave (bottom chest)', 91.6, 8.6,
      function(items:Items, config:Config) {
        return items.canDarkEastDeathMountain(config) && items.moonPearl && (items.hookshot || items.boots);
      },
      null,
      [l[99]]
    ));

    itemLocations.push(new ItemLocation(
      'Hookshot Cave (3 top chests)', 91.6, 3.4,
      function(items:Items, config:Config) {
        return items.canDarkEastDeathMountain(config) && items.moonPearl && (items.hookshot || (items.boots && config.canGlitch));
      },
      null,
      [l[100], l[101], l[102]]
    ));

    itemLocations.push(new ItemLocation(
      'Spike Cave', 78.6, 14.9,
      function(items:Items, config:Config) {
        return items.canDarkWestDeathMountain(config) && items.hammer && items.glove
            && ((items.hasInvincibilityItem(config) && items.hasMagicExtension(config)) || config.canGlitch);
      },
      null,
      [l[103]]
    ));

    itemLocations.push(new ItemLocation(
      'Catfish', 96, 17.2,
      function(items:Items, config:Config) {
        return items.canNorthEastDarkWorld(config) && items.moonPearl && items.glove;
      },
      null,
      [l[104]]
    ));

    itemLocations.push(new ItemLocation(
      'Pyramid', 79, 43.5,
      function(items:Items, config:Config) {
        return items.canNorthEastDarkWorld(config);
      },
      null,
      [l[105]]
    ));

    itemLocations.push(new ItemLocation(
      'Fat Fairy', 73.5, 48.5,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld(config) && items.moonPearl 
            && (items.hammer || (items.mirror && items.agahnim))
            && items.crystal5 && items.crystal6;
      },
      null,
      [l[106], l[107]]
    ));

    itemLocations.push(new ItemLocation(
      'Bombable Hut', 55.4, 57.8,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config);
      },
      null,
      [l[108]]
    ));

    itemLocations.push(new ItemLocation(
      'C House', 60.8, 47.9,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config);
      },
      null,
      [l[109]]
    ));

    itemLocations.push(new ItemLocation(
      'Chest Game', 52.1, 46.4,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config);
      },
      null,
      [l[110]]
    ));

    itemLocations.push(new ItemLocation(
      'Hammer Pegs', 65.8, 60.1,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config) && items.glove === 2 && items.hammer;
      },
      null,
      [l[111]]
    ));

    itemLocations.push(new ItemLocation(
      'Bumper Cave', 67.1, 15.2,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config) && items.glove && items.cape;
      },
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config);
      },
      [l[112]]
    ));

    itemLocations.push(new ItemLocation(
      'Purple Chest', 65.2, 52.2,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config) && items.glove === 2;
      },
      null,
      [l[114]]
    ));

    itemLocations.push(new ItemLocation(
      'Hype Cave', 80, 77.1,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld(config);
      },
      null,
      [l[115], l[116], l[117], l[118], l[120]]
    ));

    itemLocations.push(new ItemLocation(
      'Ol\' Stumpy', 65.5, 68.6,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld(config);
      },
      null,
      [l[119]]
    ));

    itemLocations.push(new ItemLocation(
      'Digging Game', 52.9, 69.2,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld(config);
      },
      null,
      [l[121]]
    ));

    itemLocations.push(new ItemLocation(
      'Mire Shed', 51.7, 79.5,
      function(items:Items, config:Config) {
        return items.canMire() && (items.moonPearl || config.canGlitch);
      },
      null,
      [l[122], l[123]]
    ));

    itemLocations.push(new ItemLocation(
      'Ganon', 75, 40.8,
      function(items:Items, config:Config) {
        return items.canNorthEastDarkWorld(config) && items.agahnim2 && items.crystal1 &&
          items.crystal2 && items.crystal3 && items.crystal4 && items.crystal5 && items.crystal6
          && items.crystal7 && items.sword >= 2 && (items.lamp || items.fireRod);
      },
      null,
      ['Ganon']
    ));

    itemLocations.push(new ItemLocation(
      'Bombos Tablet', 62.5, 92.2,
      function(items:Items, config:Config) {
        return items.book && items.mirror && items.canSouthDarkWorld(config) 
          && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
      },
      function(items:Items, config:Config) {
        return items.book && items.mirror && items.canSouthDarkWorld(config);
      },
      [l[33]]
    ));

    itemLocations.push(new ItemLocation(
      'South of Grove', 62.5, 84.1,
      function(items:Items, config:Config) {
        return items.mirror && items.canSouthDarkWorld(config);
      },
      null,
      [l[37]]
    ));

    itemLocations.push(new ItemLocation(
      'Graveyard Cliff Cave', 78.5, 27,
      function(items:Items, config:Config) {
        return items.mirror && items.moonPearl && items.canNorthWestDarkWorld(config);
      },
      null,
      [l[38]]
    ));

    itemLocations.push(new ItemLocation(
      'Checkerboard Cave', 60, 77.3,
      function(items:Items, config:Config) {
        return items.canMire() && items.mirror;
      },
      null,
      [l[39]]
    ));

    itemLocations.push(new ItemLocation(
      'Blacksmiths', 57, 65.9,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld(config) && items.glove === 2;
      },
      null,
      [l[113]]
    ));

    return itemLocations;
  }
}
