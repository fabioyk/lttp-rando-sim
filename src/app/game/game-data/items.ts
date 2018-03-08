import { DungeonItems } from "./dungeon-items";
import { Config } from "./config";
import { DungeonData } from "./dungeon-data";
import { TrackerNodeComponent } from "../item-tracker/tracker-node/tracker-node.component";

export class Items {
  tunic = 1;
  sword = 0;
  shield = 0;
  moonPearl = false;
  bow = 0;
  boomerang = 0;
  hookshot = false;
  bombs = true;
  shovel = false;
  mushroom = false;
  powder = false;
  fireRod = false;
  iceRod = false;
  bombos = false;
  ether = false;
  quake = false;
  lamp = false;
  hammer = false;
  flute = false;
  net = false;
  book = false;
  bottle = 0;
  somaria = false;
  byrna = false;
  cape = false;
  mirror = false;
  boots = false;
  glove = 0;
  flippers = false;
  halfMagic = false;

  crystal1 = false;
  crystal2 = false;
  crystal3 = false;
  crystal4 = false;
  crystal5 = false;
  crystal6 = false;
  crystal7 = false;
  
  spSwitch = false;
  spFlooded = false;
  ttBlindDelivered = false;
  ttBombableFloor = false;
  mmSwitch = false;
  ipSwitch = false;
  ipBlockPushed = false;
  damFlooded = false;

  pendantCourage = false;
  pendantPower = false;
  pendantWisdom = false;

  agahnim = 0;
  agahnim2 = false;
  ganon = false;

  lwMapOpen = false;
  dwMapOpen = false;
  mmMedallionChecked = false;
  trMedallionChecked = false;

  hasPurpleChest = false;
  hasBigBomb = false;
  hasBlacksmiths = false;
  oldManRescued = false;
  blacksmithsRescued = false;
  isFluteActivated = false;

  currentRegionInMap = 0;

  isKeysanity:boolean;

  dungeonItemsArray:DungeonItems[] = [];

  stats = {
    totalCount: 0,
    overworldCount: 0,
    dungeonCount: 0,
    capacityUpgrades: 0,
    heartPieces: 0,
    heartContainers: 0,
    maps: 0,
    compasses: 0,
    sks: 0,
    bks: 0,
    bigChests: 0,
    bosses: 0,
    itemsPreGTBK: 0,
    totalItemsPreGTBK: 0,
    sword0B: 0,
    sword1B: 0,
    sword2B: 0,
    sword3B: 0,
    sword4B: 0,
    preBoots: 0,
    preMirror: 0,
    preFlute: 0,
    preGlove: 0,
    preMitts: 0,
    preBow: 0,
    prePearl: 0,
    preHammer: 0,
    preMS: 0,
    preFireRod: 0,
    preIceRod: 0,
    preHook: 0,
    preLamp: 0,
    preSomaria: 0,
    preFlippers: 0,
    preDW: 0,
    preGo: 0,
    preGanon: 0,
    startTime: 0,
    rupeeCount: 0
  }
  preEachDun = [];
  gtChestCount = 0;

  startingItemCount = [];

  visitedDungeon = [];

  constructor() {

  }
  
  setup(isKeysanity:boolean, dungeonsData:DungeonData[]) {
    this.isKeysanity = isKeysanity;

    if (!isKeysanity) {
      this.startingItemCount = [6, 3, 2, 2, 1, 5, 6, 2, 4, 3, 2, 6, 21];
      
    } else {
      this.startingItemCount = [8, 6, 6, 6, 3, 14, 10, 8, 8, 8, 8, 13, 28];
    }

    DungeonData.dungeonNames.forEach((dunName, index) => {
      if (index === 0) {
        this.dungeonItemsArray.push(new DungeonItems('Hyrule Castle', this.startingItemCount[0], ''));
      } else {
        this.dungeonItemsArray.push(new DungeonItems(dunName, this.startingItemCount[index], dungeonsData[index-1].dungeonPrize));        
      }
    })

    this.stats.startTime = Date.now();
    this.preEachDun = [0, 0, 0, 0, 0, 0, 0];
    this.visitedDungeon = [false, false, false, false, false, false, false, false, false, false];

    
  }

