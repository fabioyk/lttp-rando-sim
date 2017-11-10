import { Component, OnInit, Input } from '@angular/core';
import { Items } from '../game-data/items';
import { Config } from '../game-data/config';

@Component({
  selector: 'app-end-stats',
  templateUrl: './end-stats.component.html',
  styleUrls: ['./end-stats.component.css']
})
export class EndStatsComponent implements OnInit {
  @Input() items:Items;
  @Input() config:Config;

  constructor() { }

  ngOnInit() {
  }

  getYItemCount():number {
    var counter = 0;

    var yItems = ['boomerang', 'magicBoomerang', 'hookshot', 'bombs', 'shovel', 'mushroom',
      'powder', 'fireRod', 'iceRod', 'bombos', 'ether', 'quake', 'lamp', 'hammer', 'flute', 'net',
      'book', 'somaria', 'byrna', 'cape', 'mirror'];

    yItems.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    counter += this.items.bottle;

    if (this.items.bow > 1) {
      counter++;
    }    

    return counter;
  }

  getOtherItemCount():number {
    var counter = 0;

    var otherItems = ['moonPearl', 'flippers', 'halfMagic', 'boots'];
    otherItems.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    counter += this.items.glove;

    return counter;
  }

  getPendantCount():number {
    var counter = 0;

    var list = ['pendantCourage', 'pendantPower', 'pendantWisdom'];
    list.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    return counter;
  }

  getCrystalCount():number {
    var counter = 0;

    var list = ['crystal1', 'crystal2', 'crystal3', 'crystal4', 'crystal5', 'crystal6', 'crystal7'];
    list.forEach((itemName) => {
      if (this.items[itemName]) {
        counter++;
      }
    });

    return counter;
  }

}
