const orderItems = require("../models/orderSchema")

async function createOrder(req,res,next){
 // const newData = [{ orderDate: req.body.orderDate }, ...data];
    // // const newData = [{ orderDate: req.body.orderDate }].concat(data); // Create a new array with orderDate added
    //  const data = req.body.item;
    //  console.log('Original data:', data);

    // const newData = [{ orderDate: req.body.orderDate }].concat(data);
    // console.log('Modified data:', newData);

    let data = req.body.item 
      console.log('data', data);
         await data.splice(0,0,{orderDate: req.body.orderDate})
   
    const customer = req.body.email
    console.log(customer);
    let eId= await orderItems.findOne({email : req.body.email })
    console.log('Email:', req.body.email);
    console.log('eId:', eId);
    if(eId===null){
//    { const {customer, items}= req.body
//    console.log(customer, items);
try {
    console.log(data)
    console.log("1231242343242354",req.body.email)
    await orderItems.create({
        email: req.body.email,
        item:[data]
    }).then(() => {
        res.json({ success: true })
    })
} catch (error) {
    console.log(error.message)
    res.json("Server Error", error.message)

}
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
        const email = req.body.email
        console.log(email);
        // console.log(req.body.customer)
        let myData = new orderItems.findOne({email: req.body.email})
        console.log(myData);
        await myData.save()
        // console.log("mydata", orderItems);
   res.status(201).json({ myData})
  
    } catch (error) {
        res.status(401).send("newItem", error)
    }
}

module.exports={createOrder, myOrderData, getAllOrder}