  add(itemName:string, region:string, isGroundKey:boolean = false) {
    if (!itemName) return;
    
    var notItemLocation = ['flood', 'blind', 'tt-bomb', 'switch', 'ip-switch-room',
      'crystal1', 'crystal2', 'crystal3', 'crystal4', 'crystal5', 'crystal6', 'crystal7',
      'pendantCourage', 'pendantPower', 'pendantWisdom', 'Agahnim', 'Agahnim 2'];
    var bossItems = ['crystal1', 'crystal2', 'crystal3', 'crystal4', 'crystal5', 'crystal6', 'crystal7',
    'pendantCourage', 'pendantPower', 'pendantWisdom', 'Agahnim', 'Agahnim 2', 'Ganon'];

    if (notItemLocation.indexOf(itemName) === -1) {
      this.stats.totalCount++;      
      if (region === 'Hyrule Castle' || DungeonData.dungeonsWithDunItemsCount.indexOf(region) > -1) {
        this.stats.dungeonCount++;
      } else {
        this.stats.overworldCount++;
      }
    }

    if (bossItems.indexOf(itemName) > -1 && !this[itemName]) {
      this.stats.bosses++;
      switch(this.sword) {
        case 0: this.stats.sword0B++; break;
        case 1: this.stats.sword1B++; break;
        case 2: this.stats.sword2B++; break;
        case 3: this.stats.sword3B++; break;
        case 4: this.stats.sword4B++; break;
      }
      if (itemName.indexOf('crystal') > -1) {
        this.preEachDun[+itemName.charAt(7)-1] = this.stats.totalCount;
      }
    }

    switch(itemName) {
      case 'bottle': this.bottle++; break;
      case 'bow': this.bow += 2; this.stats.preBow = this.stats.totalCount; break;
      case 'boomerang': this.boomerang++; break;
      case 'magicBoomerang': this.boomerang += 2; break;
      case 'mirror': this.mirror = true; this.stats.preMirror = this.stats.totalCount; break;
      case 'boots': this.boots = true; this.stats.preBoots = this.stats.totalCount; break;
      case 'flute': this.flute = true; this.stats.preFlute = this.stats.totalCount; break;
      case 'hammer': this.hammer = true; this.stats.preHammer = this.stats.totalCount; break;
      case 'fireRod': this.fireRod = true; this.stats.preFireRod = this.stats.totalCount; break;
      case 'iceRod': this.iceRod = true; this.stats.preIceRod = this.stats.totalCount; break;
      case 'flippers': this.flippers = true; this.stats.preFlippers = this.stats.totalCount; break;
      case 'somaria': this.somaria = true; this.stats.preSomaria = this.stats.totalCount; break;
      case 'lamp': this.lamp = true; this.stats.preLamp = this.stats.totalCount; break;
      case 'hookshot': this.hookshot = true; this.stats.preHook = this.stats.totalCount; break;
      case 'moonPearl': this.moonPearl = true; this.stats.prePearl = this.stats.totalCount; break;
      case 'silvers': this.bow += 1; break;
      case 'tunic': this.tunic++; break;
      case 'glove': this.glove++; 
        if (this.glove === 1) this.stats.preGlove = this.stats.totalCount;
        if (this.glove === 2) this.stats.preMitts = this.stats.totalCount; 
        break;
      case 'shield': this.shield++; break;
      case 'sword': this.sword++; if (this.sword === 2) this.stats.preMS = this.stats.totalCount;  break;
      case 'Agahnim': this.agahnim = 1; break;
      case 'Agahnim 2': this.agahnim2 = true; break;
      case 'pieceHeart': this.stats.heartPieces++; break;
      case 'heartContainer': this.stats.heartContainers++; break;
      case 'flood': this.spFlooded = true; break;
      case 'blind': this.ttBlindDelivered = true; break;
      case 'tt-bomb': this.ttBombableFloor = true; break;
      case 'Ganon': this.ganon = true; this.stats.preGanon = this.stats.totalCount; break;
      case 'switch':
        if (region === 'Swamp Palace') {
          this.spSwitch = !this.spSwitch;
        } else if (region === 'Misery Mire') {
          this.mmSwitch = !this.mmSwitch;
        } else if (region === 'Ice Palace') {
          this.ipSwitch = !this.ipSwitch;
        }
        break;
      case 'ip-switch-room': this.ipBlockPushed = true; break;      
      default:
        if (this[itemName] !== undefined) {
          this[itemName] = true;
        }        
    }    

    var dungeonItemNames = ['smallKey', 'bigKey', 'map', 'compass'];
    dungeonItemNames.forEach((dunItem) => {
      if (itemName.indexOf(dunItem) > -1) {
        this.addDungeonItem(itemName);
      }
    })

    if (this.stats.preDW === 0 && this.moonPearl && 
        (this.agahnim || (this.hammer && this.glove) || (this.glove === 2))) {
      this.stats.preDW = this.stats.totalCount;
    }

    if (region === 'Ganons Tower' && this.stats.itemsPreGTBK === 0) {
      this.gtChestCount++;
      if (itemName === 'bigKey-12') {
        this.stats.itemsPreGTBK = this.gtChestCount;
      }
    }

    if (itemName === 'bigKey-12') {
      this.stats.totalItemsPreGTBK = this.stats.totalCount;
    }

    if (itemName.indexOf('Upgrade') > -1) {
      this.stats.capacityUpgrades++;
    }

    const dungeonStuff = ['flood', 'blind', 'tt-bomb', 'switch', 'ip-switch-room'];
    if (!isGroundKey && itemName.indexOf('crystal') === -1 && itemName.indexOf('pendant') === -1 
        && itemName.indexOf('Agahnim 2') === -1 && itemName.indexOf('Ganon') === -1
        && dungeonStuff.indexOf(itemName) === -1 && DungeonData.dungeonsWithDunItemsCount.indexOf(region) > -1) {      
      if (!this.isKeysanity) {
        const dungeonItemsNames = ['bigKey', 'smallKey', 'map', 'compass'];
        var isDunItem = false;
        dungeonItemNames.forEach((dunItemName) => {
          if (itemName.indexOf(dunItemName) > -1) {
            isDunItem = true;          
          }
        });
        if (!isDunItem) {
          this.dungeonItemsArray[DungeonData.dungeonNames.indexOf(region)].itemsLeft--;      
          
        }
      } else {
        this.dungeonItemsArray[DungeonData.dungeonNames.indexOf(region)].itemsLeft--;
      }      
    }

    if (itemName.indexOf('rupee') > -1) {
      var num = +itemName.split('rupee')[0];
      this.stats.rupeeCount += num;
    }
    
  }

