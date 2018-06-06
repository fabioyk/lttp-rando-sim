export class NodeOption {
  constructor (public abbrev:string, public name:string) {

  }
}

export class CurrentStatus {
  public seed:number;
  public variation:string;
  public mode:string;
  public weapons:string;
  public options:NodeOption[];
  public gameStatus:string;

  constructor (seed:number, variation:string, mode:string,
    weapons:string, options:NodeOption[], gameStatus:string) {
    
  }
}
