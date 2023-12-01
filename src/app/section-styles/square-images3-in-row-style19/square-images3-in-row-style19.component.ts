import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-square-images3-in-row-style19',
  templateUrl: './square-images3-in-row-style19.component.html',
  styleUrls: ['./square-images3-in-row-style19.component.css']
})
export class SquareImages3InRowStyle19Component implements OnInit {

  @Input() sectionContent:any;
  @Input() pageId:string;

  constructor(
    private route:Router,
  ) { }

  ngOnInit() {
  }

  redirectToMenuChild(pageName:string,contentId:any){
    if(pageName=="Videos"){
      this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});
    }else if(pageName=="Music"){
      this.route.navigate(['./section/music-details'],{queryParams:{id:contentId}});
    }
  }
}
