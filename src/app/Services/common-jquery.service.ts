import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class CommonJqueryService {

  constructor() { }

  ImageLoaded() {
    $('.image-profile').css({opacity: 0});
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
  }

  UpdateNotFoundImage() {
    $('.image-profile').css({opacity:0});
    $('.image-profile').attr('src','assets/images/not-found.png');
    $('.image-num-placeholder').addClass('hidden');
    $('.image-profile').removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
  ImageLoadedWithIterator(iterator){
    // console.log(iterator);
    $('.image-num-'+ iterator).css({opacity: 0});
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
  UpdateNotFoundImageWithIterator(iterator){
    
    $('.image-num-' + iterator).css({opacity: 0});
    $('.image-num-' + iterator).attr('src', 'assets/images/not-found.png');
    $('.image-num-placeholder-' + iterator).addClass('hidden');
    $('.image-num-' + iterator).removeClass('hidden').animate({ opacity: 1 }, 1000);
  }
}
