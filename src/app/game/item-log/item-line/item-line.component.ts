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

  textLine:string;

  constructor(private _itemNamesService:ItemNamesService) { }

  ngOnInit() {
    if (this.itemLogEntry) {
      switch(this.itemLogEntry.type) {
        case 'get':
          this.actionType = 'Got';
          break;
        case 'view':
          this.actionType = 'Saw';
          break;
      }

      this.shortName = this.itemLogEntry.shortName;
      this.longName = this.itemLogEntry.longName;

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
    } else {
      this.textLine = this.actionType + ' ' + this.longName + ' in ' + this.itemLogEntry.location;
    }    
  }

}
