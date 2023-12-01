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
export class MenuHeaderService {

  baseUrl:string;
  constructor(private httpClient: HttpClient,private global: Global) {
    this.baseUrl = this.global.WebStore_API_URLvalue ;
  }
  
  GetMenuHeaderData(data:any) {
    var bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + "menu/items",bodyData,httpOptions)
  }
}
