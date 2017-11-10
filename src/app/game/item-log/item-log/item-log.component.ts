import { Component, OnInit, DoCheck, Input, IterableDiffers, IterableDiffer } from '@angular/core';
import { ItemLogEntry } from '../item-log-entry';
import { Items } from '../../game-data/items';
import { ItemNamesService } from '../../../log-parse/item-names.service';

@Component({
  selector: 'app-item-log',
  templateUrl: './item-log.component.html',
  styleUrls: ['./item-log.component.css']
})
export class ItemLogComponent implements OnInit {
  @Input() itemLogList:ItemLogEntry[];
  @Input() items:Items;

  static isOnlyImportantShown;

  iterableDiffer:IterableDiffer<{}>;

  constructor(private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    ItemLogComponent.isOnlyImportantShown = false;
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.itemLogList);
    if (changes) {
      console.log(this.itemLogList);
    }
  }

  onToggleImportant() {
    ItemLogComponent.isOnlyImportantShown = !ItemLogComponent.isOnlyImportantShown;
  }

  filterList(logEntry:ItemLogEntry) {
    if (ItemLogComponent.isOnlyImportantShown) {
      if (logEntry.type === 'view') {
        return true;
      } else {
        return (ItemNamesService.isTrackableItem(+logEntry.item));  
      }      
    } else {
      return true;
    }
    
  }

}
