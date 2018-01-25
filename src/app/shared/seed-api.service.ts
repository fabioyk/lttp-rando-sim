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
  private webVersion = '1.2';

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
    
    // var tempSeed = { seed: 100008649,
    //   logic: 'no-glitches-28',
    //   variation: 'key-sanity',
    //   difficulty: 'normal',
    //   goal: 'ganon',
    //   mode: 'open',
    //   data: '10000864901001200000000000000008013120222017122235014237201127017008234017011002217210213126223100125222106233203017226151016013102009220013217232150015206202017224006225121119118013209007016004017013006017017136151015205102013109223218224124014152110117015218248116014017153015153218015003249218007008017008104112013017013015251224012216008013247008153224013017008013017006211102223017013002016208103207013002153102007135212242016013225015001107015236007018015017014229017246131017013231221128013220014130002015114008218132225017113244134218004245220013013108008241013006101006115017129215240123006250150017013228013002013111013004238152017006219013004012008017152225017004105017017227002004133017017016017' }

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
