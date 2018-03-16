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
  private webVersion = '2.0';

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
    
    // var tempSeed = { seed: 565919495,
    //   logic: 'no-glitches-29',
    //   variation: 'none',
    //   difficulty: 'normal',
    //   goal: 'ganon',
    //   mode: 'standard',
    //   data: '56591949500000020000000000000017103016017008017015017153017015128101017013018004001017013013126004153152008151017002114004006115017119008013017100015153008019017013006008003117017013002008008121226125213016004240136201015227004108215202013228013241111007002013102150008105102017017013017013013229216203118242106113217217016017153013134014008017002013013002017013150009017014015006007015013017016011152218218151218205218231124013218218004014244110219014006017013013013245206232109246207116220233220220122107008208234123221015017247131152017248209012235222222112120223236210223223013249129237224224211012224017224250135015007130225238225102002127006132007006016225104251014225015133006017212017017017013013' }

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
