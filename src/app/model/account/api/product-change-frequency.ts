import { StatusDescription } from '../../other/status-description';

export class ProductChangeFrequencyRequestPost {
    jwtToken:string;
    userId:number;
    portalId:number;
    mappedItemtypeId:number;
    productId:number;
    language:string;
}

export class ProductChangeFrequencyResponsePost {
    statusDescription: StatusDescription;
    productList:ProductList[];
}

export class ProductList{
    id:number;
    productId:string;
    productName:string;
    validity:number;
    pricePoint:string;
    isActive:string;
    packType:string;
    credit:string;
    graceDuration:string;
    description:string;
    displayOrder:number;
    mappedItemtypeId:number;
}
