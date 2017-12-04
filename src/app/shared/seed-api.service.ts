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


@Injectable()
export class SeedApiService {
  private _apiUrl = 'https://lttp-rando-seed-api.glitch.me/';
  public lastSeedData:string;
  public lastSeedNum:number;

  constructor(private _http: Http) { }

  ping() {
    this._http.get(this._apiUrl);
  }

  getSeed(mode:String, seed:string, isDailySeed:boolean=false):Observable<Seed> {
    let queryUrl;
    if (isDailySeed) {
      queryUrl = this._apiUrl + 'api/daily?mode=' + mode;
    } else {
      queryUrl = this._apiUrl + 'api/seed?mode=' + mode;
      if (seed) {
        queryUrl += '&seed=' + seed;
      }
    }
    
    return this._http.get(queryUrl)
      .map((response: Response) => {
        var seed = <Seed> response.json();
        this.lastSeedData = seed.data;
        this.lastSeedNum = seed.seed;        
        return seed;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
