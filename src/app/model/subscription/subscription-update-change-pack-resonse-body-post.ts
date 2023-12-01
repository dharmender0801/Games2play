import { StatusDescription } from '../other/status-description';
import { UserPinSubscription } from './user-pin-subscription';
export interface SubscriptionRequestPinUpdateChangePackResonseBodyPOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
