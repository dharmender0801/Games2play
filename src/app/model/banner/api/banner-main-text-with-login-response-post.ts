import { BannerMainTextObject } from './banner-main-text-with-login-response-post';
export interface BannerMainTextWithLoginRESPONSePOST {
  BannerText: BannerMainTextObject[];
  data:data[];
}

export interface BannerMainTextObject {
  id: number;
  portalId: number;
  portalinfoId: number;
  contentRootPath: string;
  info: string;
  text: string;
  imagepage: string;
  catnr: number;
  contentindexweb: number;
  pricepointid: number;
  portlettype: number;
  usercomment: string;
  itemtype: number;
  thumbnail: string;
  banner: string;
  cpid: number;
  appId: number;
  appName: string;
  searchkey: string;
  hasPreviewVideo: false;
  isSeeMoreContent: false;
  rating: string;
  year: number;
  contentStyle: number;
}

export interface data {
  
}

