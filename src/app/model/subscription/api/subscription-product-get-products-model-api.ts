import { SubscriptionProduct } from './../subscription-product';
import { StatusDescription } from './../../other/status-description';
export interface SubscriptionProductGetProductsModelApi {
  statusDescription: StatusDescription;
  productList: SubscriptionProduct[];
}
