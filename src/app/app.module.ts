import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
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
import { WindowRefService } from "./shared/window-ref.service";
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './info-pages/about/about.component';
import { InfoPagesModule } from './info-pages/info-pages.module';
import { SupportComponent } from './info-pages/support/support.component';
import { ChangelogComponent } from './info-pages/changelog/changelog.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule,
    BrowserModule, 
    GameModule,
    MainMenuModule,
    InfoPagesModule,
    SharedModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: MainMenuComponent },
      { path: 'standard', component: GameComponent },
      { path: 'open', component: GameComponent },  
      { path: 'keysanity', component: GameComponent },  
      { path: 'standard-rando', component: GameComponent }, 
      { path: 'inverted', component: GameComponent},
      { path: 'about', component: AboutComponent },
      { path: 'support', component: SupportComponent },
      { path: 'changelog', component: ChangelogComponent },
    ])
  ],
  providers: [GameService, SeedApiService, ItemNamesService, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
