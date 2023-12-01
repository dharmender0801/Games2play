import { StatusDescription } from './../../other/status-description';
import { SearchDataItem } from '../search-data-item';
import { ResultDataItem } from '../search-result-item';
export interface SearchByKeywordRESPONSePOST {
  statusDescription: StatusDescription;
 // searchData: SearchDataItem[];
 result: SearchDataItem[];
 //result: ResultDataItem[];
}
