import express, { Application, Request, Response, NextFunction } from 'express'
import { DrdController } from "../controller/drdController";
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'

export const setupDrdRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const drdController = new DrdController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`drd request: ${req.url}`)
        next()
    })

    router.get("/attributeList", drdController.apiGetAttributeList)

    router.get("/productList", drdController.apiGetProductList)

    router.post("/setProductImported", drdController.setProductImported)

    router.post("/createImport", drdController.createImport)

    router.post("/createUpdate", drdController.createUpdateImport)

    router.post("/createDelete", drdController.getDeleteNotification)

    router.post("/notifyProductDeletion", drdController.notifyProductDeletion)

    router.get("/createFeedImport", drdController.createFeedImport)

    //router.options('*', options);

    app.use(config.route.drdApiPrefix, router)
}