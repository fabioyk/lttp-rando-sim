import { Component, OnInit } from '@angular/core';
import { SpoilerLog } from './game/game-data/spoiler-log';
import { GameService } from './game/game-data/game-service.service';
import { seeds } from './temp/seeds';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private gameService: GameService) { }

  ngOnInit() {
    var slog = new SpoilerLog();
    /*var output = slog.convertNormalToShort(JSON.parse(`{
      "Light World": {
          "Altar": "Heart Container",
          "Uncle": "Progressive Sword",
          "[cave-034] Hyrule Castle secret entrance": "Three Bombs",
          "[cave-018] Graveyard - top right grave": "Five Rupees",
          "[cave-047] Dam": "Bomb Upgrade (10)",
          "[cave-040] Link's House": "Twenty Rupees",
          "[cave-031] Tavern": "Twenty Rupees",
          "[cave-026] chicken house": "Heart Container",
          "[cave-044] Aginah's cave": "Three Bombs",
          "[cave-035] Sahasrahla's Hut [left chest]": "Twenty Rupees",
          "[cave-035] Sahasrahla's Hut [center chest]": "Twenty Rupees",
          "[cave-035] Sahasrahla's Hut [right chest]": "Three Bombs",
          "[cave-021] Kakariko well [top chest]": "Magic Powder",
          "[cave-021] Kakariko well [left chest row of 3]": "Three Bombs",
          "[cave-021] Kakariko well [center chest row of 3]": "Heart Container",
          "[cave-021] Kakariko well [right chest row of 3]": "Bomb Upgrade (5)",
          "[cave-021] Kakariko well [bottom chest]": "Ten Arrows",
          "[cave-022-B1] Thief's hut [top chest]": "Arrow Upgrade (5)",
          "[cave-022-B1] Thief's hut [top left chest]": "Piece Of Heart",
          "[cave-022-B1] Thief's hut [top right chest]": "Five Rupees",
          "[cave-022-B1] Thief's hut [bottom left chest]": "Piece Of Heart",
          "[cave-022-B1] Thief's hut [bottom right chest]": "Hammer",
          "[cave-016] cave under rocks west of Santuary": "Twenty Rupees",
          "[cave-050] cave southwest of Lake Hylia [bottom left chest]": "Piece Of Heart",
          "[cave-050] cave southwest of Lake Hylia [top left chest]": "Piece Of Heart",
          "[cave-050] cave southwest of Lake Hylia [top right chest]": "Twenty Rupees",
          "[cave-050] cave southwest of Lake Hylia [bottom right chest]": "Heart Container",
          "[cave-051] Ice Cave": "Twenty Rupees",
          "Bottle Vendor": "One Rupee",
          "Sahasrahla": "Piece Of Heart",
          "Magic Bat": "Lamp",
          "Sick Kid": "Bomb Upgrade (5)",
          "Hobo": "Half Magic",
          "Bombos Tablet": "Twenty Rupees",
          "King Zora": "Twenty Rupees",
          "Piece of Heart (Thieves' Forest Hideout)": "Twenty Rupees",
          "Piece of Heart (Lumberjack Tree)": "Progressive Glove",
          "Piece of Heart (south of Haunted Grove)": "Ten Arrows",
          "Piece of Heart (Graveyard)": "Heart Container",
          "Piece of Heart (Desert - northeast corner)": "Bomb Upgrade (5)",
          "[cave-050] cave southwest of Lake Hylia - generous guy": "Twenty Rupees",
          "Library": "Three Bombs",
          "Mushroom": "Twenty Rupees",
          "Witch": "Five Rupees",
          "Piece of Heart (Maze Race)": "Piece Of Heart",
          "Piece of Heart (Desert - west side)": "Three Bombs",
          "Piece of Heart (Lake Hylia)": "Bomb Upgrade (5)",
          "Piece of Heart (Dam)": "Bombos",
          "Piece of Heart (Zora's River)": "Piece Of Heart",
          "Haunted Grove item": "Fifty Rupees",
          "Waterfall Fairy - Left": "Piece Of Heart",
          "Waterfall Fairy - Right": "Piece Of Heart"
      },
      "Hyrule Castle": {
          "[dungeon-C-1F] Sanctuary": "Moon Pearl",
          "[dungeon-C-B1] Escape - final basement room [left chest]": "Progressive Sword",
          "[dungeon-C-B1] Escape - final basement room [middle chest]": "Three Hundred Rupees",
          "[dungeon-C-B1] Escape - final basement room [right chest]": "Progressive Shield",
          "[dungeon-C-B1] Escape - first B1 room": "Progressive Armor",
          "[dungeon-C-B1] Hyrule Castle - boomerang room": "Arrow Upgrade (5)",
          "[dungeon-C-B1] Hyrule Castle - map room": "Sewers Map",
          "[dungeon-C-B3] Hyrule Castle - next to Zelda": "Sewers Key"
      },
      "Eastern Palace": {
          "[dungeon-L1-1F] Eastern Palace - compass room": "Magic Cape",
          "[dungeon-L1-1F] Eastern Palace - big chest": "Fifty Rupees",
          "[dungeon-L1-1F] Eastern Palace - big ball room": "Eastern Palace Map",
          "[dungeon-L1-1F] Eastern Palace - Big key": "Eastern Palace Big Key",
          "[dungeon-L1-1F] Eastern Palace - map room": "Eastern Palace Compass",
          "Heart Container - Armos Knights": "Magic Mirror",
          "Eastern Palace Pendant": "Pendant Of Power"
      },
      "Desert Palace": {
          "[dungeon-L2-B1] Desert Palace - big chest": "Desert Palace Key",
          "[dungeon-L2-B1] Desert Palace - Map room": "Desert Palace Big Key",
          "[dungeon-L2-B1] Desert Palace - Small key room": "Arrow Upgrade (5)",
          "[dungeon-L2-B1] Desert Palace - Big key room": "Three Bombs",
          "[dungeon-L2-B1] Desert Palace - compass room": "Desert Palace Compass",
          "Heart Container - Lanmolas": "Desert Palace Map",
          "Desert Palace Pendant": "Crystal 7"
      },
      "Death Mountain": {
          "Old Mountain Man": "Twenty Rupees",
          "Piece of Heart (Spectacle Rock Cave)": "Piece Of Heart",
          "Ether Tablet": "Piece Of Heart",
          "Piece of Heart (Spectacle Rock)": "Mushroom",
          "[cave-012-1F] Death Mountain - wall of caves - left cave": "Pegasus Boots",
          "[cave-013] Mimic cave (from Turtle Rock)": "Heart Container",
          "[cave-009-1F] Death Mountain - wall of caves - right cave [top left chest]": "One Hundred Rupees",
          "[cave-009-1F] Death Mountain - wall of caves - right cave [top left middle chest]": "Progressive Glove",
          "[cave-009-1F] Death Mountain - wall of caves - right cave [top right middle chest]": "Heart Container",
          "[cave-009-1F] Death Mountain - wall of caves - right cave [top right chest]": "Twenty Rupees",
          "[cave-009-1F] Death Mountain - wall of caves - right cave [bottom chest]": "Book Of Mudora",
          "[cave-009-B1] Death Mountain - wall of caves - right cave [left chest]": "Twenty Rupees",
          "[cave-009-B1] Death Mountain - wall of caves - right cave [right chest]": "Fifty Rupees",
          "Piece of Heart (Death Mountain - floating island)": "Three Hundred Rupees"
      },
      "Tower Of Hera": {
          "[dungeon-L3-1F] Tower of Hera - first floor": "Tower of Hera Big Key",
          "[dungeon-L3-1F] Tower of Hera - freestanding key": "Tower of Hera Key",
          "[dungeon-L3-2F] Tower of Hera - Entrance": "Twenty Rupees",
          "[dungeon-L3-4F] Tower of Hera - 4F [small chest]": "Twenty Rupees",
          "[dungeon-L3-4F] Tower of Hera - big chest": "Tower of Hera Map",
          "Heart Container - Moldorm": "Tower of Hera Compass",
          "Tower of Hera Pendant": "Crystal 5"
      },
      "Castle Tower": {
          "[dungeon-A1-2F] Hyrule Castle Tower - 2 knife guys room": "Key",
          "[dungeon-A1-3F] Hyrule Castle Tower - maze room": "Key"
      },
      "Dark World": {
          "[cave-057-1F] Dark World Death Mountain - cave from top to bottom [top chest]": "Twenty Rupees",
          "[cave-057-1F] Dark World Death Mountain - cave from top to bottom [bottom chest]": "Piece Of Heart",
          "[cave-056] Dark World Death Mountain - cave under boulder [top right chest]": "Bottle (Bee)",
          "[cave-056] Dark World Death Mountain - cave under boulder [top left chest]": "Arrow Upgrade (5)",
          "[cave-056] Dark World Death Mountain - cave under boulder [bottom left chest]": "Ice Rod",
          "[cave-056] Dark World Death Mountain - cave under boulder [bottom right chest]": "Silver Arrows Upgrade",
          "[cave-055] Spike cave": "Ten Arrows",
          "Catfish": "Heart Container",
          "Piece of Heart (Pyramid)": "Ten Arrows",
          "Pyramid Fairy - Left": "Heart Container",
          "Pyramid Fairy - Right": "Three Bombs",
          "[cave-063] doorless hut": "Bottle (Blue Potion)",
          "[cave-062] C-shaped house": "Heart Container (refill)",
          "Piece of Heart (Treasure Chest Game)": "Piece Of Heart",
          "Piece of Heart (Dark World blacksmith pegs)": "Bomb Upgrade (5)",
          "Piece of Heart (Dark World - bumper cave)": "Quake",
          "Blacksmiths": "Arrow Upgrade (5)",
          "Purple Chest": "Piece Of Heart",
          "[cave-073] cave northeast of swamp palace [top chest]": "Twenty Rupees",
          "[cave-073] cave northeast of swamp palace [top middle chest]": "Flute",
          "[cave-073] cave northeast of swamp palace [bottom middle chest]": "Bow",
          "[cave-073] cave northeast of swamp palace [bottom chest]": "Heart Container",
          "Flute Boy": "Flippers",
          "[cave-073] cave northeast of swamp palace - generous guy": "Five Rupees",
          "Piece of Heart (Digging Game)": "Fifty Rupees",
          "[cave-071] Misery Mire west area [left chest]": "Piece Of Heart",
          "[cave-071] Misery Mire west area [right chest]": "Twenty Rupees"
      },
      "Dark Palace": {
          "[dungeon-D1-B1] Dark Palace - shooter room": "Palace of Darkness Key",
          "[dungeon-D1-1F] Dark Palace - big key room": "Palace of Darkness Compass",
          "[dungeon-D1-1F] Dark Palace - jump room [right chest]": "Palace of Darkness Key",
          "[dungeon-D1-1F] Dark Palace - jump room [left chest]": "Palace of Darkness Key",
          "[dungeon-D1-B1] Dark Palace - turtle stalfos room": "Palace of Darkness Key",
          "[dungeon-D1-1F] Dark Palace - statue push room": "Cane Of Somaria",
          "[dungeon-D1-1F] Dark Palace - big chest": "Progressive Armor",
          "[dungeon-D1-1F] Dark Palace - compass room": "Palace of Darkness Key",
          "[dungeon-D1-1F] Dark Palace - spike statue room": "Palace of Darkness Big Key",
          "[dungeon-D1-B1] Dark Palace - room leading to Helmasaur [left chest]": "Palace of Darkness Key",
          "[dungeon-D1-B1] Dark Palace - room leading to Helmasaur [right chest]": "Fire Rod",
          "[dungeon-D1-1F] Dark Palace - maze room [top chest]": "Three Bombs",
          "[dungeon-D1-1F] Dark Palace - maze room [bottom chest]": "Palace of Darkness Map",
          "Heart Container - Helmasaur King": "Twenty Rupees",
          "Palace of Darkness Crystal": "Crystal 1"
      },
      "Swamp Palace": {
          "[dungeon-D2-1F] Swamp Palace - first room": "Swamp Palace Key",
          "[dungeon-D2-B1] Swamp Palace - big chest": "Three Hundred Rupees",
          "[dungeon-D2-B1] Swamp Palace - big key room": "Swamp Palace Big Key",
          "[dungeon-D2-B1] Swamp Palace - map room": "Swamp Palace Map",
          "[dungeon-D2-B1] Swamp Palace - push 4 blocks room": "Three Bombs",
          "[dungeon-D2-B1] Swamp Palace - south of hookshot room": "Piece Of Heart",
          "[dungeon-D2-B2] Swamp Palace - flooded room [left chest]": "Swamp Palace Compass",
          "[dungeon-D2-B2] Swamp Palace - flooded room [right chest]": "Bottle (Fairy)",
          "[dungeon-D2-B2] Swamp Palace - hidden waterfall door room": "Piece Of Heart",
          "Heart Container - Arrghus": "Magical Boomerang",
          "Swamp Palace Crystal": "Pendant Of Wisdom"
      },
      "Skull Woods": {
          "[dungeon-D3-B1] Skull Woods - big chest": "Skull Woods Key",
          "[dungeon-D3-B1] Skull Woods - Big Key room": "Skull Woods Map",
          "[dungeon-D3-B1] Skull Woods - Compass room": "Ten Arrows",
          "[dungeon-D3-B1] Skull Woods - east of Fire Rod room": "Skull Woods Compass",
          "[dungeon-D3-B1] Skull Woods - Entrance to part 2": "Skull Woods Key",
          "[dungeon-D3-B1] Skull Woods - Gibdo\/Stalfos room": "Shovel",
          "[dungeon-D3-B1] Skull Woods - south of Fire Rod room": "Skull Woods Key",
          "Heart Container - Mothula": "Skull Woods Big Key",
          "Skull Woods Crystal": "Crystal 2"
      },
      "Thieves Town": {
          "[dungeon-D4-1F] Thieves' Town - Room above boss": "Thieves Town Compass",
          "[dungeon-D4-B1] Thieves' Town - Bottom left of huge room [bottom right chest]": "Thieves Town Key",
          "[dungeon-D4-B1] Thieves' Town - Bottom left of huge room [top left chest]": "Progressive Shield",
          "[dungeon-D4-B1] Thieves' Town - Bottom right of huge room": "Thieves Town Big Key",
          "[dungeon-D4-B1] Thieves' Town - Top left of huge room": "Twenty Rupees",
          "[dungeon-D4-B2] Thieves' Town - big chest": "Twenty Rupees",
          "[dungeon-D4-B2] Thieves' Town - next to Blind": "Ether",
          "Heart Container - Blind": "Thieves Town Map",
          "Thieves Town Crystal": "Pendant Of Courage"
      },
      "Ice Palace": {
          "[dungeon-D5-B1] Ice Palace - Big Key room": "Ice Palace Map",
          "[dungeon-D5-B1] Ice Palace - compass room": "Ice Palace Big Key",
          "[dungeon-D5-B2] Ice Palace - map room": "Ice Palace Compass",
          "[dungeon-D5-B3] Ice Palace - spike room": "Progressive Sword",
          "[dungeon-D5-B4] Ice Palace - above Blue Mail room": "Twenty Rupees",
          "[dungeon-D5-B5] Ice Palace - b5 up staircase": "Arrow Upgrade (5)",
          "[dungeon-D5-B5] Ice Palace - big chest": "Ice Palace Key",
          "Heart Container - Kholdstare": "Ice Palace Key",
          "Ice Palace Crystal": "Crystal 3"
      },
      "Misery Mire": {
          "[dungeon-D6-B1] Misery Mire - big chest": "Misery Mire Key",
          "[dungeon-D6-B1] Misery Mire - big hub room": "Progressive Shield",
          "[dungeon-D6-B1] Misery Mire - big key": "Misery Mire Map",
          "[dungeon-D6-B1] Misery Mire - compass": "Misery Mire Compass",
          "[dungeon-D6-B1] Misery Mire - end of bridge": "Misery Mire Key",
          "[dungeon-D6-B1] Misery Mire - map room": "Misery Mire Key",
          "[dungeon-D6-B1] Misery Mire - spike room": "Misery Mire Big Key",
          "Heart Container - Vitreous": "Twenty Rupees",
          "Misery Mire Crystal": "Crystal 6"
      },
      "Turtle Rock": {
          "[dungeon-D7-1F] Turtle Rock - Chain chomp room": "Turtle Rock Key",
          "[dungeon-D7-1F] Turtle Rock - compass room": "Turtle Rock Big Key",
          "[dungeon-D7-1F] Turtle Rock - Map room [left chest]": "Bug Catching Net",
          "[dungeon-D7-1F] Turtle Rock - Map room [right chest]": "Turtle Rock Key",
          "[dungeon-D7-B1] Turtle Rock - big chest": "Turtle Rock Key",
          "[dungeon-D7-B1] Turtle Rock - big key room": "Piece Of Heart",
          "[dungeon-D7-B1] Turtle Rock - Roller switch room": "Hookshot",
          "[dungeon-D7-B2] Turtle Rock - Eye bridge room [bottom left chest]": "Three Hundred Rupees",
          "[dungeon-D7-B2] Turtle Rock - Eye bridge room [bottom right chest]": "Turtle Rock Compass",
          "[dungeon-D7-B2] Turtle Rock - Eye bridge room [top left chest]": "Turtle Rock Key",
          "[dungeon-D7-B2] Turtle Rock - Eye bridge room [top right chest]": "Bomb Upgrade (5)",
          "Heart Container - Trinexx": "Turtle Rock Map",
          "Turtle Rock Crystal": "Crystal 4"
      },
      "Ganons Tower": {
          "[dungeon-A2-1F] Ganon's Tower - down left staircase from entrance": "Fifty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - north of gap room [top left chest]": "Piece Of Heart",
          "[dungeon-A2-1F] Ganon's Tower - north of gap room [top right chest]": "Piece Of Heart",
          "[dungeon-A2-1F] Ganon's Tower - north of gap room [bottom left chest]": "Ganons Tower Key",
          "[dungeon-A2-1F] Ganon's Tower - north of gap room [bottom right chest]": "Piece Of Heart",
          "[dungeon-A2-1F] Ganon's Tower - west of teleport room [top left chest]": "Fifty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - west of teleport room [top right chest]": "Twenty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - west of teleport room [bottom left chest]": "Fifty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - west of teleport room [bottom right chest]": "Ganons Tower Compass",
          "[dungeon-A2-1F] Ganon's Tower - north of teleport room": "Twenty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - map room": "Piece Of Heart",
          "[dungeon-A2-1F] Ganon's Tower - big chest": "Ganons Tower Map",
          "[dungeon-A2-1F] Ganon's Tower - down right staircase from entrance [left chest]": "Ganons Tower Big Key",
          "[dungeon-A2-1F] Ganon's Tower - down right staircase from entrance [right chest]": "Ganons Tower Key",
          "[dungeon-A2-1F] Ganon's Tower - above Armos": "Piece Of Heart",
          "[dungeon-A2-1F] Ganon's Tower - east of down right staircase from entrance": "Ganons Tower Key",
          "[dungeon-A2-1F] Ganon's Tower - compass room [top left chest]": "Arrow",
          "[dungeon-A2-1F] Ganon's Tower - compass room [top right chest]": "Twenty Rupees",
          "[dungeon-A2-1F] Ganon's Tower - compass room [bottom left chest]": "Cane Of Byrna",
          "[dungeon-A2-1F] Ganon's Tower - compass room [bottom right chest]": "One Rupee",
          "[dungeon-A2-B1] Ganon's Tower - north of Armos room [bottom chest]": "Piece Of Heart",
          "[dungeon-A2-B1] Ganon's Tower - north of Armos room [left chest]": "Arrow Upgrade (10)",
          "[dungeon-A2-B1] Ganon's Tower - north of Armos room [right chest]": "Progressive Sword",
          "[dungeon-A2-6F] Ganon's Tower - north of falling floor four torches [top left chest]": "Three Hundred Rupees",
          "[dungeon-A2-6F] Ganon's Tower - north of falling floor four torches [top right chest]": "Ganons Tower Key",
          "[dungeon-A2-6F] Ganon's Tower - before Moldorm": "Bottle",
          "[dungeon-A2-6F] Ganon's Tower - Moldorm room": "Boomerang"
      },
      "Special": {
          "Turtle Rock Medallion": "Quake",
          "Misery Mire Medallion": "Quake",
          "Waterfall Bottle": "Bottle (Blue Potion)",
          "Pyramid Bottle": "Bottle (Red Potion)"
      },
      "playthrough": {
          "longest_item_chain": 15,
          "1": {
              "Light World": {
                  "Uncle": "Progressive Sword",
                  "[cave-021] Kakariko well [top chest]": "Magic Powder",
                  "[cave-022-B1] Thief's hut [bottom right chest]": "Hammer"
              },
              "Hyrule Castle": {
                  "[dungeon-C-1F] Sanctuary": "Moon Pearl",
                  "[dungeon-C-B1] Escape - final basement room [left chest]": "Progressive Sword"
              },
              "Eastern Palace": {
                  "[dungeon-L1-1F] Eastern Palace - compass room": "Magic Cape"
              }
          },
          "2": {
              "Light World": {
                  "Magic Bat": "Lamp"
              }
          },
          "3": {
              "Eastern Palace": {
                  "[dungeon-L1-1F] Eastern Palace - Big key": "Eastern Palace Big Key"
              },
              "Castle Tower": {
                  "Agahnim": "Defeat Agahnim"
              }
          },
          "4": {
              "Dark World": {
                  "[cave-073] cave northeast of swamp palace [top middle chest]": "Flute",
                  "[cave-073] cave northeast of swamp palace [bottom middle chest]": "Bow",
                  "Flute Boy": "Flippers"
              }
          },
          "5": {
              "Eastern Palace": {
                  "Heart Container - Armos Knights": "Magic Mirror"
              },
              "Dark Palace": {
                  "[dungeon-D1-1F] Dark Palace - statue push room": "Cane Of Somaria"
              }
          },
          "6": {
              "Death Mountain": {
                  "[cave-012-1F] Death Mountain - wall of caves - left cave": "Pegasus Boots",
                  "[cave-009-1F] Death Mountain - wall of caves - right cave [top left middle chest]": "Progressive Glove",
                  "[cave-009-1F] Death Mountain - wall of caves - right cave [bottom chest]": "Book Of Mudora"
              },
              "Dark Palace": {
                  "[dungeon-D1-B1] Dark Palace - room leading to Helmasaur [right chest]": "Fire Rod"
              }
          },
          "7": {
              "Light World": {
                  "Piece of Heart (Lumberjack Tree)": "Progressive Glove"
              },
              "Desert Palace": {
                  "[dungeon-L2-B1] Desert Palace - Map room": "Desert Palace Big Key"
              },
              "Tower Of Hera": {
                  "[dungeon-L3-1F] Tower of Hera - first floor": "Tower of Hera Big Key"
              },
              "Dark World": {
                  "Piece of Heart (Dark World - bumper cave)": "Quake"
              },
              "Dark Palace": {
                  "[dungeon-D1-1F] Dark Palace - spike statue room": "Palace of Darkness Big Key"
              },
              "Skull Woods": {
                  "Skull Woods Crystal": "Crystal 2"
              }
          },
          "8": {
              "Tower Of Hera": {
                  "Tower of Hera Pendant": "Crystal 5"
              },
              "Dark World": {
                  "[cave-056] Dark World Death Mountain - cave under boulder [bottom right chest]": "Silver Arrows Upgrade"
              },
              "Dark Palace": {
                  "Palace of Darkness Crystal": "Crystal 1"
              },
              "Ice Palace": {
                  "[dungeon-D5-B1] Ice Palace - compass room": "Ice Palace Big Key"
              },
              "Misery Mire": {
                  "[dungeon-D6-B1] Misery Mire - spike room": "Misery Mire Big Key"
              },
              "Turtle Rock": {
                  "[dungeon-D7-1F] Turtle Rock - compass room": "Turtle Rock Big Key"
              }
          },
          "9": {
              "Desert Palace": {
                  "Desert Palace Pendant": "Crystal 7"
              },
              "Misery Mire": {
                  "Misery Mire Crystal": "Crystal 6"
              }
          },
          "10": {
              "Ice Palace": {
                  "Ice Palace Crystal": "Crystal 3"
              },
              "Turtle Rock": {
                  "[dungeon-D7-B1] Turtle Rock - Roller switch room": "Hookshot"
              }
          },
          "11": {
              "Dark World": {
                  "[cave-056] Dark World Death Mountain - cave under boulder [bottom left chest]": "Ice Rod"
              },
              "Ice Palace": {
                  "[dungeon-D5-B3] Ice Palace - spike room": "Progressive Sword"
              }
          },
          "12": {
              "Turtle Rock": {
                  "Turtle Rock Crystal": "Crystal 4"
              }
          },
          "13": {
              "Ganons Tower": {
                  "[dungeon-A2-1F] Ganon's Tower - down right staircase from entrance [left chest]": "Ganons Tower Big Key"
              }
          },
          "15": {
              "Ganons Tower": {
                  "Agahnim 2": "Defeat Agahnim 2"
              }
          },
          "16": {
              "Dark World": {
                  "Ganon": "Defeat Ganon"
              }
          },
          "regions_visited": 33
      },
      "meta": {
          "difficulty": "normal",
          "variation": "none",
          "logic": "no-glitches-26",
          "seed": 929743,
          "goal": "ganon",
          "build": "2017-08-11",
          "mode": "standard"
      }
  }`));
  */

    var output = slog.convertNormalToShort(JSON.parse(seeds.arr[Math.floor(Math.random() * seeds.arr.length)]));

    var obj = slog.convertShortToNormal(output);
    this.gameService.loadSeed(output);
  }
}
