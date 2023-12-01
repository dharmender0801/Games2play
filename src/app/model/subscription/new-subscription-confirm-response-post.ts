import { StatusDescription } from '../other/status-description';
import { UserPinSubscription } from './user-pin-subscription';

export interface NewSubscriptionConfirmResponsePOST {
  statusDescription: StatusDescription;
  userPinSubscription: UserPinSubscription;
}
