import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { SpoilerLog } from './game/game-data/spoiler-log';
import { GameService } from './game/game-data/game-service.service';
import { seeds } from './temp/seeds';
import { WindowRefService } from "./shared/window-ref.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';

var self;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('footer') elementView: ElementRef;
  modalRef: BsModalRef;    
  title = 'app';
  footerHeight: number;  
  window: Window;
  isDarkTheme:boolean;
  buttonClass:string;
  
  constructor(private _windowRef: WindowRefService,
              private _modalService: BsModalService,
              private _router: Router) {
    this.window = _windowRef.nativeWindow;
  }

  ngOnInit() {
    self = this;
    this.buttonClass = 'fa fa-moon-o';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this._modalService.show(template);
  }

  onBackMainMenu() {
    this._router.navigate(['/']);    
  }

  onToggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      this.buttonClass = 'fa fa-sun-o';
    } else {
      this.buttonClass = 'fa fa-moon-o';
    }
  }
}
