"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MagentoProductFieldCase = exports.WoocommerceProductFieldCase = exports.ProductStatus = void 0;
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["publish"] = "publish";
    ProductStatus["draft"] = "draft";
    ProductStatus["pending"] = "pending";
    ProductStatus["private"] = "private";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
var WoocommerceProductFieldCase;
(function (WoocommerceProductFieldCase) {
    WoocommerceProductFieldCase["active"] = "product_online";
    WoocommerceProductFieldCase["status"] = "status";
    WoocommerceProductFieldCase["visibility"] = "visibility";
    WoocommerceProductFieldCase["variations"] = "variations";
})(WoocommerceProductFieldCase = exports.WoocommerceProductFieldCase || (exports.WoocommerceProductFieldCase = {}));
var MagentoProductFieldCase;
(function (MagentoProductFieldCase) {
    MagentoProductFieldCase["store_view_code"] = "store_view_code";
    MagentoProductFieldCase["attribute_set_code"] = "attribute_set_code";
    MagentoProductFieldCase["product_type"] = "product_type";
    MagentoProductFieldCase["product_websites"] = "product_websites";
    MagentoProductFieldCase["status"] = "status";
    MagentoProductFieldCase["visibility"] = "visibility";
    MagentoProductFieldCase["configurable_variations"] = "configurable_variations";
})(MagentoProductFieldCase = exports.MagentoProductFieldCase || (exports.MagentoProductFieldCase = {}));
