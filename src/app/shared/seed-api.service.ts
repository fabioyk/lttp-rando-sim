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
  private webVersion = '3.1';

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

    // if (mode === 'inverted') {
    //   var tempSeed = { seed: 123456,
    //     logic: 'no-glitches-30',
    //     variation: 'none',
    //     difficulty: 'normal',
    //     goal: 'ganon',
    //     mode: 'inverted',
    //     weapons: 'randomized',
    //     data: '12345600003020000000000000117017013013104126015015128101012153015123014013003016016122153124017004017017135017153014015015014017017007004012008014013153013152017017013151017017004017150013013226006007213006127227201240013008129241102215202017228108100017009017013120008017017008013013006017203216016242229017130217217013013015011008002115014008013121016008016013006004007103013017119006002017004017218218218218218106002205218244231002133116131219008232007008114015206134245109233220015220018246220207112234208221247013151015013111222235105017248209222150113236223249118223210102223110224224001013237013136224224250211002107152225225017004125002102006225006013132013251019017238225212102017013152017017008' }
  
    //   return this._http.get('http://localhost:4200/')
    //     .map((response: Response) => {
    //       var seed = <Seed> tempSeed;
    //       this.lastSeedData = seed.data;
    //       this.lastSeedNum = seed.seed;        
    //       return seed;
    //     })
    //     .catch(this.handleError);
    // }
    
    
    
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
