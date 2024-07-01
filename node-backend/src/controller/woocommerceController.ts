import { Woocommerce } from "../model/woocommerce"
import { ImportCreator } from "../model/import-creator"
import { KeystoneImportCreator } from "../model/keystone-import-creator"
const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express";
import {WoocommerceWebHookHandler} from "../model/woocommerce/webhook-handler"
import { ProductDeletion } from "../model/woocommerce/product-deletion"

// how long a token lasts before expiring
const tokenLasts = "365d"

export class WoocommerceController {
    apiMustBeLoggedIn = (req: Request, res: Response, next: NextFunction) =>  {
        try {
            jwt.verify(req.body.token, process.env.JWTSECRET)
            next()
        } catch (e) {
            res.status(500).send("Sorry, you must provide a valid token.")
        }
    }

    checkToken = (req: Request, res: Response)=> {
        try {
            jwt.verify(req.body.token, process.env.JWTSECRET)
            res.json(true)
        } catch (e) {
            res.json(false)
        }
    }

    apiGetAttributeList = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getAttributeList();
            res.json(list)
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    apiGetProductList = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch();
            res.json(list)
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createWoocommerceImport = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const wooImporter = new ImportCreator()
            wooImporter.saveProductMinimalData(list)
            const filename = await wooImporter.createCsvImport(list, req.body)
            console.log('Import complete', filename)
            res.json({filename})
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createWoocommerceUpdateImport = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductUpdate()

            if (list.length === 0) {
                res.json({
                    filename: '',
                    update: 0
                })
                return
            }

            const wooImporter = new ImportCreator()
            const filename = await wooImporter.createCsvUpdateImport(list)
            console.log('Import complete', filename)
            res.json({
                filename,
                update: list.length
            })
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createKeystoneSeedImport = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const keystoneImportCreator = new KeystoneImportCreator()
            await keystoneImportCreator.createSeedImport(list)
            res.json({'message': 'success'})
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    notifyProductDeletion = async (req: Request, res: Response)=> {
        try {
            const woocommerceWebHookHandler = new WoocommerceWebHookHandler();

            if (!woocommerceWebHookHandler.isWebhookValid(req)) {
                res.json({'message': 'invalid webhook data'})
                return
            }

            const productDeletion = new ProductDeletion()
            productDeletion.updateCacheWithProductDeletedData(req.body['id'])

            res.json({
                delete: req.body['id'],
                message: 'success'
            })
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    getWoocommerceDeleteNotification = async (req: Request, res: Response)=> {
        try {
            const productDeletion = new ProductDeletion()
            const list = await productDeletion.getProductDeleteNotification()

            if (list.length === 0) {
                res.json({
                    filename: '',
                    delete: 0
                })
                return
            }

            const wooImporter = new ImportCreator()
            const filename = await wooImporter.createCsvDeleteImport(list)
            console.log('Import complete', filename)
            res.json({
                filename,
                delete: list.length
            })
        } catch (e) {
            res.status(500).send("Error")
        }
    }
}