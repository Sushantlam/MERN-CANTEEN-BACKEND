const express= require("express")
const app = express()
const {connectMongoDb}= require("./connect")
const productRoute = require("./routes/productRoute")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/order")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")


dotenv.config()

app.use(express.json())
app.use(cookieParser())


connectMongoDb(process.env.URI).then(()=>{
    console.log('MongoDb connected')
    app.listen(process.env.PORT , (err)=>{
        if (err) console.log(err)
        console.log("Sucessfully running at ", process.env.PORT)
    })
}).catch((error)=>{
    console.log(error)
})

app.use("/product", productRoute)
app.use("/user", userRoute)
app.use("/order", orderRoute)


app.get("/",(req,res)=>{
    res.send("Hello from server")
})

// app.listen(8000,()=>{
//     console.log(`listening at port ${PORT}`)
// })