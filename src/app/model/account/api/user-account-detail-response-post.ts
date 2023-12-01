import { UserSubscription, UserPreferenceData } from './../user-subscription-list';
import { StatusDescription } from '../../other/status-description';
import { UserAccountDetail } from './user-account-detail';

export class UserAccountDetailRESPONSePOST {
  statusDescription: StatusDescription;
  userAccountDetail: UserAccountDetail;
  userSubscriptionList: UserSubscription[];
  hasFreeTrial: boolean;
}
export class UpdateUserAccountDetailResponsePost{
  statusCode:string;
  statusMessage:string;
}

// My preference Response data
export class UserMyPreferenceResponsePost{
  statusDescription: StatusDescription;
  preferenceData:UserPreferenceData;
}
