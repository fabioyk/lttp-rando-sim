export class SpoilerLog {
  private seedNumLength = 9;
  private regionOrder = ['Light World', 'Hyrule Castle', 'Eastern Palace', 'Desert Palace', 'Death Mountain',
                         'Tower Of Hera', 'Castle Tower', 'Dark World', 'Dark Palace', 'Swamp Palace',
                         'Skull Woods', 'Thieves Town', 'Ice Palace', 'Misery Mire', 'Turtle Rock', 'Ganons Tower']

  public convertShortToNormal(log:string, seedNumber:number) {
    var obj:any = {};
    
    var buffer = seedNumber.toString().length;

    obj.seed = log.substr(0, buffer);
    obj.difficulty = log.substr(buffer, 1);
    obj.variation = log.substr(buffer+1, 1);
    obj.logic = log.substr(buffer+2, 1);
    obj.goal = log.substr(buffer+3, 1);
    obj.mode = log.substr(buffer+4, 1);
    obj.mmMedallion = log.substr(buffer+5, 1);
    obj.trMedallion = log.substr(buffer+6, 1);
    var locStr = log.substr(buffer+20);
    var locArr = [];
    for (var i = 0; i < locStr.length / 3; i++) {
      locArr.push((+locStr.substr(i*3, 3)).toString());
    }
    obj.locations = locArr;

    return obj;
  }

  formatNumber(num:number, len:number) {
    return '0'.repeat(len - num.toString().length) + num.toString();
  }
}
