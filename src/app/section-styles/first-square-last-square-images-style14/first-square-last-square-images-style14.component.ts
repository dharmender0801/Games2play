import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-first-square-last-square-images-style14',
  templateUrl: './first-square-last-square-images-style14.component.html',
  styleUrls: ['./first-square-last-square-images-style14.component.css']
})
export class FirstSquareLastSquareImagesStyle14Component implements OnInit {

  @Input() sectionContent:any;
  @Input() pageId:string;
  lastSectionContent:any;

  constructor(
    private route:Router,
  ) { }

  ngOnInit() {
    this.lastSectionContent=this.sectionContent.data.splice(this.sectionContent.data.length-1, 1);
  }

  redirectToMenuChild(pageName:string,contentId:any){
    if(pageName=="Videos"){
      this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});
    }else if(pageName=="Music"){
      this.route.navigate(['./section/music-details'],{queryParams:{id:contentId}});
    }
  }

}
