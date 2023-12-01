import { StatusDescription } from '../../other/status-description';
import { SearchDataItem } from '../search-data-item';
import { ResultDataItem } from '../search-result-item';
export interface SearchByKeywordItemTypeRESPONSePOST {
  statusDescription: StatusDescription;
  //searchData: SearchDataItem[];
  result: SearchDataItem[];
 // result: ResultDataItem[];
}
