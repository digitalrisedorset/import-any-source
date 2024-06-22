require('dotenv').config({ path: require('find-config')('.env.development') })
import express from 'express'
import { router } from './routes'
import bodyParser from "body-parser";

const app = express()
app.use(bodyParser.urlencoded({extended:false})) // this is what makes the pos variables to appear in the router
app.use(bodyParser.json());
app.use(router)

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
