export class Config {
  trMedallion: string;
  mmMedallion: string;
  
  vtSeedNumber: number;
  difficulty: string;
  variation: string;
  logic: string;
  goal: string;
  mode: string;
  
  canGlitch: boolean;

  constructor() {
    this.canGlitch = false;

    this.trMedallion = 'ether';
    this.mmMedallion = 'ether';

    this.vtSeedNumber = 0;
    this.difficulty = 'normal';
    this.variation = 'none';
    this.logic = 'normal';
    this.goal = 'ganon';
    this.mode = 'standard';
  }
}
