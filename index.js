const express= require("express")
const app = express()
const {connectMongoDb}= require("./connect")
const productRoute = require("./routes/productRoute")
const orderDemo = require("./routes/orderDemo")
const userRoute = require("./routes/userRoute")
const stripe = require("./routes/stripe")
const orderRoute = require("./routes/order")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const axios = require("axios")
const cors= require("cors")
const port = process.env.PORT || 6000;

// const fileUpload = require('express-fileupload');

dotenv.config()
app.use(cors())
app.use(express.json({ limit: '100mb' }))
app.use(cookieParser())
app.use('/images', express.static('views'));
// app.use(fileUpload());



connectMongoDb(process.env.URI).then(()=>{
    console.log('MongoDb connected')
    app.listen(port , (err)=>{
        if (err) console.log(err)
        console.log("Sucessfully running at ", port)
    })
}).catch((error)=>{
    console.log(error)
})

app.post("/khalti-api", async (req, res) => {
    const payload = req.body;
    const khaltiResponse = await axios.post(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      payload,
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );
    console.log(khaltiResponse);
  
     if (khaltiResponse) {
       res.json({
         success: true,
         data: khaltiResponse?.data,
       });
     } else {
       res.json({
         success: false,
         message: "something went wrong",
       });
     }
  });

app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/order", orderRoute)
app.use("/orderDemo", orderDemo)
app.use("/create-checkout-session", stripe)


app.get("/",(req,res)=>{
    res.send("Hello from server")
})

// app.listen(8000,()=>{
//     console.log(`listening at port ${PORT}`)
// })