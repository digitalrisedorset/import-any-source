"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagentoData = void 0;
class MagentoData {
    constructor() {
        this.getInitialHeaderData = function () {
            return [
                { 'id': 'store_view_code', 'title': 'store_view_code' },
                { 'id': 'attribute_set_code', 'title': 'attribute_set_code' },
                { 'id': 'product_type', 'title': 'product_type' },
                { 'id': 'product_websites', 'title': 'product_websites' },
            ];
        };
        this.getInitialData = function () {
            const data = {};
            data['store_view_code'] = '';
            data['attribute_set_code'] = 'Default';
            data['product_type'] = 'simple';
            data['product_websites'] = 'base';
            return data;
        };
    }
}
exports.MagentoData = MagentoData;
