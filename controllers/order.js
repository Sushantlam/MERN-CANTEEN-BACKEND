const orderItems = require("../models/orderSchema")

async function createOrder(req,res,next){

    const data = req.body.item
    // console.log('data', data);
    await data.splice(0,0,{orderDate: req.body.orderDate})
    
    const eId= await orderItems.findOne({customer: req.body.customer})
    console.log('email', eId);
    if(eId===null)
//    { const {customer, items}= req.body
//    console.log(customer, items);
    try {
        const order =  await orderItems.create({
           email: req.body.email,
           item:[data],
        })
        await order.save()
        console.log('order', order);
        res.status(201).send({order})}
    
    catch (error) {
        res.status(400).json({error: "Failed to create order"})
        
    }
    else{
        try {
          const newItem=  await orderItems.findOneAndUpdate({email: req.body.email}, {$push: {item: data}})
          console.log( "newItem",newItem);
          res.status(200).json(newItem)
            
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

async function getAllOrder(req,res){
    try {
        const myOrder = await orderItems.find()
        res.status(200).json({allOrder: myOrder})
    } catch (error) {
        res.status(400).json(error)
    }
}

async function myOrderData(req,res){

     try {
        console.log(req.body.customer)
        let myData = await orderItems.findOne({email: req.body.email})
        console.log("mydata", orderItems);
   res.status(201).json({orderItems: myData})
  
    } catch (error) {
        res.status(401).send("newItem", error)
    }
}

module.exports={createOrder, myOrderData, getAllOrder}