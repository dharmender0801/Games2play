import { SearchByKeywordItemTypeRESPONSePOST } from './../model/search/api/search-by-keyword-item-type-response-post';
import { SearchByKeywordItemTypeREQUEStBodyPOST } from './../model/search/api/search-by-keyword-item-type-request-body-post';
import { Observable } from 'rxjs';
import { SearchByKeywordREQUEStBodyPOST } from './../model/search/api/search-by-keyword-request-body-post';
import { SearchByKeywordRESPONSePOST } from './../model/search/api/search-by-keyword-response-post';
import { HttpClient } from '@angular/common/http';
import { Global } from 'src/app/global/global';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private _global: Global,
    private _http: HttpClient
  ) { }

  GetSearchDataForHomeLayout(body: SearchByKeywordREQUEStBodyPOST): Observable<SearchByKeywordRESPONSePOST> {
    
    const url = this._global.BASE + 'web/search/by/keyword/v2';
    return this._http.post<SearchByKeywordRESPONSePOST>(url, body, this._global.httpOptions);
  }

  GetSearchDataForOtherLayout(body: SearchByKeywordItemTypeREQUEStBodyPOST): Observable<SearchByKeywordItemTypeRESPONSePOST> {
   
    const url = this._global.BASE + 'web/search/by/keyword/itemtype/v2';
    return this._http.post<SearchByKeywordItemTypeRESPONSePOST>(url, body, this._global.httpOptions);
  }
}
