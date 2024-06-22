import {Router, Request, Response} from 'express'
import cors from "cors"
const router = Router();
router.use(cors())

const woocommerceController = require("./controller/woocommerceController")
//
// // check token to log out front-end if expired
// router.post("/checkToken", woocommerceController.checkToken)
//apiRouter.post("/getWoocommerceAttributeList", woocommerceController.apiMustBeLoggedIn, woocommerceController.apiGetAttributeList)
router.get("/getWoocommerceAttributeList", woocommerceController.apiGetAttributeList)

router.get("/getWoocommerceProductList", woocommerceController.apiGetProductList)

router.post("/createWoocommerceImport", woocommerceController.createWoocommerceImport)

router.post("/createWoocommerceUpdate", woocommerceController.createWoocommerceUpdateImport)

router.post("/createKeystoneImport", woocommerceController.createKeystoneSeedImport)

router.post("/notifyProductDeletion", woocommerceController.notifyProductDeletion)

export { router }

