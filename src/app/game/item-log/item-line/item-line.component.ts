import { Component, OnInit, Input } from '@angular/core';
import { ItemLogEntry } from '../item-log-entry';
import { ItemNamesService } from '../../../log-parse/item-names.service';
import { Items } from '../../game-data/items';

@Component({
  selector: 'app-item-line',
  templateUrl: './item-line.component.html',
  styleUrls: ['./item-line.component.css']
})
export class ItemLineComponent implements OnInit {
  @Input() itemLogEntry:ItemLogEntry;
  @Input() items:Items;
  shortName:string;
  longName:string;
  actionType:string;

  subText:string;
  textLine:string;

  bookLocations = ['Master Sword Pedestal', 'Ether Tablet', 'Bombos Tablet'];

  constructor(private _itemNamesService:ItemNamesService) { }

  ngOnInit() {
    if (this.itemLogEntry) {
      this.shortName = this.itemLogEntry.shortName;
      this.longName = this.itemLogEntry.longName;

      ItemNamesService.dungeonItemNames.forEach((eachItemName) => {
        if (this.shortName.indexOf(eachItemName) > -1) {
          if (this.itemLogEntry.type === 'view') {
            if (this.shortName.indexOf('bigKey') > -1 
                && this.bookLocations.indexOf(this.itemLogEntry.location) === -1) {
              this.longName = 'a Big Key';
            } else if (this.shortName.indexOf('smallKey') > -1
                && this.bookLocations.indexOf(this.itemLogEntry.location) === -1) {
              this.longName = 'a Small Key';
            } else if (this.shortName.indexOf('map') > -1) {
              this.longName = 'a Map';
            } else if (this.shortName.indexOf('compass') > -1) {
              this.longName = 'a Compass';
            } else {
              this.setSubText();
            }
          } else {
            this.setSubText();
          }
          this.shortName = eachItemName;
        }        
      });

      if (this.itemLogEntry.type === 'cant' || this.itemLogEntry.type === 'hint') {
        this.textLine = this.itemLogEntry.longName;
        return;
      }
    
      switch(this.itemLogEntry.type) {
        case 'get':
          this.actionType = 'Got';
          break;
        case 'view':
          this.actionType = 'Saw';
          break;
      }

      if (this.itemLogEntry.region === 'light-world') {
        this.itemLogEntry.region = 'Light World';
      } else if (this.itemLogEntry.region === 'dark-world') {
        this.itemLogEntry.region = 'Dark World';
      }
    }
    if (this.shortName.indexOf('agahnim') > -1 || this.shortName.indexOf('ganon') > -1) {
      this.textLine = 'Defeated ' + this.longName;
    } else if (this.shortName === 'switch') {
      this.textLine = 'Flipped Switch';
    } else if (this.shortName === 'flood') {
      this.textLine = 'Flooded Room';
    } else if (this.shortName === 'tt-bomb') {
      this.textLine = 'Destroyed the floor';
    } else if (this.shortName === 'blind') {
      this.textLine = 'Rescued Blind';
    } else if (this.shortName === 'ip-switch-room') {
      this.textLine = 'Pushed Block to the Switch';
    } else if (this.shortName === 'sign') {
      this.textLine = this.longName;    
    } else {
      this.textLine = this.actionType + ' ' + this.longName + ' in ' + this.itemLogEntry.location;
    }    
  }

  setSubText() {
    var dunIndex = this.shortName.split('-')[1];
    const dunSubTexts = ['HC', 'EP', 'DP', 'ToH', 'AT', 'PoD', 'SP', 'SW', 'TT', 'IP', 'MM', 'TR', 'GT'];
    this.subText = dunSubTexts[dunIndex];
  }

}
