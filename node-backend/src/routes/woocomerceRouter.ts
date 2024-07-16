import express, {Application, Request, Response, NextFunction} from 'express'
import {WoocommerceController} from "../controller/woocommerceController";
import {config} from "../config";
import { corsOptions } from '../lib/cors-setup'

export const setupWoocommerceRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const woocommerceController = new WoocommerceController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`request: ${req.url}`)
        next()
    })

    router.get("/getWoocommerceAttributeList", woocommerceController.apiGetAttributeList)

    router.get("/getWoocommerceProductList", woocommerceController.apiGetProductList)

    router.post("/createWoocommerceImport", woocommerceController.createWoocommerceImport)

    router.post("/createWoocommerceUpdate", woocommerceController.createWoocommerceUpdateImport)

    router.post("/createWoocommerceDelete", woocommerceController.getWoocommerceDeleteNotification)

    router.post("/createKeystoneImport", woocommerceController.createKeystoneSeedImport)

    router.post("/notifyProductDeletion", woocommerceController.notifyProductDeletion)

    router.options('*', options);

    app.use(config.route.apiPrefix, router)
}