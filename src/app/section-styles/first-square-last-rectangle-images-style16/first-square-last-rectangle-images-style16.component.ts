import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';

@Component({
  selector: 'app-first-square-last-rectangle-images-style16',
  templateUrl: './first-square-last-rectangle-images-style16.component.html',
  styleUrls: ['./first-square-last-rectangle-images-style16.component.css']
})
export class FirstSquareLastRectangleImagesStyle16Component implements OnInit {

  @Input() sectionContent :any;
  @Input() pageId:string;
  lastSectionContent:any;
  defaultImage="assets/images/DefaultImages/Loader_104X104.gif";
  defaultImageBig="assets/images/DefaultImages/Loader_384X270.gif";
  constructor(
    private route:Router,
  ) { }

  ngOnInit() {
   // this.lastSectionContent=this.sectionContent.data.splice(this.sectionContent.data.length-1, 1); 
   this.lastSectionContent= this.sectionContent.data.filter(order => order.isSquare ==true);  
   this.sectionContent.data = this.sectionContent.data.filter(order => order.isSquare ==false);  
  }

  redirectToMenuChild(pageName:string,contentId:any){
   
    if(pageName=="Videos"){
      this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});
    }else if(pageName=="Music"){
      this.route.navigate(['./section/music-details'],{queryParams:{id:contentId}});
    }
    else if(pageName=="Games"){
      this.route.navigate(['./section/game-details'],{queryParams:{id:contentId}});
    }
  }
}
