const express= require("express")
const {createOrder, getAllOrder, updateStatus, getOnlyOneUserDetails}= require("../controllers/orderDemo")
const router = express.Router()


router.post("/", createOrder)
router.get("/allOrder", getAllOrder)
router.put("/orderStatus", updateStatus)
router.post("/myOrderData", getOnlyOneUserDetails)

module.exports=router