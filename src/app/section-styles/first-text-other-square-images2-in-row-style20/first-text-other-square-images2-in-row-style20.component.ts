import { Component, OnInit,Input } from '@angular/core';
import {Router } from '@angular/router';
import { LocalStorageService } from '../../Services/local-storage.service';
declare var $: any;


@Component({
  selector: 'app-first-text-other-square-images2-in-row-style20',
  templateUrl: './first-text-other-square-images2-in-row-style20.component.html',
  styleUrls: ['./first-text-other-square-images2-in-row-style20.component.css']
})
export class FirstTextOtherSquareImages2InRowStyle20Component implements OnInit {
  defaultImage="assets/images/DefaultImages/Loader_180X270.gif";
  @Input() pageData:any;
  
  constructor(
    private route:Router,
    private _localStorageSerive: LocalStorageService,
    
  ) { }

  ngOnInit() {
    this._localStorageSerive.SetUpgradePreviousServiceCameFrom('music');
  }

  ImageLoaded(iterator){
    // console.log(iterator);
    $('.image-num-'+iterator).css({opacity:0});
    $('.image-num-placeholder-'+iterator).addClass('hidden');
    $('.image-num-'+iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
  UpdateNotFoundImage(iterator){
  
    $('.image-num-' + iterator).css({opacity:0});
    $('.image-num-'+iterator).attr('src','assets/images/not-found.png');
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  rediretMusicChildPage(contentId:any, itemtype : any){
    if(itemtype==1)
    {
    this._localStorageSerive.SetUpgradePreviousServiceCameFrom('music');
    this.route.navigate(['./section/music-details'],{queryParams:{id:contentId}});
    }
    else if(itemtype==2)
    {
      this._localStorageSerive.SetUpgradePreviousServiceCameFrom('music');
      this.route.navigate(['./section/video-details'],{queryParams:{id:contentId}});

      
    }

  }
}
