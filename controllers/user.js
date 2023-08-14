const user = require("../models/user")

async function updateUser(req,res,next){
    
    try {
        const updateByUser = await user.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}) 
        res.status(201).json(updateByUser)
    } catch (error) {
        res.status(401).json(error)
    }
}

async function getAllUser(req,res,next){
    try {
        const allUser = await user.find()
        res.status(201).json(allUser)
    } catch (error) {
        res.status(401).json(error)
    }
}


module.exports= {updateUser, getAllUser}