import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterServiceService {

  private actionSource = new Subject<boolean>();
  actionSourceObservable = this.actionSource.asObservable();


  private LoginConfirmedForVideoPlaySource = new Subject<boolean>();
  LoginConfirmedForVideoPlaySourceSourceObservable = this.LoginConfirmedForVideoPlaySource.asObservable();

  private LoginClikedHomePagePlaySource = new Subject<boolean>();
  LoginClikedHomePageSourceObservable = this.LoginClikedHomePagePlaySource.asObservable();
  constructor() { }

  EventEmittdForVideoPlay() {
    this.actionSource.next(true)
  }

  LoginConfirmedForVideoPlay(){
    this.LoginConfirmedForVideoPlaySource.next(true)
  }
  LoginClikedHomePage(){
    this.LoginClikedHomePagePlaySource.next(true)
  }

}
