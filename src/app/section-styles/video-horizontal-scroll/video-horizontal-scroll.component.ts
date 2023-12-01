import { Component, OnInit,Input } from '@angular/core';


@Component({
  selector: 'app-video-horizontal-scroll',
  templateUrl: './video-horizontal-scroll.component.html',
  styleUrls: ['./video-horizontal-scroll.component.css']
})
export class VideoHorizontalScrollComponent implements OnInit {

  @Input() sectionContent: any;

  constructor(
    
  ) { }

  ngOnInit() {
   
  }

}
