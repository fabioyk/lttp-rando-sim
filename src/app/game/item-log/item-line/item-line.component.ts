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

  constructor(private _itemNamesService:ItemNamesService) { }

  ngOnInit() {
    if (this.itemLogEntry) {
      var res = this._itemNamesService.getItemById(this.itemLogEntry.item);
      this.shortName = res.shortName;
      this.longName = res.longName;
      var modifier = this.itemLogEntry.type === 'view' ? 1 : 0;
      switch(this.itemLogEntry.type) {
        case 'get':
          this.actionType = 'Got';
          break;
        case 'view':
          this.actionType = 'Saw';
          break;
      }

      if (this.longName.indexOf('Progressive') > -1) {
        switch (this.shortName) {
          case 'glove':
            switch(this.items.glove + modifier) {
              case 1:
                this.longName = 'Power Gloves';
                break;
              case 2:
                this.longName = 'Titan Mitts';
                break;
            }
            this.shortName = 'glove' + (this.items.glove + modifier);
            break;
          case 'sword':
            switch(this.items.sword + modifier) {
              case 1:
                this.longName = 'Fighter Sword';
                break;
              case 2:
                this.longName = 'Master Sword';
                break;
              case 3:
                this.longName = 'Tempered Sword';
                break;
              case 4:
                this.longName = 'Golden Sword';
                break;
            }
            this.shortName = 'sword' + (this.items.sword + modifier);
            break;
          case 'tunic':
            switch(this.items.tunic + modifier) {
              case 2:
                this.longName = 'Blue Mail';
                break;
              case 3:
                this.longName = 'Red Mail';
                break;
            }
            this.shortName = 'tunic' + (this.items.tunic + modifier);
            break;
          case 'shield':
            switch(this.items.shield + modifier) {
              case 1:
                this.longName = 'Blue Shield';
                break;
              case 2:
                this.longName = 'Red Shield';
                break;
              case 3:
                this.longName = 'Mirror Shield';
                break;
            }
            this.shortName = 'shield' + (this.items.shield + modifier);
            break;
        }
      }
//TODO gotta change if it's a view
      if (this.shortName === 'bow') {
        this.shortName = 'bow' + (this.items.bow + modifier*2);
      }
      if (this.shortName === 'silvers') {
        this.shortName = 'bow' + (this.items.bow + modifier);
      }

      if (this.shortName.indexOf('Agahnim') > -1) {
        this.shortName = 'agahnim1';
      }

      if (this.shortName.indexOf('crystal') > -1) {
        this.shortName = 'crystal';
      }

      if (this.itemLogEntry.region === 'light-world') {
        this.itemLogEntry.region = 'Light World';
      } else if (this.itemLogEntry.region === 'dark-world') {
        this.itemLogEntry.region = 'Dark World';
      }
    }
  }

}
