import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameMenuModule } from './game-menu/game-menu.module';
import { ItemLogModule } from './item-log/item-log.module';
import { ItemTrackerModule } from './item-tracker/item-tracker.module';
import { MapModule } from './map/map.module';
import { OptionsModule } from './options/options.module';
import { EndStatsComponent } from './end-stats/end-stats.component';

@NgModule({
  imports: [
    CommonModule,
    GameMenuModule,
    ItemLogModule,
    ItemTrackerModule,
    MapModule,
    OptionsModule
  ],
  declarations: [GameComponent, EndStatsComponent],
  exports: [GameComponent]
})
export class GameModule { }
