import { StatusDescription } from '../../other/status-description';
import { UserPinSubscription } from '../user-pin-subscription';

export interface UpgradeSubscriptionRequestPINResponsePOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