  addDungeonItem(itemName:string) {
    var dunItem = itemName.split('-')[0];
    var dunIndex = +itemName.split('-')[1];

    switch(dunItem) {
      case 'smallKey':
        this.dungeonItemsArray[dunIndex].smallKeys++;
        this.stats.sks++;
        break;
      case 'bigKey': 
        this.dungeonItemsArray[dunIndex].hasBigKey = true;
        this.stats.bks++;
        break;
      case 'map': 
        this.dungeonItemsArray[dunIndex].hasMap = true;
        this.stats.maps++;
        break;
      case 'compass': 
        this.dungeonItemsArray[dunIndex].hasCompass = true;
        this.stats.compasses++;
        break;
    }
  }

  remove(itemName:string, region:string) {
    switch(itemName) {
      case 'Mushroom': this.mushroom = false; break;
      case 'flood': this.spFlooded = false; break;
      case 'blind': this.ttBlindDelivered = false; break;
      case 'Key':
        this.dungeonItemsArray[DungeonData.dungeonNames.indexOf(region)].smallKeys--;
        break;      
    }
  }

  hasLightsource(config:Config) {
    return this.lamp || config.canGlitch;
  }
  hasBottle() {
    return this.bottle > 0;
  }
  hasBow() {
    return this.bow >= 2;
  }
  hasFiresource() {
    return this.lamp || this.fireRod;
  }
  hasMagicExtension(config:Config) {
    return this.halfMagic || this.bottle > 0 || config.canGlitch;
  }
  hasSilvers() {
    return this.bow >= 3;
  }
  hasMeltyPower() {
    return this.fireRod || this.bombos;
  }
  hasBeamReflection(config:Config) {
    return this.cape || this.byrna || this.shield === 3 || config.canGlitch;
  }
  hasInvincibilityItem(config:Config) {
    return this.cape || this.byrna || config.canGlitch;
  }
  hasMedallion(dungeon:string, config:Config) {
    if (this.ether && this.bombos && this.quake) {
      return true;
    } else {
      if (dungeon === 'mm' && this.mmMedallionChecked) {
        return this[config.mmMedallion];
      } else if (dungeon === 'tr' && this.trMedallionChecked) {
        return this[config.trMedallion];
      }
    }
    return false;    
  }


