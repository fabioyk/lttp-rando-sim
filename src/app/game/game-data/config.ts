export class Config {
  trMedallion: string;
  mmMedallion: string;
  
  data: string;
  vtSeedNumber: number;
  difficulty: string;
  logic: string;
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

  constructor() {
    this.canGlitch = false;

    this.trMedallion = 'ether';
    this.mmMedallion = 'ether';

    this.vtSeedNumber = 0;
    this.difficulty = 'normal';
    this.logic = 'normal';
    this.goal = 'ganon';
    this.mode = 'standard';

    this.weapons = 'randomized';
    this.isFullMap = false;
    this.isMystery = false;

    this.hints = [];
    this.silversHint = '';

    this.isEnemizer = false;
    this.bosses = [];
    this.checkedBosses = [false, false, false, false, false, false, false, false, false, false];
    
    this.noLogic = false;
  }
}
