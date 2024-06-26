import { Woocommerce } from "../model/woocommerce"
import { ImportCreator } from "../model/import-creator"
import { KeystoneImportCreator } from "../model/keystone-import-creator"
import crypto from 'crypto'
const jwt = require("jsonwebtoken")
import { Request, Response, NextFunction } from "express";

// how long a token lasts before expiring
const tokenLasts = "365d"

export class WoocommerceController {
    apiMustBeLoggedIn = (req: Request, res: Response, next: NextFunction) =>  {
        try {
            jwt.verify(req.body.token, process.env.JWTSECRET)
            next()
        } catch (e) {
            res.status(500).send("Sorry, you must provide a valid token.")
        }
    }

    checkToken = (req: Request, res: Response)=> {
        try {
            jwt.verify(req.body.token, process.env.JWTSECRET)
            res.json(true)
        } catch (e) {
            res.json(false)
        }
    }

    apiGetAttributeList = async (req: Request, res: Response)=> {
        try {
            let wooClient = new Woocommerce()
            let list = await wooClient.getAttributeList();
            res.json(list)
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    apiGetProductList = async (req: Request, res: Response)=> {
        try {
            let wooClient = new Woocommerce()
            let list = await wooClient.getProductBatch();
            res.json(list)
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createWoocommerceImport = async (req: Request, res: Response)=> {
        try {
            let wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const wooImporter = new ImportCreator()
            wooImporter.createCsvImport(list, req.body)
            res.json({'message': 'success'})
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createWoocommerceUpdateImport = async (req: Request, res: Response)=> {
        try {
            let wooClient = new Woocommerce()
            const list = await wooClient.getProductUpdate()
            const wooImporter = new ImportCreator()
            wooImporter.createCsvUpdateImport(list)
            res.json({
                'message': 'success',
                'update': list.length
            })
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    createKeystoneSeedImport = async (req: Request, res: Response)=> {
        try {
            let wooClient = new Woocommerce()
            const list = await wooClient.getProductBatch()
            const keystoneImportCreator = new KeystoneImportCreator()
            keystoneImportCreator.createSeedImport(list)
            res.json({'message': 'success'})
        } catch (e) {
            res.status(500).send("Error")
        }
    }

    notifyProductDeletion = async (req: Request, res: Response)=> {
        try {
            const secret: string = 'secret' || process.env.WOOCOMMERCE_WEBHOOK_SECRET
            const signature = req.header("X-WC-Webhook-Signature");

            const hash = crypto.createHmac('SHA256', secret).update(req.body).digest('base64');

            if(hash === signature){
                res.send('match');
            } else {
                res.send("no match");
            }
            res.json({'message': 'success'})
        } catch (e) {
            res.status(500).send("Error")
        }
    }
}

// exports.apiMustBeLoggedIn = (req: Request, res: Response, next: NextFunction) =>  {
//     try {
//         jwt.verify(req.body.token, process.env.JWTSECRET)
//         next()
//     } catch (e) {
//         res.status(500).send("Sorry, you must provide a valid token.")
//     }
// }
//
// exports.checkToken = (req: Request, res: Response)=> {
//     try {
//         jwt.verify(req.body.token, process.env.JWTSECRET)
//         res.json(true)
//     } catch (e) {
//         res.json(false)
//     }
// }
//
// exports.apiGetAttributeList = async (req: Request, res: Response)=> {
//     try {
//         let wooClient = new Woocommerce()
//         let list = await wooClient.getAttributeList();
//         res.json(list)
//     } catch (e) {
//         res.status(500).send("Error")
//     }
// }
//
// exports.apiGetProductList = async (req: Request, res: Response)=> {
//     try {
//         let wooClient = new Woocommerce()
//         let list = await wooClient.getProductBatch();
//         res.json(list)
//     } catch (e) {
//         res.status(500).send("Error")
//     }
// }
//
// exports.createWoocommerceImport = async (req: Request, res: Response)=> {
//     try {
//         let wooClient = new Woocommerce()
//         const list = await wooClient.getProductBatch()
//         const wooImporter = new ImportCreator()
//         wooImporter.createCsvImport(list, req.body)
//         res.json({'message': 'success'})
//     } catch (e) {
//         res.status(500).send("Error")
//     }
// }
//
// exports.createWoocommerceUpdateImport = async (req: Request, res: Response)=> {
//     try {
//         let wooClient = new Woocommerce()
//         const list = await wooClient.getProductUpdate()
//         const wooImporter = new ImportCreator()
//         wooImporter.createCsvUpdateImport(list)
//         res.json({
//             'message': 'success',
//             'update': list.length
//         })
//     } catch (e) {
//         res.status(500).send("Error")
//     }
// }
//
// exports.createKeystoneSeedImport = async (req: Request, res: Response)=> {
//     try {
//         let wooClient = new Woocommerce()
//         const list = await wooClient.getProductBatch()
//         const keystoneImportCreator = new KeystoneImportCreator()
//         keystoneImportCreator.createSeedImport(list)
//         res.json({'message': 'success'})
//     } catch (e) {
//         res.status(500).send("Error")
//     }
// }
//
// exports.notifyProductDeletion = async (req: Request, res: Response)=> {
//     try {
//         const secret: string = 'secret' || process.env.WOOCOMMERCE_WEBHOOK_SECRET
//         const signature = req.header("X-WC-Webhook-Signature");
//
//         const hash = crypto.createHmac('SHA256', secret).update(req.rawBody).digest('base64');
//
//         if(hash === signature){
//             res.send('match');
//         } else {
//             res.send("no match");
//         }
//         res.json({'message': 'success'})
//     } catch (e) {
//         res.status(500).send("Error")
//     }
//}