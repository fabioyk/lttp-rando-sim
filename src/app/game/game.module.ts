import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { GameMenuModule } from './game-menu/game-menu.module';
import { ItemLogModule } from './item-log/item-log.module';
import { ItemTrackerModule } from './item-tracker/item-tracker.module';
import { MapModule } from './map/map.module';
import { OptionsModule } from './options/options.module';
import { EndStatsComponent } from './end-stats/end-stats.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TpLogComponent } from './tp-log/tp-log.component';
import { TpLogRedirectComponent } from './tp-log-redirect/tp-log-redirect.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule.forRoot(),
    GameMenuModule,
    ItemLogModule,
    ItemTrackerModule,
    FormsModule,
    MapModule,
    OptionsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'standard', component: GameComponent },
      { path: 'open', component: GameComponent },
      { path: 'standard-rando', component: GameComponent },    
      { path: 'log', component: TpLogComponent }  
    ])
  ],
  declarations: [GameComponent, EndStatsComponent, TpLogComponent, TpLogRedirectComponent],
  exports: [GameComponent]
})
export class GameModule { }
