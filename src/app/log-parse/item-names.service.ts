import { Injectable } from '@angular/core';

class ItemDescription {
  id: number;
  shortName: string;
  longName: string;
};

@Injectable()
export class ItemNamesService {
  itemNames:ItemDescription[] = [];
  initialized = false;

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

    // Dungeon Items (200~203)
    this.itemNames.push({
      id: 200,
      shortName: 'bigKey',
      longName: 'Big Key'
    });
    this.itemNames.push({
      id: 201,
      shortName: 'compass',
      longName: 'Compass'
    });
    this.itemNames.push({
      id: 202,
      shortName: 'smallKey',
      longName: 'Small Key'
    });
    this.itemNames.push({
      id: 203,
      shortName: 'map',
      longName: 'Map'
    });

    // Dungeon Nodes (250~)
    this.itemNames.push({
      id: 250,
      shortName: 'flood',
      longName: 'Water Switch'
    });
    this.itemNames.push({
      id: 251,
      shortName: 'blind',
      longName: 'Rescued Blind'
    });
    this.itemNames.push({
      id: 252,
      shortName: 'tt-bomb',
      longName: 'Bombed the Floor'
    });
    this.itemNames.push({
      id: 253,
      shortName: 'switch',
      longName: 'Switch'
    });
    
    
    this.initialized = true;
  }

  static isItem(id:number) {
    return id >= 100;
  }

  static isDungeonItem(id:number) {
    return id >= 200 && id <= 203;
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

}
