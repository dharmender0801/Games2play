export interface SubscriptionConfirmPinUpdateChangePackRequestBodyPOST {
  userId: number;
  jwtToken: string;
  portalId: number;
  productId: string;
  otp: string;
  pinToken: string;
}
