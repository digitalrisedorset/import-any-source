import routes from "../../routes/index.js";
import * as core from "express-serve-static-core";

export const initialiseApp = async (app: core.Express) => {
    routes(app)
}