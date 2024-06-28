import crypto from "crypto";
import {config} from "../../config";
import {Request} from "express";

export class WoocommerceWebHookHandler {
    isWebhookValid = (req: Request) => {
        const signature = req.header("X-WC-Webhook-Signature");
        const topic = req.header("X-WC-Webhook-Topic");
        const event = req.header("X-WC-Webhook-Event");

        if (topic !== 'product.deleted' || event!=='deleted') {
            res.json({'message': 'invalid webhook data'})
            return
        }

        const hash = crypto.createHmac('SHA256',  config.woocommerce.webhookSecret).update(JSON.stringify(req.body)).digest('base64');

        return hash === signature
    }
}