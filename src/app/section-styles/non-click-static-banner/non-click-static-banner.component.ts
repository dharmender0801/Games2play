import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-non-click-static-banner',
  templateUrl: './non-click-static-banner.component.html',
  styleUrls: ['./non-click-static-banner.component.css']
})
export class NonClickStaticBannerComponent implements OnInit {

  sub :any;
  constructor(
    private acc:AppComponent,
    private _route:Router
  ) { }

  ngOnInit() {
  }

}
