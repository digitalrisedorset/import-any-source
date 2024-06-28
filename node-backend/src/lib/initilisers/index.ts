import routes from "../../routes/index.js";
import access from "../../access"
import * as core from "express-serve-static-core";

export const initialiseApp = async (app: core.Express) => {
    access(app)
    routes(app)
}