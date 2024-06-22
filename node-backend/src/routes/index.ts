import {setupWoocommerceRoutes} from "./woocomerceRouter.js";
import * as core from "express-serve-static-core";

export default (app: core.Express) => {
    setupWoocommerceRoutes(app)
}