import { SeedMetadata } from "./seed-metadata";

export class Config {
  trMedallion: string;
  mmMedallion: string;
  
  data: string;
  vtSeedNumber: string;
  goal: string;
  mode: string;
  weapons: string;
  advancedItems: boolean;
  dungeonItems: string;
  accessibility: string;
  towerCrystals: number;
  ganonCrystals: number;
  towerCrystalsRequested: string;
  ganonCrystalsRequested: string;
  hintsEnabled: boolean;
  isMystery: boolean;

  canGlitch: boolean;
  isFullMap: boolean;

  noLogic: boolean;

  hints: string[];
  silversHint: string;

  isEnemizer: boolean;
  bosses: number[];
  checkedBosses: boolean[];

  constructor(seedNumber:string, seedMetaData:SeedMetadata, bosses: number[], 
      canGlitch:boolean, isFullMap:boolean) {
    this.canGlitch = canGlitch;
    this.vtSeedNumber = seedNumber;
    this.advancedItems = seedMetaData.item_placement === 'advanced';
    this.dungeonItems = seedMetaData.dungeon_items;
    this.accessibility = seedMetaData.accessibility;
    this.goal = seedMetaData.goal;
    this.ganonCrystals = +seedMetaData.entry_crystals_ganon;
    this.towerCrystals = +seedMetaData.entry_crystals_tower;
    console.log(seedMetaData);
    this.mode = seedMetaData.mode;
    this.isEnemizer = seedMetaData.enemizer !== 'none';
    this.weapons = seedMetaData.weapons;
    this.mmMedallion = seedMetaData.mmMedallion;
    this.trMedallion = seedMetaData.trMedallion;
    this.canGlitch = canGlitch;
    this.bosses = bosses;

    this.isFullMap = isFullMap;

    this.isMystery = false;

    this.hints = [];
    this.silversHint = '';

    this.checkedBosses = [false, false, false, false, false, false, false, false, false, false];
    
    this.noLogic = false;
  }
}
