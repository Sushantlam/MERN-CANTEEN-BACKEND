const orderItems = require("../models/orderSchema")

async function createOrder(req,res,next){
 // const newData = [{ orderDate: req.body.orderDate }, ...data];
    // // const newData = [{ orderDate: req.body.orderDate }].concat(data); // Create a new array with orderDate added
    //  const data = req.body.item;
    //  console.log('Original data:', data);

    // const newData = [{ orderDate: req.body.orderDate }].concat(data);
    // console.log('Modified data:', newData);

    let data = req.body.item 
    // data = data.map(item => ({ ...item, itemId: generateUniqueId() }));

    // // Add the orderDate to each item
    // data = data.map(item => ({ ...item, orderDate: req.body.orderDate }));

    // //   console.log('data', data);
       await data.splice(0,0,{orderDate: req.body.orderDate})

       data.push({ totalPrice: req.body.totalPrice }); // The object with orderDate


   
    // const customer = req.body.customer.email 
    // console.log(customer);
    let eId= await orderItems.findOne({email : req.body.email })
    console.log('Email:', req.body.email );
    console.log('eId:', eId);
    if(eId===null){
//    { const {customer, items}= req.body
//    console.log(customer, items);
    try {
        console.log(' after Email:', req.body.email );
        console.log(' data', data);
        let order =  await orderItems.create({
           email: req.body.email,
           item:[data],
           totalPrice: req.body.totalPrice,
           status: req.body.status,
        })
        await order.save()
       res.status(201).json({order})}
    
    catch (error) {
        console.log(error.message);
        res.status(400).json(error.message)
        
    }}
    else{
        try {
            console.log("after email ", req.body.email );
          const newItem=  await orderItems.findOneAndUpdate({email : req.body.email  }, {$push: {item: data}})
          console.log( "newItem",newItem);
          res.status(200).json(newItem)
            
        } catch (error) {
            res.status(401).json(error)
        }
    }
}

// function generateUniqueId() {
//   return '_' + Math.random().toString(36).substr(2, 9);
// }

async function getAllOrder(req,res){
    try {
        const myOrder = await orderItems.find()
        res.status(200).json({allOrder: myOrder})
    } catch (error) {
        res.status(400).json(error)
    }
}

async function myOrderData(req, res) {
    try {
      
     
      // Fetch data based on the provided email
      let eId = await orderItems.findOne({ email: req.body.email });
      console.log("myData", eId);
  
      if (!eId) {
        // Handle the case where no data is found for the provided email
        return res.status(404).json({ error: "No data found for the provided email." });
      }
  
      res.status(200).json({ eId });
    } catch (error) {
      console.error(error.message);
  
      // Return an error response with a meaningful error message
      res.status(500).json({ error: "An internal server error occurred." });
    }
  }

  const updateFoodStatus = async (req, res) => {

    const orderItemId= req.query.id
        try {
      // Find the document by its ID
      const orderItem = await orderItems.findById(orderItemId);
  
      if (!orderItem) {
        console.log("Order item not found");
        res.status(200).json({message: "Order item not found"})
      }
  
      // Set the status to "delivered"
      orderItem.status = "delivered";
  
      // Save the updated document
      await orderItem.save();
  res.status(200).json({orderItem})
        console.log("Status set to 'delivered' successfully");
    } catch (error) {
      console.error("Error setting status to 'delivered':", error);
      res.status(400).json(error.message)
    } 
  };
  
module.exports={createOrder, myOrderData, getAllOrder, updateFoodStatus}