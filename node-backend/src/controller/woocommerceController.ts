import {Woocommerce} from "../model/woocommerce"
import {ImportCreator} from "../model/import-creator"
import {KeystoneImportCreator} from "../model/keystone-import-creator"
import {Request, Response} from "express";
import {WoocommerceWebHookHandler} from "../model/woocommerce/webhook-handler"
import {ProductDeletion} from "../model/woocommerce/product-deletion"
import {ErrorWrapper} from "../error-handler";


export class WoocommerceController {
    errorWrapper = new ErrorWrapper()

    apiGetAttributeList = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const result = await wooClient.getAttributeList()
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    apiGetProductList = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const result = await wooClient.getProductBatch();
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
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
            res.send({filename})
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createWoocommerceUpdateImport = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductUpdate()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    update: 0
                })
                return
            }

            const wooImporter = new ImportCreator()
            const filename = await wooImporter.createCsvUpdateImport(list)
            console.log('Import complete', filename)
            res.send({
                filename,
                update: list.length
            })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createKeystoneSeedImport = async (req: Request, res: Response)=> {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const keystoneImportCreator = new KeystoneImportCreator()
            await keystoneImportCreator.createSeedImport(list)
            return {'message': 'success'}
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    notifyProductDeletion = async (req: Request, res: Response)=> {
        try {
            const woocommerceWebHookHandler = new WoocommerceWebHookHandler();

            if (!woocommerceWebHookHandler.isWebhookValid(req)) {
                res.send({'message': 'invalid webhook data'})
                return
            }

            const productDeletion = new ProductDeletion()
            productDeletion.updateCacheWithProductDeletedData(req.body['id'])

            res.send({
                delete: req.body['id'],
                message: 'success'
            })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    getWoocommerceDeleteNotification = async (req: Request, res: Response)=> {
        try {
            const productDeletion = new ProductDeletion()
            const list = await productDeletion.getProductDeleteNotification()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    delete: 0
                })
            }

            const wooImporter = new ImportCreator()
            const filename = await wooImporter.createCsvDeleteImport(list)
            console.log('Import complete', filename)
            res.send({
                filename,
                delete: list.length
            })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }
}