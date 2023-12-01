import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { debug } from 'util';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() layout: string;
  @Input() searchCategory: string;
  @Output() searchValue = new EventEmitter<string>();
  @Output() searchCategoryEventEmmiter = new EventEmitter<string>();
  @Output()
  searchCategoryRemoveCurrentForAllSelectionEventEmmiter = new EventEmitter<
    string
  >();
  searchTerm: string;
  currentCategory: string;
  categoryFilterWasSelected = false;
  selectAll = false;
  showSelectAll = false;
  selectSearchAll:string='unselected';
  constructor(private translate: TranslateService,  private _router: Router) {
    translate.setDefaultLang('en');
  }

  ngOnInit() {


    
   }

  SearchTermChanged(value) {
    
    if (value.target.value) {
      const searchTerm: string = value.target.value;
      const regex = new RegExp(/\d/);
      const result = searchTerm.match(/./g);
      if (result.length >= 1) {
      
        this.searchTerm = searchTerm;
        this.searchValue.emit(searchTerm);
       }
       else{
         this.searchTerm = searchTerm;
         this.searchValue.emit(searchTerm);
       }
    }
   
  }
  SearchTermFilterChanged(category) {
    
    this.selectSearchAll='singleselect';
    this.currentCategory = category;
   
    localStorage.setItem('SearchType',this.currentCategory)
    this.currentCategory = this.currentCategory.toLowerCase();
    this.searchCategoryEventEmmiter.emit(category);

  }

  navigatehomefromsearchpage()
  { 
    this._router.navigate(['']);
    $('.main_nav li').children().removeClass('menuHeighlight');
  }

  SelectAllFunctionality() {

    this.selectAll = !this.selectAll;
    if(this.selectAll)
    {
      this.selectSearchAll='selected';
    }
    else{
      this.selectSearchAll='unselected';
      this.currentCategory ='';
    }
    this.searchCategoryRemoveCurrentForAllSelectionEventEmmiter.emit('-1');
    const searchTerm: string = this.searchTerm;
    const regex = new RegExp(/\d/);
    
    if (searchTerm != undefined) {
      const result = searchTerm.match(/./g);
      if (result.length >= 1) {
        if (this.searchTerm) {
          this.searchValue.emit(this.searchTerm);
        } else {
          this.searchValue.emit('');
        }
      }
    }
    else
    {
      this.searchValue.emit('');
    }
  }
}
