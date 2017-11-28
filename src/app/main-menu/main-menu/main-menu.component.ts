import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
  glitchSelected = 'yes';
  seedNum = '';
  errorMessage = '';

  lockedMode;
  lockedGlitch;  

  constructor(private _seedService: SeedApiService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._seedService.ping();
  }

  onSubmit() {
    this.shouldDisablePlay = true;
    this.lockedMode = this.modeSelected;
    this.lockedGlitch = this.glitchSelected;

    if (this.seedNum) {
      this._seedService.getSeed(this.modeSelected, +this.seedNum)
        .subscribe(this.getSeed);
    } else {
      this._seedService.getRandomSeed(this.modeSelected)
        .subscribe((seed) => {
          if (seed && !seed.error) {
            this._router.navigate(['/' + this.modeSelected], {queryParams: {seed: seed.seed}});
          } else {
            this.errorMessage = seed.error;
            this.shouldDisablePlay = false;
          }          
        });
    }
    
  }

  getSeed(seed:Seed) {
    if (!seed || seed.error) {
      this.errorMessage = seed.error;
      this.shouldDisablePlay = false;
    } else {
      this._router.navigate(['/' + this.lockedMode, seed]);
    }
  }

}
