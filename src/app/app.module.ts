import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { AppComponent } from './app.component';
import { GameService } from './game/game-data/game-service.service';
import { GameModule } from './game/game.module';
import { GameComponent } from './game/game/game.component';
import { MainMenuComponent } from './main-menu/main-menu/main-menu.component';
import { MainMenuModule } from './main-menu/main-menu.module';
import { SharedModule } from './shared/shared.module';
import { SeedApiService } from './shared/seed-api.service';
import { HttpModule } from '@angular/http';
import { ItemNamesService } from './log-parse/item-names.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserModule, 
    GameModule,
    MainMenuModule,
    SharedModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: MainMenuComponent },
      { path: 'standard', component: GameComponent },
      { path: 'open', component: GameComponent },  
    ])
  ],
  providers: [GameService, SeedApiService, ItemNamesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
