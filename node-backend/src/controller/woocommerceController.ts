import { Woocommerce } from "../model/woocommerce"
import { ImportCreator } from "../model/import-creator"
import { KeystoneImportCreator } from "../model/keystone-import-creator"
const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express";

// how long a token lasts before expiring
const tokenLasts = "365d"

exports.apiMustBeLoggedIn = function (req: Request, res: Response, next: NextFunction) {
    try {
        jwt.verify(req.body.token, process.env.JWTSECRET)
        next()
    } catch (e) {
        res.status(500).send("Sorry, you must provide a valid token.")
    }
}

exports.checkToken = function (req: Request, res: Response) {
    try {
        jwt.verify(req.body.token, process.env.JWTSECRET)
        res.json(true)
    } catch (e) {
        res.json(false)
    }
}

exports.apiGetAttributeList = async function (req: Request, res: Response) {
    try {
        let wooClient = new Woocommerce()
        let list = await wooClient.getAttributeList();
        res.json(list)
    } catch (e) {
        res.status(500).send("Error")
    }
}

exports.apiGetProductList = async function (req: Request, res: Response) {
    try {
        let wooClient = new Woocommerce()
        let list = await wooClient.getProductBatch();
        res.json(list)
    } catch (e) {
        res.status(500).send("Error")
    }
}

exports.createWoocommerceImport = async function(req: Request, res: Response) {
    try {
        let wooClient = new Woocommerce()
        const list = await wooClient.getProductBatch()
        const wooImporter = new ImportCreator()
        wooImporter.createCsvImport(list, req.body)
        res.json({'message': 'success'})
    } catch (e) {
        res.status(500).send("Error")
    }
}

exports.createKeystoneSeedImport = async function(req: Request, res: Response) {
    try {
        let wooClient = new Woocommerce()
        const list = await wooClient.getProductBatch()
        const keystoneImportCreator = new KeystoneImportCreator()
        keystoneImportCreator.createSeedImport(list)
        res.json({'message': 'success'})
    } catch (e) {
        res.status(500).send("Error")
    }
}