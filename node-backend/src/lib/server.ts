import express from 'express'
import {config} from "../config";
import {initialiseApp} from "./initilisers";

export const startServer = async () => {
    const app = express()
    const port = config.port

    app.use(express.json())

    await initialiseApp(app, config)

    try {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    } catch (err: any) {
        let message = 'unknown'
        if (typeof err === "string") {
            message = err.toUpperCase()
        } else if (err instanceof Error) {
            message = err.message
        }
        throw new Error(message)
    }
}
