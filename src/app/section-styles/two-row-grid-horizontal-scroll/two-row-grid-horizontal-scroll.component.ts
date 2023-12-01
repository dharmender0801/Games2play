import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-two-row-grid-horizontal-scroll',
  templateUrl: './two-row-grid-horizontal-scroll.component.html',
  styleUrls: ['./two-row-grid-horizontal-scroll.component.css']
})
export class TwoRowGridHorizontalScrollComponent implements OnInit {

  @Input() sectionContent: any;
  constructor() { }

  ngOnInit() {
  }

}
