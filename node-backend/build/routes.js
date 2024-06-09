"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const router = (0, express_1.Router)();
exports.router = router;
router.use((0, cors_1.default)());
const woocommerceController = require("./controller/woocommerceController");
//
// // check token to log out front-end if expired
// router.post("/checkToken", woocommerceController.checkToken)
//apiRouter.post("/getWoocommerceAttributeList", woocommerceController.apiMustBeLoggedIn, woocommerceController.apiGetAttributeList)
router.get("/getWoocommerceAttributeList", woocommerceController.apiGetAttributeList);
router.get("/getWoocommerceProductList", woocommerceController.apiGetProductList);
router.post("/createWoocommerceImport", woocommerceController.createWoocommerceImport);
router.post("/createKeystoneImport", woocommerceController.createKeystoneSeedImport);
router.get('/test', (req, res) => {
    res.send(`test yepee`);
});
