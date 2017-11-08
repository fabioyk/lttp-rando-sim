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
  modeSelected = 'standard';
  seedNum = '';
  errorMessage = '';

  constructor(private _seedService: SeedApiService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this._seedService.ping();
    console.log('main menu');
  }

  onRadioChange(newMode) {
    this.modeSelected = newMode;
  }

  onSubmit() {
    console.log(this.modeSelected);
    console.log(this.seedNum);

    if (this.seedNum) {
      this._seedService.getSeed(this.modeSelected, +this.seedNum)
        .subscribe(this.getSeed);
    } else {
      this._seedService.getRandomSeed(this.modeSelected)
        .subscribe((seed) => {
          console.log(seed);
          console.log(this._router);
          this._router.navigate(['/' + this.modeSelected], {queryParams: {seed: seed.seed}});
      
        });
    }
    
  }

  getSeed(seed:Seed) {
    if (seed.error) {
      console.log(seed);
      this.errorMessage = seed.error;
    } else {
      console.log(seed);
      console.log(this._router);
      this._router.navigate(['/standard', seed]);
    }
  }

}
