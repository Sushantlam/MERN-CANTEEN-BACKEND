const express= require("express")
const { stripePayment } = require("../controllers/stripe")
const router = express.Router()



router.post("/", stripePayment)

module.exports=router