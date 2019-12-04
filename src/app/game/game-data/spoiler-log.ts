import { SeedMetadata } from "./seed-metadata";

export class SpoilerLog {
  public static collectSeedMetadata(log:string):SeedMetadata {
    var obj:SeedMetadata = new SeedMetadata();
    
    var buffer = 20; // seed length

    obj.seed = log.substr(0, buffer);
    switch (log.substr(buffer, 1)) {
      case '0': obj.item_placement = 'basic'; break;
      case '1': obj.item_placement = 'advanced'; break;
    }
    switch (log.substr(buffer+1, 1)) {
      case '0': obj.dungeon_items = 'standard'; break;
      case '1': obj.dungeon_items = 'mc'; break;
      case '2': obj.dungeon_items = 'mcs'; break;
      case '3': obj.dungeon_items = 'full'; break;
    }
    switch (log.substr(buffer+2, 1)) {
      case '0': obj.accessibility = 'items'; break;
      case '1': obj.accessibility = 'locations'; break;
      case '2': obj.accessibility = 'none'; break;
    }    
    switch (log.substr(buffer+3, 1)) {
      case '0': obj.goal = 'ganon'; break;
      case '1': obj.goal = 'dungeons'; break;
      case '2': obj.goal = 'pedestal'; break;
      case '3': obj.goal = 'triforce'; break;
      case '4': obj.goal = 'fast_ganon'; break;
    }
    obj.entry_crystals_tower = log.substr(buffer+4, 1);
    obj.entry_crystals_ganon = log.substr(buffer+5, 1);
    switch (log.substr(buffer+6, 1)) {
      case '0': obj.mode = 'standard'; break;
      case '1': obj.mode = 'open'; break;
      case '2': obj.mode = 'inverted'; break;
    }
    switch (log.substr(buffer+7, 1)) {
      case '0': obj.enemizer = 'none'; break;
      case '1': obj.enemizer = 'simple'; break;
      case '2': obj.enemizer = 'full'; break;
      case '3': obj.enemizer = 'random'; break;
    }
    switch (log.substr(buffer+8, 1)) {
      case '0': obj.weapons = 'randomized'; break;
      case '1': obj.weapons = 'assured'; break;
      case '2': obj.weapons = 'vanilla'; break;
      case '3': obj.weapons = 'swordless'; break;
    }
    switch (log.substr(buffer+9, 1)) {
      case '0': obj.mmMedallion = 'bombos'; break;
      case '1': obj.mmMedallion = 'ether'; break;
      case '2': obj.mmMedallion = 'quake'; break;
    }
    switch (log.substr(buffer+10, 1)) {
      case '0': obj.trMedallion = 'bombos'; break;
      case '1': obj.trMedallion = 'ether'; break;
      case '2': obj.trMedallion = 'quake'; break;
    }    

    return obj;
  }
  
  formatNumber(num:number, len:number) {
    return '0'.repeat(len - num.toString().length) + num.toString();
  }
}
