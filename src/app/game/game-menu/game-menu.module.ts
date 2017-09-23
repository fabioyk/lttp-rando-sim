import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { WarpButtonComponent } from './warp-button/warp-button.component';
import { PlaythroughButtonComponent } from './playthrough-button/playthrough-button.component';
import { OptionsButtonComponent } from './options-button/options-button.component';
import { ExploreAllButtonComponent } from './explore-all-button/explore-all-button.component';
import { ExitButtonComponent } from './exit-button/exit-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GameMenuComponent, WarpButtonComponent, PlaythroughButtonComponent, OptionsButtonComponent, ExploreAllButtonComponent, ExitButtonComponent],
  exports: [GameMenuComponent]  
})
export class GameMenuModule { }
