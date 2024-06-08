const apiRouter = require("express").Router()
const woocommerceController = require("./controller/woocommerceController")
const cors = require("cors")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => res.json("Test, if you see this message that means your backend is up and running successfully. Congrats! Now let's continue learning React!"))

// check token to log out front-end if expired
apiRouter.post("/checkToken", woocommerceController.checkToken)

//apiRouter.post("/getWoocommerceAttributeList", woocommerceController.apiMustBeLoggedIn, woocommerceController.apiGetAttributeList)
apiRouter.get("/getWoocommerceAttributeList", woocommerceController.apiGetAttributeList)

apiRouter.get("/getWoocommerceProductList", woocommerceController.apiGetProductList)

apiRouter.post("/createWoocommerceImport", woocommerceController.createWoocommerceImport)

apiRouter.post("/createKeystoneImport", woocommerceController.createKeystoneSeedImport)

module.exports = apiRouter

