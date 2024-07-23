import { setupWoocommerceRoutes } from "./woocomerceRouter.js";
import { setupPlantSystemRoutes } from "./plantSystemRouter.js"
import {setupBookRoutes} from "./bookSystemRouter.js"
import { Application } from "express";

export default (app: Application) => {
    setupWoocommerceRoutes(app)
    //setupPlantSystemRoutes(app)
    //setupBookRoutes(app)
}