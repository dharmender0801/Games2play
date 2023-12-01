import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-first-square-other-vertical-images-style13',
  templateUrl: './first-square-other-vertical-images-style13.component.html',
  styleUrls: ['./first-square-other-vertical-images-style13.component.css']
})
export class FirstSquareOtherVerticalImagesStyle13Component implements OnInit {
  
  @Input() sectionContent:any;
  @Input() pageId:string;
  firstSectionContent:any;
  defaultImage="assets/images/DefaultImages/Loader_180X270.gif";
  defaultImageBig="assets/images/DefaultImages/Loader_384X270.gif";
  constructor(
    private route:Router,
  ) { }

  ngOnInit() {
  //  this.firstSectionContent=this.sectionContent.data.splice(0, 1);
  
    this.firstSectionContent= this.sectionContent.data.filter(order => order.isSquare ==true);  
    this.sectionContent.data = this.sectionContent.data.filter(order => order.isSquare ==false);  
  }

  redirectToMenuChild(pageName:string,contentId:any){
    if(pageName=="Videos"){
      this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});
    }else if(pageName=="Music"){
      this.route.navigate(['./section/music-details'],{queryParams:{id:contentId}});
    }
  }
}
