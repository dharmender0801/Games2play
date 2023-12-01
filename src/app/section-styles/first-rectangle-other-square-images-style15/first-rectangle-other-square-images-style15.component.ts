import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-first-rectangle-other-square-images-style15',
  templateUrl: './first-rectangle-other-square-images-style15.component.html',
  styleUrls: ['./first-rectangle-other-square-images-style15.component.css']
})
export class FirstRectangleOtherSquareImagesStyle15Component implements OnInit {

  @Input() sectionContent :any;
  @Input() pageId:string;
  firstSectionContent:any;
  defaultImage="assets/images/DefaultImages/Loader_384X270.gif";
  defaultImageBig="assets/images/DefaultImages/Loader_384X270.gif";
  constructor(
    private route:Router,
    private translate: TranslateService
  ) { if (localStorage.getItem('lang')=="ar" ){
    translate.setDefaultLang('ar');
  }
  else{
    translate.setDefaultLang('en');
  }}

  ngOnInit() {
   // this.firstSectionContent=this.sectionContent.data.splice(0, 1);

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
