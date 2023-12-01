export class UserSubscription {
  id: number;
  userId: number;
  msisdn: string;
  productId: string;
  productName: string;
  subscriptionDate: number;
  chargeDate: number;
  expiryDate: number;
  amount: string;
  channel: string;
  productType: string;
  meta1: string;
  meta2: string;
  mappedItemtypeId: string;
  activeStatus: string;
  validity: number;
}

//#region My Preference Response Body

export class UserPreferenceData{
  id:number;
  itemtype:number;
  itemDescription:string;
  subItemTypeList:subItemTypeList[];
}
export class subItemTypeList{
  id:number;
  subItemDescription:string;
  language:string;
  isAdded:boolean;
}
//#endregion
