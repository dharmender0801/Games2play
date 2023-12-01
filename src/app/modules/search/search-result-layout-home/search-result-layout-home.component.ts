import { SearchDataItem } from '../../../model/search/search-data-item';
import { Component, OnInit, Input } from '@angular/core';
import { ResultDataItem } from 'src/app/model/search/search-result-item';
@Component({
  selector: 'app-search-result-layout-home',
  templateUrl: './search-result-layout-home.component.html',
  styleUrls: ['./search-result-layout-home.component.css']
})
export class SearchResultLayoutHomeComponent implements OnInit {

  @Input() RenderingData: SearchDataItem[];
 //@Input() RenderingData: ResultDataItem[];
  constructor() { }

  ngOnInit() {
  }

}
