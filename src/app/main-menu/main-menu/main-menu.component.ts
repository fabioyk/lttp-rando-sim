import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { SeedApiService } from '../../shared/seed-api.service';
import { Seed } from '../../shared/seed';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  shouldDisablePlay = false;
  modeSelected = 'standard';
  swordsSelected = 'randomized';
  goalSelected = 'ganon';
  diffSelected = 'normal';  
  glitchSelected = 'yes';
  variationSelected = 'none';
  mapSelected = 'no';
  seedNum = '';
  errorMessage = '';
  dailySeed = false;
  isAdvancedOWEnabled = 'inline-block';

  preloadedMap;
  preloadedBosses = [];
  preloadedIcons = [];

  lockedMode;
  lockedGlitch;
  lockedMap;

  constructor(private _seedService: SeedApiService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('swordsSelected')) {
      this.modeSelected = localStorage.getItem('modeSelected');
      this.swordsSelected = localStorage.getItem('swordsSelected');
      this.goalSelected = localStorage.getItem('goalSelected');
      this.diffSelected = localStorage.getItem('diffSelected');
      this.glitchSelected = localStorage.getItem('glitchSelected');
      this.variationSelected = localStorage.getItem('variationSelected');
    } else {
      localStorage.setItem('modeSelected', this.modeSelected);
      localStorage.setItem('swordsSelected', this.swordsSelected);
      localStorage.setItem('goalSelected', this.goalSelected);
      localStorage.setItem('diffSelected', this.diffSelected);
      localStorage.setItem('glitchSelected', this.glitchSelected);
      localStorage.setItem('variationSelected', this.variationSelected);
    }
    if (localStorage.getItem('mapSelected')) {
      this.mapSelected = localStorage.getItem('mapSelected');
    } else {
      localStorage.setItem('mapSelected', this.mapSelected);      
    }
    if (this.modeSelected === 'inverted') {
      this.mapSelected = 'no';
      this.isAdvancedOWEnabled = 'none';
    } else {
      this.isAdvancedOWEnabled = 'inline-block';
    }
      

    this._seedService.getStatus()
      .subscribe((status) => {
        if (!status) {
          this.errorMessage = 'Unable to connect to the server. Please try again later';
        } else {
          switch(status.type) {
            case 'error':
              this.errorMessage = status.msg;
              break;
            case 'warning':
              this.errorMessage = status.msg;
              break;
          }
        }
      }, error => {
        this.errorMessage = error;
      });
    setTimeout(() => {
      this.preloadMap();
    }, 1000);
    setTimeout(() => {
      this.preloadBosses();
    }, 3000);
    setTimeout(() => {
      this.preloadItems();
    }, 6000);
  }
 
  onDailySeedClick() {
    if (this.dailySeed) {
      this.seedNum = 'Today\'s Daily Seed';
    } else {
      this.seedNum = '';
    }
  }

  onSubmit() {
    this.shouldDisablePlay = true;
    this.lockedMode = this.modeSelected;
    this.lockedGlitch = this.glitchSelected;
    this.lockedMap = this.mapSelected;
    this.errorMessage = '';

    localStorage.setItem('modeSelected', this.modeSelected);
    localStorage.setItem('swordsSelected', this.swordsSelected);
    localStorage.setItem('goalSelected', this.goalSelected);
    localStorage.setItem('diffSelected', this.diffSelected);
    localStorage.setItem('variationSelected', this.variationSelected);
    localStorage.setItem('glitchSelected', this.glitchSelected);
    localStorage.setItem('mapSelected', this.mapSelected);    

    var queryParams:any = {  
    };
    if (this.swordsSelected !== 'randomized') {
      queryParams.swords = this.swordsSelected;
    }
    if (this.goalSelected !== 'ganon') {
      queryParams.goal = this.goalSelected;
    }
    if (this.diffSelected !== 'normal') {
      queryParams.diff = this.diffSelected;
    }
    if (this.variationSelected !== 'none') {
      queryParams.variation = this.variationSelected;
    }
    if (this.lockedGlitch === 'yes') {
      queryParams.minorGlitches = true;
    } 
    if (this.lockedMap === 'yes') {
      queryParams.fullMap = true;
    }   

    this.preloadedMap = null;
    this.preloadedIcons = null;
    this.preloadedBosses = null;

    var qParams:any = {};
    var canGlitch = false;
    if (queryParams.minorGlitches) {
      canGlitch = true;
    }
    if (queryParams.swords) {
      qParams.swords = queryParams.swords;
    } else {
      qParams.swords = 'randomized';
    }
    if (queryParams.goal) {
      qParams.goal = queryParams.goal;
    } else {
      qParams.goal = 'ganon';
    }
    if (queryParams.diff) {
      qParams.diff = queryParams.diff;
    } else {
      qParams.diff = 'normal';
    }
    if (queryParams.variation) {
      qParams.variation = queryParams.variation;
    } else {
      qParams.variation = 'none';
    }

    this._seedService.getSeed(this.lockedMode, qParams)
      .subscribe((seed) => {
        console.log('got it');
        if (!seed || seed.error) {
          this.errorMessage = seed.error;
          this.shouldDisablePlay = false;
        } else {
          this._router.navigate(['/' + this.modeSelected], {queryParams: queryParams});
        }
        this.preloadedMap = null;
        this.preloadedIcons = null;
        this.preloadedBosses = null;       
      }, error => {
        this.errorMessage = error;
        this.shouldDisablePlay = false;
      })
  }

  onIsInverted(isInverted:boolean) {
    if (isInverted) {
      this.mapSelected = 'no';
      this.isAdvancedOWEnabled = 'none';
    } else {
      this.isAdvancedOWEnabled = 'inline-block';
    }
  }

  preloadMap() {
    this.preloadedMap = new Image();
    this.preloadedMap.src = 'assets/light-world.png';
  }

  preloadBosses() {
    var iconsUrl = [
      'assets/dungeon-tracker-icons/boss02.png', 'assets/dungeon-tracker-icons/boss12.png', 
      'assets/dungeon-tracker-icons/boss22.png',
      'assets/dungeon-tracker-icons/boss32.png', 'assets/dungeon-tracker-icons/boss42.png',
      'assets/dungeon-tracker-icons/boss52.png', 'assets/dungeon-tracker-icons/boss62.png',
      'assets/dungeon-tracker-icons/boss72.png', 'assets/dungeon-tracker-icons/boss82.png',
      'assets/dungeon-tracker-icons/boss92.png', 
    ];
    this.preloadedBosses = [];
    iconsUrl.forEach((iconUrl, i) => {
      this.preloadedBosses[i] = new Image();
      this.preloadedBosses[i].src = iconUrl;
    })
  }

  preloadItems() {
    var iconsUrl = [
      'assets/item-icons/agahnim.png', 'assets/item-icons/bombos.png', 'assets/item-icons/book.png', 
      'assets/item-icons/boots.png', 'assets/item-icons/bottle.png', 'assets/item-icons/bow.png', 
      'assets/item-icons/byrna.png', 'assets/item-icons/cape.png', 'assets/item-icons/ether.png', 
      'assets/item-icons/fireRod.png', 'assets/item-icons/flippers.png', 'assets/item-icons/flute.png', 
      'assets/item-icons/glove.png', 'assets/item-icons/hammer.png', 'assets/item-icons/halfMagic.png', 
      'assets/item-icons/hookshot.png', 'assets/item-icons/iceRod.png', 'assets/item-icons/lamp.png', 
      'assets/item-icons/mirror.png', 'assets/item-icons/moonPearl.png', 'assets/item-icons/mushroom.png', 
      'assets/item-icons/net.png', 'assets/item-icons/powder.png', 'assets/item-icons/quake.png', 
      'assets/item-icons/somaria.png', 'assets/item-icons/shield.png', 'assets/item-icons/sword.png', 
      'assets/item-icons/tunic1.png', 'assets/dungeon-tracker-icons/medallion0.png', 'assets/dungeon-tracker-icons/dungeon0.png',
    ];

    this.preloadedIcons = [];
    iconsUrl.forEach((iconUrl, i) => {
      this.preloadedIcons[i] = new Image();
      this.preloadedIcons[i].src = iconUrl;
    })
  }

  redirect(target:string) {
    this._router.navigate(['/' + target]);
  }
}
