const express = require("express")
const { userRegister, loginUser } = require("../controllers/auth")
const { updateUser, getAllUser } = require("../controllers/user")
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verification")
const router = express.Router()


// router.post("/", userRegister)
// router.get("/checkAuthentication", verifyToken, (req,res,next)=>{
//     res.send("HelloUser")})
// router.get("/verifyUser/:id", verifyUser, (req,res,next)=>{
//         res.send("HelloUser you can edit delete account")})
//         router.get("/verifyAdmin/:id", verifyAdmin, (req,res,next)=>{
//             res.send("Hello Admin you can edit delete account")})

router.post("/signup", userRegister)

router.get("/", verifyAdmin ,getAllUser)
router.post("/login", loginUser)
router.put("/:id",verifyUser, updateUser)



module.exports = router