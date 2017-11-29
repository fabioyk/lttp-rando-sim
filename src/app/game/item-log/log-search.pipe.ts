import { Pipe, PipeTransform } from '@angular/core';
import { ItemLogEntry } from './item-log-entry';
import { ItemNamesService } from '../../log-parse/item-names.service';

@Pipe({
  name: 'logSearch',
  pure: false
})
export class LogSearchPipe implements PipeTransform {
  constructor(private _itemNamesService:ItemNamesService) {

  }

  transform(items: ItemLogEntry[], filterObj?: any): any {
    if (!items || !filterObj) {
      return items;
    }

    return items.filter(item => {
      if (filterObj.onlyImportantShown && !ItemNamesService.isTrackableItem(+item.item) && item.type !== 'view') {
        return false;
      } 
      if (filterObj.searchQuery != '') {        
        if (item.location.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
          return true;
        }
        if (item.region.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
          return true;
        }
        if (this._itemNamesService.getItemById(item.item).longName.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    });
  }

}
