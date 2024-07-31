import express, { Application, Request, Response, NextFunction } from 'express'
import { WoocommerceController } from "../controller/woocommerceController";
import { config } from "../config";
import { corsOptions } from '../lib/cors-setup'

export const setupWoocommerceRoutes = (app: Application) => {
    const router = express.Router()
    const options = corsOptions();
    router.use(options)

    const woocommerceController = new WoocommerceController()

    router.use('/', (req: Request, res: Response, next: NextFunction) => {
        console.log(`woocommerce request: ${req.url}`)
        next()
    })

    router.get("/attributeList", woocommerceController.apiGetAttributeList)

    router.get("/productList", woocommerceController.apiGetProductList)

    router.post("/getProductToImport", woocommerceController.getProductToImport)

    router.post("/createImport", woocommerceController.createImport)

    router.post("/createUpdate", woocommerceController.createUpdateImport)

    router.post("/createDelete", woocommerceController.getDeleteNotification)

    router.post("/notifyProductDeletion", woocommerceController.notifyProductDeletion)

    router.options('*', options);

    app.use(config.route.woocommerceApiPrefix, router)
}