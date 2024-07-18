import {ErrorWrapper} from "../error-handler";
import {Request, Response} from "express";
import {BookSystem} from "../model/book-system";
import {ImportCreator} from "../model/import-creator";
import {ProductDeletion} from "../model/booksystem/product-deletion";
import {ImportControllerInterface} from "./importControllerInterface";

export class BookController implements ImportControllerInterface {
    errorWrapper = new ErrorWrapper()

    apiGetAttributeList = async (req: Request, res: Response)=> {
        try {
            const bookSystemClient = new BookSystem()
            const result = await bookSystemClient.getAttributeList()
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    apiGetProductList = async (req: Request, res: Response)=> {
        try {
            const bookSystemClient = new BookSystem()
            const result = await bookSystemClient.getProductBatch();
            res.send(result)
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createImport = async (req: Request, res: Response)=> {
        try {
            const bookSystemClient = new BookSystem()
            const list = await bookSystemClient.getProductBatch()
            const plantImporter = new ImportCreator()
            plantImporter.saveProductMinimalData(list)
            const filename = await plantImporter.createCsvImport(list, req.body)
            console.log('Import complete', filename)
            res.send({filename})
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    createUpdateImport = async (req: Request, res: Response)=> {
        try {
            const bookSystemClient = new BookSystem()
            const list = await bookSystemClient.getProductUpdate()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    update: 0
                })
                return
            }

            const plantImporter = new ImportCreator()
            const filename = await plantImporter.createCsvUpdateImport(list)
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
            res.send("No implementation yet")
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    notifyProductDeletion = async (req: Request, res: Response)=> {
        try {
            res.send("No implementation yet")
        } catch (e) {
            res.status(500).send("Error")
            this.errorWrapper.handle(e)
        }
    }

    getDeleteNotification = async (req: Request, res: Response)=> {
        try {
            const productDeletion = new ProductDeletion()
            const list = await productDeletion.getProductDeleteNotification()

            if (list.length === 0) {
                res.send({
                    filename: '',
                    delete: 0
                })
            }

            const plantImporter = new ImportCreator()
            const filename = await plantImporter.createCsvDeleteImport(list)
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