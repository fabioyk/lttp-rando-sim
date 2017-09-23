import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameService } from './game/game-data/game-service.service';
import { GameModule } from './game/game.module';
import { GameComponent } from './game/game/game.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    GameModule,
    RouterModule.forRoot([
      { path: '', component: GameComponent }
    ])
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
