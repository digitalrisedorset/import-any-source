import express, {Application, Request, Response, NextFunction} from 'express'
import {config} from "../config";
import { corsOptions } from '../lib/cors-setup'
import {PlantController} from "../controller/plantController";

export const setupPlantSystemRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const plantController = new PlantController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`plant request: ${req.url}`)
        next()
    })

    router.get("/attributeList", plantController.apiGetAttributeList)

    router.get("/productList", plantController.apiGetProductList)

    router.post("/setProductImported", plantController.setProductImported)

    router.post("/createImport", plantController.createImport)

    router.post("/createUpdate", plantController.createUpdateImport)

    router.post("/createDelete", plantController.getDeleteNotification)

    router.post("/notifyProductDeletion", plantController.notifyProductDeletion)

    router.options('*', options);

    app.use(config.route.plantApiPrefix, router)
}