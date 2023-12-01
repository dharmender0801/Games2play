export interface NewSubscriptionConfirmRequestBodyPOST {
  userId: number;
  jwtToken: string;
  portalId: number;
  productId: number;
  otp: string;
  pinToken: string;
}
