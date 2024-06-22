import routes from "../../routes/index.js";
import {configInfo} from "../../config";
import * as core from "express-serve-static-core";

export const initialiseApp = async (app: core.Express, config: configInfo) => {
    routes(app)
}