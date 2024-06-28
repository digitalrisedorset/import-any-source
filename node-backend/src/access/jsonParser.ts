import express from "express";
import * as core from "express-serve-static-core";

export const setupJsonBodyParse = (app: core.Express) => {
    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }))
}
