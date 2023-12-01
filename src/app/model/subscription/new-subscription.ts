export interface NewSubscriptionBodyPOST {
  userId: number;
  jwtToken: string;
  portalId: number;
  productId: number;
}
