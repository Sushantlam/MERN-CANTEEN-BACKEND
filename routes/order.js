const express = require("express")
const {createOrder, myOrderData, getAllOrder, updateFoodStatus}= require("../controllers/order")
const { verifyAdmin, verifyUser } = require("../utils/verification")
const router = express.Router()

router.post("/", createOrder)
router.post("/myOrderData",  myOrderData)
router.put("/updateFoodStatus/:id",  updateFoodStatus)
router.get("/", verifyAdmin, getAllOrder)


module.exports = router