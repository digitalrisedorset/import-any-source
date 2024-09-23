import {setupDrdRoutes} from "./drdRouter.js";
import {setupPlantSystemRoutes} from "./plantSystemRouter.js"
import {setupBookRoutes} from "./bookSystemRouter.js"
import {Application} from "express";

export default (app: Application) => {
    setupDrdRoutes(app)
    setupPlantSystemRoutes(app)
    setupBookRoutes(app)
}