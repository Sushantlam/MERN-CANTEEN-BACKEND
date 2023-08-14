const foodItems = require("../models/product")


//CreateFood
async function createFood(req,res,next){

    const newFoodItem = new foodItems(req.body)
    try {
        const newItem = await newFoodItem.save()
        res.status(201).json(newItem)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//UpdateFood

async function updateFood(req,res){
    try {
        const updatedFood = await foodItems.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedFood)
    } catch (error) {
        res.status(401).json(error.message)
    }
}

//Get food by id

async function getByID(req,res,next){
    try {
        const byId = await foodItems.findById(req.params.id)
        res.status(201).send(byId)
        
    } catch (error) {
        res.status(401).send(error)
        
    }
}

//DeleteFoodById 

async function deleteFoodById(req,res,next){
    try {
        const deleteById = await foodItems.findByIdAndDelete(req.params.id)
        res.status(201).json("deleteById")
        
    } catch (error) {
        res.status(400).send(error)
        
    }
}

//Getall Food

async function getAllFood(req,res,next){

    
    try {
        const allFood = await foodItems.find().limit(req.query.limit)
        res.status(201).json(allFood)
        
    } catch (error) {
        res.status(400).json(error)
    }
}

//getByCategory

async function getByCategory(req, res, next){

//    const {limit}= req.query
const {min, max, ...others}= req.query
console.log(min, max);
 
    try {
        const list = await foodItems.find({  price: { $gt: min | 1, $lt: max || 9999 }}).limit(req.query.limit)
        console.log(list);
         res.status(201).json(list)
       

    } catch (error) {
        res.status(402).json("Bad request")
    }
}





module.exports= { createFood, getAllFood, updateFood, getByID, deleteFoodById, getByCategory}