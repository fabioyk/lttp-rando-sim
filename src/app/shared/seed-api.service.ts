import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/observable/throw';
import { Seed } from './seed';
import { Status } from './status';
import { environment } from 'environments/environment';


@Injectable()
export class SeedApiService {  
  private _apiUrl = 'https://lttp-rando-seed-api.glitch.me/';
  public lastSeedData:string;
  public lastSeedNum:number;
  private webVersion = '1.3';

  constructor(private _http: Http) {
    if (environment.production) {
      this._apiUrl = 'https://lttp-rando-seed-api.glitch.me/';
    } else {
      this._apiUrl = 'https://lttp-rando-seed-api-dev.glitch.me/';
    }
  }

  ping() {
    this._http.get(this._apiUrl);
  }

  getSeed(mode:String, seed:string, isDailySeed:boolean=false):Observable<Seed> {
    let queryUrl;
    
    if (isDailySeed) {
      queryUrl = this._apiUrl + 'api/daily?v='+this.webVersion+'&mode=' + mode;
    } else {
      queryUrl = this._apiUrl + 'api/seed?v='+this.webVersion+'&mode=' + mode;
      if (seed) {
        queryUrl += '&seed=' + seed;
      }
    }  
    
    // var tempSeed = { seed: 25788212,
    //   logic: 'no-glitches-28',
    //   variation: 'none',
    //   difficulty: 'normal',
    //   goal: 'ganon',
    //   mode: 'open',
    //   data: '2578821200001100000000000000017117014013006015013103016015006015016008013013124121013015017128008151017004013015008006017004102106014019013016100017014007006008136151013017015017013008213132014013002226013101104153227240201017113017228215202241004107119153014126002116017153134013017017017017229242203002216123130217217006004152008002013013017013013008122017007011008017017135017006133013017017015016218218218218013009114231218218001244205102129219206007127245013015102232016109207220150233246220220004112017234115208221247015002131222120209004222235105248108013223249153223210223236111224118224237125211224250013008224102110013152017012225212013008017225012002152017225225007017150251013006017017003238' }

    // return this._http.get('http://localhost:4200/')
    //   .map((response: Response) => {
    //     var seed = <Seed> tempSeed;
    //     this.lastSeedData = seed.data;
    //     this.lastSeedNum = seed.seed;        
    //     return seed;
    //   })
    //   .catch(this.handleError);
    
    return this._http.get(queryUrl)
      .map((response: Response) => {
        var seed = <Seed> response.json();
        this.lastSeedData = seed.data;
        this.lastSeedNum = seed.seed;        
        return seed;
      })
      .catch(this.handleError);
  }

  getStatus():Observable<Status> {
    let queryUrl = this._apiUrl + 'api/status?v=' + this.webVersion;
    return this._http.get(queryUrl)
      .map((response: Response) => {
        var status = <Status> response.json();      
        return status;
      })
      .catch(this.handleError);
  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
