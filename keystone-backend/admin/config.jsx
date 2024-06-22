"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
var CustomLogo_1 = require("./components/CustomLogo");
var CustomNavigation_1 = require("./components/CustomNavigation");
// Presently the Logo is the only Admin UI component that is customisable.
exports.components = {
    Logo: CustomLogo_1.CustomLogo,
    Navigation: CustomNavigation_1.CustomNavigation,
};
