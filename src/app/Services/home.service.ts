import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Global } from "../global/global";

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
    // 'Access-Control-Allow-Headers': 'Content-Type,x-requested-with,Authorization,Access-Control-Allow-Origin',
    // 'Access-Control-Allow-Methods':'GET, POST, OPTIONS',
   // 'Access-Control-Allow-Origin':'*',
  })
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  baseUrl:string;
  constructor(private httpClient: HttpClient,private global: Global) {
    this.baseUrl = this.global.BASE_API_URLvalue ;
  }
  
  GetHomePageData(data:any) {
    data.jwtToken=this.global.API_Token;
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "page/data",bodyData,httpOptions)
  }
}
