import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { NodeComponent } from './node/node.component';
import { TextBarComponent } from './text-bar/text-bar.component';
import { DungeonItemsComponent } from './dungeon-items/dungeon-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MapComponent, NodeComponent, TextBarComponent, DungeonItemsComponent],
  exports: [MapComponent]  
})
export class MapModule { }
