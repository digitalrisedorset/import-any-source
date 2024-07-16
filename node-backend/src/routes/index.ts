import {setupWoocommerceRoutes} from "./woocomerceRouter.js";
import {Application} from "express";

export default (app: Application) => {
    setupWoocommerceRoutes(app)
}