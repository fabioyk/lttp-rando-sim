import { ItemNames } from "../../log-parse/item-names.enum";

export class SpoilerLog {
  private seedNumLength = 9;
  private regionOrder = ['Light World', 'Hyrule Castle', 'Eastern Palace', 'Desert Palace', 'Death Mountain',
                         'Tower Of Hera', 'Castle Tower', 'Dark World', 'Dark Palace', 'Swamp Palace',
                         'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower']

  public convertNormalToShort(log) {
    var output = '';

    output += this.formatNumber(log.meta.seed, this.seedNumLength);

    var code;
    switch(log.meta.difficulty) {
      case 'normal':
      default:
        code = '0';
        break;      
    }
    output += code;

    switch(log.meta.variation) {
      case 'none':
      default:
        code = '0';
        break;      
    }
    output += code;

    switch(log.meta.logic) {
      case 'no-glitches-26':
      default:
        code = '0';
        break;      
    }
    output += code;

    switch(log.meta.goal) {
      case 'ganon':
      default:
        code = '0';
        break;      
    }
    output += code;

    switch(log.meta.mode) {
      case 'standard':
      default:
        code = '0';
        break;      
    }
    output += code;

    switch(log.Special['Misery Mire Medallion']) {
      case 'Bombos': code = '0'; break;
      case 'Ether': code = '1'; break;
      case 'Quake': code = '2'; break;      
    }
    switch(log.Special['Turtle Rock Medallion']) {
      case 'Bombos': code += '0'; break;
      case 'Ether': code += '1'; break;
      case 'Quake': code += '2'; break;      
    }
    output += code;

    output += '0000000000000';

    var itemNames = new ItemNames();

    this.regionOrder.forEach(regionName => {
      Object.keys(log[regionName]).forEach(locationName => {
        var itemNum = itemNames[log[regionName][locationName]];
        
        if (itemNum) {
          output += this.formatNumber(itemNum, 3);
        } else {
          console.log('Error when parsing ' + log[regionName][locationName] + ' at ' + locationName);
        }
      });
    });

    return output;
  }

  public convertShortToNormal(log:string) {
    var obj:any = {};
    var itemNames = new ItemNames();
    
    obj.seed = log.substr(0, 9);
    obj.difficulty = log.substr(9, 1);
    obj.variation = log.substr(10, 1);
    obj.logic = log.substr(11, 1);
    obj.goal = log.substr(12, 1);
    obj.mode = log.substr(13, 1);
    obj.mmMedallion = log.substr(14, 1);
    obj.trMedallion = log.substr(15, 1);
    var locStr = log.substr(29);
    var locArr = [];
    for (var i = 0; i < locStr.length / 3; i++) {
      locArr.push(itemNames.getItem(+locStr.substr(i*3, 3)));
    }
    obj.locations = locArr;

    return obj;
  }

  formatNumber(num:number, len:number) {
    return '0'.repeat(len - num.toString().length) + num.toString();
  }
}
