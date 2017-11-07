export class Config {
  canFakeFlipper: boolean;
  canDarkRoom: boolean;
  canPassThroughSpikes: boolean;

  trMedallion: string;
  mmMedallion: string;
  
  vtSeedNumber: number;
  difficulty: string;
  variation: string;
  logic: string;
  goal: string;
  mode: string;

  constructor() {
    this.canFakeFlipper = true;
    this.canDarkRoom = true;
    this.canPassThroughSpikes = true;

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
