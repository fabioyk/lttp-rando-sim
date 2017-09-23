import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemTrackerComponent } from './item-tracker/item-tracker.component';
import { TrackerNodeComponent } from './tracker-node/tracker-node.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ItemTrackerComponent, TrackerNodeComponent],
  exports: [ItemTrackerComponent]  
})
export class ItemTrackerModule { }
