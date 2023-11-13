const orderDetails = require("../models/orderDemo")
const nodemailer = require('nodemailer');

async function sendEmailBeforeOrderStatusChange(name, email, title){
    try {
        const transport =nodemailer.createTransport({
           
            service: 'gmail',
            port: 465,
            logger: true,
            debug: true,
            secure: true,
           auth:{
                user: 'sushantlama732@gmail.com',
                pass: 'zpxsjrfthoxuebra'
     },
    tls:{
        rejectUnauthorized:true
    } })
           const mailOptions = {
                from: 'sushantlama732@gmail.com',
                to: email,
                subject: 'Order Notification',
                html: '<h2>Hello '+ name +', </h2> <p> Your order is placed successfully and we will get back to you after the order is ready  </p>'
     };

     
     transport.sendMail(mailOptions,  function(error, info){
        if (error) {
          console.log(error.message);
          
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
        
    } catch (error) {
        console.log(error);
    }
}



async function createOrder(req, res){
    const {email, userName, totalPrice}= req.body
    let data = req.body.item

    await data.splice(0,0, {orderDate: req.body.orderDate})

    try {
        const newOrder= new orderDetails({
            email: email,
            userName: userName,
            item: data,
            totalPrice: totalPrice,
            status: "Pending"
        })

        await newOrder.save()
        sendEmailBeforeOrderStatusChange(newOrder.userName,newOrder.email)
        res.status(201).json({message:"order Created successfully" })
        
    } catch (error) {

        res.status(401).json(error.message)
        
    }
    
}

async function getAllOrder(req,res){
    try {
 const allOrder = await orderDetails.find()
  res.status(201).json(allOrder)
    
        
    } catch (error) {
        res.status(401).json(error.message)
    
    }
}

async function sendEmail(name, email, title){
    try {
        const transport =nodemailer.createTransport({
           
            service: 'gmail',
            port: 465,
            logger: true,
            debug: true,
            secure: true,
           auth:{
                user: 'sushantlama732@gmail.com',
                pass: 'zpxsjrfthoxuebra'
     },
    tls:{
        rejectUnauthorized:true
    } })
           const mailOptions = {
                from: 'sushantlama732@gmail.com',
                to: email,
                subject: 'Order Notification',
                html: '<h2>Hello ' + name + ',</h2><p>Your order is ready. Please receive it.</p>, <p>Dont forget to give feedback</p>, '

     };

     
     transport.sendMail(mailOptions,  function(error, info){
        if (error) {
          console.log(error.message);
          
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
        
    } catch (error) {
        console.log(error);
    }
}


async function updateStatus (req,res){
    const id= req.query.id
    console.log("what is id ", id);
    try {
        const updatedOrderStatus = await orderDetails.findById(id)
        console.log("Ready",updatedOrderStatus);
        if(!updatedOrderStatus){
            res.status(401).json({message: "Order item not found" })
        }
        updatedOrderStatus.status= "Ready"
      
        await updatedOrderStatus.save()
        if(updatedOrderStatus.status){
         sendEmail(updatedOrderStatus.userName,updatedOrderStatus.email, updatedOrderStatus.item.title, updatedOrderStatus.status)
        }
        res.status(201).json(updatedOrderStatus)
    } catch (error) {
        res.status(400).json(error.message)
    }

}

async function orderCount (req,res){
   
    try {
        const countOrder = await orderDetails.countDocuments()
       
        res.status(201).json(countOrder)
    } catch (error) {
        res.status(400).json(error.message)
    }

}

async function getOnlyOneUserDetails(req,res){
    try {
      
     
        // Fetch data based on the provided email
        let eId = await orderDetails.find({ email: req.body.email });
        console.log("myData", eId);
    
        if (!eId) {
          // Handle the case where no data is found for the provided email
          return res.status(404).json({ error: "No data found for the provided email." });
        }
    
        res.status(200).json(eId);
      } catch (error) {
        console.error(error.message);
    
        // Return an error response with a meaningful error message
        res.status(500).json({ error: "An internal server error occurred." });
      }
}

// async function deleteOrder(req,res){
    
// }

module.exports ={createOrder, orderCount, getAllOrder, updateStatus, getOnlyOneUserDetails}