import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemLogComponent } from './item-log/item-log.component';
import { ItemLineComponent } from './item-line/item-line.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemLogComponent, ItemLineComponent, SearchBoxComponent],
  exports: [ItemLogComponent]
})
export class ItemLogModule { }
