import {InitialProductData} from "../types";

export class MagentoData {
    getInitialHeaderData = function () {
        return [
            {'id':'store_view_code', 'title': 'store_view_code'},
            {'id':'attribute_set_code', 'title': 'attribute_set_code'},
            {'id':'product_type', 'title': 'product_type'},
            {'id':'product_websites', 'title': 'product_websites'},
        ]
    }
    
    getInitialData = function () {
        const data: InitialProductData = {}
    
        data['store_view_code'] = '';
        data['attribute_set_code'] = 'Default';
        data['product_type'] = 'simple';
        data['product_websites'] = 'base';
    
        return data;
    }
}