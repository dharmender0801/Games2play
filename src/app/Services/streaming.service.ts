import { StreamLinkRESPONSePOST } from './../model/account/api/stream-link-response-post';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from '../global/global';
import { VideoPlayLinkREQUEStBODyPOST } from '../model/account/api/user-account-detail-request-body-post';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  constructor(private httpClient: HttpClient, private global: Global) {}

  // GetContentStreamLink(data: VideoPlayLinkREQUEStBODyPOST): Observable<StreamLinkRESPONSePOST> {
  //   debugger;
  //   const url = this.global.BASE + 'web/portal/page/content/stream/link';
  //   return this.httpClient.post<StreamLinkRESPONSePOST>(url, {contentId: contentId}, this.global.httpOptions);
  // }

  GetContentStreamLink(data: VideoPlayLinkREQUEStBODyPOST): Observable<StreamLinkRESPONSePOST> {
    const url = this.global.BASE + 'web/portal/page/content/stream/link';
    return this.httpClient.post<StreamLinkRESPONSePOST>(url, data, this.global.httpOptions);
  }

  GetgameplayLink(data: any) {
    const bodyData = JSON.stringify(data);
    const url = this.global.BASE + 'web/portal/page/game/play/link';
    return this.httpClient.post(url, bodyData, this.global.httpOptions);
  }

  heTesting(){
    const url = 'http://52.220.17.35:9090/MtnChat/webapi/registrationjsp/headerurl';
    //const url = 'http://games2cell.com/vchatClient/web?ani=85214777&cmpid=10000006&planid=70000001&userType=GSM&action=1&dnis=4040&circleid=1&langid=t&mode=FC&userType=WEEKLY&platform=TP'
    return this.httpClient.get(url);
  }

  GetgamedownloadLink(data:any){
    const bodyData = JSON.stringify(data);
    //const url = this.global.BASE + 'web/content/download';
    const url="http://app.games2play.co/OoredooWebStoreAPI/web/content/downloaddirect";
    return this.httpClient.post(url, bodyData, this.global.httpOptions);
  }

}
