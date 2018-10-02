import { ItemLocation } from "../item-location";
import { Items } from "../items";
import { Config } from "../config";

export class LightWorld {
  static setup(l:string[], config:Config):ItemLocation[] {
    var itemLocations:ItemLocation[] = [];

    itemLocations.push(new ItemLocation(
      'Master Sword Pedestal', 2.5, 3.2,
      function(items:Items, config:Config) {
        return items.pendantCourage && items.pendantPower && items.pendantWisdom
          && (config.mode !== 'inverted' || items.canInvertedLW());
      },
      function(items:Items, config:Config) {
        return items.book && (config.mode !== 'inverted' || items.canInvertedLW());
      },
      [l[0]]
    ));

    itemLocations.push(new ItemLocation(
      'Hyrule Secret Passage', 29.8, 41.8,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[1], l[2]]
    ));

    itemLocations.push(new ItemLocation(
      'King\'s Tomb', 30.8, 29.6,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.boots && items.glove === 2 && items.moonPearl && items.canInvertedLW();
        }
        return items.boots 
          && (items.glove === 2 || (items.mirror && items.canNorthWestDarkWorld()));
      },
      null,
      [l[3]]
    ));

    itemLocations.push(new ItemLocation(
      'Dam', 23.4, 93.4,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[4], l[47]], '',
      function(items:Items, config:Config) {
        return config.mode === 'inverted' && items.mirror;
      }
    ));    

    if (config.mode !== 'inverted') {
      itemLocations.push(new ItemLocation(
        'Link\'s House', 27.4, 67.9,
        function(items:Items, config:Config) {
          return true;
        },
        null,
        [l[5]]
      ));
    }    

    if (config.mode !== 'inverted') {
      itemLocations.push(new ItemLocation(
        'Kakariko', 4, 53.8,
        function(items:Items, config:Config) {
          return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
        },
        null,
        [l[6], l[7], l[12], l[13], l[14], l[15], l[16], 
        l[17], l[18], l[19], l[20], l[21], l[28]]
      ));
    } else {
      itemLocations.push(new ItemLocation(
        'Kakariko (Superbunny Chests)', 2.5, 42,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        null,
        [l[13], l[14], l[15], l[16]], '',
        function (items:Items, config:Config) {
          return items.canInvertedLW();
        }
      ));
      itemLocations.push(new ItemLocation(
        'Kakariko (Mirror Superbunny Chests)', 6.5, 42,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        null,
        [l[18], l[19], l[20], l[21], l[6]], '',
        function (items:Items, config:Config) {
          return items.canInvertedLW() && items.mirror;
        }
      ));
      itemLocations.push(new ItemLocation(
        'Kakariko (Pearl Locked Chests)', 5, 53.8,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        null,
        [l[7], l[12], l[17]],
      ));
      itemLocations.push(new ItemLocation(
        'Bottle Vendor', 5, 47.5,
        function(items:Items, config:Config) {
          return (config.mode !== 'inverted' || items.canInvertedLW());
        },
        null,
        [l[28]]
      ));
    }

    

    

    itemLocations.push(new ItemLocation(
      'Aginah\'s Cave', 10, 82.6,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[8]]
    ));

    itemLocations.push(new ItemLocation(
      'Sahasrahla Hut', 40.7, 41.4,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[9], l[10], l[11]]
    ));

    itemLocations.push(new ItemLocation(
      'Bonk Rocks', 19.5, 29.3,
      function(items:Items, config:Config) {
        return items.boots 
          && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[22]]
    ));

    itemLocations.push(new ItemLocation(
      'Mini Moldorm Cave', 32.6, 93.4,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[23], l[24], l[25], l[26], l[40]]
    ));

    itemLocations.push(new ItemLocation(
      'Ice Rod Cave', 44.7, 76.9,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[27]]
    ));

    itemLocations.push(new ItemLocation(
      'Sahasrahla Green Pendant', 40.7, 46.7,
      function(items:Items, config:Config) {
        return items.pendantCourage && (config.mode !== 'inverted' || (items.canInvertedLW()));
      },
      null,
      [l[29]]
    ));

    itemLocations.push(new ItemLocation(
      'Magic Bat', 16, 58,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.moonPearl && items.hammer && items.powder;
        }
        return items.powder && (items.hammer || (items.moonPearl && items.mirror && items.glove === 2));
      },
      null,
      [l[30]],
      '',
      function(items:Items, config:Config) {
        return items.somaria && items.mushroom && (items.hammer || (items.moonPearl && items.mirror && items.glove === 2));
      }
    ));

    itemLocations.push(new ItemLocation(
      'Sick Kid', 7.8, 53,
      function(items:Items, config:Config) {
        return items.bottle && (config.mode !== 'inverted' || items.canInvertedLW());
      },
      null,
      [l[31]]
    ));

    itemLocations.push(new ItemLocation(
      'Hobo', 35.4, 69.7,
      function(items:Items, config:Config) {
        return items.flippers && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[32]],
      '',
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      }
    ));

    itemLocations.push(new ItemLocation(
      'King Zora', 47.7, 12.1,
      function(items:Items, config:Config) {
        return (items.flippers || items.glove) && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[34]],
      '',
      function(items:Items, config:Config) {
        return config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Lumberjack Tree', 15.1, 7.6,
      function(items:Items, config:Config) {
        return items.agahnim && items.boots && (config.mode !== 'inverted' || (items.moonPearl && items.canInvertedLW()));
      },
      function(items:Items, config:Config) {
        return config.mode !== 'inverted' || items.canInvertedLW();
      },
      [l[36]]
    ));    

    itemLocations.push(new ItemLocation(
      'Library', 7.7, 65.9,
      function(items:Items, config:Config) {
        return items.boots && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || items.canInvertedLW());
      },
      [l[41]]
    ));

    if (config.mode === 'inverted') {
      itemLocations.push(new ItemLocation(
        'Mushroom Item', 7.2, 9.6,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },        
        function(items:Items, config:Config) {
          return items.canInvertedLW();
        },
        [l[42]]
      ));
      itemLocations.push(new ItemLocation(
        'Lost Woods Hideout', 9.2, 16.3,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        function(items:Items, config:Config) {
          return items.canInvertedLW();
        },
        [l[35]]
      ));
    } else {
      itemLocations.push(new ItemLocation(
        'Lost Woods', 7.2, 9.6,
        function(items:Items, config:Config) {
          return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
        },
        null,
        [l[42], l[35]]
      ));
    }

    

    itemLocations.push(new ItemLocation(
      'Potion Shop', 40.8, 32.5,
      function(items:Items, config:Config) {
        return items.mushroom && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[43]]
    ));

    itemLocations.push(new ItemLocation(
      'Maze Race', 1.8, 69.8,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || items.canInvertedLW());
      },
      [l[44]]
    ));

    itemLocations.push(new ItemLocation(
      'Desert Ledge', 1.5, 89,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.moonPearl && items.book;
        }
        return items.book || (items.canMire(config) && items.mirror);
      },
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || items.canInvertedLW());
      },
      [l[45]], '', function(items:Items, config:Config) {
        return config.mode === 'inverted' && items.book && items.canInvertedLW();
      }
    ));

    itemLocations.push(new ItemLocation(
      'Lake Hylia Island', 36.1, 82.9,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.moonPearl && items.flippers;
        }
        return items.flippers && items.moonPearl && items.mirror 
          && (items.canSouthDarkWorld() || items.canNorthEastDarkWorld());
      },
      function(items:Items, config:Config) {
        return config.mode !== 'inverted' || items.canInvertedLW();
      },
      [l[46]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.moonPearl;
        }
        return items.boots && items.moonPearl && items.mirror 
          && (items.canSouthDarkWorld(true) || items.canNorthEastDarkWorld(true));
      },
      function(items:Items, config:Config) {
        return config.mode !== 'inverted' || items.canInvertedLW();
      }
    ));

    itemLocations.push(new ItemLocation(
      'Zora River Ledge', 47.7, 17.3,
      function(items:Items, config:Config) {
        return items.flippers && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      function(items:Items, config:Config) {
        return items.glove && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      [l[48]],
      '',
      function(items:Items, config:Config) {
        return items.boots && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
    ));

    itemLocations.push(new ItemLocation(
      'Shovel Item', 14.4, 66.2,
      function(items:Items, config:Config) {
        return items.shovel && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[49]]
    ));

    itemLocations.push(new ItemLocation(
      'Waterfall Fairy', 45, 19.3,
      function(items:Items, config:Config) {
        return items.flippers && (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[50], l[51]],
      '',
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      }
    ));

    itemLocations.push(new ItemLocation(
      'Sanctuary', 23, 28,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[52]], '',
      function(items:Items, config:Config) {
        return config.mode === 'inverted' && items.canInvertedLW() && items.mirror;
      }
    ));

    itemLocations.push(new ItemLocation(
      'Sewers Bombable Wall', 26.8, 32.4,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.moonPearl && (items.glove || (items.lamp && items.dungeonItemsArray[0].smallKeys > 0));
        }
        return config.mode.indexOf('standard') > -1 ? true : (items.glove || (items.lamp && items.dungeonItemsArray[0].smallKeys > 0));
      },
      null,
      [l[53], l[54], l[55]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedLW() && items.dungeonItemsArray[0].smallKeys > 0;
        }
        return items.dungeonItemsArray[0].smallKeys > 0;
      }
    ));

    itemLocations.push(new ItemLocation(
      'Escape Front Half', 24.9, 51,
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl));
      },
      null,
      [l[57], l[58], l[59]], '',
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || items.canInvertedLW());
      }
    ));

    itemLocations.push(new ItemLocation(
      'Escape Dark Room Chest', 24.9, 45.8,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return (config.mode !== 'inverted' || (items.canInvertedLW() && items.moonPearl)) && items.lamp;
        }
        return config.mode.indexOf('standard') > -1 ? true : items.lamp;
      },
      null,
      [l[56]],
      '',
      function(items:Items, config:Config) {
        return (config.mode !== 'inverted' || items.canInvertedLW());
      }
    ));

    itemLocations.push(new ItemLocation(
      'Old Man', 20.8, 20.4,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain() && items.lamp;
        }
        return items.canWestDeathMountain() && items.lamp;
      },
      null,
      [l[74]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      },
    ));

    itemLocations.push(new ItemLocation(
      'Spectacle Rock Cave', 25.8, 14.8,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canWestDeathMountain();
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canWestDeathMountain();
      },
      [l[75]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Spectacle Rock Hint', 23.3, 14.8,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canWestDeathMountain();
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canWestDeathMountain();
      },
      ['=13'],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      }
    ));

    itemLocations.push(new ItemLocation(
      'Ether Tablet', 21, 3,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain() && items.moonPearl && items.book && items.hammer
            && items.sword >= 2;
        }
        return items.book && items.canWestDeathMountain() && (items.mirror || (items.hammer && items.hookshot)) 
          && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain() && items.moonPearl && items.book && items.hammer;
        }
        return items.book && items.canWestDeathMountain() && (items.mirror || (items.hammer && items.hookshot));
      },
      [l[76]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true) && items.moonPearl && items.book && items.hammer
            && items.sword >= 2;
        }
        return items.book && items.canWestDeathMountain(true) && (items.mirror || (items.hammer && items.hookshot)) 
          && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true) && items.moonPearl && items.book && items.hammer;
        }
        return items.book && items.canWestDeathMountain(true) && (items.mirror || (items.hammer && items.hookshot));
      },
    ));

    itemLocations.push(new ItemLocation(
      'Top of Spectacle Rock', 25.4, 8.5,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain() && items.moonPearl && items.hammer;
        }
        return items.canWestDeathMountain() && items.mirror;
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain();
        }
        return items.canWestDeathMountain();
      },
      [l[77]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true) && items.moonPearl && items.hammer;
        }
        return items.canWestDeathMountain(true) && items.mirror;
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDarkDeathMountain(true);
        }
        return items.canWestDeathMountain(true);
      },
    ));

    itemLocations.push(new ItemLocation(
      'Paradox Cave', 41.4, 17.1,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain() && items.moonPearl;
        }
        return items.canEastDeathMountain();
      },
      null,
      [l[80], l[81], l[82], l[83], l[84], l[85], l[86]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true) && items.moonPearl;
        }
        return items.canEastDeathMountain(true);
      },
    ));

    itemLocations.push(new ItemLocation(
      'Spiral Cave', 39.9, 9.3,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain() && items.moonPearl;
        }
        return items.canEastDeathMountain();
      },
      null,
      [l[78]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true);
        }
        return items.canEastDeathMountain(true);
      },
    ));

    itemLocations.push(new ItemLocation(
      'Floating Island', 40.2, 3,
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain();
        }
        return items.canEastDeathMountain() 
            && items.mirror && items.moonPearl && items.glove === 2;        
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain();
        }
        return items.canEastDeathMountain();
      },
      [l[87]],
      '',
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true);
        }
        return items.canEastDeathMountain(true) 
            && items.mirror && items.moonPearl && items.glove === 2;        
      },
      function(items:Items, config:Config) {
        if (config.mode === 'inverted') {
          return items.canInvertedEastDeathMountain(true);
        }
        return items.canEastDeathMountain(true);
      },
    ));

    if (config.mode === 'inverted') {
      itemLocations.push(new ItemLocation(
        'Ganon', 21, 40.8,
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
        'Blacksmiths', 15.2, 52,
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
        'Purple Chest', 16.7, 90,
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
        'Other Turtle Rock Entrances', 42.5, 9.3,
        function(items:Items, config:Config) {
          return items.canInvertedEastDeathMountain() && items.moonPearl;
        },
        null,
        ['tr-ledge'],
        '',
        function(items:Items, config:Config) {
          return items.canInvertedEastDeathMountain(true);
        },
      ));

      itemLocations.push(new ItemLocation(
        'Bombos Tablet', 11, 92.2,
        function(items:Items, config:Config) {
          return items.book && items.canInvertedLW() 
            && (items.sword >= 2 || (items.hammer && config.mode === 'swordless'));
        },
        function(items:Items, config:Config) {
          return items.book && items.canInvertedLW();
        },
        [l[33]],
        'ow'
      ));

      itemLocations.push(new ItemLocation(
        'Checkerboard Cave', 8.75, 77.3,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.glove && items.moonPearl;
        },
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.glove && items.moonPearl;
        },
        [l[39]],
        'mire'
      ));

      itemLocations.push(new ItemLocation(
        'South of Grove', 13.5, 84.1,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        function(items:Items, config:Config) {
          return items.canInvertedLW();
        },
        [l[37]],
        'ow',
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.mirror;
        }
      ));

      itemLocations.push(new ItemLocation(
        'Graveyard Ledge', 28, 27,
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        function(items:Items, config:Config) {
          return items.canInvertedLW() && items.moonPearl;
        },
        [l[38]],
        'ow'
      ));
    }

    if (config.mode !== 'inverted') {
      itemLocations.push(new ItemLocation(
        'ow', 4.5, 34,
        function(items:Items, config:Config) {
          return ((items.hammer && items.glove) || items.glove === 2);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'wdm', 28.6, 14.9,
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
        'dm', 38.1, 22.9,
        function(items:Items, config:Config) {
          return (items.canEastDeathMountain() && items.glove === 2);
        },
        null,
        ['warp'],
        '',
        function(items:Items, config:Config) {
          return (items.canEastDeathMountain(true) && items.glove === 2);
        },
      ));
  
      itemLocations.push(new ItemLocation(
        'ow', 23.5, 79,
        function(items:Items, config:Config) {
          return (items.hammer && items.glove);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'mire', 1.7, 96,
        function(items:Items, config:Config) {
          return (items.canMire(config));
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'ow', 48.2, 70,
        function(items:Items, config:Config) {
          return (items.hammer && items.glove);
        },
        null,
        ['warp']
      ));
  
      itemLocations.push(new ItemLocation(
        'ip', 39.7, 87,
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
        'dm', 47, 6,
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
        'ow', 24.9, 59,
        function(items:Items, config:Config) {
          return (items.agahnim);
        },
        null,
        ['warp']
      ));
    }
    
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
