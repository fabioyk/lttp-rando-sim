import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { SeedApiService } from '../../shared/seed-api.service';
import { Seed } from '../../shared/seed';
import { WebsocketService } from '../../shared/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  seedNum = '';
  errorMessage = '';

  lockedMode;

  voteArr;

  voteSub:Subscription;
  endVoteSub:Subscription;

  constructor(private _seedService: SeedApiService,
              private _router: Router,
              private _route: ActivatedRoute,
              private wSocket:WebsocketService) { }

  ngOnInit() {
    this.voteArr = [0, 0, 0, 0];
    this.voteSub = this.wSocket.onGetModeVotes()
      .subscribe((voteStr:string) => {
        console.log('Received votes '+voteStr);
        var votes = voteStr.split(',');
        votes.forEach((eachVoteCount, i) => this.voteArr[i] += +eachVoteCount);
      });

    this.endVoteSub = this.wSocket.onEndVotes()
      .subscribe((voteStr:string) => {
        console.log('Received end votes '+voteStr);
        var votes = voteStr.split(',');
        votes.forEach((eachVoteCount, i) => this.voteArr[i] += +eachVoteCount);

        var maxI = 0, maxCount = this.voteArr[0];
        this.voteArr.forEach((count, i) => {
          if (count > maxCount) {
            maxI = i;
            maxCount = count;
          }
        });
        var howManyMax = 0;
        this.voteArr.forEach(count => {
          if (count === maxCount) {
            howManyMax++;
          }
        });
        var rnd = Math.floor(Math.random()*howManyMax);        
        this.voteArr.forEach((count, i) => {
          if (count === maxCount) {
            if (rnd === 0) {
              maxI = i;
            }
            rnd--;
          }
        });
        switch (maxI) {
          case 0:
            this.lockedMode = 'standard';
            this.wSocket.sendGameMode('Standard Classic');
            break;
          case 1:
            this.lockedMode = 'standard-rando';
            this.wSocket.sendGameMode('Standard Randomized Weapon');            
            break;
          case 2:
            this.lockedMode = 'open';
            this.wSocket.sendGameMode('Open');
            break;
          case 3:
            this.lockedMode = 'keysanity';
            this.wSocket.sendGameMode('Keysanity');
            break;
        }
        this.onSubmit();
      });

    this.setupForVoting();
    
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
      });
  }

  setupForVoting() {
    this.voteArr = [0, 0, 0, 0];

    this.wSocket.sendStartVoting();
  }
 
  onSubmit() {
    this.errorMessage = '';

    this._seedService.getSeed(this.lockedMode, '', false)
      .subscribe((seed) => {
        if (!seed || seed.error) {
          this.errorMessage = seed.error;
        } else {
          this.voteSub.unsubscribe();
          this.endVoteSub.unsubscribe();
          var queryParams:any = {
            seed: seed.seed
          };
          queryParams.minorGlitches = true;
          queryParams.fullMap = true;
          this._router.navigate(['/' + this.lockedMode], {queryParams: queryParams});
        }
      });
  }
}
