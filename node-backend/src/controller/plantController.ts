import { ErrorWrapper } from "../error-handler";
import { Request, Response } from "express";
import { PlantSystem } from "../model/plant-system";
import { ImportCreator } from "../model/import-creator";
import { ProductDeletion } from "../model/plantsystem/product-deletion";
import { ImportControllerInterface } from "./importControllerInterface";

export class PlantController implements ImportControllerInterface {
    errorWrapper = new ErrorWrapper()

    apiGetAttributeList = async (req: Request, res: Response) => {
        try {
            const plantSystemClient = new PlantSystem()
            const result = await plantSystemClient.getAttributeList()
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    apiGetProductList = async (req: Request, res: Response) => {
        try {
            const plantSystemClient = new PlantSystem()
            const result = await plantSystemClient.getProductBatch();
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    setProductImported = (req: Request, res: Response) => {
        res.send('success')
    }

    createImport = async (req: Request, res: Response) => {
        try {
            const plantSystemClient = new PlantSystem()
            const list = await plantSystemClient.getProductBatch()
            const plantImporter = new ImportCreator()
            //plantImporter.saveProductMinimalData(list)
            //const filename = await plantImporter.createCsvImport(list, req.body)
            const filename = 'test'
            console.log('Import complete', filename)
            res.send({ filename })
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createUpdateImport = async (req: Request, res: Response) => {
        try {
            const plantSystemClient = new PlantSystem()
            const list = await plantSystemClient.getProductUpdate()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    update: 0
                })
                return
            }

            const plantImporter = new ImportCreator()
            //const filename = await plantImporter.createCsvUpdateImport(list)
            const filename = 'test'
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

    notifyProductDeletion = async (req: Request, res: Response) => {
        try {
            res.send("No implementation yet")
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    getDeleteNotification = async (req: Request, res: Response) => {
        try {
            const productDeletion = new ProductDeletion()
            const list = productDeletion.getProductDeleteNotification()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    delete: 0
                })
            }

            const plantImporter = new ImportCreator()
            const filename = '';//await plantImporter.createCsvDeleteImport(list)
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