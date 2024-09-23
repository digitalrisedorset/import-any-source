import {InitialProductData} from "../types/drd";

export class MagentoData {
    getInitialHeaderData = function () {
        return [
            {'id':'store_view_code', 'title': 'store_view_code'},
            {'id':'attribute_set_code', 'title': 'attribute_set_code'},
            {'id':'product_websites', 'title': 'product_websites'},
        ]
    }
    
    getInitialData = function () {
        const data: InitialProductData = {}
    
        data['store_view_code'] = '';
        data['attribute_set_code'] = 'Default';
        data['product_websites'] = 'base';
    
        return data;
    }
}