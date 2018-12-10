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
    const importantActions = ['blind', 'tt-bomb', 'switch', 'flood', 'ip-switch-room', 'hintTile'];
console.log(items);
    return items.filter(item => {
      if (importantActions.includes(item.shortName) && filterObj.searchQuery === '') {
        return true;
      }
      if (filterObj.onlyImportantShown && item.longName.indexOf('Agahnim') === -1 && item.longName.indexOf('Ganon') === -1 && item.item !== 'hint' && !ItemNamesService.isTrackableItem(+item.item) && (item.type !== 'view' && item.type !== 'cant')) {
        return false;
      } 
      if (filterObj.searchQuery != '') {        
        if (item.location.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
          return true;
        }
        if (item.region.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
          return true;
        }
        if (item.type !== "view" || (!item.shortName.includes('smallKey') && !item.shortName.includes('bigKey') && !item.shortName.includes('map') && !item.shortName.includes('compass'))) {
          if (this._itemNamesService.getItemById(item.item).longName.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
            return true;
          }
          if (item.item.toLowerCase().indexOf(filterObj.searchQuery.toLowerCase()) > -1) {
            return true;
          }
        } else {
          return false;
        }        
        return false;
      } else {
        return true;
      }
    });
  }

}
