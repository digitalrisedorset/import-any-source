import {QueryResult} from "@apollo/client";

export interface MagentoProduct {
    sku: string,
    name: string
}

export interface MagentoProductQueryResult extends QueryResult {
    products: {
        items: MagentoProduct[]
    }
}