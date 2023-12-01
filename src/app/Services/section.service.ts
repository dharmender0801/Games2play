import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Global } from "../global/global";

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  baseUrl:string;
  base:string;
  constructor(private httpClient: HttpClient,private global: Global) {
    this.baseUrl = this.global.WebStore_API_URLvalue ;
    this.base = this.global.BASE ;
  }
  
  GetSectionData(data:any) {
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "page/data",bodyData,httpOptions)
  }

  GetLeftSubmeuSection(data:any){
    
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "page/data/count",bodyData,httpOptions)
  }

  GetBanner(dataBanner:any){
    
    var bodyData = JSON.stringify(dataBanner);
    console.log(bodyData)
    return this.httpClient.post(this.baseUrl + "banner",bodyData,httpOptions)
  }

  GetPageDataByGenre(data:any){
  
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "page/data/by/genre",bodyData,httpOptions)
  }

  GetSectionDataViewAll(data:any){
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "page/section/view/all",bodyData,httpOptions)
  }
  GetContentDetailsChild(data:any){
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.base + "web/content/detail",bodyData,httpOptions)
  }

  GetPacks(data:any){
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.base + "web/content/detail",bodyData,httpOptions)
  }
}
