export interface SubscriptionProduct {
  id: number;
  productId: number;
  productName: string;
  validity: number;
  pricePoint: number;
  isActive: boolean;
  packType: string;
  credit: number;
  graceDuration: number;
  description: string;
  displayOrder: number;
  mappedItemtypeId: number;
}
