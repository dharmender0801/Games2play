import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from '../global/global';
const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl: string;
  constructor(private httpClient: HttpClient, private global: Global) {
    this.baseUrl = this.global.Get_API_wishlist ;
   }

   SaveWishlistData(data: any) {
   //  debugger
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + 'save', bodyData, httpOptions);
  }
 GetWishlistData(data: any) {
    const bodyData = JSON.stringify(data);
    return this.httpClient.post(this.baseUrl + 'list', bodyData, httpOptions);
  }

  GetAddRemoveWishlistData(data: any) {
      const bodyData = JSON.stringify(data);
      return this.httpClient.post(this.baseUrl + 'check/content', bodyData, httpOptions);
    }
}
