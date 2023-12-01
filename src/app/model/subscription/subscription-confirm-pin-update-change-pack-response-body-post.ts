import { UserPinSubscription } from './user-pin-subscription';
import { StatusDescription } from '../other/status-description';

export interface SubscriptionConfirmPinUpdateChangePackResponseBodyPOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
