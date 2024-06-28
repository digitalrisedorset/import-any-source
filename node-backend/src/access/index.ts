import {setupStaticFileAccess} from "./staticFile.js";
import {setupJsonBodyParse} from "./jsonParser.js";
import * as core from "express-serve-static-core";

export default (app: core.Express) => {
    setupJsonBodyParse(app)
    setupStaticFileAccess(app)
}