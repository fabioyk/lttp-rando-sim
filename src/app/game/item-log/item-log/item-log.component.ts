import { Component, OnInit, DoCheck, Input, IterableDiffers, IterableDiffer } from '@angular/core';
import { ItemLogEntry } from '../item-log-entry';

@Component({
  selector: 'app-item-log',
  templateUrl: './item-log.component.html',
  styleUrls: ['./item-log.component.css']
})
export class ItemLogComponent implements OnInit {
  @Input() itemLogList:ItemLogEntry[];

  iterableDiffer:IterableDiffer<{}>;

  constructor(private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.itemLogList);
    if (changes) {
      console.log(this.itemLogList);
    }
  }

}
