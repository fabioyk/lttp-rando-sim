import { Config } from "../config";
import { ItemLocation } from "../item-location";
import { Items } from "../items";

export class DarkWorld {
  static setup(l:string[], config:Config):ItemLocation[] {
    var itemLocations:ItemLocation[] = [];

    itemLocations.push(new ItemLocation(
      'Superbunny Cave', 92.8, 14.7,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canDarkEastDeathMountain() && items.moonPearl;
      },
      null,
      [l[97], l[98]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canDarkEastDeathMountain(true);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Hookshot Cave (bottom chest)', 91.6, 8.6,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain() && items.glove && (items.hookshot || items.boots);
        }
        return items.canDarkEastDeathMountain() && items.moonPearl && (items.hookshot || items.boots);
      },
      null,
      [l[102]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true) && items.glove && (items.hookshot || items.boots);
        }
        return items.canDarkEastDeathMountain(true) && items.moonPearl && (items.hookshot || items.boots);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Hookshot Cave (3 top chests)', 91.6, 3.4,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain() && items.glove && items.hookshot;
        }
        return items.canDarkEastDeathMountain() && items.moonPearl && items.hookshot;
      },
      null,
      [l[100], l[101], l[99]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain() && items.glove && (items.hookshot || items.boots);
        }
        return items.canDarkEastDeathMountain(true) && items.moonPearl && (items.hookshot || items.boots);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Spike Cave', 78.6, 14.9,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain() && items.hammer && items.glove
          && ((items.cape && (items.halfMagic || items.bottle)) || items.byrna);
        }
        return items.canDarkWestDeathMountain() && items.hammer && items.glove
            && ((items.cape && (items.halfMagic || items.bottle)) || items.byrna);
      },
      null,
      [l[103]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true) && items.hammer && items.glove;
        }
        return items.canDarkWestDeathMountain(true) && items.hammer && items.glove;
      }
    ));

    itemLocations.push(new ItemLocation(
      'Catfish', 96, 17.2,
      function(items:Items, config:Config) {
        return (items.canNorthEastDarkWorld() && items.moonPearl && items.glove)
          || (config.mode === 'inverted' && items.canInvertedNEDW() && items.glove);
      },
      function(items:Items, config:Config) {
        return (items.canNorthEastDarkWorld() && items.moonPearl && items.glove)
          || (config.mode === 'inverted' && items.canInvertedNEDW() && items.glove);
      },
      [l[104]],
      'ow',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW(true) && items.glove;
        }
        return items.canNorthEastDarkWorld(true) && items.moonPearl && items.glove;
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW(true) && items.glove;
        }
        return items.canNorthEastDarkWorld(true) && items.moonPearl && items.glove;
      },
    ));

    itemLocations.push(new ItemLocation(
      'Pyramid', 79, 43.5,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW();
        }
        return items.canNorthEastDarkWorld();
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW();
        }
        return items.canNorthEastDarkWorld();
      },
      [l[105]],
      'ow',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW(true);
        }
        return items.canNorthEastDarkWorld(true);
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedNEDW(true);
        }
        return items.canNorthEastDarkWorld(true);
      },
    ));

    itemLocations.push(new ItemLocation(
      'Pyramid Fairy', 73.5, 48.5,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.mirror && items.crystal5 && items.crystal6;
        } else {
          return items.canSouthDarkWorld() && items.moonPearl 
            && (items.hammer || (items.mirror && items.agahnim))
            && items.crystal5 && items.crystal6;
        }
        
      },
      null,
      [l[106], l[107]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Bombable Hut', 55.4, 57.8,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld() || config.mode === 'inverted';
      },
      null,
      [l[108]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'C-Shaped House', 60.8, 47.9,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld() || config.mode === 'inverted';
      },
      null,
      [l[109]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Chest Game', 52.1, 46.4,
      function(items:Items, config:Config) {
        return items.canNorthWestDarkWorld() || config.mode === 'inverted';
      },
      null,
      [l[110]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Hammer Pegs', 65.8, 60.1,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.hammer && (items.glove === 2
            || (items.mirror && items.canInvertedLW() && items.glove))
        }
        return items.canNorthWestDarkWorld() && items.glove === 2 && items.hammer;
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.hammer && (items.glove === 2
            || (items.mirror && items.canInvertedLW() && items.glove))
        }
        return items.canNorthWestDarkWorld() && items.glove === 2 && items.hammer;
      },
      [l[111]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Bumper Cave', 67.1, 15.2,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.glove && items.cape && items.moonPearl && items.mirror &&
            items.canInvertedLW();
        }
        return items.canNorthWestDarkWorld() && items.glove && items.cape;
      },
      function(items:Items, config:Config) {        
        return items.canNorthWestDarkWorld() || config.mode === 'inverted';
      },
      [l[112]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Hype Cave', 80, 77.1,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld() || config.mode === 'inverted';
      },
      null,
      [l[115], l[116], l[117], l[118], l[120]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Ol\' Stumpy', 65.5, 68.6,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld() || config.mode === 'inverted';
      },
      null,
      [l[119]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Digging Game', 52.9, 69.2,
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld() || config.mode === 'inverted';
      },
      function(items:Items, config:Config) {
        return items.canSouthDarkWorld() || config.mode === 'inverted';
      },
      [l[121]],
      'ow'
    ));

    itemLocations.push(new ItemLocation(
      'Mire Shed', 51.7, 79.5,
      function(items:Items, config:Config) {
        return items.canMire(config) && (items.moonPearl || config.mode === 'inverted');
      },
      null,
      [l[122], l[123]],
      'mire',
      function(items:Items, config:Config) {
        return items.canMire(config) && (items.mirror || items.moonPearl || config.mode === 'inverted');
      }
    ));    

    if (config.mode !== 'inverted') {
      itemLocations.push(new ItemLocation(
        'Ganon', 75, 40.8,
        function(items:Items, config:Config) {
          return items.canNorthEastDarkWorld() && items.agahnim2 && items.crystal1 &&
            items.crystal2 && items.crystal3 && items.crystal4 && items.crystal5 && items.crystal6
            && items.crystal7 && items.sword >= 2 && (items.lamp || items.fireRod);
        },
        null,
        ['Ganon'],
        'ow'
      ));
      
      itemLocations.push(new ItemLocation(
        'Blacksmiths', 57, 65.9,
        function(items:Items, config:Config) {
          if (config.mode === 'inverted') {
            return (items.glove === 2 || items.mirror)
              && items.canInvertedLW();
          }
          return items.canNorthWestDarkWorld() && items.glove === 2;
        },
        null,
        [l[113]],
        'ow'
      ));
  
      itemLocations.push(new ItemLocation(
        'Purple Chest', 65.2, 52.2,
        function(items:Items, config:Config) {
          if (config.mode === 'inverted') {
            return (items.glove === 2 || items.mirror)
              && items.canInvertedLW();
          }
          return items.canNorthWestDarkWorld() && items.glove === 2;
        },
        null,
        [l[114]],
        'ow'
      ));

      itemLocations.push(new ItemLocation(
        'Bombos Tablet', 62.5, 92.2,
        function(items:Items, config:Config) {
          return items.book && items.mirror && items.canSouthDarkWorld() 
            && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
        },
        function(items:Items, config:Config) {
          return items.book && items.mirror && items.canSouthDarkWorld();
        },
        [l[33]],
        'ow'
      ));

      itemLocations.push(new ItemLocation(
        'Checkerboard Cave', 60, 77.3,
        function(items:Items, config:Config) {
          return items.canMire(config) && items.mirror;
        },
        function(items:Items, config:Config) {
          return items.canMire(config) && items.mirror;
        },
        [l[39]],
        'mire'
      ));

      itemLocations.push(new ItemLocation(
        'South of Grove', 62.5, 84.1,
        function(items:Items, config:Config) {
          return items.mirror && items.canSouthDarkWorld();
        },
        function(items:Items, config:Config) {
          return items.mirror && items.canSouthDarkWorld();
        },
        [l[37]],
        'ow'
      ));

      itemLocations.push(new ItemLocation(
        'Graveyard Ledge', 78.5, 27,
        function(items:Items, config:Config) {
          return items.mirror && items.moonPearl && items.canNorthWestDarkWorld();
        },
        function(items:Items, config:Config) {
          return items.mirror && items.moonPearl && items.canNorthWestDarkWorld();
        },
        [l[38]],
        'ow'
      ));
    }

    if (config.mode === 'inverted') {
      itemLocations.push(new ItemLocation(
        'Link\'s House', 77.4, 67.9,
        function(items:Items, config:Config) {
          return true;
        },
        null,
        [l[5]], 'ow'
      ));       

      itemLocations.push(new ItemLocation(
        'ow', 54.5, 34,
        function(items:Items, config:Config) {
          return ((items.hammer && items.glove) || items.glove === 2);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'wdm', 78.6, 14.9,
        function(items:Items, config:Config) {
          return (items.canWestDeathMountain());
        },
        null,
        ['warp'],
        '',
        function(items:Items, config:Config) {
          return (items.canWestDeathMountain(true));
        },
      ));
  
      itemLocations.push(new ItemLocation(
        'dm', 88.1, 22.9,
        function(items:Items, config:Config) {
          return (items.canWestDeathMountain() && items.glove === 2);
        },
        null,
        ['warp'],
        '',
        function(items:Items, config:Config) {
          return (items.canWestDeathMountain(true) && items.glove === 2);
        },
      ));
  
      itemLocations.push(new ItemLocation(
        'ow', 73.5, 79,
        function(items:Items, config:Config) {
          return (items.hammer && items.glove);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'mire', 51.7, 96,
        function(items:Items, config:Config) {
          return items.flute && items.canInvertedLW() && items.glove === 2;
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'ow', 98.2, 70,
        function(items:Items, config:Config) {
          return (items.hammer && items.glove);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'ip', 89.7, 92,
        function(items:Items, config:Config) {
          return (items.flippers && items.glove === 2);
        },
        null,
        ['warp'],
        '',
        function(items:Items, config:Config) {
          return (items.glove === 2);
        }
      ));
  
      itemLocations.push(new ItemLocation(
        'dm', 98.6, 3.4,
        function(items:Items, config:Config) {
          return (items.canEastDeathMountain() && items.glove === 2 && items.hammer);
        },
        null,
        ['warp'],
        '',
        function(items:Items, config:Config) {
          return (items.canEastDeathMountain(true) && items.glove === 2 && items.hammer);
        },
      ));
  
      itemLocations.push(new ItemLocation(
        'ow', 74.9, 59,
        function(items:Items, config:Config) {
          return (items.agahnim);
        },
        null,
        ['warp']
      ));
    }

    return itemLocations;
  }
}
