import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { debug } from 'util';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-v2-search-bar',
  templateUrl: './v2-search-bar.component.html',
  styleUrls: ['./v2-search-bar.component.css']
})
export class V2SearchBarComponent implements OnInit {

  @Input() layout: string;
  @Input() searchCategory: string;

  @Output() searchValue = new EventEmitter<string>();
  @Output() searchCategoryEventEmmiter = new EventEmitter<string[]>();
  @Output()
  searchCategoryRemoveCurrentForAllSelectionEventEmmiter = new EventEmitter<
    string
  >();
  searchCategories: string[] = [];
  searchTerm: string;
  currentCategory: string;
  lang:string;
  categoryFilterWasSelected = false;
  selectAll = false;
  showSelectAll = false;
  SelectAllCategoryVideo = false;
  SelectAllCategoryMusic = false;
  SelectAllCategoryGames = false;
  counter = 0;
  routerIsHome = 0;
  routerIsVideos = 0;
  routerIsMusic = 0;
  routerIsGames = 0;
  selectSearchAll: string = 'unselected';
  constructor(private translate: TranslateService, private _router: Router, private _ngxSpinnerService: NgxSpinnerService) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.searchCategories = [];
    this.SearchTermFilterChanged("Games");
    if (localStorage.getItem('lang')=="ar" ){
      this.lang = "ar"
    }
    else{
      this.lang = "en";
    }
    //this.ActivePackCheck("Games");
  }

  SearchTermChanged(value) {
   
    console.log("value:::"+value);
    if (value.target.value) {
      const searchTerm: string = value.target.value;
      const regex = new RegExp(/\d/);
      const result = searchTerm.match(/./g);
      console.log("counter::"+this.counter);
      if (this.counter == 0) {
        if (this._router.url === "/Search/Home") {
          this.routerIsHome = 1;
          this.routerIsVideos = 0;
          this.routerIsMusic = 0;
          this.routerIsGames = 0;
          // if (!this.searchCategories.find(z => z == 'Videos')) {
          //   this.searchCategories.push('Videos');
          // }
          // if (!this.searchCategories.find(z => z == 'Music')) {
          //   this.searchCategories.push('Music');
          // }
          if (!this.searchCategories.find(z => z == 'Games')) {
            this.searchCategories.push('Games');
          }
        }
        else if (this._router.url === "/Search/Videos") {
          this.routerIsVideos = 1;
          this.routerIsHome = 0;
          this.routerIsMusic = 0;
          this.routerIsGames = 0;
          if (!this.searchCategories.find(z => z == 'Videos')) {
            this.searchCategories.push('Videos');
          }
        }
        else if (this._router.url === "/Search/Music") {
          this.routerIsMusic = 1;
          this.routerIsVideos = 0;
          this.routerIsHome = 0;
          this.routerIsGames = 0;
          if (!this.searchCategories.find(z => z == 'Music')) {
            this.searchCategories.push('Music');
          }
        }
        else {
          this.routerIsGames = 1;
          this.routerIsMusic = 0;
          this.routerIsVideos = 0;
          this.routerIsHome = 0;
          if (!this.searchCategories.find(z => z == 'Games')) {
            this.searchCategories.push('Games');
          }
        }
      }
      if (result.length >= 1) {

        this.searchTerm = searchTerm;
        this.searchValue.emit(searchTerm);
      }
      else {
        this.searchTerm = searchTerm;
        this.searchValue.emit(searchTerm);
      }
    }
    this.counter++;
   
  }
  SearchTermFilterChanged(category) {

    this._ngxSpinnerService.show();
    console.log(category);

    if (this.searchCategories.find(z => {
      return z === category
    })) { // If the category already exists then remove
      const url = '/Search/' + category
      if (this._router.url !== url) {
        this.searchCategories = this.searchCategories.filter(x => { if (x !== category) return x; });
        this._ngxSpinnerService.hide();
      }

    } else { // If the category does not exists then add
      this.searchCategories.push(category);
    }
    // this.selectSearchAll='singleselect';
    // this.currentCategory = category;

    // localStorage.setItem('SearchType',this.currentCategory)
    // this.currentCategory = this.currentCategory.toLowerCase();
    this.searchCategoryEventEmmiter.emit(this.searchCategories);
    this.routerIsHome = 0;
    this._ngxSpinnerService.hide();
    
  }

  ActivePackCheck(category) {
    if (this.searchCategories.find(z => z == category)) {
      return true;
    }
    else {
      return false;
    }
  }



  navigatehomefromsearchpage() {
    this._router.navigateByUrl("");
    $('.main_nav li').children().removeClass('menuHeighlight');
  }
  SelectedAllClicked() {
    this.selectAll = true;
  }
  UnselectedAllClicked() {
    this.selectAll = false;
  }
  UnSelectAllFunctionality(){
    this.searchCategories = [];
    this.routerIsGames = 0;
    this.routerIsHome = 0;
    this.routerIsMusic = 0;
    this.routerIsVideos = 0;
    this.searchCategoryEventEmmiter.emit(this.searchCategories);
  }
  SelectAllFunctionality() {
    this.searchCategories = [];

    this.searchCategories.push('Games');
    this.searchCategories.push('Music');
    this.searchCategories.push('Videos');
    this.searchCategoryEventEmmiter.emit(this.searchCategories);
    this.routerIsGames = 0;
    this.routerIsHome = 0;
    this.routerIsMusic = 0;
    this.routerIsVideos = 0;
    // this.selectAll = !this.selectAll;
    // if (this.selectAll) {
    //   this.selectSearchAll = 'selected';
    // }
    // else {
    //   this.selectSearchAll = 'unselected';
    //   this.currentCategory = '';
    // }
    // this.searchCategoryRemoveCurrentForAllSelectionEventEmmiter.emit('-1');
    // const searchTerm: string = this.searchTerm;
    // const regex = new RegExp(/\d/);

    // if (searchTerm != undefined) {
    //   const result = searchTerm.match(/./g);
    //   if (result.length >= 1) {
    //     if (this.searchTerm) {
    //       this.searchValue.emit(this.searchTerm);
    //     } else {
    //       this.searchValue.emit('');
    //     }
    //   }
    // }
    // else {
    //   this.searchValue.emit('');
    // }
  }
}
