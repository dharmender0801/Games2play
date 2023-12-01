import { MyPreferencesUserSubItemType } from './../my-preferences-user-sub-item-type';
export interface MyPreferencesREQUEStBodyPOST {
  jwtToken: string;
  userId: string;
  portalId: number;
  preferenceData: {
    id: number;
    itemtype: number;
    itemDescription: string;
    subItemTypeList: MyPreferencesUserSubItemType[];
  };
}

