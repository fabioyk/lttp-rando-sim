import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpoilerLog } from './game/game-data/spoiler-log';
import { GameService } from './game/game-data/game-service.service';
import { seeds } from './temp/seeds';
import { WindowRefService } from "./shared/window-ref.service";

var self;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('footer') elementView: ElementRef;
    
  title = 'app';
  footerHeight: number;  
  window: Window;
  
  constructor(private _windowRef: WindowRefService) {
    this.window = _windowRef.nativeWindow;
  }

  ngOnInit() {
    self = this;
  }

}
