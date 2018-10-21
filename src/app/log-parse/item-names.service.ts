import { Injectable } from '@angular/core';
import { Items } from '../game/game-data/items';

class ItemDescription {
  id: number;
  shortName: string;
  longName: string;
};

@Injectable()
export class ItemNamesService {
  itemNames:ItemDescription[] = [];
  initialized = false;
  static dungeonItemNames = ['smallKey', 'bigKey', 'map', 'compass'];

  constructor() { }

  init() {
    this.itemNames = [];
    // Trash Items (1~99)
    this.itemNames.push({
      id: 1,
      shortName: '10arrowUpgrade',
      longName: 'Arrow Upgrade (10)'
    });
    this.itemNames.push({
      id: 2,
      shortName: '5arrowUpgrade',
      longName: 'Arrow Upgrade (5)'
    });
    this.itemNames.push({
      id: 3,
      shortName: '10bombUpgrade',
      longName: 'Bomb Upgrade (10)'
    });
    this.itemNames.push({
      id: 4,
      shortName: '5bombUpgrade',
      longName: 'Bomb Upgrade (5)'
    });
    this.itemNames.push({
      id: 6,
      shortName: '50rupees',
      longName: 'Fifty Rupees'
    });
    this.itemNames.push({
      id: 7,
      shortName: '5rupees',
      longName: 'Five Rupees'
    });
    this.itemNames.push({
      id: 8,
      shortName: 'heartContainer',
      longName: 'Heart Container'
    });
    this.itemNames.push({
      id: 9,
      shortName: 'heartContainer',
      longName: 'Heart Container (refill)'
    });
    this.itemNames.push({
      id: 11,
      shortName: '100rupees',
      longName: 'One Hundred Rupees'
    });
    this.itemNames.push({
      id: 12,
      shortName: '1rupee',
      longName: 'One Rupee'
    });
    this.itemNames.push({
      id: 13,
      shortName: 'pieceHeart',
      longName: 'Piece of Heart'
    });
    this.itemNames.push({
      id: 14,
      shortName: '10arrows',
      longName: 'Ten Arrows'
    });
    this.itemNames.push({
      id: 15,
      shortName: '3bombs',
      longName: 'Three Bombs'
    });
    this.itemNames.push({
      id: 16,
      shortName: '300rupees',
      longName: 'Three Hundred Rupees'
    });
    this.itemNames.push({
      id: 17,
      shortName: '20rupees',
      longName: 'Twenty Rupees'
    });
    this.itemNames.push({
      id: 18,
      shortName: 'singleArrow',
      longName: 'Single Arrow'
    });
    this.itemNames.push({
      id: 19,
      shortName: '10bombs',
      longName: 'Ten Bombs'
    });
    this.itemNames.push({
      id: 20,
      shortName: '20rupeesb',
      longName: 'Twenty Rupees'
    });

    // Trackable Items (100~149)
    this.itemNames.push({
      id: 100,
      shortName: 'bombos',
      longName: 'Bombos'
    });
    this.itemNames.push({
      id: 101,
      shortName: 'book',
      longName: 'Book of Mudora'
    });
    this.itemNames.push({
      id: 102,
      shortName: 'bottle',
      longName: 'Bottle'
    });
    this.itemNames.push({
      id: 103,
      shortName: 'bow',
      longName: 'Bow'
    });
    this.itemNames.push({
      id: 104,
      shortName: 'net',
      longName: 'Bug Catching Net'
    });
    this.itemNames.push({
      id: 105,
      shortName: 'byrna',
      longName: 'Cane of Byrna'
    });
    this.itemNames.push({
      id: 106,
      shortName: 'somaria',
      longName: 'Cane of Somaria'
    });
    this.itemNames.push({
      id: 107,
      shortName: 'crystal1',
      longName: 'Crystal 1'
    });
    this.itemNames.push({
      id: 108,
      shortName: 'crystal2',
      longName: 'Crystal 2'
    });
    this.itemNames.push({
      id: 109,
      shortName: 'crystal3',
      longName: 'Crystal 3'
    });
    this.itemNames.push({
      id: 110,
      shortName: 'crystal4',
      longName: 'Crystal 4'
    });
    this.itemNames.push({
      id: 111,
      shortName: 'crystal5',
      longName: 'Crystal 5'
    });
    this.itemNames.push({
      id: 112,
      shortName: 'crystal6',
      longName: 'Crystal 6'
    });
    this.itemNames.push({
      id: 113,
      shortName: 'crystal7',
      longName: 'Crystal 7'
    });
    this.itemNames.push({
      id: 114,
      shortName: 'ether',
      longName: 'Ether'
    });
    this.itemNames.push({
      id: 115,
      shortName: 'fireRod',
      longName: 'Fire Rod'
    });
    this.itemNames.push({
      id: 116,
      shortName: 'flippers',
      longName: 'Flippers'
    });
    this.itemNames.push({
      id: 117,
      shortName: 'flute',
      longName: 'Flute'
    });
    this.itemNames.push({
      id: 118,
      shortName: 'halfMagic',
      longName: 'Half Magic'
    });
    this.itemNames.push({
      id: 119,
      shortName: 'hammer',
      longName: 'Hammer'
    });
    this.itemNames.push({
      id: 120,
      shortName: 'hookshot',
      longName: 'Hookshot'
    });
    this.itemNames.push({
      id: 121,
      shortName: 'iceRod',
      longName: 'Ice Rod'
    });
    this.itemNames.push({
      id: 122,
      shortName: 'lamp',
      longName: 'Lamp'
    });
    this.itemNames.push({
      id: 123,
      shortName: 'cape',
      longName: 'Magic Cape'
    });
    this.itemNames.push({
      id: 124,
      shortName: 'mirror',
      longName: 'Magic Mirror'
    });
    this.itemNames.push({
      id: 125,
      shortName: 'powder',
      longName: 'Magic Powder'
    });
    this.itemNames.push({
      id: 126,
      shortName: 'moonPearl',
      longName: 'Moon Pearl'
    });
    this.itemNames.push({
      id: 127,
      shortName: 'mushroom',
      longName: 'Mushroom'
    });
    this.itemNames.push({
      id: 128,
      shortName: 'boots',
      longName: 'Pegasus Boots'
    });
    this.itemNames.push({
      id: 129,
      shortName: 'pendantCourage',
      longName: 'Pendant of Courage'
    });
    this.itemNames.push({
      id: 130,
      shortName: 'pendantPower',
      longName: 'Pendant of Power'
    });
    this.itemNames.push({
      id: 131,
      shortName: 'pendantWisdom',
      longName: 'Pendant of Wisdom'
    });
    this.itemNames.push({
      id: 132,
      shortName: 'quake',
      longName: 'Quake'
    });
    this.itemNames.push({
      id: 133,
      shortName: 'shovel',
      longName: 'Shovel'
    });
    this.itemNames.push({
      id: 134,
      shortName: 'silvers',
      longName: 'Silver Arrows'
    });
    this.itemNames.push({
      id: 135,
      shortName: 'boomerang',
      longName: 'Boomerang'
    });
    this.itemNames.push({
      id: 136,
      shortName: 'magicBoomerang',
      longName: 'Magical Boomerang'
    });

    // Trackable Progressive Items (150~199)
    this.itemNames.push({
      id: 150,
      shortName: 'tunic',
      longName: 'Progressive Armor'
    });
    this.itemNames.push({
      id: 151,
      shortName: 'glove',
      longName: 'Progressive Glove'
    });
    this.itemNames.push({
      id: 152,
      shortName: 'shield',
      longName: 'Progressive Shield'
    });
    this.itemNames.push({
      id: 153,
      shortName: 'sword',
      longName: 'Progressive Sword'
    });

    // Dungeon Items (200~250)
    this.itemNames.push({
      id: 201,
      shortName: 'bigKey-1',
      longName: 'Eastern Palace Big Key'
    });
    this.itemNames.push({
      id: 202,
      shortName: 'bigKey-2',
      longName: 'Desert Palace Big Key'
    });
    this.itemNames.push({
      id: 203,
      shortName: 'bigKey-3',
      longName: 'Tower of Hera Big Key'
    });
    this.itemNames.push({
      id: 205,
      shortName: 'bigKey-5',
      longName: 'Palace of Darkness Big Key'
    });
    this.itemNames.push({
      id: 206,
      shortName: 'bigKey-6',
      longName: 'Swamp Palace Big Key'
    });
    this.itemNames.push({
      id: 207,
      shortName: 'bigKey-7',
      longName: 'Skull Woods Big Key'
    });
    this.itemNames.push({
      id: 208,
      shortName: 'bigKey-8',
      longName: 'Thieves Town Big Key'
    });
    this.itemNames.push({
      id: 209,
      shortName: 'bigKey-9',
      longName: 'Ice Palace Big Key'
    });
    this.itemNames.push({
      id: 210,
      shortName: 'bigKey-10',
      longName: 'Misery Mire Big Key'
    });
    this.itemNames.push({
      id: 211,
      shortName: 'bigKey-11',
      longName: 'Turtle Rock Big Key'
    });
    this.itemNames.push({
      id: 212,
      shortName: 'bigKey-12',
      longName: 'Ganons Tower Big Key'
    });

    this.itemNames.push({
      id: 213,
      shortName: 'smallKey-0',
      longName: 'Sewers Key'
    });
    this.itemNames.push({
      id: 215,
      shortName: 'smallKey-2',
      longName: 'Desert Palace Key'
    });
    this.itemNames.push({
      id: 216,
      shortName: 'smallKey-3',
      longName: 'Tower of Hera Key'
    });
    this.itemNames.push({
      id: 217,
      shortName: 'smallKey-4',
      longName: 'Agahnims Tower Key'
    });
    this.itemNames.push({
      id: 218,
      shortName: 'smallKey-5',
      longName: 'Palace of Darkness Key'
    });
    this.itemNames.push({
      id: 219,
      shortName: 'smallKey-6',
      longName: 'Swamp Palace Key'
    });
    this.itemNames.push({
      id: 220,
      shortName: 'smallKey-7',
      longName: 'Skull Woods Key'
    });
    this.itemNames.push({
      id: 221,
      shortName: 'smallKey-8',
      longName: 'Thieves Town Key'
    });
    this.itemNames.push({
      id: 222,
      shortName: 'smallKey-9',
      longName: 'Ice Palace Key'
    });
    this.itemNames.push({
      id: 223,
      shortName: 'smallKey-10',
      longName: 'Misery Mire Key'
    });
    this.itemNames.push({
      id: 224,
      shortName: 'smallKey-11',
      longName: 'Turtle Rock Key'
    });
    this.itemNames.push({
      id: 225,
      shortName: 'smallKey-12',
      longName: 'Ganons Tower Key'
    });
    
    this.itemNames.push({
      id: 226,
      shortName: 'map-0',
      longName: 'Sewers Map'
    });
    this.itemNames.push({
      id: 227,
      shortName: 'map-1',
      longName: 'Eastern Palace Map'
    });
    this.itemNames.push({
      id: 228,
      shortName: 'map-2',
      longName: 'Desert Palace Map'
    });
    this.itemNames.push({
      id: 229,
      shortName: 'map-3',
      longName: 'Tower of Hera Map'
    });
    this.itemNames.push({
      id: 230,
      shortName: 'map-4',
      longName: 'Agahnims Tower Map'
    });
    this.itemNames.push({
      id: 231,
      shortName: 'map-5',
      longName: 'Palace of Darkness Map'
    });
    this.itemNames.push({
      id: 232,
      shortName: 'map-6',
      longName: 'Swamp Palace Map'
    });
    this.itemNames.push({
      id: 233,
      shortName: 'map-7',
      longName: 'Skull Woods Map'
    });
    this.itemNames.push({
      id: 234,
      shortName: 'map-8',
      longName: 'Thieves Town Map'
    });
    this.itemNames.push({
      id: 235,
      shortName: 'map-9',
      longName: 'Ice Palace Map'
    });
    this.itemNames.push({
      id: 236,
      shortName: 'map-10',
      longName: 'Misery Mire Map'
    });
    this.itemNames.push({
      id: 237,
      shortName: 'map-11',
      longName: 'Turtle Rock Map'
    });
    this.itemNames.push({
      id: 238,
      shortName: 'map-12',
      longName: 'Ganons Tower Map'
    });
    
    this.itemNames.push({
      id: 240,
      shortName: 'compass-1',
      longName: 'Eastern Palace Compass'
    });
    this.itemNames.push({
      id: 241,
      shortName: 'compass-2',
      longName: 'Desert Palace Compass'
    });
    this.itemNames.push({
      id: 242,
      shortName: 'compass-3',
      longName: 'Tower of Hera Compass'
    });
    this.itemNames.push({
      id: 244,
      shortName: 'compass-5',
      longName: 'Palace of Darkness Compass'
    });
    this.itemNames.push({
      id: 245,
      shortName: 'compass-6',
      longName: 'Swamp Palace Compass'
    });
    this.itemNames.push({
      id: 246,
      shortName: 'compass-7',
      longName: 'Skull Woods Compass'
    });
    this.itemNames.push({
      id: 247,
      shortName: 'compass-8',
      longName: 'Thieves Town Compass'
    });
    this.itemNames.push({
      id: 248,
      shortName: 'compass-9',
      longName: 'Ice Palace Compass'
    });
    this.itemNames.push({
      id: 249,
      shortName: 'compass-10',
      longName: 'Misery Mire Compass'
    });
    this.itemNames.push({
      id: 250,
      shortName: 'compass-11',
      longName: 'Turtle Rock Compass'
    });
    this.itemNames.push({
      id: 251,
      shortName: 'compass-12',
      longName: 'Ganons Tower Compass'
    });

    // Extra (271~299)
    this.itemNames.push({
      id: 270,
      shortName: 'triforce',
      longName: 'Triforce'
    });
    this.itemNames.push({
      id: 271,
      shortName: 'triforcePieces',
      longName: 'Triforce Piece'
    });
    
    // Dungeon Nodes (300+)
    this.itemNames.push({
      id: 300,
      shortName: 'flood',
      longName: 'Water Switch'
    });
    this.itemNames.push({
      id: 301,
      shortName: 'blind',
      longName: 'Rescued Blind'
    });
    this.itemNames.push({
      id: 302,
      shortName: 'tt-bomb',
      longName: 'Bombed the Floor'
    });
    this.itemNames.push({
      id: 303,
      shortName: 'switch',
      longName: 'Switch'
    });
    this.itemNames.push({
      id: 304,
      shortName: 'ip-switch-room',
      longName: 'Pushed the Block'
    });
    
    
    this.initialized = true;
  }

