const express = require("express")
const {createOrder, myOrderData, getAllOrder}= require("../controllers/order")
const router = express.Router()

router.post("/", createOrder)
router.post("/myOrderData", myOrderData)
router.get("/", getAllOrder)


module.exports = router