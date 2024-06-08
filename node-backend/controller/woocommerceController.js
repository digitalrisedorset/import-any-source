const Woocommerce = require("../model/woocommerce")
const ImportCreator = require("../model/import-creator")
const KeystoneImportCreator = require("../model/keystone-import-creator")
const jwt = require("jsonwebtoken")

// how long a token lasts before expiring
const tokenLasts = "365d"

exports.apiMustBeLoggedIn = function (req, res, next) {
    try {
        req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
        next()
    } catch (e) {
        res.status(500).send("Sorry, you must provide a valid token.")
    }
}

exports.checkToken = function (req, res) {
    try {
        req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
        res.json(true)
    } catch (e) {
        res.json(false)
    }
}

exports.apiGetAttributeList = async function (req, res) {
    try {
        let wooClient = new Woocommerce(req.body)
        let list = await wooClient.getAttributeList();
        res.json(list)
    } catch (e) {
        res.status(500).send("Error")
    }
}

exports.apiGetProductList = async function (req, res) {
    try {
        let wooClient = new Woocommerce(req.body)
        let list = await wooClient.getProductBatch();
        res.json(list)
    } catch (e) {
        res.status(500).send("Error")
    }
}

exports.createWoocommerceImport = async function(req, res) {
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

exports.createKeystoneSeedImport = async function(req, res) {
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