  static isItem(id:number) {
    return id >= 100;
  }

  static isDungeonItem(id:number) {
    return id >= 200 && id <= 250;
  }

  static isProgressiveItem(id:number) {
    return id >= 150 && id < 200;
  }

  static isTrackableItem(id:number) {
    return id >= 100;
  }

  getItemById(id:string):ItemDescription {
    if (!this.initialized) {
      this.init();
    }

    for (var i = 0; i < this.itemNames.length; i++) {
      if (this.itemNames[i].id === +id) {
        return this.itemNames[i];
      }
    }

    return {id: 0, shortName: id, longName: id};
  }

  getItemByShortName(shortName:string):ItemDescription {
    if (!this.initialized) {
      this.init();
    }

    for (var i = 0; i < this.itemNames.length; i++) {
      if (this.itemNames[i].shortName === shortName) {
        return this.itemNames[i];
      }
    }
    
    return null;
  }

  getItemByLongName(longName:string):ItemDescription {
    if (!this.initialized) {
      this.init();
    }

    for (var i = 0; i < this.itemNames.length; i++) {
      if (this.itemNames[i].longName === longName) {
        return this.itemNames[i];
      }
    }
    
    return null;
  }

  convertItemName(itemName:string, type:string, items:Items):[string, string] {
    var res = this.getItemById(itemName);
    var longName = res.longName, shortName = res.shortName;

    var modifier = type === 'view' ? 1 : 0;
    
    if (res.longName.indexOf('Progressive') > -1) {
      switch (res.shortName) {
        case 'glove':
          switch(items.glove + modifier) {
            case 1:
              longName = 'Power Gloves';
              break;
            case 2:
              longName = 'Titan Mitts';
              break;
          }
          shortName = 'glove' + (items.glove + modifier);
          break;
        case 'sword':
          switch(items.sword + modifier) {
            case 1:
              longName = 'Fighter Sword';
              break;
            case 2:
              longName = 'Master Sword';
              break;
            case 3:
              longName = 'Tempered Sword';
              break;
            case 4:
              longName = 'Golden Sword';
              break;
          }
          shortName = 'sword' + (items.sword + modifier);
          break;
        case 'tunic':
          switch(items.tunic + modifier) {
            case 2:
              longName = 'Blue Mail';
              break;
            case 3:
              longName = 'Red Mail';
              break;
          }
          shortName = 'tunic' + (items.tunic + modifier);
          break;
        case 'shield':
          switch(items.shield + modifier) {
            case 1:
              longName = 'Blue Shield';
              break;
            case 2:
              longName = 'Red Shield';
              break;
            case 3:
              longName = 'Mirror Shield';
              break;
          }
          shortName = 'shield' + (items.shield + modifier);
          break;        
      }
    }

    if (res.shortName === 'halfMagic') {
      switch(items.halfMagic + modifier) {
        case 1:
          longName = 'Half Magic';
          shortName = 'halfMagic';
          break;
        case 2:
          longName = 'Quarter Magic';
          shortName = 'quarterMagic';
          break;          
      }

    }

    if (res.shortName === 'bow') {
      shortName = 'bow' + (items.bow + modifier*2);
    }
    if (res.shortName === 'silvers') {
      shortName = 'bow1';
    }
    if (res.shortName === 'boomerang') {
      shortName = 'boomerang1';
    }
    if (res.shortName === 'magicBoomerang') {
      shortName = 'boomerang2';
    }

    if (res.shortName.indexOf('Agahnim') > -1) {
      shortName = 'agahnim1';
    }

    if (res.shortName.indexOf('crystal') > -1) {
      shortName = 'crystal';
    }
    return [shortName, longName];
  }

}
