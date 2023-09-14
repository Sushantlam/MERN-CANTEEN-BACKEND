const express= require("express")
const app = express()
const {connectMongoDb}= require("./connect")
const productRoute = require("./routes/productRoute")
const orderDemo = require("./routes/orderDemo")
const userRoute = require("./routes/userRoute")
const orderRoute = require("./routes/order")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")


dotenv.config()

app.use(express.json({ limit: '90mb' }))
app.use(cookieParser())
app.use('/images', express.static('views'));



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
app.use("/orderDemo", orderDemo)


app.get("/",(req,res)=>{
    res.send("Hello from server")
})

// app.listen(8000,()=>{
//     console.log(`listening at port ${PORT}`)
// })