export interface UpgradeSubscriptionConfirmPINRequestBodyPOST {
  userId: number;
  jwtToken: string;
  portalId: number;
  productId: number;
  otp: string;
  pinToken: string;
}
