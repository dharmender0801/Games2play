import { SearchDataItem } from 'src/app/model/search/search-data-item';
import { Component, OnInit, Input } from '@angular/core';
import { ResultDataItem } from 'src/app/model/search/search-result-item';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() layout: string;
  @Input() selectSearchAll: string;
  @Input() layoutData: SearchDataItem[];
  dataForHomeLayout: SearchDataItem[];
  dataForOtherLayout: SearchDataItem[];
  @Input() searchCategoryFromUrl: SearchDataItem[];
  @Input() searchCategory: string;
  @Input() hasSearched: boolean;
  
  constructor() { }

  ngOnInit() {
  
  }
  DecideWhatLayoutToShow(): any {
    
    if (this.layout === 'other') {
      this.dataForHomeLayout = this.layoutData;
    } else {
      this.dataForOtherLayout = this.layoutData; 
    }
  }
}
