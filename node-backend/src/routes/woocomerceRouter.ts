import express, {NextFunction, Request, Response} from 'express'
import {WoocommerceController} from "../controller/woocommerceController";
import {config} from "../config";
import * as core from "express-serve-static-core";
const cors = require("cors")

export const setupWoocommerceRoutes = (app: core.Express) => {
    const router = express.Router()
    router.use(cors())

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

    app.use(config.route.apiPrefix, router)
}