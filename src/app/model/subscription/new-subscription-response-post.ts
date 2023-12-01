import { StatusDescription } from '../other/status-description';
import { UserPinSubscription } from './user-pin-subscription';

export interface NewSubscriptionResponsePOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
