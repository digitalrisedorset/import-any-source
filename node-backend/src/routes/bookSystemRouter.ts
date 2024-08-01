import express, { Application, Request, Response, NextFunction } from 'express'
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'
import { BookController } from "../controller/bookController";

export const setupBookRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const bookController = new BookController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`book request: ${req.url}`)
        next()
    })

    router.get("/attributeList", bookController.apiGetAttributeList)

    router.get("/productList", bookController.apiGetProductList)

    router.post("/setProductImported", bookController.setProductImported)

    router.post("/createImport", bookController.createImport)

    router.post("/createUpdate", bookController.createUpdateImport)

    router.post("/createDelete", bookController.getDeleteNotification)

    router.post("/notifyProductDeletion", bookController.notifyProductDeletion)

    router.options('*', options);

    app.use(config.route.bookApiPrefix, router)
}