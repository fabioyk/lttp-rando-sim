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
  generationType = 'open'

  shouldDisablePlay = false;
  modeSelected = 'standard';
  swordsSelected = 'randomized';
  goalSelected = 'ganon';
  dungeonItemsSelected = 'standard';
  enemizerSelected = 'none';
  itemPlacementSelected = 'advanced';  
  accessibilitySelected = 'items'; 
  openTowerSelected = '7';
  openGanonSelected = '7';
  hintsSelected = "false";
  mapSelected = 'no';
  seedNum = '';
  errorMessage = '';
  dailySeed = false;
  autoSeed = true;
  isAdvancedOWEnabled = 'inline-block';

  preloadedMap;
  preloadedBosses = [];
  preloadedIcons = [];

  lockedMode;
  lockedGlitch;
  lockedMap;

  openCrystalOptions = [
    { id: '0', label: '0 Crystals'},
    { id: '1', label: '1 Crystal'},
    { id: '2', label: '2 Crystals'},
    { id: '3', label: '3 Crystals'},
    { id: '4', label: '4 Crystals'},
    { id: '5', label: '5 Crystals'},
    { id: '6', label: '6 Crystals'},
    { id: '7', label: '7 Crystals'},
    { id: 'random', label: 'Random'},
  ]

  constructor(private _seedService: SeedApiService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('defaultTab')) {
      this.generationType = localStorage.getItem('defaultTab');
    } else {
      this.generationType = 'open';
    }
    if (localStorage.getItem('swordsSelected')) {
      this.modeSelected = localStorage.getItem('modeSelected');
      this.swordsSelected = localStorage.getItem('swordsSelected');
      this.goalSelected = localStorage.getItem('goalSelected');
    } else {
      localStorage.setItem('modeSelected', this.modeSelected);
      localStorage.setItem('swordsSelected', this.swordsSelected);
      localStorage.setItem('goalSelected', this.goalSelected);
    }
    if (localStorage.getItem('mapSelected')) {
      this.mapSelected = localStorage.getItem('mapSelected');
    } else {
      localStorage.setItem('mapSelected', this.mapSelected);      
    }
    if (localStorage.getItem('enemizerSelected')) {
      this.enemizerSelected = localStorage.getItem('enemizerSelected');
    } else {
      localStorage.setItem('enemizerSelected', this.enemizerSelected);
    }
    if (localStorage.getItem('dungeonItemsSelected')) {
      this.dungeonItemsSelected = localStorage.getItem('dungeonItemsSelected');
      this.itemPlacementSelected = localStorage.getItem('itemPlacementSelected');
      this.accessibilitySelected = localStorage.getItem('accessibilitySelected');
      this.openTowerSelected = localStorage.getItem('openTowerSelected');
      this.openGanonSelected = localStorage.getItem('openGanonSelected');
      this.hintsSelected = localStorage.getItem('hintsSelected');
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
    this.lockedMap = this.mapSelected;
    this.errorMessage = '';
    var qParams:any = {};
    var queryParams:any = {};

    localStorage.setItem('defaultTab', this.generationType);

    if (this.lockedMap === 'yes') {
      queryParams.fullMap = true;
    }
    
    if (this.generationType === 'custom') {
      localStorage.setItem('modeSelected', this.modeSelected);
      localStorage.setItem('swordsSelected', this.swordsSelected);
      localStorage.setItem('goalSelected', this.goalSelected);
      localStorage.setItem('mapSelected', this.mapSelected);
      localStorage.setItem('enemizerSelected', this.enemizerSelected);
      localStorage.setItem('dungeonItemsSelected', this.dungeonItemsSelected);
      localStorage.setItem('itemPlacementSelected', this.itemPlacementSelected);
      localStorage.setItem('accessibilitySelected', this.accessibilitySelected);
      localStorage.setItem('openTowerSelected', this.openTowerSelected);
      localStorage.setItem('openGanonSelected', this.openGanonSelected);
      localStorage.setItem('hintsSelected', this.hintsSelected);      
  
      this.preloadedMap = null;
      this.preloadedIcons = null;
      this.preloadedBosses = null;

      // QueryParams (url params)
      if (this.itemPlacementSelected !== 'advanced') {
        queryParams.placement = this.itemPlacementSelected;
      }
      if (this.dungeonItemsSelected !== 'standard') {
        queryParams.dItems = this.dungeonItemsSelected;
      }
      if (this.accessibilitySelected !== 'items') {
        queryParams.accessibility = this.accessibilitySelected;
      }
      if (this.goalSelected !== 'ganon') {
        queryParams.goal = this.goalSelected;
      }
      if (this.openTowerSelected !== '7') {
        queryParams.tower = this.openTowerSelected;
      }
      if (this.openGanonSelected !== '7') {
        queryParams.ganon = this.openGanonSelected;
      }
      if (this.enemizerSelected !== 'none') {
        queryParams.enemizer = this.enemizerSelected;
      }
      if (this.hintsSelected !== 'off') {
        queryParams.hints = this.hintsSelected;
      }
      if (this.swordsSelected !== 'randomized') {
        queryParams.swords = this.swordsSelected;
      }
      
      if (this.lockedMap === 'yes') {
        queryParams.fullMap = true;
      }
       

      // qParams (API params)
      qParams.item_placement = this.itemPlacementSelected;
      qParams.dungeon_items = this.dungeonItemsSelected;
      qParams.accessibility = this.accessibilitySelected;
      qParams.goal = this.goalSelected;
      qParams.entry_crystals_tower = this.openTowerSelected;
      qParams.entry_crystals_ganon = this.openGanonSelected;
      qParams.mode = this.modeSelected;
      qParams.enemizer = this.enemizerSelected;
      qParams.hints = this.hintsSelected;
      qParams.weapons = this.swordsSelected;

      this._seedService.getSeed(this.lockedMode, qParams)
      .subscribe((seed) => {
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
    } else if (this.generationType === 'open') {      
      if (this.seedNum) {
        qParams.seed = this.seedNum;
      }      
      qParams.enemizer = 'none';
      this.errorMessage = 'The seed may take a few seconds to load. If it doesn\'t after 10s please reload the page and try again.';   

      this._seedService.getSeed(this.lockedMode, qParams, false, true)
      .subscribe((seed) => {
        if (!seed || seed.error) {
          this.errorMessage = seed.error;
          this.shouldDisablePlay = false;
        } else {
          if (this.autoSeed) {
            queryParams.seed = seed.seed;
            this._router.navigate(['/qual'], {queryParams: queryParams});
          } else {
            this._router.navigate(['/' + this.modeSelected], {queryParams: queryParams});
          }          
        }
        this.preloadedMap = null;
        this.preloadedIcons = null;
        this.preloadedBosses = null;       
      }, error => {
        this.errorMessage = error;
        this.shouldDisablePlay = false;
      })
    } else if (this.generationType === 'mystery') {
      this._seedService.getSeed('mystery', qParams)
      .subscribe((seed) => {
        if (!seed || seed.error) {
          this.errorMessage = seed.error;
          this.shouldDisablePlay = false;
        } else {
          this._router.navigate(['/mystery'], {queryParams: queryParams});
        }
        this.preloadedMap = null;
        this.preloadedIcons = null;
        this.preloadedBosses = null;       
      }, error => {
        this.errorMessage = error;
        this.shouldDisablePlay = false;
      })
    }
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