  canWestDeathMountain(isGlitched:boolean = false) {
    return this.flute || (this.glove && (this.lamp || isGlitched));
  }
  canEastDeathMountain(isGlitched:boolean = false) {
    return this.canWestDeathMountain(isGlitched) && (this.hookshot || (this.mirror && this.hammer));
  }
  canDarkEastDeathMountain(isGlitched:boolean = false) {
    return this.glove === 2 && this.canEastDeathMountain(isGlitched);
  }
  canDarkWestDeathMountain(isGlitched:boolean = false) {
    return this.canWestDeathMountain(isGlitched) && this.moonPearl;
  }
  canNorthEastDarkWorld(isGlitched:boolean = false) {
    return this.agahnim
      || (this.hammer && this.glove && this.moonPearl)
      || (this.glove === 2 && (this.flippers || (this.boots && isGlitched)) && this.moonPearl);
  }
  canNorthWestDarkWorld(isGlitched:boolean = false) {
    return (this.canNorthEastDarkWorld(isGlitched)
        && (this.hookshot && (this.hammer || this.glove || this.flippers))
        || (this.hammer && this.glove)
        || this.glove === 2)
      && this.moonPearl;
  }
  canSouthDarkWorld(isGlitched:boolean = false) {
    return this.moonPearl
      && ((this.canNorthEastDarkWorld(isGlitched) && (this.hammer
        || (this.hookshot && (this.flippers || this.glove))))
        || (this.hammer && this.glove)
        || this.glove === 2);
  }
  canMire() {
    return this.flute && this.glove === 2;
  }

  getDungeonItems(dungeon:string):DungeonItems {
    return this.dungeonItemsArray[DungeonData.allDungeonNames.indexOf(dungeon)];
  }
  getAllDungeonItems():any[] {
    var duns = [];
    DungeonData.crystalDungeonNames.forEach((dunName) => {
      duns.push({name: dunName, items: this.dungeonItemsArray[DungeonData.allDungeonNames.indexOf(dunName)]});
    })
    return duns;
  }
  visitDungeon(dunName:string):void {
    var dunIndex = DungeonData.crystalDungeonNames.indexOf(dunName);
    if (dunIndex > -1 && !this.isKeysanity) {
      this.visitedDungeon[dunIndex] = true;
      var dunFullListIndex = DungeonData.allDungeonNames.indexOf(dunName);
      if (this.dungeonItemsArray[dunFullListIndex].mapPrizeStatus === DungeonItems.UNKNOWN) {
        this.dungeonItemsArray[dunFullListIndex].listenThisMap();
      }
    }

    
  }
  hasVisitedDungeon(dunName:string):boolean {
    const trackedDunList = ['Eastern Palace', 'Desert Palace',
    'Tower of Hera', 'Palace of Darkness', 'Swamp Palace', 'Skull Woods',
    'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock'];

    if (trackedDunList.indexOf(dunName) > -1) {
      return this.visitedDungeon[trackedDunList.indexOf(dunName)];
    } else {
      return false;
    }
  }
  
}
