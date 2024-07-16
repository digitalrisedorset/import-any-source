import express, {Application} from "express";
import {config} from "../config"

export const setupStaticFileAccess = (app: Application) => {
    app.use(`/${config.import.csvFolder}`, express.static(config.rootDir + config.import.csvFolder));
}