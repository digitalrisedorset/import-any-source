"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lists = void 0;
var MagentoAttribute_1 = require("./schemas/MagentoAttribute");
var WoocommerceAttribute_1 = require("./schemas/WoocommerceAttribute");
var User_1 = require("./schemas/User");
exports.lists = {
    User: User_1.User,
    WoocommerceAttribute: WoocommerceAttribute_1.WoocommerceAttribute,
    MagentoAttribute: MagentoAttribute_1.MagentoAttribute
};
