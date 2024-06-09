"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const woocommerce_1 = require("../model/woocommerce");
const import_creator_1 = require("../model/import-creator");
const keystone_import_creator_1 = require("../model/keystone-import-creator");
const jwt = require("jsonwebtoken");
// how long a token lasts before expiring
const tokenLasts = "365d";
exports.apiMustBeLoggedIn = function (req, res, next) {
    try {
        jwt.verify(req.body.token, process.env.JWTSECRET);
        next();
    }
    catch (e) {
        res.status(500).send("Sorry, you must provide a valid token.");
    }
};
exports.checkToken = function (req, res) {
    try {
        jwt.verify(req.body.token, process.env.JWTSECRET);
        res.json(true);
    }
    catch (e) {
        res.json(false);
    }
};
exports.apiGetAttributeList = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let wooClient = new woocommerce_1.Woocommerce();
            let list = yield wooClient.getAttributeList();
            res.json(list);
        }
        catch (e) {
            res.status(500).send("Error");
        }
    });
};
exports.apiGetProductList = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let wooClient = new woocommerce_1.Woocommerce();
            let list = yield wooClient.getProductBatch();
            res.json(list);
        }
        catch (e) {
            res.status(500).send("Error");
        }
    });
};
exports.createWoocommerceImport = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let wooClient = new woocommerce_1.Woocommerce();
            const list = yield wooClient.getProductBatch();
            const wooImporter = new import_creator_1.ImportCreator();
            wooImporter.createCsvImport(list, req.body);
            res.json({ 'message': 'success' });
        }
        catch (e) {
            res.status(500).send("Error");
        }
    });
};
exports.createKeystoneSeedImport = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let wooClient = new woocommerce_1.Woocommerce();
            const list = yield wooClient.getProductBatch();
            const keystoneImportCreator = new keystone_import_creator_1.KeystoneImportCreator();
            keystoneImportCreator.createSeedImport(list);
            res.json({ 'message': 'success' });
        }
        catch (e) {
            res.status(500).send("Error");
        }
    });
};
