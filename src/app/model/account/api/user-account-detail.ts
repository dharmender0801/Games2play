import { UserTokenDetail } from './../../other/user-token-detail';
export class UserAccountDetail {
  id: number;
  msisdn: string;
  activeStatus: string;
  loginStatus: string;
  uniqueId: string;
  fcmToken: string;
  userTokenDetails: UserTokenDetail;
  metadataStatus: boolean;
  language: string;
  notificationFlag: string;
  name: string;
  profileImage: string;
  hashToken: string;
}
