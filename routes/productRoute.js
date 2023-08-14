const express = require("express")
const { createFood, getAllFood, updateFood, getByID, deleteFoodById, getByCategory } = require("../controllers/product")
const { verifyAdmin } = require("../utils/verification")
const router = express.Router()

router.post("/", verifyAdmin, createFood)
router.get("/",getAllFood)
router.get("/category", getByCategory)
router.put("/:id", verifyAdmin, updateFood)
router.get("/:id",getByID)
router.delete("/:id",verifyAdmin, deleteFoodById)


module.exports= router