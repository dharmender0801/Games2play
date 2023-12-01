import { UserPinSubscription } from '../user-pin-subscription';
import { StatusDescription } from '../../other/status-description';

export interface UpgradeSubscriptionConfirmPINResponsePOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
