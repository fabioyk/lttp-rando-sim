import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { CurrentStatus } from './current-status';


@Injectable()
export class WebsocketService {

  // Our socket connection
  private socket;

  public initSocket(): void {
    this.socket = socketIo('http://localhost:5000');
  }

  public sendStatus(status: CurrentStatus): void {
    this.socket.emit('status', status);
  }

  public sendStartVoting():void {
    this.socket.emit('mode-voting');
  }

  public sendGameMode(gameMode:string):void {
    this.socket.emit('game-mode', gameMode);
  }

  public onMessage(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('option', (data: string) => observer.next(data));
    });
  }

  public onCommand(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('command', (data: string) => observer.next(data));
    });
  }

  public onGetModeVotes(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('votes', (data: string) => observer.next(data));
    });
  }

  public onEndVotes(): Observable<string> {
    return new Observable<string>(observer => {
        this.socket.on('votes-end', (data: string) => observer.next(data));
    });
  }

/*
  public onEvent(event: Event): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }
*/
}