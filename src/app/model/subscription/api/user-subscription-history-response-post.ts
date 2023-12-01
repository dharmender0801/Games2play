import { StatusDescription } from './../../other/status-description';
import { UserSubscriptionHistory } from './user-subscription-history';
export class UserSubscriptionHistoryRESPONSePOST {
  statusDescription: StatusDescription;
  history: UserSubscriptionHistory[];
}

export class UserBillistoryRESPONSePOST {
  statusDescription: StatusDescription;
  billHistoryList: UserSubscriptionHistory[];
}