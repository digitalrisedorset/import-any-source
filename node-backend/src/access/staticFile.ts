import express from "express";
import * as core from "express-serve-static-core";
import {config} from "../config"

export const setupStaticFileAccess = (app: core.Express) => {
    app.use(`/${config.import.csvFolder}`, express.static(config.rootDir + config.import.csvFolder));
}