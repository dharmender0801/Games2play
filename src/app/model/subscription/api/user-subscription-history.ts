export class UserSubscriptionHistory {
  id: number;
  userId: number;
  subscriptionId: number;
  msisdn: string;
  productId: string;
  productName: string;
  subscriptionDate: number;
  chargeDate: number;
  expiryDate: number;
  amount: number;
  channel: string;
  productType: string;
  meta1: string;
  meta3: string;
  mappedItemtypeId: string;
  activeStatus: string;
  cancelDate: number;
  cancelChannel: string;
  cancelReason: string;
}
