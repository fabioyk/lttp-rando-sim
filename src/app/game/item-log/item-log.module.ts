import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemLogComponent } from './item-log/item-log.component';
import { ItemLineComponent } from './item-line/item-line.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule } from '@angular/forms';
import { LogSearchPipe } from './log-search.pipe';
import { AlertModule, TabsModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  declarations: [ItemLogComponent, ItemLineComponent, SearchBoxComponent, LogSearchPipe],
  exports: [ItemLogComponent]
})
export class ItemLogModule { }
