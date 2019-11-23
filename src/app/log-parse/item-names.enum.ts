export class ItemNames {
  // Trash Items (1~99)  
  'Arrow Upgrade (10)' = 1;
  'Arrow Upgrade (5)' = 2;
  'Bomb Upgrade (10)' = 3;
  'Bomb Upgrade (5)' = 4;  
  'Fifty Rupees' = 6;
  'Five Rupees' = 7;
  'Heart Container' = 8;
  'Heart Container (refill)' = 9;  
  'One Hundred Rupees' = 11;
  'One Rupee' = 12;
  'Piece Of Heart' = 13;
  'Ten Arrows' = 14;
  'Three Bombs' = 15;
  'Three Hundred Rupees' = 16;
  'Twenty Rupees' = 17;
  'Arrow' = 18;

  // Trackable Items (100~149)
  'Bombos' = 100;
  'Book Of Mudora' = 101;
  'Bottle' = 102;
  'Bottle (Blue Potion)' = 102;
  'Bottle (Green Potion)' = 102;
  'Bottle (Red Potion)' = 102;  
  'Bottle (Fairy)' = 102;
  'Bottle (Bee)' = 102;
  'Bottle (Golden Bee)' = 102;
  'Bow' = 103;
  'Bug Catching Net' = 104;
  'Cane Of Byrna' = 105;
  'Cane Of Somaria' = 106;
  'Crystal 1' = 107;
  'Crystal 2' = 108;
  'Crystal 3' = 109;
  'Crystal 4' = 110;
  'Crystal 5' = 111;
  'Crystal 6' = 112;
  'Crystal 7' = 113;
  'Ether' = 114;
  'Fire Rod' = 115;
  'Flippers' = 116;
  'Flute' = 117;
  'Half Magic' = 118;
  'Hammer' = 119;
  'Hookshot' = 120;
  'Ice Rod' = 121;
  'Lamp' = 122;
  'Magic Cape' = 123;
  'Magic Mirror' = 124;
  'Magic Powder' = 125;
  'Moon Pearl' = 126;
  'Mushroom' = 127;
  'Pegasus Boots' = 128;
  'Pendant Of Courage' = 129;
  'Pendant Of Power' = 130;
  'Pendant Of Wisdom' = 131;
  'Quake' = 132;
  'Shovel' = 133;
  'Silver Arrows Upgrade' = 134;
  'Boomerang' = 135;
  'Magical Boomerang' = 136;

  // Trackable Progressive Items (150~199)
  'Progressive Armor' = 150;
  'Progressive Glove' = 151;
  'Progressive Shield' = 152;
  'Progressive Sword' = 153;
  'Progressive Bow' = 154;

  // Dungeon Items (200~203)
  'Desert Palace Big Key' = 200;
  'Desert Palace Compass' = 201;
  'Desert Palace Key' = 202;
  'Desert Palace Map' = 203;
  'Eastern Palace Big Key' = 200;
  'Eastern Palace Compass' = 201;
  'Eastern Palace Map' = 203;
  'Ganons Tower Big Key' = 200;
  'Ganons Tower Compass' = 201;
  'Ganons Tower Key' = 202;
  'Ganons Tower Map' = 203;
  'Ice Palace Big Key' = 200;
  'Ice Palace Compass' = 201;
  'Ice Palace Key' = 202;
  'Ice Palace Map' = 203;
  'Misery Mire Big Key' = 200;
  'Misery Mire Compass' = 201;
  'Misery Mire Key' = 202;
  'Misery Mire Map' = 203;
  'Palace of Darkness Big Key' = 200;
  'Palace of Darkness Compass' = 201;
  'Palace of Darkness Key' = 202;
  'Palace of Darkness Map' = 203;
  'Sewers Key' = 202;
  'Sewers Map' = 203;
  'Skull Woods Big Key' = 200;
  'Skull Woods Compass' = 201;
  'Skull Woods Key' = 202;
  'Skull Woods Map' = 203;
  'Swamp Palace Big Key' = 200;
  'Swamp Palace Compass' = 201;
  'Swamp Palace Key' = 202;
  'Swamp Palace Map' = 203;
  'Thieves Town Big Key' = 200;
  'Thieves Town Compass' = 201;
  'Thieves Town Key' = 202;
  'Thieves Town Map' = 203;
  'Tower of Hera Big Key' = 200;
  'Tower of Hera Compass' = 201;
  'Tower of Hera Key' = 202;
  'Tower of Hera Map' = 203;
  'Turtle Rock Big Key' = 200;
  'Turtle Rock Compass' = 201;
  'Turtle Rock Key' = 202;
  'Turtle Rock Map' = 203;
  'Key' = 202;

  isItem(id:number) {
    return id >= 100;
  }

  isDungeonItem(id:number) {
    return id >= 200 && id <= 203;
  }

  isProgressiveItem(id:number) {
    return id >= 150 && id < 200;
  }

  isTrackableItem(id:number) {
    return id >= 100 && id < 200;
  }

  getItem(id:number) {
    if (this.isDungeonItem(id)) {
      switch(id) {
        case 200: return 'Big Key';
        case 201: return 'Compass';
        case 202: return 'Key';
        case 203: return 'Map';
      }
    } else {
      var keys = Object.keys(this);
      for (var i=0; i<keys.length; i++) {
        if (this[keys[i]] === id) {
          return keys[i];          
        }
      }
    }
    
    console.log('Not found when getting item for id ' + id);
    return 'Null';
  }
}
