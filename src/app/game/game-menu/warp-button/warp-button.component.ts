import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Items } from '../../game-data/items';

@Component({
  selector: 'app-warp-button',
  templateUrl: './warp-button.component.html',
  styleUrls: ['./warp-button.component.css']
})
export class WarpButtonComponent implements OnInit {
  @Input() items:Items;
  @Input() currentMap:string;
  @Output() onClickedWarp = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClickWarp() {
    this.onClickedWarp.emit('');
  }

}
