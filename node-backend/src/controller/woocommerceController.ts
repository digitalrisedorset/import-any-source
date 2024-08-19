import { Woocommerce } from "../model/woocommerce"
import { ImportCreator } from "../model/import-creator"
import { Request, Response } from "express";
import { WoocommerceWebHookHandler } from "../model/woocommerce/webhook-handler"
import { ProductDeletion } from "../model/woocommerce/product-deletion"
import { ErrorWrapper } from "../error-handler";
import {
    AttributeResponse, CsvDeleteApiResponse, CsvImportCreationResponse, CsvImportUpdateResponse,
    ImportControllerInterface,
    MinimalResponse,
    ProductResponse, WebhookApiResponse
} from "./importControllerInterface";


export class WoocommerceController implements ImportControllerInterface {
    errorWrapper = new ErrorWrapper()

    apiGetAttributeList = async (req: Request, res: Response): Promise<AttributeResponse> => {
        try {
            const wooClient = new Woocommerce()
            const result = await wooClient.getAttributeList()
            res.send(result)
        } catch (e) {
            res.status(500).send({ "error": "The Attributes could not be loaded" })
            this.errorWrapper.handle(e)
        }
    }

    apiGetProductList = async (req: Request, res: Response): Promise<ProductResponse> => {
        try {
            const wooClient = new Woocommerce()
            const result = await wooClient.getProductBatch();
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    setProductImported = (req: Request, res: Response): MinimalResponse => {
        try {
            const wooImporter = new ImportCreator()
            wooImporter.saveProductImported(req.body)
            res.send('success')
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createImport = async (req: Request, res: Response): Promise<void> => {
        try {
            const wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const wooImporter = new ImportCreator()
            await wooImporter.saveProductMinimalData(list)
            const rows = await wooImporter.getProductImportData(list, req.body)
            const filename = await wooImporter.finaliseWriteRows(rows)
            console.log('Import complete', filename)
            res.send({ filename, rows } as CsvImportCreationResponse)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createUpdateImport = async (req: Request, res: Response): Promise<CsvImportUpdateResponse> => {
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
            const rows = await wooImporter.getProductUpdateData(list)
            const filename = await wooImporter.finaliseWriteRows(rows)
            console.log('Import complete', filename)
            res.send({
                filename,
                update: list.length,
                rows
            })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    notifyProductDeletion = (req: Request, res: Response): WebhookApiResponse => {
        try {
            const woocommerceWebHookHandler = new WoocommerceWebHookHandler();

            if (!woocommerceWebHookHandler.isWebhookValid(req)) {
                res.send({ 'message': 'invalid webhook data' })
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

    getDeleteNotification = async (req: Request, res: Response): Promise<CsvDeleteApiResponse> => {
        try {
            const productDeletion = new ProductDeletion()
            const list = productDeletion.getProductDeleteNotification()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    delete: 0,
                    rows: []
                })
                return
            }

            const wooImporter = new ImportCreator()
            const rows = await wooImporter.getProductDeleteData(list)
            const filename = await wooImporter.finaliseWriteRows(rows)

            console.log('Import complete', filename)
            res.send({
                filename,
                delete: list.length,
                rows
            })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }
}