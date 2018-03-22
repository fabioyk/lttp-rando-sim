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
    
    // var tempSeed = { seed: 156191,
    //   logic: 'no-glitches-29',
    //   variation: 'none',
    //   difficulty: 'normal',
    //   goal: 'ganon',
    //   mode: 'standard',
    //   weapons: 'uncle',
    //   data: '15619100000000000000000000003153006014017017127013122017017119013115007017013017012013017014017126016017103008015017106015017009013017017013004101128015008153013013008013004014002102008226013015016213013012227240015013201152110006215241202228152131135016004013015006102151014100017017136008216013203242153229130217217105013019015008013104013013017008117008013007017120008002132001018150004118121015205218218218218231017218124125218013116244107219017002017151134206245232153111220207114220017233220246113008208247234017150221006129004013235209102248222222109223223236249223004210006108224250211224224237017006017102224017112013016225225225007016007212152017002133013011225017013238015251014017002123006' }

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
